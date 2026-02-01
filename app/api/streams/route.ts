import { NextRequest } from "next/server";
import { StreamsService } from "@/src/features/streams";
import { CreateStreamApiSchema } from "@/src/validation/streams";
import { getAuthenticatedUser } from "@/src/lib/api/auth/auth-shield";
import { validateRequest, getQueryParam } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { rateLimit, RateLimitConfig } from "@/src/lib/api/rateLimit";

export async function POST(req: NextRequest) {
  const rateLimitResponse = rateLimit(req, RateLimitConfig.STREAM_CREATE);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const user = await getAuthenticatedUser();
    const body = await validateRequest(req, CreateStreamApiSchema);
    const stream = await StreamsService.createStream({
      url: body.url,
      creatorId: user.id,
    });
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
