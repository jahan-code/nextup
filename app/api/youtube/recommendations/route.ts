import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth/auth-shield";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { rateLimit, RateLimitConfig } from "@/src/lib/api/rateLimit";
import youtubesearchapi from "youtube-search-api";

export async function GET(req: NextRequest) {
  const rateLimitResponse = rateLimit(req, RateLimitConfig.YOUTUBE);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const user = await getAuthenticatedUser();

    const userStreams = await prismaClient.stream.findMany({
      where: {
        UserId: user.id,
        active: true,
      },
      take: 10,
    });

    if (userStreams.length === 0) {
      return successResponse({
        message: "No streams found for user",
        recommendations: [],
        basedOn: [],
      });
    }

    const streamTitles = userStreams
      .map((stream: any) => stream.title)
      .filter((title: any) => title && title.trim() !== "")
      .slice(0, 5);

    const searchTerms: string[] = [];
    const basedOnStreams: string[] = [];

    if (streamTitles.length > 0) {
      const commonWords = [
        "the",
        "a",
        "an",
        "and",
        "or",
        "but",
        "in",
        "on",
        "at",
        "to",
        "for",
        "of",
        "with",
        "by",
        "from",
        "video",
        "official",
        "music",
        "song",
      ];
      streamTitles.forEach((title: any) => {
        const words = title
          .toLowerCase()
          .split(/\s+/)
          .filter((word: any) => word.length > 3 && !commonWords.includes(word))
          .slice(0, 4);

        if (words.length > 0) {
          const searchTerm = words.join(" ");
          searchTerms.push(searchTerm);
          basedOnStreams.push(title);
        } else {
          const truncatedTitle =
            title.length > 30 ? title.substring(0, 30) : title;
          searchTerms.push(truncatedTitle);
          basedOnStreams.push(title);
        }
      });
    } else {
      searchTerms.push("popular music", "trending videos", "top videos");
      basedOnStreams.push("popular content");
    }

    const allRecommendations: Array<{
      id: string;
      title: string;
      url: string;
      extractedId: string;
      thumbnail: string;
      channelTitle: string;
      duration: string;
    }> = [];
    const seenVideoIds = new Set<string>();
    const userStreamIds = new Set(userStreams.map((s: any) => s.extractedId));

    for (const searchTerm of searchTerms.slice(0, 3)) {
      try {
        const results = await youtubesearchapi.GetListByKeyword(
          searchTerm,
          false,
          10,
        );

        if (results.items && results.items.length > 0) {
          for (const item of results.items) {
            const videoId = item.id;
            if (!videoId) continue;

            if (!seenVideoIds.has(videoId) && !userStreamIds.has(videoId)) {
              seenVideoIds.add(videoId);
              allRecommendations.push({
                id: videoId,
                title: item.title || "Untitled",
                url: `https://www.youtube.com/watch?v=${videoId}`,
                extractedId: videoId,
                thumbnail:
                  item.thumbnail?.thumbnails?.[
                    item.thumbnail.thumbnails.length - 1
                  ]?.url || "",
                channelTitle: item.channelTitle || "",
                duration: item.length?.simpleText || "",
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error searching for term "${searchTerm}":`, error);
      }
    }

    const recommendations = allRecommendations.slice(0, 10);

    return successResponse({
      recommendations,
      basedOn: basedOnStreams.slice(0, 3),
      totalStreams: userStreams.length,
    });
  } catch (error) {
    return handleApiError(error, "GET /api/youtube/recommendations");
  }
}
