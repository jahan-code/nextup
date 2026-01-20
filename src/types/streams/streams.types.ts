import type { Stream, Upvote, User } from "@/app/generated/prisma/client";

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

