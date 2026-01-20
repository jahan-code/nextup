import { NextRequest } from "next/server";
import { YouTubeService } from "@/src/features/youtube";
import { getQueryParam } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { ValidationError } from "@/src/lib/api/errors/customErrors";

export async function GET(req: NextRequest) {
  try {
    const videoId = getQueryParam(req, "videoId");

    if (!videoId) {
      throw new ValidationError("Video ID is required");
    }

    const result = await YouTubeService.getRelatedVideos(videoId);
    return successResponse(result);
  } catch (error) {
    return handleApiError(error, "GET /api/youtube/related");
  }
}
