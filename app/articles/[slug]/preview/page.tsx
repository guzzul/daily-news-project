import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cacheTag, cacheLife } from "next/cache";

import { ArticleHeader } from "@/components/article-header";
import { ArticleContent } from "@/components/article-content";
import { SubscriptionCard } from "@/components/subscribe-card";
import { getArticleBySlug } from "@/lib/services/article.service";
import { Article } from "@/lib/schemas/article.schema";
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
        canonical: `${NEWS_SITE_BASE_URL}/articles/${slug}/preview`,
      },

      // Open Graph (Facebook, LinkedIn, etc.)
      openGraph: {
        title,
        description,
        type: "article",
        url: `${NEWS_SITE_BASE_URL}/articles/${slug}/preview`,
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
 * Page Shell
 */
export default async function ArticlePreviewPage({ params }: ArticlePageProps) {
  return <ArticlePreviewWrapper params={params} />;
}

async function ArticlePreviewWrapper({ params }: ArticlePageProps) {
  "use cache";
  const { slug } = await params;

  cacheLife("days");
  cacheTag("articles", `article-${slug}-preview`);

  const { response, error } = await getArticleBySlug(slug);

  // If there's an error fetching the article or the article doesn't exist, show a 404 page.
  if (error || !response?.data) {
    notFound();
  }

  const article = response?.data;

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
        isPreview={true}
      />

      {/* Subscription Card */}
      <div className="pt-16">
        <SubscriptionCard slug={slug} isSubscribed={false} />
      </div>
    </article>
  );
}
