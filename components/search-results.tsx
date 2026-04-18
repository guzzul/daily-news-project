"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ArticleCard } from "./article-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { ArticleList } from "@/lib/schemas/article.schema";

// Mock data remains the same
const ALL_ARTICLES = Array.from({ length: 18 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `News Story ${i + 1}: Emerging Trends in Global Policy`,
  category: "Policy",
  publishDate: "March 20, 2026",
  image: "/api/placeholder/600/400",
  slug: `news-story-${i + 1}`,
}));

const ITEMS_PER_PAGE = 6;

interface FeaturedArticlesProps {
  articles: ArticleList;
}

function SearchResultsContent({ articles }: FeaturedArticlesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get current page from URL, default to 1
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(ALL_ARTICLES.length / ITEMS_PER_PAGE);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    router.push(createPageURL(page), { scroll: false });
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = ALL_ARTICLES.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="w-full py-12">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-10">Latest Stories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href={createPageURL(currentPage - 1)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNumber = idx + 1;
              return (
                <PaginationItem key={pageNumber} className="hidden sm:inline-block">
                  <PaginationLink
                    href={createPageURL(pageNumber)}
                    isActive={currentPage === pageNumber}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext 
                href={createPageURL(currentPage + 1)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}

// Wrap in Suspense to handle useSearchParams correctly in Next.js
export default function SearchResults({ articles }: FeaturedArticlesProps) {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading articles...</div>}>
      <SearchResultsContent articles={articles} />
    </Suspense>
  );
}