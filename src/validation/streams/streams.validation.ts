import { z } from "zod";

/** Schema for service layer (includes creatorId set server-side) */
export const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

/** Schema for API: client sends only url; creatorId is set from session */
export const CreateStreamApiSchema = z.object({
  url: z.string(),
});

export type CreateStreamInput = z.infer<typeof CreateStreamSchema>;

export const UpvoteSchema = z.object({
  streamId: z.string(),
});

export type UpvoteInput = z.infer<typeof UpvoteSchema>;

export const DownvoteSchema = z.object({
  streamId: z.string(),
});

export type DownvoteInput = z.infer<typeof DownvoteSchema>;

