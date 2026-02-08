import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import {
  getAuthenticatedUser,
  requireRoomMembership,
} from "@/src/lib/api/auth/auth-shield";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import {
  BusinessLogicError,
  NotFoundError,
} from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";
import { RoomMemberRole } from "@/src/types/rooms";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId } = await validateParams(params, ["id"]);

    // Check if room exists
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundError(ErrorCode.ROOM_NOT_FOUND);
    }

    // Check if user is already a member
    const existingMember = await prismaClient.roomMember.findUnique({
      where: {
        roomId_userId: {
          roomId,
          userId: user.id,
        },
      },
    });

    if (existingMember) {
      throw new BusinessLogicError(ErrorCode.ALREADY_MEMBER);
    }

    // Check if there are any members in the room
    const memberCount = await prismaClient.roomMember.count({
      where: { roomId },
    });

    const role =
      memberCount === 0 ? RoomMemberRole.CREATOR : RoomMemberRole.MEMBER;

    // Add user as member
    await prismaClient.$transaction(async (tx: any) => {
      await tx.roomMember.create({
        data: {
          roomId,
          userId: user.id,
          role,
        },
      });

      // If they are the first member, they must be the room creator
      if (role === RoomMemberRole.CREATOR) {
        await tx.room.update({
          where: { id: roomId },
          data: { creatorId: user.id },
        });
      }
    });

    // Initialize Ably for broadcasting
    const Ably = (await import("ably")).Realtime;
    const apiKey = process.env.NEXT_PUBLIC_ABLY_API_KEY;
    if (apiKey) {
      const ably = new Ably({ key: apiKey });
      const channel = ably.channels.get(`room:${roomId}`);

      await channel.publish("member:joined", {
        userId: user.id,
        user: {
          id: user.id,
          email: user.email,
          image: user.image,
        },
      });

      ably.close();
    }

    return successResponse({ message: "Successfully joined room" });
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/join");
  }
}
