import { NextRequest } from "next/server";
import { AuthService } from "@/src/features/auth";
import { RegisterSchema } from "@/src/validation/auth";
import { validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { rateLimit, RateLimitConfig } from "@/src/lib/api/rateLimit";

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit(req, RateLimitConfig.AUTH);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await validateRequest(req, RegisterSchema);
    const result = await AuthService.register(body);
    return successResponse(result, 201);
  } catch (error) {
    return handleApiError(error, "POST /api/auth/register");
  }
}

