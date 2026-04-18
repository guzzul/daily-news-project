import { Suspense } from "react";
import { ArticleCard } from "./article-card";
import { ArticleList } from "@/lib/schemas/article.schema";

interface FeaturedArticlesProps {
  articles: ArticleList;
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <section className="w-full py-12">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-10">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
