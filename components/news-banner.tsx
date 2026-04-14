import Link from "next/link";
import { cacheLife } from "next/cache";
import { Megaphone, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { getBreakingNews } from "@/lib/services/breaking-news.service";

export default async function NewsBanner() {
  "use cache";
  cacheLife("minutes");

  const breakingNewsResponse = await getBreakingNews();
  const breakingNews = breakingNewsResponse?.data;

  if (breakingNewsResponse?.success !== true || !breakingNews) {
    return null; // Don't render the banner if there's an error or no data
  }

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
            href={`/articles/${breakingNews?.articleId}`}
            className="group flex items-center gap-2 overflow-hidden text-sm font-medium hover:text-primary transition-colors"
          >
            <Megaphone className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">
              <span className="font-bold">{breakingNews?.headline}</span>
            </span>
            <ArrowRight className="h-3 w-3 shrink-0 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
