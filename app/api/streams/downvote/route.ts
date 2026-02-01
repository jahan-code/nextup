import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth/auth-shield";
import { validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { rateLimit, RateLimitConfig } from "@/src/lib/api/rateLimit";
import { DownvoteSchema } from "@/src/validation/streams";

export async function POST(req: NextRequest) {
  const rateLimitResponse = rateLimit(req, RateLimitConfig.UPVOTE);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const user = await getAuthenticatedUser();
    const data = await validateRequest(req, DownvoteSchema);

    await prismaClient.upvote.delete({
      where: {
        UserId_StreamId: {
          UserId: user.id,
          StreamId: data.streamId,
        },
      },
    });

    return successResponse({ message: "Upvote removed successfully" });
  } catch (error) {
    return handleApiError(error, "POST /api/streams/downvote");
  }
}
