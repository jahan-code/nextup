import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prismaClient } from "@/src/lib";
import { AuthenticationError, NotFoundError, AuthorizationError } from "../errors/customErrors";
import { ErrorCode } from "../errorConstants";

interface AuthenticatedUser {
  id: string;
  email: string;
}

/**
 * Retrieves the authenticated user based on the session.
 * Throws AuthenticationError if no session or user email is found.
 * Throws NotFoundError if the user is not found in the database.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new AuthenticationError(ErrorCode.UNAUTHORIZED);
  }

  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true },
  });

  if (!user) {
    throw new NotFoundError(ErrorCode.USER_NOT_FOUND);
  }

  return user;
}

/**
 * Ensures the user is authenticated.
 * Returns the authenticated user or throws AuthenticationError.
 */
export async function requireAuth(): Promise<AuthenticatedUser> {
  return getAuthenticatedUser();
}

/**
 * Ensures the authenticated user is a member of the specified room.
 * Throws AuthorizationError if not a member.
 * Returns the room member object.
 */
export async function requireRoomMembership(
  userId: string,
  roomId: string
): Promise<{ userId: string; roomId: string; role: string }> {
  const roomMember = await prismaClient.roomMember.findUnique({
    where: {
      roomId_userId: {
        roomId,
        userId,
      },
    },
  });

  if (!roomMember) {
    throw new AuthorizationError(ErrorCode.NOT_ROOM_MEMBER);
  }

  return roomMember;
}

/**
 * Ensures the authenticated user is the creator of the specified room.
 * Throws AuthorizationError if not the creator.
 * Returns the room object.
 */
export async function requireRoomCreator(
  userId: string,
  roomId: string
): Promise<{ id: string; creatorId: string }> {
  const room = await prismaClient.room.findUnique({
    where: { id: roomId },
    select: { id: true, creatorId: true },
  });

  if (!room) {
    throw new NotFoundError(ErrorCode.ROOM_NOT_FOUND);
  }

  if (room.creatorId !== userId) {
    throw new AuthorizationError(ErrorCode.NOT_ROOM_CREATOR);
  }

  return room;
}

