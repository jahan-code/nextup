import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { AuthorizationError, NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";
import { RoomMemberRole } from "@/app/generated/prisma/client";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId } = await validateParams(params, ["id"]);

    const member = await prismaClient.roomMember.findUnique({
      where: {
        roomId_userId: {
          roomId,
          userId: user.id,
        },
      },
    });

    if (!member) {
      throw new AuthorizationError(ErrorCode.NOT_ROOM_MEMBER);
    }

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

    const isCreator = room.creatorId === user.id;

    // Initialize Ably for broadcasting
    const Ably = (await import('ably')).Realtime;
    const apiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY;
    let ably: any = null;
    let channel: any = null;

    if (apiKey) {
      ably = new Ably({ key: apiKey });
      channel = ably.channels.get(`room:${roomId}`);
    }

    if (isCreator) {
      // Creator leaving: transfer to oldest remaining member or end room
      const otherMembers = await prismaClient.roomMember.findMany({
        where: {
          roomId,
          userId: { not: user.id },
        },
        orderBy: { joinedAt: "asc" },
        take: 1,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              image: true,
            },
          },
        },
      });

      if (otherMembers.length === 0) {
        // Creator is alone → end room (delete)
        await prismaClient.room.delete({
          where: { id: roomId },
        });

        // Broadcast room ended
        if (channel) {
          await channel.publish('room:ended', {
            roomId,
            reason: 'creator_left_alone',
          });
          ably.close();
        }

        return successResponse({
          message: "Successfully left room",
          roomEnded: true,
        });
      }

      // Transfer creator to oldest remaining member
      const newCreatorId = otherMembers[0].userId;
      await prismaClient.$transaction([
        prismaClient.room.update({
          where: { id: roomId },
          data: { creatorId: newCreatorId },
        }),
        prismaClient.roomMember.update({
          where: {
            roomId_userId: {
              roomId,
              userId: newCreatorId,
            },
          },
          data: { role: RoomMemberRole.CREATOR },
        }),
        prismaClient.roomMember.delete({
          where: {
            roomId_userId: {
              roomId,
              userId: user.id,
            },
          },
        }),
      ]);

      // Broadcast creator transfer
      if (channel) {
        await channel.publish('member:left', {
          userId: user.id,
          isCreator: true,
        });
        await channel.publish('creator:transferred', {
          oldCreatorId: user.id,
          newCreatorId,
          newCreator: otherMembers[0].user,
        });
        ably.close();
      }

      return successResponse({
        message: "Successfully left room",
        roomEnded: false,
        creatorTransferred: true,
        newCreatorId,
      });
    }

    // Non-creator leaving: remove member, then end room if 0 members left
    await prismaClient.roomMember.delete({
      where: {
        roomId_userId: {
          roomId,
          userId: user.id,
        },
      },
    });

    const remainingCount = await prismaClient.roomMember.count({
      where: { roomId },
    });

    if (remainingCount === 0) {
      await prismaClient.room.delete({
        where: { id: roomId },
      });

      // Broadcast room ended
      if (channel) {
        await channel.publish('room:ended', {
          roomId,
          reason: 'no_members_left',
        });
        ably.close();
      }

      return successResponse({
        message: "Successfully left room",
        roomEnded: true,
      });
    }

    // Broadcast member left
    if (channel) {
      await channel.publish('member:left', {
        userId: user.id,
        isCreator: false,
      });
      ably.close();
    }

    return successResponse({
      message: "Successfully left room",
      roomEnded: false,
    });
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/leave");
  }
}

