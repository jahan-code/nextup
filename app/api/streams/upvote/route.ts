import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth/auth-shield";
import { validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { UpvoteSchema } from "@/src/validation/streams";
import { rateLimit, RateLimitConfig } from "@/src/lib/api/rateLimit";

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit(req, RateLimitConfig.UPVOTE);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const user = await getAuthenticatedUser();
    const data = await validateRequest(req, UpvoteSchema);

    const upvote = await prismaClient.upvote.create({
      data: {
        UserId: user.id,
        StreamId: data.streamId,
      },
    });

    return successResponse(upvote, 201);
  } catch (error) {
    return handleApiError(error, "POST /api/streams/upvote");
  }
}

export async function GET() {
  try {
    const user = await getAuthenticatedUser();

    const streams = await prismaClient.stream.findMany({
      where: {
        UserId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        upvotes: true,
      },
    });

    return successResponse({ streams });
  } catch (error) {
    return handleApiError(error, "GET /api/streams/upvote");
  }
}
