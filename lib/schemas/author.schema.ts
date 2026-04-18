import { z } from "zod";

export const AuthorSchema = z.object({
  name: z.string(),
  avatar: z.string(),
});

export type Author = z.infer<typeof AuthorSchema>;