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

    try {
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
    } catch (error) {
      console.error(`[YouTubeService] Search failed for "${validatedQuery.q}":`, error);
      throw error;
    }
  }

  /**
   * Get related videos/suggestions for a video
   */
  static async getRelatedVideos(videoId: string): Promise<YouTubeSearchResponse> {
    if (!videoId) {
      throw new ValidationError("Video ID is required");
    }

    try {
      // Add timeout to prevent hanging (10 seconds max - increased from 5)
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      );

      const detailsPromise = youtubesearchapi.GetVideoDetails(videoId);

      // Race between API call and timeout
      const result = await Promise.race([detailsPromise, timeoutPromise]);

      // Transform suggestions to match our YouTubeVideo type
      let videos: YouTubeVideo[] = result.suggestion?.map((item: any) => ({
        id: item.id,
        title: item.title,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        extractedId: item.id,
        thumbnail: item.thumbnail?.thumbnails?.[0]?.url || "",
        channelTitle: item.channelTitle || "",
        duration: item.length?.simpleText || "",
      })) || [];

      // Limit to 10 suggestions (increased from 6 for better variety)
      videos = videos.slice(0, 10);

      // Fallback: If no suggestions found, search using the video title
      if (videos.length === 0 && result.title) {
        console.log(`[YouTubeService] No suggestions found for ${videoId}. Falling back to search for "${result.title}"`);
        try {
          const searchResult = await YouTubeService.searchVideos(result.title);
          videos = searchResult.videos.filter(v => v.id !== videoId).slice(0, 10);
        } catch (err) {
          console.warn(`[YouTubeService] Fallback search failed for "${result.title}"`, err);
        }
      }

      return { videos };
    } catch (error) {
      // On timeout or error, try a quick fallback search
      console.warn(`[YouTubeService] Primary fetch failed for ${videoId}, attempting fallback:`, error);

      try {
        // Try to at least get some generic music recommendations
        const fallbackSearch = await YouTubeService.searchVideos(`music ${videoId}`);
        return { videos: fallbackSearch.videos.slice(0, 10) };
      } catch (fallbackError) {
        console.error(`[YouTubeService] All attempts failed for ${videoId}:`, fallbackError);
        return { videos: [] };
      }
    }
  }
}
