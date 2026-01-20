import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { AuthorizationError, NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; streamId: string }> | { id: string; streamId: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId, streamId } = await validateParams(params, ["id", "streamId"]);

    const roomStream = await prismaClient.roomStream.findUnique({
      where: {
        roomId_streamId: {
          roomId,
          streamId,
        },
      },
      include: {
        room: {
          select: {
            creatorId: true,
          },
        },
      },
    });

    if (!roomStream) {
      throw new NotFoundError(ErrorCode.STREAM_NOT_FOUND, "Stream not found in room");
    }

    const isCreator = roomStream.room.creatorId === user.id;
    const isAdder = roomStream.addedById === user.id;

    if (!isCreator && !isAdder) {
      throw new AuthorizationError(ErrorCode.INSUFFICIENT_PERMISSIONS, "You don't have permission to remove this stream");
    }

    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
    });

    if (room?.currentStreamId === roomStream.id) {
      await prismaClient.room.update({
        where: { id: roomId },
        data: { currentStreamId: null },
      });
    }

    await prismaClient.roomStream.delete({
      where: {
        roomId_streamId: {
          roomId,
          streamId,
        },
      },
    });

    return successResponse({ message: "Stream removed from room" });
  } catch (error) {
    return handleApiError(error, "DELETE /api/rooms/[id]/streams/[streamId]");
  }
}
