import { NextRequest } from "next/server";
import { z } from "zod";
import { validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { rateLimit, RateLimitConfig } from "@/src/lib/api/rateLimit";

const LogSyncSchema = z.object({
  userId: z.string().optional(),
  role: z.string().optional(),
  time: z.number().optional(),
  state: z.string().optional(),
  message: z.string().optional(),
  debug: z
    .object({
      isMember: z.boolean().optional(),
      isCreator: z.boolean().optional(),
      hasPlayerRef: z.boolean().optional(),
      hasStream: z.boolean().optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  const rateLimitResponse = rateLimit(req, RateLimitConfig.LOG_SYNC);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await validateRequest(req, LogSyncSchema);

    if (body.message) {
      console.log(`[BROWSER_LOG] User: ${body.userId?.slice(0, 5)}... | ${body.message}`);
    } else {
      const debugStr = body.debug
        ? ` | isMember: ${body.debug.isMember} | isCreator: ${body.debug.isCreator} | hasRef: ${body.debug.hasPlayerRef} | hasStream: ${body.debug.hasStream}`
        : "";
      console.log(
        `[SYNC_METRIC] User: ${body.userId?.slice(0, 5)}... [${body.role}] | Time: ${body.time?.toFixed(2) ?? "?"}s | State: ${body.state ?? "?"}${debugStr}`
      );
    }

    return successResponse({ success: true });
  } catch (error) {
    return handleApiError(error, "POST /api/log-sync");
  }
}
