"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Megaphone, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NewsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full border-b bg-muted/40 transition-all duration-300">
      <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Side: Badge & Content */}
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <Badge
            variant="destructive"
            className="shrink-0 animate-pulse rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-tight"
          >
            Breaking
          </Badge>

          <Link
            href="/articles/market-update-2026"
            className="group flex items-center gap-2 overflow-hidden text-sm font-medium hover:text-primary transition-colors"
          >
            <Megaphone className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">
              <span className="font-bold">Market Update:</span> Tech stocks
              reach record highs following clean energy breakthrough.
            </span>
            <ArrowRight className="h-3 w-3 shrink-0 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </Link>
        </div>

        {/* Right Side: Close Button */}
        <div className="flex shrink-0 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:bg-transparent hover:text-foreground"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss banner</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
