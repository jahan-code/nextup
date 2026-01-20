import { prismaClient } from "@/src/lib";
import { StreamType } from "@/app/generated/prisma/enums";
import getYouTubeId from "get-youtube-id";
import { CreateStreamSchema, type CreateStreamInput } from "@/src/validation/streams";
import type { StreamWithUpvotes, StreamListResponse } from "@/src/types/streams";
import {
  BusinessLogicError,
  NotFoundError,
} from "@/src/lib/api/errors/customErrors";
import {
  ErrorCode,
} from "@/src/lib/api/errorConstants";

export class StreamsService {
  /**
   * Create a new stream from a YouTube URL
   */
  static async createStream(data: CreateStreamInput) {
    // Validate input
    const validatedData = CreateStreamSchema.parse(data);

    // Extract YouTube video ID
    const extractedId = getYouTubeId(validatedData.url);

    if (!extractedId) {
      throw new BusinessLogicError(ErrorCode.YOUTUBE_ID_EXTRACTION_FAILED);
    }

    // Check if user exists
    const user = await prismaClient.user.findUnique({
      where: { id: validatedData.creatorId },
    });

    if (!user) {
      throw new NotFoundError(ErrorCode.USER_NOT_FOUND);
    }

    // Create stream
    const stream = await prismaClient.stream.create({
      data: {
        UserId: validatedData.creatorId,
        url: validatedData.url,
        extractedId,
        type: StreamType.Youtube,
      },
    });

    return stream;
  }

  /**
   * Get list of active streams with upvote counts
   */
  static async getStreams(sort: "mostUpvoted" | "newest" = "mostUpvoted"): Promise<StreamListResponse> {
    // Fetch all active streams with upvotes and user info
    const streams = await prismaClient.stream.findMany({
      where: {
        active: true,
      },
      include: {
        upvotes: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    // Transform streams to include upvote count
    const streamsWithCounts: StreamWithUpvotes[] = streams.map((stream) => ({
      ...stream,
      upvoteCount: stream.upvotes.length,
    }));

    // Sort streams
    if (sort === "mostUpvoted") {
      streamsWithCounts.sort((a, b) => b.upvoteCount - a.upvoteCount);
    } else if (sort === "newest") {
      // Since we don't have createdAt, we'll sort by ID (UUIDs are time-based)
      streamsWithCounts.reverse();
    }

    return { streams: streamsWithCounts };
  }
}

