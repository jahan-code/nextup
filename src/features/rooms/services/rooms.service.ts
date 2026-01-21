import { prismaClient } from "@/src/lib";
import { RoomMemberRole } from "@/app/generated/prisma/client";
import { CreateRoomSchema, type CreateRoomInput } from "@/src/validation/rooms";
import type { RoomWithDetails, RoomListResponse } from "@/src/types/rooms";
import {
  NotFoundError,
} from "@/src/lib/api/errors/customErrors";
import {
  ErrorCode,
} from "@/src/lib/api/errorConstants";

export class RoomsService {
  /**
   * Create a new room and add creator as member
   */
  static async createRoom(
    userId: string,
    data: CreateRoomInput
  ): Promise<RoomWithDetails> {
    // Validate input
    const validatedData = CreateRoomSchema.parse(data);

    // Verify user exists
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError(ErrorCode.USER_NOT_FOUND);
    }

    // Create room and add creator as member
    const room = await prismaClient.room.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        isPublic: validatedData.isPublic,
        creatorId: userId,
        members: {
          create: {
            userId: userId,
            role: RoomMemberRole.CREATOR,
          },
        },
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

    return room as RoomWithDetails;
  }

  /**
   * Get list of rooms (optionally filtered to public only)
   */
  static async getRooms(publicOnly: boolean = false): Promise<RoomListResponse> {
    const where = publicOnly ? { isPublic: true } : {};

    const rooms = await prismaClient.room.findMany({
      where,
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
        currentStream: {
          include: {
            stream: {
              select: {
                id: true,
                title: true,
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
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    return { rooms: rooms as RoomWithDetails[] };
  }

  /**
   * Get rooms created by a specific user
   */
  static async getUserRooms(userId: string): Promise<RoomListResponse> {
    const rooms = await prismaClient.room.findMany({
      where: { creatorId: userId },
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
        currentStream: {
          include: {
            stream: {
              select: {
                id: true,
                title: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return { rooms: rooms as RoomWithDetails[] };
  }
}

