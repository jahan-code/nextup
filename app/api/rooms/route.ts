import { NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { getBooleanQueryParam, getQueryParam } from "@/src/lib/api/validation";
import { RoomsService } from "@/src/features/rooms";
import { CreateRoomSchema } from "@/src/validation/rooms";
import { validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    const body = await validateRequest(req, CreateRoomSchema);
    const room = await RoomsService.createRoom(user.id, body);
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
      const result = await RoomsService.getUserRooms(user.id);
      return successResponse(result);
    } else {
      // Get public rooms or all rooms
      const publicOnly = getBooleanQueryParam(req, "public") ?? false;
      const result = await RoomsService.getRooms(publicOnly);
      return successResponse(result);
    }
  } catch (error) {
    return handleApiError(error, "GET /api/rooms");
  }
}

