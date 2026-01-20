import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser, requireRoomMembership } from "@/src/lib/api/auth";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";

export async function PUT(
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

    const updatedRoom = await prismaClient.room.update({
      where: { id: roomId },
      data: { currentStreamId: roomStream.id },
      include: {
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
      },
    });

    return successResponse(updatedRoom);
  } catch (error) {
    return handleApiError(error, "PUT /api/rooms/[id]/streams/[streamId]/play");
  }
}
