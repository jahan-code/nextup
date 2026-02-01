import type { Room, RoomMember, User } from "@/app/generated/prisma-v3";

export interface RoomWithDetails extends Room {
  creator: {
    id: string;
    email: string;
    image: string | null;
  };
  members: Array<RoomMember & {
    user: {
      id: string;
      email: string;
      image: string | null;
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

