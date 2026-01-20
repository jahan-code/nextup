import { NextRequest } from "next/server";
import { YouTubeService } from "@/src/features/youtube";
import { getQueryParam } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { ValidationError } from "@/src/lib/api/errors/customErrors";

export async function GET(req: NextRequest) {
  try {
    const searchQuery = getQueryParam(req, "q");
    
    if (!searchQuery) {
      throw new ValidationError("Search query is required");
    }

    const result = await YouTubeService.searchVideos(searchQuery);
    return successResponse(result);
  } catch (error) {
    return handleApiError(error, "GET /api/youtube/search");
  }
}

