// Temporary type definitions until Prisma generation is fixed
export interface Room {
  id: string;
  name: string;
  description?: string | null;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

export interface RoomMember {
  id: string;
  roomId: string;
  userId: string;
  role: RoomMemberRole;
  joinedAt: Date;
}

export interface User {
  id: string;
  email: string;
  image: string | null;
}

export enum RoomMemberRole {
  CREATOR = "CREATOR",
  MEMBER = "MEMBER",
}

export interface RoomWithDetails extends Room {
  creator: {
    id: string;
    email: string;
    image: string | null;
  };
  members: Array<
    RoomMember & {
      user: {
        id: string;
        email: string;
        image: string | null;
      };
    }
  >;
  _count: {
    members: number;
    streams: number;
  };
}

export interface RoomListResponse {
  rooms: RoomWithDetails[];
}
