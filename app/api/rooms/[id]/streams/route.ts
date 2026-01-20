import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser, requireRoomMembership } from "@/src/lib/api/auth";
import { validateParams, validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { BusinessLogicError, NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";
import { AddStreamSchema } from "@/src/validation/rooms";
import getYouTubeId from "get-youtube-id";
import { StreamType } from "@/app/generated/prisma/enums";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: roomId } = await validateParams(params, ["id"]);
    await requireRoomMembership(user.id, roomId);

    const data = await validateRequest(req, AddStreamSchema);

    let stream;
    let extractedId: string | null = null;

    if (data.streamId) {
      stream = await prismaClient.stream.findUnique({
        where: { id: data.streamId },
      });

      if (!stream) {
        throw new NotFoundError(ErrorCode.STREAM_NOT_FOUND);
      }
      extractedId = stream.extractedId;
    } else if (data.url) {
      extractedId = getYouTubeId(data.url);
      
      if (!extractedId) {
        throw new BusinessLogicError(ErrorCode.YOUTUBE_ID_EXTRACTION_FAILED);
      }

      stream = await prismaClient.stream.findFirst({
        where: {
          extractedId,
          type: StreamType.Youtube,
        },
      });

      if (!stream) {
        stream = await prismaClient.stream.create({
          data: {
            UserId: user.id,
            url: data.url,
            extractedId,
            type: StreamType.Youtube,
          },
        });
      }
    }

    if (!stream || !extractedId) {
      throw new BusinessLogicError(ErrorCode.INVALID_OPERATION, "Failed to process stream");
    }

    const existingRoomStream = await prismaClient.roomStream.findUnique({
      where: {
        roomId_streamId: {
          roomId,
          streamId: stream.id,
        },
      },
    });

    if (existingRoomStream) {
      throw new BusinessLogicError(ErrorCode.ALREADY_EXISTS, "Stream already in room");
    }

    const maxOrder = await prismaClient.roomStream.findFirst({
      where: { roomId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const roomStream = await prismaClient.roomStream.create({
      data: {
        roomId,
        streamId: stream.id,
        addedById: user.id,
        order: (maxOrder?.order || 0) + 1,
      },
      include: {
        stream: {
          select: {
            id: true,
            title: true,
            url: true,
            extractedId: true,
            bigImg: true,
            smallImg: true,
            type: true,
          },
        },
        addedBy: {
          select: {
            id: true,
            email: true,
          },
        },
        _count: {
          select: {
            upvotes: true,
          },
        },
      },
    });

    return successResponse(
      {
        ...roomStream,
        upvoteCount: roomStream._count.upvotes,
      },
      201
    );
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/streams");
  }
}
