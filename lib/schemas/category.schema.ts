import { z } from "zod";

export const CategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  articleCount: z.number(),
});

export const CategoryListResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(CategorySchema),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryList = z.infer<typeof CategoryListResponseSchema>["data"];