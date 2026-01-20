import { z } from "zod";

export const CreateRoomSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().default(true),
});

export type CreateRoomInput = z.infer<typeof CreateRoomSchema>;

export const AddStreamSchema = z.object({
  streamId: z.string().optional(),
  url: z.string().url().optional(),
}).refine((data) => data.streamId || data.url, {
  message: "Either streamId or url must be provided",
});

export type AddStreamInput = z.infer<typeof AddStreamSchema>;

export const PlaybackUpdateSchema = z.object({
  playbackTime: z.number(),
  isPlaying: z.boolean(),
});

export type PlaybackUpdateInput = z.infer<typeof PlaybackUpdateSchema>;

