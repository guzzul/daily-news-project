"use client";

import { useEffect, useState, useTransition } from "react";
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

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for the input to allow fast typing
  const [term, setTerm] = useState(searchParams.get("q") || "");
  const currentCategory = searchParams.get("category") || "all";

  // Sync URL function
  const updateSearch = (query?: string, category?: string) => {
    const params = new URLSearchParams(searchParams);

    if (query !== undefined) {
      if (query) params.set("q", query);
      else params.delete("q");
    }

    if (category !== undefined) {
      if (category !== "all") params.set("category", category);
      else params.delete("category");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Auto-search trigger (3+ characters)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (term.length >= 3 || term.length === 0) {
        updateSearch(term);
      }
    }, 400); // 400ms debounce

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
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        )}
      </div>

      <Select
        value={currentCategory}
        onValueChange={(val) => updateSearch(undefined, val)}
      >
        <SelectTrigger className="w-full md:w-[200px] rounded-none border-foreground/20">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
          <SelectItem value="finance">Finance</SelectItem>
          <SelectItem value="policy">Policy</SelectItem>
          <SelectItem value="lifestyle">Lifestyle</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={() => updateSearch(term)}
        className="rounded-none uppercase font-bold"
        disabled={isPending}
      >
        Search
      </Button>
    </div>
  );
}
