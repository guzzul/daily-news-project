import { ArticleCard } from "@/components/article-card";
import { SearchEmpty } from "@/components/search-empty";
import { searchArticles } from "@/lib/services/article.service";

export async function SearchResults({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  const isSearching = query || category !== "all";
  const { response, error } = await searchArticles(query, category);

  if (error || !response?.data) {
    console.error("Error fetching search results:", error);
    return <SearchEmpty />;
  }

  const results = response.data;
  if (results.length === 0) {
    return <SearchEmpty />;
  }

  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
        {isSearching ? `Search Results (${results.length})` : "Recent Stories"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
