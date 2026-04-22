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
    return { response, error: null };
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

// This function is used by the SearchFilters component to fetch articles based on search term and category
// It is designed to be flexible and efficient, with caching based on category and search parameters
export async function searchArticles(search?: string, category?: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`article-search-${category || "all"}-${search || "all"}`);

  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (category && category !== "all") params.category = category;
  params.limit = "6";

  const queryString = new URLSearchParams(params).toString();
  const baseUrl = `${BASE_URL}/articles`;
  const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  try {
    const response = await apiFetch(fullUrl, {
      schema: ArticleListResponseSchema,
      retries: DEFAULT_RETRIES,
    });
    return { response, error: null };
  } catch (err) {
    console.error("Error searching articles", err);
    return { response: null, error: err };
  }
}
