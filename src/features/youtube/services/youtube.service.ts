import youtubesearchapi from "youtube-search-api";
import { SearchQuerySchema, type SearchQueryInput } from "@/src/validation/youtube";
import type { YouTubeSearchResponse, YouTubeVideo } from "@/src/types/youtube";
import {
  ValidationError,
} from "@/src/lib/api/errors/customErrors";
import {
  ErrorCode,
} from "@/src/lib/api/errorConstants";

export class YouTubeService {
  /**
   * Search for YouTube videos
   */
  static async searchVideos(query: string): Promise<YouTubeSearchResponse> {
    // Validate query
    const validatedQuery = SearchQuerySchema.parse({ q: query });

    if (!validatedQuery.q || validatedQuery.q.trim() === "") {
      throw new ValidationError("Search query is required");
    }

    // Search YouTube videos
    const results = await youtubesearchapi.GetListByKeyword(validatedQuery.q, false, 10);

    // Transform results to match our needs
    const videos: YouTubeVideo[] = results.items?.map((item: {
      id: string;
      title: string;
      thumbnail?: {
        thumbnails?: Array<{ url: string }>;
      };
      channelTitle?: string;
      length?: {
        simpleText?: string;
      };
    }) => ({
      id: item.id,
      title: item.title,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      extractedId: item.id,
      thumbnail: item.thumbnail?.thumbnails?.[item.thumbnail.thumbnails.length - 1]?.url || "",
      channelTitle: item.channelTitle || "",
      duration: item.length?.simpleText || "",
    })) || [];

    return { videos };
  }

  /**
   * Get related videos/suggestions for a video
   */
  static async getRelatedVideos(videoId: string): Promise<YouTubeSearchResponse> {
    if (!videoId) {
      throw new ValidationError("Video ID is required");
    }

    // Get video details which includes suggestions
    const result = await youtubesearchapi.GetVideoDetails(videoId);

    // Transform suggestions to match our YouTubeVideo type
    const videos: YouTubeVideo[] = result.suggestion?.map((item: any) => ({
      id: item.id,
      title: item.title,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      extractedId: item.id,
      thumbnail: item.thumbnail?.thumbnails?.[0]?.url || "",
      channelTitle: item.channelTitle || "",
      duration: item.length?.simpleText || "",
    })) || [];

    return { videos };
  }
}


