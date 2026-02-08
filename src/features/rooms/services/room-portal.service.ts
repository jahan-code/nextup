/**
 * RoomManager - Decisive Cache Break
 * This file replaces RoomsService to resolve persistent Turbopack parsing errors.
 */
import { prismaClient } from "@/src/lib/db-v3";
import {
  RoomMemberRole,
  type Room,
  type RoomMember,
  type User,
} from "@/src/types/rooms";
import { CreateRoomSchema, type CreateRoomInput } from "@/src/validation/rooms";
import type { RoomWithDetails, RoomListResponse } from "@/src/types/rooms";
import { NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";

export class RoomPortal {
  /**
   * Create a new room and add creator as member
   */
  static async createRoom(
    userId: string,
    data: CreateRoomInput,
  ): Promise<RoomWithDetails> {
    const validatedData = CreateRoomSchema.parse(data);

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError(ErrorCode.USER_NOT_FOUND);
    }

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
            image: true,
          },
        },
        members: {
          take: 5, // Limit to 5 members for preview
          include: {
            user: {
              select: {
                id: true,
                email: true,
                image: true,
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

    return room as unknown as RoomWithDetails;
  }

  /**
   * Get list of rooms (optionally filtered to public only)
   */
  static async getRooms(
    publicOnly: boolean = false,
  ): Promise<RoomListResponse> {
    const where = publicOnly ? { isPublic: true } : {};

    const rooms = await prismaClient.room.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            email: true,
            image: true,
          },
        },
        members: {
          take: 5, // Limit to 5 members for preview
          include: {
            user: {
              select: {
                id: true,
                email: true,
                image: true,
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

    return { rooms: rooms as unknown as RoomWithDetails[] };
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
            image: true,
          },
        },
        members: {
          take: 5, // Limit to 5 members for preview
          include: {
            user: {
              select: {
                id: true,
                email: true,
                image: true,
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

    return { rooms: rooms as unknown as RoomWithDetails[] };
  }
}
