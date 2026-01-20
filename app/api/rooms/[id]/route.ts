import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { validateParams, validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { AuthorizationError, NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";
import { CreateRoomSchema } from "@/src/validation/rooms";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id: roomId } = await validateParams(params, ["id"]);
    
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
        streams: {
          include: {
            stream: {
              select: {
                id: true,
                title: true,
                url: true,
                extractedId: true,
                bigImg: true,
                smallImg: true,
                type: true,
              },
            },
            addedBy: {
              select: {
                id: true,
                email: true,
              },
            },
            upvotes: {
              select: {
                id: true,
                userId: true,
              },
            },
            _count: {
              select: {
                upvotes: true,
              },
            },
          },
          orderBy: [
            { order: "asc" },
            { addedAt: "asc" },
          ],
        },
        currentStream: {
          include: {
            stream: {
              select: {
                id: true,
                title: true,
                url: true,
                extractedId: true,
                bigImg: true,
                smallImg: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            streams: true,
          },
        },
      },
    });

    if (!room) {
      throw new NotFoundError(ErrorCode.ROOM_NOT_FOUND);
    }

    // Transform streams to include upvote count
    const roomWithCounts = {
      ...room,
      streams: room.streams.map((rs) => ({
        ...rs,
        upvoteCount: rs._count.upvotes,
      })),
      playbackTime: room.playbackTime,
      isPlaying: room.isPlaying,
      lastSyncTime: room.lastSyncTime,
    };

    return successResponse(roomWithCounts);
  } catch (error) {
    return handleApiError(error, "GET /api/rooms/[id]");
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId } = await validateParams(params, ["id"]);
    const body = await validateRequest(req, CreateRoomSchema.partial());

    // Check if room exists
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
      select: {
        id: true,
        creatorId: true,
      },
    });

    if (!room) {
      throw new NotFoundError(ErrorCode.ROOM_NOT_FOUND);
    }

    // Verify creator ownership
    if (room.creatorId !== user.id) {
      throw new AuthorizationError(ErrorCode.NOT_ROOM_CREATOR);
    }

    // Update room
    const updatedRoom = await prismaClient.room.update({
      where: { id: roomId },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.isPublic !== undefined && { isPublic: body.isPublic }),
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            streams: true,
          },
        },
      },
    });

    // Note: Ably room:update event would be published here if we had Ably server-side
    // For now, clients will refetch room data when needed

    return successResponse(updatedRoom);
  } catch (error) {
    return handleApiError(error, "PUT /api/rooms/[id]");
  }
}

