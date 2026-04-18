import { cacheLife } from "next/cache";
import { apiFetch } from "../api/client";
import { ArticleResponseSchema, ArticleListResponseSchema } from "../schemas/article.schema";
import { BASE_URL, DEFAULT_RETRIES } from "../consts";

export async function getFeaturedStory() {
  'use cache';
  cacheLife('hours'); 
  
  return apiFetch(`${BASE_URL}/articles?featured=true&category=customers&limit=1`, {
    schema: ArticleListResponseSchema,
    next: {
      tags: ["featured-article"],
    },
    retries: DEFAULT_RETRIES,
  });
}

export async function getFeaturedArticles() {
  'use cache';
  cacheLife('hours'); 

  return apiFetch(`${BASE_URL}/articles?featured=true&limit=6`, {
    schema: ArticleListResponseSchema,
    next: {
      tags: ["featured-articles"],
    },
    retries: DEFAULT_RETRIES,
  });
}

export async function getArticleBySlug(slug: string) {
  'use cache';
  cacheLife('hours');

  return apiFetch(`${BASE_URL}/articles/${slug}`, {
    schema: ArticleResponseSchema,
    next: {
      tags: [`article-${slug}`],
    },
    retries: DEFAULT_RETRIES,
  });
}
