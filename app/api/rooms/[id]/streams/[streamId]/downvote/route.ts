import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser, requireRoomMembership } from "@/src/lib/api/auth";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; streamId: string }> | { id: string; streamId: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId, streamId } = await validateParams(params, ["id", "streamId"]);
    await requireRoomMembership(user.id, roomId);

    const roomStream = await prismaClient.roomStream.findUnique({
      where: {
        roomId_streamId: {
          roomId,
          streamId,
        },
      },
    });

    if (!roomStream) {
      throw new NotFoundError(ErrorCode.STREAM_NOT_FOUND, "Stream not found in room");
    }

    const upvote = await prismaClient.roomStreamUpvote.findUnique({
      where: {
        roomStreamId_userId: {
          roomStreamId: roomStream.id,
          userId: user.id,
        },
      },
    });

    if (!upvote) {
      throw new NotFoundError(ErrorCode.NOT_FOUND, "Upvote not found");
    }

    await prismaClient.roomStreamUpvote.delete({
      where: {
        roomStreamId_userId: {
          roomStreamId: roomStream.id,
          userId: user.id,
        },
      },
    });

    return successResponse({ message: "Upvote removed" });
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/streams/[streamId]/downvote");
  }
}
