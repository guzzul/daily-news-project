import { Suspense } from "react";
import { SearchFilters } from "@/components/search-filter";
import { ArticleCard } from "@/components/article-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchCode } from "lucide-react";

import { getCategories } from "@/lib/services/category.service";

// Mock Data
const ALL_ARTICLES = [
  {
    id: "1",
    title: "Future of AI",
    category: "technology",
    publishDate: "Mar 20",
    image: "/api/placeholder/400/250",
    slug: "ai-future",
  },
  {
    id: "2",
    title: "Carbon Tax Impact",
    category: "policy",
    publishDate: "Mar 19",
    image: "/api/placeholder/400/250",
    slug: "carbon-tax",
  },
  {
    id: "3",
    title: "Market Volatility",
    category: "finance",
    publishDate: "Mar 18",
    image: "/api/placeholder/400/250",
    slug: "market-news",
  },
  {
    id: "4",
    title: "Remote Work Life",
    category: "lifestyle",
    publishDate: "Mar 17",
    image: "/api/placeholder/400/250",
    slug: "remote-life",
  },
  {
    id: "5",
    title: "Quantum Chips",
    category: "technology",
    publishDate: "Mar 16",
    image: "/api/placeholder/400/250",
    slug: "quantum-chips",
  },
  {
    id: "6",
    title: "Space Mining Law",
    category: "policy",
    publishDate: "Mar 15",
    image: "/api/placeholder/400/250",
    slug: "space-law",
  },
];

async function SearchResults({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const isSearching = query || category !== "all";

  let results = isSearching
    ? ALL_ARTICLES.filter((a) => {
        const matchesQuery = a.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === "all" || a.category === category;
        return matchesQuery && matchesCategory;
      }).slice(0, 5) // Display up to 5 matching articles
    : ALL_ARTICLES.slice(0, 6); // Default State: Recent articles

  // Empty State
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed">
        <SearchCode className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold">No results found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
        {isSearching ? `Search Results (${results.length})` : "Recent Stories"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* <ArticleCard key={article.id} article={article} />  */}
      </div>
    </div>
  );
}

// Loading State (Skeletons)
function SearchLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <Skeleton className="h-6 w-3/4 rounded-none" />
          <Skeleton className="h-4 w-1/2 rounded-none" />
        </div>
      ))}
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; c?: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContainer searchParams={searchParams} />
    </Suspense>
  );
}

export async function SearchContainer({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; c?: string }>;
}) {
  const { q, c } = await searchParams;
  const query = q || "";
  const category = c || "all";

  // Fetch categories for the filter dropdown
  const { response: categoriesResponse } = await getCategories();
  const categories = categoriesResponse?.data || [];

  return (
    <main className="container max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4">
          SEARCH
        </h1>
        <p className="text-muted-foreground">
          Explore our archive of investigative journalism.
        </p>
      </header>

      <Suspense fallback={<div>Loading filters...</div>}>
        <SearchFilters categories={categories} />
      </Suspense>

      <Suspense key={category + query} fallback={<SearchLoading />}>
        <SearchResults query={query} category={category} />
      </Suspense>
    </main>
  );
}
