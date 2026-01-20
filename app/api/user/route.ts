import { NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { handleApiError, successResponse } from "@/src/lib/api/errors";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    return successResponse(user);
  } catch (error) {
    return handleApiError(error, "GET /api/user");
  }
}

