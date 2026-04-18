import { Suspense } from "react";
import NewsHero from "@/components/news-hero";
import NewsBanner from "@/components/news-banner";
import FeaturedArticles from "@/components/featured-articles";
import { getFeaturedStory, getFeaturedArticles } from "@/lib/services/article.service";

export const metadata = {
  title: "Daily News - Stay Informed with the Latest Headlines",
  description:
    "Your go-to source for the latest news, in-depth analysis, and expert insights. Stay informed with our comprehensive coverage of global events, technology, business, and more.",
};

function BannerSkeleton() {
  return (
    <div className="w-full animate-pulse rounded-md bg-muted/50 p-4 text-center">
      Loading breaking news...
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
      <main className="gap-6 flex min-h-screen w-full max-w-7xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <Suspense
            fallback={
              <BannerSkeleton />
            }
          >
            <NewsBanner />
          </Suspense>
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <NewsHero featuredStory={featuredStory}/>
        </div>
        <FeaturedArticles articles={articles} />
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}


