import { cacheLife, cacheTag } from "next/cache";
import { apiFetch } from "../api/client";
import {
  ArticleResponseSchema,
  ArticleListResponseSchema,
  TrendingArticlesResponseSchema,
} from "../schemas/article.schema";
import { BASE_URL, DEFAULT_RETRIES } from "../consts";

export async function getFeaturedStory() {
  "use cache";
  cacheLife("hours");
  cacheTag("articles", "featured-story");

  return apiFetch(
    `${BASE_URL}/articles?featured=true&category=customers&limit=1`,
    {
      schema: ArticleListResponseSchema,
      retries: DEFAULT_RETRIES,
    },
  );
}

export async function getFeaturedArticles() {
  "use cache";
  cacheLife("hours");
  cacheTag("articles", "featured-articles");

  return apiFetch(`${BASE_URL}/articles?featured=true&limit=6`, {
    schema: ArticleListResponseSchema,
    next: {
      tags: ["featured-articles"],
    },
    retries: DEFAULT_RETRIES,
  });
}

export async function getArticleBySlug(slug: string) {
  "use cache";
  cacheLife("days");
  cacheTag("articles", `article-${slug}`);

  try {
    const response = await apiFetch(`${BASE_URL}/articles/${slug}`, {
      schema: ArticleResponseSchema,
      retries: DEFAULT_RETRIES,
    });
    return { response, error: null };
  } catch (err) {
    console.error(`Error fetching article by slug: ${slug}`, err);
    return { response: null, error: err };
  }
}

export async function getAllArticles() {
  "use cache";
  cacheLife("days");
  cacheTag("articles");

  try {
    const response = await apiFetch(`${BASE_URL}/articles`, {
      schema: ArticleListResponseSchema,
      retries: DEFAULT_RETRIES,
    });
    return {response, error: null};
  }
  catch (err) {
    console.error("Error fetching all articles", err);
    return { response: null, error: err };
  }
}

export async function getTrendingArticles() {
  "use cache";
  cacheLife("hours");
  cacheTag("articles", "trending-articles");
  
  try {
    const response = await apiFetch(`${BASE_URL}/articles/trending`, {
      schema: TrendingArticlesResponseSchema,
      retries: DEFAULT_RETRIES,
    });
    return { response, error: null };
  } catch (err) {
    console.error("Error fetching trending articles", err);
    return { response: null, error: err };
  }
}
