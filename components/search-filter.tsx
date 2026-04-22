"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CategoryList } from "@/lib/schemas/category.schema";

type SearchFiltersProps = {
  categories: CategoryList;
};

export function SearchFilters({ categories }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Combine "All Categories" with the props data
  // useMemo ensures we don't re-calculate this unless categories change
  const categoryOptions = useMemo(() => {
    const formattedCategories = categories.map(({ name, slug }) => ({
      name,
      slug,
    }));
    return [{ name: "All Categories", slug: "all" }, ...formattedCategories];
  }, [categories]);

  // Local state for the input to allow fast typing
  const [term, setTerm] = useState(searchParams.get("query") || "");
  const currentCategory = searchParams.get("category") || "all";

  // Sync URL function
  const updateSearch = (query?: string, category?: string) => {
    const params = new URLSearchParams(searchParams);

    if (query !== undefined) {
      if (query) params.set("query", query);
      else params.delete("query");
    }

    if (category !== undefined) {
      if (category !== "all") params.set("category", category);
      else params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Auto-search trigger (3+ characters)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (term.length >= 3 || term.length === 0) {
        updateSearch(term);
      }
    }, 50); // 50ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [term]);

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-10">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          className="pl-10 rounded-none border-foreground/20"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && updateSearch(term)}
        />
      </div>

      <Select
        value={currentCategory}
        onValueChange={(val) => updateSearch(undefined, val)}
      >
        <SelectTrigger className="w-full md:w-[200px] rounded-none border-foreground/20">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          {categoryOptions.map((category) => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={() => updateSearch(term)}
        className="rounded-none uppercase font-bold"
      >
        Search
      </Button>
    </div>
  );
}
