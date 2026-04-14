import { cacheLife } from "next/cache";
import { apiFetch } from "../api/client";
import { ArticleResponseSchema, ArticleListResponseSchema } from "../schemas/article.schema";
import { BASE_URL, DEFAULT_RETRIES } from "../consts";

export async function getFeaturedArticle() {
  'use cache';
  cacheLife('minutes');
  
  return apiFetch(`${BASE_URL}/articles?featured=true&category=customers&limit=1`, {
    schema: ArticleListResponseSchema,
    next: {
      tags: ["featured-article"],
    },
    retries: DEFAULT_RETRIES,
  });
}

export async function getArticles() {
  return apiFetch(`${BASE_URL}/articles`, {
    schema: ArticleResponseSchema,
    next: {
      tags: ["articles"],
    },

    retries: DEFAULT_RETRIES,
  });
}
