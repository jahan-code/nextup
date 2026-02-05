import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth/auth-shield";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { BusinessLogicError, NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";
import { RoomMemberRole } from "@/app/generated/prisma-v3";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId } = await validateParams(params, ["id"]);

    // 1. Fetch room and current members
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
      include: {
        members: {
          orderBy: { joinedAt: "asc" },
        },
      },
    });

    if (!room) {
      throw new NotFoundError(ErrorCode.ROOM_NOT_FOUND);
    }

    // 2. Check if the requester is a member
    const requesterMember = room.members.find(m => m.userId === user.id);
    if (!requesterMember) {
      throw new BusinessLogicError(ErrorCode.NOT_ROOM_MEMBER);
    }

    // 3. If requester is already creator, nothing to do
    if (room.creatorId === user.id) {
      return successResponse({ message: "Already creator", currentCreatorId: room.creatorId });
    }

    // 4. Atomically transfer creator role
    // We promote the requester to creator and demote the old one
    await prismaClient.$transaction(async (tx) => {
      // Update room creator
      await tx.room.update({
        where: { id: roomId },
        data: { creatorId: user.id },
      });

      // Update old creator's role to MEMBER
      await tx.roomMember.updateMany({
        where: { roomId, role: RoomMemberRole.CREATOR },
        data: { role: RoomMemberRole.MEMBER },
      });

      // Update new creator's role to CREATOR
      await tx.roomMember.update({
        where: { roomId_userId: { roomId, userId: user.id } },
        data: { role: RoomMemberRole.CREATOR },
      });
    });

    // 5. Broadcast the transfer via Ably
    const Ably = (await import('ably')).Realtime;
    const apiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY;
    if (apiKey) {
      const ably = new Ably({ key: apiKey });
      const channel = ably.channels.get(`room:${roomId}`);

      await channel.publish('creator:transferred', {
        oldCreatorId: room.creatorId,
        newCreatorId: user.id,
        newCreator: {
          id: user.id,
          email: user.email,
          image: user.image
        }
      });

      ably.close();
    }

    return successResponse({
      message: "Creator role transferred successfully",
      newCreatorId: user.id
    });
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/migrate");
  }
}
