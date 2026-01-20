import type { Room, RoomMember, User } from "@/app/generated/prisma/client";

export interface RoomWithDetails extends Room {
  creator: {
    id: string;
    email: string;
  };
  members: Array<RoomMember & {
    user: {
      id: string;
      email: string;
    };
  }>;
  _count: {
    members: number;
    streams: number;
  };
}

export interface RoomListResponse {
  rooms: RoomWithDetails[];
}

