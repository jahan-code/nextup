import { z } from "zod";

export const CreateStreamSchema = z.object({
  creatorId: z.string(),
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

