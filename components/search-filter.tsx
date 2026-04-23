"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
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
import { Card, CardContent } from "@/components/ui/card";

import { CategoryList } from "@/lib/schemas/category.schema";

type SearchFiltersProps = {
  categories: CategoryList;
};

export function SearchFilters({ categories }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const categoryOptions = useMemo(() => {
    return [
      { name: "All Categories", slug: "all" },
      ...categories.map(({ name, slug }) => ({ name, slug })),
    ];
  }, [categories]);

  const [term, setTerm] = useState(searchParams.get("query") || "");
  const currentCategory = searchParams.get("category") || "all";

  const buildQueryString = (next: { query?: string; category?: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (next.query !== undefined) {
      const value = next.query.trim();
      if (value) params.set("query", value);
      else params.delete("query");
    }

    if (next.category !== undefined) {
      if (next.category !== "all") params.set("category", next.category);
      else params.delete("category");
    }

    return params.toString();
  };

  const navigate = (next: { query?: string; category?: string }) => {
    const newQuery = buildQueryString(next);
    const currentQuery = searchParams.toString();

    if (newQuery === currentQuery) return;

    startTransition(() => {
      router.replace(`${pathname}?${newQuery}`, { scroll: false });
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (term.length >= 3 || term.length === 0) {
        navigate({ query: term });
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [term]);

  useEffect(() => {
    setTerm(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <Card className="w-full mb-10">
      <CardContent className="pt-6 px-6 pb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && navigate({ query: term })}
            />
            {isPending && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
            )}
          </div>

          <Select
            value={currentCategory}
            onValueChange={(val) => navigate({ category: val })}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => navigate({ query: term })}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
