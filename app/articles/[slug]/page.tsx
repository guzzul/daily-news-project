import type { Metadata } from "next";
import Image from "next/image";
import { ArticleHeader } from "@/components/article-header"
import { SubscribeBanner } from "@/components/subscribe-banner";
import FeaturedArticles from "@/components/featured-articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ") };
}

// Mock data fetching
async function getArticle(slug: string) {
  return {
    title: "The Geopolitical Impact of the 2026 Hydrogen Accord",
    category: "Global Policy",
    author: {
      name: "Julian Sterling",
      role: "Senior Policy Editor",
      image: "/api/placeholder/40/40"
    },
    date: "March 28, 2026",
    featureImage: "/api/placeholder/1200/600",
    content: `
      <p>The signing of the Geneva Hydrogen Accord marks a pivotal shift in global energy dynamics. For the first time, 140 nations have agreed to a unified standard for production and export...</p>
      <p>Experts suggest that this move will not only lower carbon footprints but will fundamentally alter the trade relations between industrial hubs and emerging markets.</p>
      <h4>A New Economic Era</h4>
      <p>As we look toward the final quarter of 2026, the implementation phases are already beginning. Infrastructure investments are projected to exceed $4 trillion by the end of the decade...</p>
    `
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const isSubscribed = false; 

  return (
    <article className="container max-w-4xl mx-auto px-4 pb-24">
      {/* 1. Article Header */}
      <ArticleHeader 
        title={article.title}
        category={article.category}
        author={article.author}
        date={article.date}
      />

      {/* 2. Featured Image - Large Hero */}
      <div className="relative aspect-video w-full my-8 bg-muted border overflow-hidden">
        <Image
          src={article.featureImage}
          alt={article.title}
          fill
          priority
          className="object-cover rounded-none"
        />
      </div>

      {/* 3. Article Content - Using Tailwind Typography (prose) */}
      <div 
        className="prose prose-slate lg:prose-xl max-w-none dark:prose-invert 
        prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* 4. Conditional Subscribe CTA */}
      {!isSubscribed && <SubscribeBanner />}

      <FeaturedArticles />
      
      <div className="mt-12 pt-8 border-t flex justify-center">
        <p className="text-sm text-muted-foreground font-serif italic">
          End of Story.
        </p>
      </div>
    </article>
  );
}