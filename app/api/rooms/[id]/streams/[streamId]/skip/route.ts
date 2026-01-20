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

    // 1. Get room and verify stream
    const room = await prismaClient.room.findUnique({
      where: { id: roomId },
      include: {
        currentStream: true,
        _count: {
          select: { members: true }
        }
      }
    });

    if (!room) throw new NotFoundError(ErrorCode.ROOM_NOT_FOUND);

    const roomStream = await prismaClient.roomStream.findUnique({
      where: {
        roomId_streamId: {
          roomId,
          streamId,
        }
      }
    });

    if (!roomStream) throw new NotFoundError(ErrorCode.STREAM_NOT_FOUND);

    // 2. Toggle skip vote
    const existingVote = await prismaClient.skipVote.findUnique({
      where: {
        roomStreamId_userId: {
          roomStreamId: roomStream.id,
          userId: user.id
        }
      }
    });

    if (existingVote) {
      await prismaClient.skipVote.delete({
        where: { id: existingVote.id }
      });
    } else {
      await prismaClient.skipVote.create({
        data: {
          roomStreamId: roomStream.id,
          userId: user.id
        }
      });
    }

    // 3. Get updated vote count
    const votes = await prismaClient.skipVote.findMany({
      where: { roomStreamId: roomStream.id },
      select: { userId: true }
    });

    const voteCount = votes.length;
    const memberCount = room._count.members;
    // Threshold is more than half (e.g. 5 members -> 3 votes, 2 members -> 2 votes)
    const threshold = Math.floor(memberCount / 2) + 1;
    const shouldSkip = voteCount >= threshold;

    let nextStreamId = null;
    if (shouldSkip) {
      // Find the next most upvoted stream
      const allStreams = await prismaClient.roomStream.findMany({
        where: { roomId },
        include: {
          _count: {
            select: { upvotes: true }
          }
        },
        orderBy: [
          { order: 'asc' },
          { addedAt: 'asc' }
        ]
      });

      // Simple recommendation engine: sort by upvotes, pick the one that isn't current
      const sorted = [...allStreams].sort((a, b) => b._count.upvotes - a._count.upvotes);
      const nextRoomStream = sorted.find(s => s.streamId !== streamId) || null;

      if (nextRoomStream) {
        await prismaClient.room.update({
          where: { id: roomId },
          data: {
            currentStreamId: nextRoomStream.id,
            playbackTime: 0,
            isPlaying: true
          }
        });
        nextStreamId = nextRoomStream.streamId;

        // Cleanup skip votes for the new current stream just in case
        await prismaClient.skipVote.deleteMany({
          where: { roomStreamId: nextRoomStream.id }
        });
      } else {
        // No other streams, clear current
        await prismaClient.room.update({
          where: { id: roomId },
          data: {
            currentStreamId: null,
            playbackTime: 0,
            isPlaying: false
          }
        });
      }

      // Also cleanup skip votes for the skipped stream
      await prismaClient.skipVote.deleteMany({
        where: { roomStreamId: roomStream.id }
      });
    }

    return successResponse({
      votes: votes.map(v => v.userId),
      threshold,
      shouldSkip,
      nextStreamId
    });
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/streams/[streamId]/skip");
  }
}
