import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import {
  getAuthenticatedUser,
  requireRoomMembership,
} from "@/src/lib/api/auth/auth-shield";
import { validateParams, validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import {
  BusinessLogicError,
  NotFoundError,
} from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";
import { AddStreamSchema } from "@/src/validation/rooms";
import getYouTubeId from "get-youtube-id";
import { StreamType } from "@/src/types/streams";
import { YouTubeService } from "@/src/features/youtube";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } },
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
        // Fetch metadata before creating
        let metadata = { title: "", smallImg: "", bigImg: "" };
        try {
          console.log(`[API] Fetching metadata for new stream: ${extractedId}`);
          const details = await YouTubeService.getVideoDetails(extractedId);
          metadata = {
            title: details.title,
            smallImg: details.thumbnail,
            bigImg: details.thumbnail,
          };
        } catch (err) {
          console.warn(
            `[API] Failed to fetch metadata for ${extractedId}:`,
            err,
          );
        }

        stream = await prismaClient.stream.create({
          data: {
            UserId: user.id,
            url: data.url,
            extractedId,
            type: StreamType.Youtube,
            title: metadata.title,
            smallImg: metadata.smallImg,
            bigImg: metadata.bigImg,
          },
        });
      } else if (!stream.title || !stream.smallImg) {
        // Update missing metadata for existing stream
        try {
          console.log(
            `[API] Updating missing metadata for existing stream: ${extractedId}`,
          );
          const details = await YouTubeService.getVideoDetails(extractedId);
          stream = await prismaClient.stream.update({
            where: { id: stream.id },
            data: {
              title: stream.title || details.title,
              smallImg: stream.smallImg || details.thumbnail,
              bigImg: stream.bigImg || details.thumbnail,
            },
          });
        } catch (err) {
          console.warn(
            `[API] Failed to update metadata for existing stream ${extractedId}:`,
            err,
          );
        }
      }
    }

    if (!stream || !extractedId) {
      throw new BusinessLogicError(
        ErrorCode.INVALID_OPERATION,
        "Failed to process stream",
      );
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
      throw new BusinessLogicError(
        ErrorCode.ALREADY_EXISTS,
        "Stream already in room",
      );
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
        upvotes: {
          create: {
            userId: user.id,
          },
        },
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
        upvotes: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                image: true,
              },
            },
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
      201,
    );
  } catch (error) {
    return handleApiError(error, "POST /api/rooms/[id]/streams");
  }
}
