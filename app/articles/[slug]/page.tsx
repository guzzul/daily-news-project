import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cacheTag, cacheLife } from "next/cache";

import { ArticleHeader } from "@/components/article-header";
import { ArticleContent } from "@/components/article-content";
import { ArticleGrid } from "@/components/article-grid";
import { SubscriptionCard } from "@/components/subscribe-card";
import { Article } from "@/lib/schemas/article.schema";
import {
  getAllArticles,
  getArticleBySlug,
  getTrendingArticles,
} from "@/lib/services/article.service";
import { NEWS_SITE_BASE_URL } from "@/lib/consts";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { response } = await getArticleBySlug(slug);

    if (!response?.data) {
      return {
        title: "Article Not Found",
        description: "The requested article does not exist.",
      };
    }

    const article = response.data;
    const title = article.title;
    const description = article.excerpt;

    return {
      title,
      description,

      alternates: {
        canonical: `${NEWS_SITE_BASE_URL}/articles/${slug}`,
      },

      // Open Graph (Facebook, LinkedIn, etc.)
      openGraph: {
        title,
        description,
        type: "article",
        url: `${NEWS_SITE_BASE_URL}/articles/${slug}`,
        publishedTime: article.publishedAt,
        authors: article.author ? [article.author.name] : [],
        images: [
          {
            url: article.image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },

      category: article.category,
      keywords: [...(article.tags || [])].filter(Boolean),
    };
  } catch (e) {
    // Fail-safe so build/runtime doesn't break
    return {
      title: slug.replace(/-/g, " "),
    };
  }
}

/**
 * Static Params {SSG}
 */
export async function generateStaticParams() {
  const { response, error } = await getAllArticles();

  // If the API is down during build, return an empty array.
  // This prevents the build from crashing.
  if (error || !response?.data) {
    console.warn(
      "Could not fetch articles for static params. Falling back to dynamic generation.",
    );
    return [];
  }

  return response.data.map((article: Article) => ({
    slug: article.slug,
  }));
}

/**
 * Page Shell
 */
export default async function ArticlePage({ params }: ArticlePageProps) {
  return (
    <article className="container max-w-6xl mx-auto px-4 pb-24">
      <Suspense fallback={<div>Loading article...</div>}>
        <ArticleWrapper params={params} />
      </Suspense>
    </article>
  );
}

async function ArticleWrapper({ params }: ArticlePageProps) {
  "use cache";
  const { slug } = await params;

  cacheLife("days");
  cacheTag("articles", `article-${slug}`);

  // Fetch article and trending articles in parallel to optimize load time.
  const [
    { response: articleResponse, error: articleError },
    { response: trendingResponse, error: trendingError },
  ] = await Promise.all([getArticleBySlug(slug), getTrendingArticles()]);

  // If there's an error fetching the article or the article doesn't exist, show a 404 page.
  if (articleError || !articleResponse?.data) {
    notFound();
  }

  const article = articleResponse?.data;
  const trendingArticles = trendingResponse?.data?.slice(0, 3) || [];

  return (
    <article className="container max-w-6xl mx-auto px-4 pb-24">
      <ArticleHeader
        title={article.title}
        category={article.category}
        author={article.author}
        date={article.publishedAt}
      />

      <div className="relative aspect-video w-full my-8 bg-muted border overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover rounded-none"
        />
      </div>

      {/* Article Content */}
      <ArticleContent
        content={article.content}
        excerpt={article.excerpt}
        isPreview={false}
      />

      {/* Trending Articles */}
      {trendingArticles.length > 0 && (
        <ArticleGrid label="Trending Now" articles={trendingArticles} />
      )}

        {/* Subscription Card */}
      <SubscriptionCard slug={slug} isSubscribed={true} />

    </article>
  );
}
