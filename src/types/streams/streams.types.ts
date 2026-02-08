// Temporary enum definitions until Prisma generation is fixed
export enum StreamType {
  Spotify = "Spotify",
  Youtube = "Youtube",
}

// Temporary type definitions until Prisma generation is fixed
export interface Stream {
  id: string;
  type: StreamType;
  active: boolean;
  title: string;
  artist?: string | null;
  thumbnail?: string | null;
  extractedId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Upvote {
  id: string;
  userId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  image: string | null;
}

export interface StreamWithUpvotes extends Stream {
  upvotes: Upvote[];
  user: {
    id: string;
    email: string;
  };
  upvoteCount: number;
}

export interface StreamListResponse {
  streams: StreamWithUpvotes[];
}
