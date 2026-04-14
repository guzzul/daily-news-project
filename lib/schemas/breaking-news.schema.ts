import { z } from "zod";

export const BreakingNewsSchema = z.object({
  id: z.string(),
  headline: z.string(),
  summary: z.string(),
  articleId: z.string(),
  category: z.string(),
  publishedAt: z.iso.datetime(), // ISO date-time
  urgent: z.boolean(),
});

export const BreakingNewsResponseSchema = z.object({
  success: z.boolean(),
  data: BreakingNewsSchema,
});

export type BreakingNews = z.infer<typeof BreakingNewsSchema>;
export type BreakingNewsResponse = z.infer<typeof BreakingNewsResponseSchema>;