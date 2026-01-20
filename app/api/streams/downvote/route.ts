import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { DownvoteSchema } from "@/src/validation/streams";

export async function POST(req: NextRequest) {
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
