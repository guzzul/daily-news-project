import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import NewsHero from "@/components/news-hero";
import NewsBanner from "@/components/news-banner";
import { ArticleGrid } from "@/components/article-grid";
import {
  getFeaturedStory,
  getFeaturedArticles,
} from "@/lib/services/article.service";

export const metadata = {
  title: "The Guzzul Daily | News and insights for modern web developers",
  description:
    "Engineering deep dives, changelogs, customer stories, and community updates for modern web developers. Join 50,000+ daily readers across the globe.",
};

function BannerSkeleton() {
  return (
    <div className="flex w-full items-center justify-center rounded-md bg-muted/50 p-4">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export default async function Home() {
  const [featuredStoryList, featuredArticleList] = await Promise.all([
    getFeaturedStory(),
    getFeaturedArticles(),
  ]);

  const featuredStory = featuredStoryList?.data?.[0] ?? null;
  const articles = featuredArticleList?.data ?? [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="gap-6 flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-12 px-4 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <Suspense fallback={<BannerSkeleton />}>
            <NewsBanner />
          </Suspense>
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <NewsHero featuredStory={featuredStory} />
        </div>
        <ArticleGrid label="Featured Articles" articles={articles} />
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}
