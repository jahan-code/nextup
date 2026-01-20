import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, role, time, state, message } = body;

    if (message) {
      console.log(`[BROWSER_LOG] User: ${userId?.slice(0, 5)}... | ${message}`);
    } else {
      // Print to server terminal with a visible tag
      const debugStr = body.debug ? ` | isMember: ${body.debug.isMember} | isCreator: ${body.debug.isCreator} | hasRef: ${body.debug.hasPlayerRef} | hasStream: ${body.debug.hasStream}` : '';
      console.log(`[SYNC_METRIC] User: ${userId?.slice(0, 5)}... [${role}] | Time: ${time?.toFixed(2)}s | State: ${state}${debugStr}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
