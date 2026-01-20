import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { AuthorizationError, BusinessLogicError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId } = await validateParams(params, ["id"]);

    // Check if user is a member
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

    // Check if user is the creator
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
    });

    if (room?.creatorId === user.id) {
      throw new BusinessLogicError(ErrorCode.INVALID_OPERATION, "Room creator cannot leave. Delete the room instead.");
    }

    // Remove member
    await prismaClient.roomMember.delete({
      where: {
        roomId_userId: {
          roomId,
          userId: user.id,
        },
      },
    });

    return successResponse({ message: "Successfully left room" });
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/leave");
  }
}

