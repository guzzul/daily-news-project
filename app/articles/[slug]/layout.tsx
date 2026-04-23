import { Suspense, type ReactNode } from "react";

import { ArticleLoading } from "@/components/article-loading";
import { Article } from "@/lib/schemas/article.schema";
import { getAllArticles } from "@/lib/services/article.service";

type ArticleSlugLayoutProps = {
  children: ReactNode;
};

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

export default function ArticleSlugLayout({ children }: ArticleSlugLayoutProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24">
      <article>
        <Suspense fallback={<ArticleLoading />}>{children}</Suspense>
      </article>
    </main>
  );
}