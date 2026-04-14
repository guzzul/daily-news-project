import { cacheLife } from "next/cache";
import { apiFetch } from "../api/client";
import { BreakingNewsResponseSchema } from "../schemas/breaking-news.schema";
import { BASE_URL } from "../consts";

export async function getBreakingNews() {
  'use cache';
  cacheLife('minutes');
  
  return apiFetch(`${BASE_URL}/breaking-news`, {
    schema: BreakingNewsResponseSchema,
    next: {
      tags: ["breaking-news"],
    },
    retries: 2,
  });
}
