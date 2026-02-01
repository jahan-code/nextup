import { handleApiError, successResponse } from "@/src/lib/api/errors";

/**
 * Server time endpoint for clock synchronization
 * Returns current server timestamp in milliseconds since epoch
 * This is the authoritative server time that clients should sync to
 */
export async function GET() {
  try {
    const serverTime = Date.now();
    return successResponse({
      serverTime,
      timestamp: serverTime,
    });
  } catch (error) {
    return handleApiError(error, "GET /api/time");
  }
}





