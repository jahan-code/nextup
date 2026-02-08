import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/src/lib/db-v3";
import { auth } from "@/src/lib/auth";
import type { MessageWithRelations } from "@/src/types/message";

// Validation schema
const CreateMessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message too long"),
  type: z.enum(["text", "emoji"]).default("text"),
});

const GetMessagesSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(50),
  before: z.string().datetime().optional(),
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
    const validated = CreateMessageSchema.parse(body);

    // Create message
    const message = await prismaClient.message.create({
      data: {
        userId: session.id,
        userName: session.name || "Anonymous",
        userImage: session.image,
        content: validated.content,
        type: validated.type,
        roomId: params.id,
      },
    });

    // Broadcast to room via Ably (this would be handled by the Ably integration)
    // For now, just return the message
    return NextResponse.json({
      success: true,
      data: {
        id: message.id,
        userId: message.userId,
        userName: message.userName,
        userImage: message.userImage,
        content: message.content,
        type: message.type,
        roomId: message.roomId,
        createdAt: message.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Validate query parameters
    const { searchParams } = new URL(request.url);
    const validated = GetMessagesSchema.parse({
      limit: searchParams.get("limit"),
      before: searchParams.get("before"),
    });

    // Fetch messages
    const messages = await prismaClient.message.findMany({
      where: {
        roomId: params.id,
        ...(validated.before && {
          createdAt: { lt: new Date(validated.before) },
        }),
      },
      orderBy: { createdAt: "desc" },
      take: validated.limit,
      include: {
        user: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: messages.map((message: MessageWithRelations) => ({
        id: message.id,
        userId: message.userId,
        userName: message.userName,
        userImage: message.userImage,
        content: message.content,
        type: message.type,
        roomId: message.roomId,
        createdAt: message.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
