import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import {
  getAuthenticatedUser,
  requireRoomMembership,
} from "@/src/lib/api/auth/auth-shield";
import { validateParams } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params:
      | Promise<{ id: string; streamId: string }>
      | { id: string; streamId: string };
  },
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId, streamId } = await validateParams(params, [
      "id",
      "streamId",
    ]);
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
      throw new NotFoundError(
        ErrorCode.STREAM_NOT_FOUND,
        "Stream not found in room",
      );
    }

    // Get the current stream ID before updating (so we can delete it after)
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
      select: { currentStreamId: true },
    });

    const oldCurrentStreamId = room?.currentStreamId;

    // Transaction to update room AND reset stream votes
    const [updatedRoom] = await prismaClient.$transaction([
      prismaClient.room.update({
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
      }),
      // Reset votes for the played stream (Rave logic: playing consumes votes)
      prismaClient.roomStream.update({
        where: { id: roomStream.id },
        data: {
          upvotes: {
            deleteMany: {}, // Clear all upvotes
          },
        },
      }),
    ]);

    // Delete the old stream from the queue (if it exists and is different from the new one)
    if (oldCurrentStreamId && oldCurrentStreamId !== roomStream.id) {
      console.log(
        `[Auto-Remove] Deleting old stream from queue: ${oldCurrentStreamId}`,
      );
      await prismaClient.roomStream
        .delete({
          where: { id: oldCurrentStreamId },
        })
        .catch((err: any) => {
          console.log(
            `[Auto-Remove] Failed to delete old stream (may already be deleted): ${err.message}`,
          );
        });
      console.log(`[Auto-Remove] Successfully removed old stream from queue`);
    } else {
      console.log(
        `[Auto-Remove] No old stream to delete (oldId: ${oldCurrentStreamId}, newId: ${roomStream.id})`,
      );
    }

    return successResponse(updatedRoom);
  } catch (error) {
    return handleApiError(error, "PUT /api/rooms/[id]/streams/[streamId]/play");
  }
}
