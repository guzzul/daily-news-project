import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cacheTag, cacheLife } from "next/cache";

import { ArticleHeader } from "@/components/article-header";
import { SubscribeBanner } from "@/components/subscribe-banner";
import { ArticleContent } from "@/components/article-content";
import { Article } from "@/lib/schemas/article.schema";
import {
  getAllArticles,
  getArticleBySlug,
} from "@/lib/services/article.service";

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
    const description = article.excerpt 

    return {
      title,
      description,

      alternates: {
        canonical: `/articles/${slug}`,
      },

      // Open Graph (Facebook, LinkedIn, etc.)
      openGraph: {
        title,
        description,
        type: "article",
        url: `/articles/${slug}`,
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

      // Twitter Card
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [article.image],
      },

      // Extra SEO signals
      category: article.category,
      keywords: [
        ...(article.tags || []),
      ].filter(Boolean),
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
    <article className="container max-w-4xl mx-auto px-4 pb-24">
      <Suspense fallback={<div>Loading article...</div>}>
        <ArticleDetails params={params} />
      </Suspense>
    </article>
  );
}

async function ArticleDetails({ params }: ArticlePageProps) {
  "use cache";
  cacheLife("days");
  const { slug } = await params;
  cacheTag("articles", `article-${slug}`);

  const { response, error } = await getArticleBySlug(slug);

  // If there's an error fetching the article or the article doesn't exist, show a 404 page.
  if (error || !response?.data) {
    notFound();
  }

  const article = response?.data;
  const isSubscribed = false;

  return (
    <article className="container max-w-4xl mx-auto px-4 pb-24">
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

      {/* 3. Article Content - Using Tailwind Typography (prose) */}
      <ArticleContent content={article.content} />

      {/* 4. Conditional Subscribe CTA */}
      {!isSubscribed && <SubscribeBanner />}

      <div className="mt-12 pt-8 border-t flex justify-center">
        <p className="text-sm text-muted-foreground font-serif italic">
          End of Story.
        </p>
      </div>
    </article>
  );
}
