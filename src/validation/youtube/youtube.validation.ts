import { z } from "zod";

export const SearchQuerySchema = z.object({
  q: z.string().min(1, "Search query is required"),
});

export type SearchQueryInput = z.infer<typeof SearchQuerySchema>;

