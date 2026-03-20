import Image from "next/image";
import Link from "next/link";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface ArticleProps {
  article: {
    id: string;
    title: string;
    category: string;
    publishDate: string;
    image: string;
    slug: string;
  };
}

export function ArticleCard({ article }: ArticleProps) {
  return (
    <Card className="group overflow-hidden border bg-card transition-all hover:shadow-md">
      {/* Image Container - Removed rounding */}
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content Container with consistent internal padding */}
      <div className="p-5 sm:p-6">
        <CardHeader className="p-0 space-y-3">
          <Badge 
            variant="secondary" 
            className="w-fit rounded-none font-bold uppercase text-[10px] tracking-widest px-2 py-0.5"
          >
            {article.category}
          </Badge>
          
          <Link href={`/articles/${article.slug}`} className="block">
            <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
        </CardHeader>

        <CardFooter className="p-0 mt-6 flex items-center gap-2 text-muted-foreground border-t pt-4">
          <CalendarDays className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-tight">
            {article.publishDate}
          </span>
        </CardFooter>
      </div>
    </Card>
  );
}