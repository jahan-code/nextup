import { NextRequest } from "next/server";
import { StreamsService } from "@/src/features/streams";
import { CreateStreamSchema } from "@/src/validation/streams";
import { validateRequest, getQueryParam } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { rateLimit, RateLimitConfig } from "@/src/lib/api/rateLimit";

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit(req, RateLimitConfig.STREAM_CREATE);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await validateRequest(req, CreateStreamSchema);
    const stream = await StreamsService.createStream(body);
    return successResponse(stream, 201);
  } catch (error) {
    return handleApiError(error, "POST /api/streams");
  }
}

export async function GET(req: NextRequest) {
  try {
    const sortParam = getQueryParam(req, "sort") ?? "mostUpvoted";
    const sort = sortParam === "newest" ? "newest" : "mostUpvoted";
    const result = await StreamsService.getStreams(sort);
    return successResponse(result);
  } catch (error) {
    return handleApiError(error, "GET /api/streams");
  }
}
