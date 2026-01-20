import { NextResponse } from "next/server";

/**
 * Server time endpoint for clock synchronization
 * Returns current server timestamp in milliseconds since epoch
 * This is the authoritative server time that clients should sync to
 */
export async function GET() {
  try {
    const serverTime = Date.now();
    
    return NextResponse.json(
      {
        serverTime,
        timestamp: serverTime,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting server time:', error);
    return NextResponse.json(
      { error: 'Failed to get server time' },
      { status: 500 }
    );
  }
}





