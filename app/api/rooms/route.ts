import { NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/api/auth/auth-shield";
import { getBooleanQueryParam, getQueryParam } from "@/src/lib/api/validation";
import { RoomPortal } from "@/src/features/rooms";
import { CreateRoomSchema } from "@/src/validation/rooms";
import { validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";

export async function POST(req: NextRequest) {
  // Cache busting comment v1
  try {
    const user = await getAuthenticatedUser();
    const body = await validateRequest(req, CreateRoomSchema);
    const room = await RoomPortal.createRoom(user.id, body);

    // Broadcast new room creation to all dashboards if it's public
    if (room.isPublic) {
      try {
        const Ably = (await import('ably')).Realtime;
        const apiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY;

        if (apiKey) {
          const ably = new Ably({ key: apiKey });
          const channel = ably.channels.get('dashboard:rooms');

          await channel.publish('room:created', {
            roomId: room.id,
            room: room
          });

          ably.close();
        }
      } catch (error) {
        console.error('Failed to broadcast room creation:', error);
        // Don't fail the request if broadcast fails
      }
    }

    return successResponse(room, 201);
  } catch (error) {
    return handleApiError(error, "POST /api/rooms");
  }
}

export async function GET(req: NextRequest) {
  try {
    const myRooms = getQueryParam(req, "myRooms");

    if (myRooms === "true") {
      // Get user's created rooms
      const user = await getAuthenticatedUser();
      const result = await RoomPortal.getUserRooms(user.id);
      return successResponse(result);
    } else {
      // Get public rooms or all rooms
      const publicOnly = getBooleanQueryParam(req, "public") ?? false;
      const result = await RoomPortal.getRooms(publicOnly);
      const response = successResponse(result);

      // Cache public room lists for 60 seconds (stale for 30s more)
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');

      return response;
    }
  } catch (error) {
    return handleApiError(error, "GET /api/rooms");
  }
}

