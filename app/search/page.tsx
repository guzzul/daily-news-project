import { Suspense } from "react";
import { SearchFilters } from "@/components/search-filter";

import { SearchLoading } from "@/components/search-loading";
import { SearchResults } from "@/components/search-result";
import { getCategories } from "@/lib/services/category.service";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  return (
    <main className="container max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4">
          SEARCH
        </h1>
        <p className="text-muted-foreground">
          Use the search bar and filters to find stories that interest you.
        </p>
      </header>
      <Suspense
        fallback={
          <div className="container max-w-6xl mx-auto px-4 py-12">
            <SearchLoading />
          </div>
        }
      >
        <SearchWrapper searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

export async function SearchWrapper({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query, category } = await searchParams;
  const queryParams = query || "";
  const categoryParam = category || "all";

  // Fetch categories for the filter dropdown
  const { response: categoriesResponse } = await getCategories();
  const categories = categoriesResponse?.data || [];

  return (
    <>
      <Suspense fallback={<div>Loading filters...</div>}>
        <SearchFilters categories={categories} />
      </Suspense>

      <Suspense fallback={<SearchLoading />}>
        <SearchResults query={queryParams} category={categoryParam} />
      </Suspense>
    </>
  );
}
