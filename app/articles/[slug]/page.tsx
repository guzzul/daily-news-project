import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";

import { ArticleHeader } from "@/components/article-header";
import { SubscribeBanner } from "@/components/subscribe-banner";
import ArticleContent from "@/components/article-content";

import { getArticleBySlug } from "@/lib/services/article.service";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ") };
}

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
  const { slug } = await params;
  const articleResponse = await getArticleBySlug(slug);
  const article = articleResponse.data;

  console.log("Fetched article:", article);
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
