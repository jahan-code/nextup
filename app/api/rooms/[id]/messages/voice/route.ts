import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/src/lib/db-v3";
import { auth } from "@/src/lib/auth";

// Validation schema
const VoiceEventSchema = z.object({
  type: z.enum(["voice_start", "voice_end", "voice_data"]),
  audioData: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate request body
    const body = await request.json();
    const validated = VoiceEventSchema.parse(body);

    // Create voice event
    const voiceEvent = await prismaClient.voiceEvent.create({
      data: {
        userId: session.id,
        type: validated.type,
        roomId: params.id,
        audioData: validated.audioData,
      },
    });

    // Broadcast to room via Ably
    // This would be handled by WebRTC signaling
    return NextResponse.json({
      success: true,
      data: {
        id: voiceEvent.id,
        userId: voiceEvent.userId,
        type: voiceEvent.type,
        timestamp: voiceEvent.createdAt,
        roomId: voiceEvent.roomId,
        audioData: voiceEvent.audioData,
      },
    });
  } catch (error) {
    console.error("Error creating voice event:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to process voice event" },
      { status: 500 },
    );
  }
}
