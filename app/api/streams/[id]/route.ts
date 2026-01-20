import { NextRequest } from "next/server";
import { prismaClient } from "@/src/lib";
import { getAuthenticatedUser } from "@/src/lib/api/auth";
import { validateParams, validateRequest } from "@/src/lib/api/validation";
import { handleApiError, successResponse } from "@/src/lib/api/errors";
import { AuthorizationError, NotFoundError } from "@/src/lib/api/errors/customErrors";
import { ErrorCode } from "@/src/lib/api/errorConstants";
import { z } from "zod";

const UpdateStreamSchema = z.object({
  title: z.string().max(200).optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: streamId } = await validateParams(params, ["id"]);
    const body = await validateRequest(req, UpdateStreamSchema);

    // Check if stream exists and get creator info
    const stream = await prismaClient.stream.findUnique({
      where: { id: streamId },
      select: {
        id: true,
        UserId: true,
      },
    });

    if (!stream) {
      throw new NotFoundError(ErrorCode.STREAM_NOT_FOUND);
    }

    // Verify creator ownership
    if (stream.UserId !== user.id) {
      throw new AuthorizationError(ErrorCode.INSUFFICIENT_PERMISSIONS, "Only the creator can edit this stream");
    }

    // Update stream
    const updatedStream = await prismaClient.stream.update({
      where: { id: streamId },
      data: {
        ...(body.title !== undefined && { title: body.title }),
      },
    });

    return successResponse(updatedStream);
  } catch (error) {
    return handleApiError(error, "PUT /api/streams/[id]");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const user = await getAuthenticatedUser();
    const { id: streamId } = await validateParams(params, ["id"]);

    // Check if stream exists and get creator info
    const stream = await prismaClient.stream.findUnique({
      where: { id: streamId },
      select: {
        id: true,
        UserId: true,
      },
    });

    if (!stream) {
      throw new NotFoundError(ErrorCode.STREAM_NOT_FOUND);
    }

    // Verify creator ownership
    if (stream.UserId !== user.id) {
      throw new AuthorizationError(ErrorCode.INSUFFICIENT_PERMISSIONS, "Only the creator can delete this stream");
    }

    // Check if stream is used in any rooms
    const roomStreams = await prismaClient.roomStream.findMany({
      where: { streamId },
      include: {
        room: {
          select: {
            id: true,
            currentStreamId: true,
          },
        },
      },
    });

    // Update rooms that have this stream as current stream
    const roomsToUpdate = roomStreams.filter(
      (rs) => rs.room.currentStreamId === rs.id
    );

    if (roomsToUpdate.length > 0) {
      await prismaClient.room.updateMany({
        where: {
          id: {
            in: roomsToUpdate.map((rs) => rs.room.id),
          },
        },
        data: {
          currentStreamId: null,
        },
      });
    }

    // Delete all room streams (cascade will handle related upvotes)
    await prismaClient.roomStream.deleteMany({
      where: { streamId },
    });

    // Delete all upvotes for this stream
    await prismaClient.upvote.deleteMany({
      where: { StreamId: streamId },
    });

    // Delete the stream
    await prismaClient.stream.delete({
      where: { id: streamId },
    });

    return successResponse({ message: "Stream deleted successfully" });
  } catch (error) {
    return handleApiError(error, "DELETE /api/streams/[id]");
  }
}
