import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser, requireRoomMembership } from "@/src/lib/api/auth";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { BusinessLogicError, NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";
import { RoomMemberRole } from "@/app/generated/prisma/enums";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
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

    // Add user as member
    await prismaClient.roomMember.create({
      data: {
        roomId,
        userId: user.id,
        role: RoomMemberRole.MEMBER,
      },
    });

    return successResponse({ message: "Successfully joined room" });
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/join");
  }
}

