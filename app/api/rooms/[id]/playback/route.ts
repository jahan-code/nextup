import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser, requireRoomCreator } from "@/src/lib/api/auth";
import { validateParams, validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { PlaybackUpdateSchema } from "@/src/validation/rooms";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId } = await validateParams(params, ["id"]);
    await requireRoomCreator(user.id, roomId);

    const { playbackTime, isPlaying } = await validateRequest(req, PlaybackUpdateSchema);

    const updatedRoom = await prismaClient.room.update({
      where: { id: roomId },
      data: {
        playbackTime,
        isPlaying,
        lastSyncTime: new Date(),
      },
    });

    return successResponse({
      playbackTime: updatedRoom.playbackTime,
      isPlaying: updatedRoom.isPlaying,
      lastSyncTime: updatedRoom.lastSyncTime,
      serverTime: Date.now(),
    });
  } catch (error) {
    return handleApiError(error, "PUT /api/rooms/[id]/playback");
  }
}

