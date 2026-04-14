import { z } from "zod";
import { ContentBlockSchema } from "./content-block.schema";
import { AuthorSchema } from "./author.schema";

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.array(ContentBlockSchema),
  category: z.string(),
  author: AuthorSchema,
  image: z.url(),
  publishedAt: z.string(), // optionally: z.coerce.date()
  featured: z.boolean(),
  tags: z.array(z.string()),
});

const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

const MetaSchema = z.object({
  pagination: PaginationSchema,
});

export const ArticleListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ArticleSchema),
  meta: MetaSchema,
});

export const ArticleResponseSchema = z.object({
  success: z.boolean(),
  data: ArticleSchema,
});

export type FeaturedArticle = z.infer<typeof ArticleListResponseSchema>["data"][0];