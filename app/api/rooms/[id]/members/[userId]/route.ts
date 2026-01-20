import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { AuthorizationError, NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> | { id: string; userId: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId, userId: targetUserId } = await validateParams(params, ["id", "userId"]);

    // Check if room exists and get creator info
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

    // Prevent removing the creator
    if (targetUserId === room.creatorId) {
      throw new AuthorizationError(ErrorCode.INVALID_OPERATION, "Cannot remove the room creator");
    }

    // Check if member exists
    const member = await prismaClient.roomMember.findUnique({
      where: {
        roomId_userId: {
          roomId,
          userId: targetUserId,
        },
      },
    });

    if (!member) {
      throw new NotFoundError(ErrorCode.NOT_FOUND, "Member not found in room");
    }

    // Remove member
    await prismaClient.roomMember.delete({
      where: {
        roomId_userId: {
          roomId,
          userId: targetUserId,
        },
      },
    });

    // Note: Ably member:left event would be published here if we had Ably server-side
    // For now, clients will refetch room data when needed

    return successResponse({ message: "Member removed successfully" });
  } catch (error) {
    return handleApiError(error, "DELETE /api/rooms/[id]/members/[userId]");
  }
}
