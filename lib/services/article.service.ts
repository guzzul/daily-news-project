import { apiFetch } from "../api/client";
import { ArticleResponseSchema } from "../schemas/article.schema";
import { BASE_URL } from "../consts";

/**
 * Server-side fetch (RSC)
 */
export async function getArticles() {
  return apiFetch(`${BASE_URL}/articles`, {
    schema: ArticleResponseSchema,

    // Next.js caching
    next: {
      revalidate: 60, // ISR
      tags: ["articles"],
    },

    retries: 2,
  });
}

/**
 * No-cache version (dynamic)
 */
export async function getArticlesNoCache() {
  return apiFetch(`${BASE_URL}/articles`, {
    schema: ArticleResponseSchema,
    init: {
      cache: "no-store",
    },
  });
}