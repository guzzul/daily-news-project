// components/article/ArticleHeader.tsx
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Author} from "@/lib/schemas/author.schema";

interface HeaderProps {
  title: string;
  author: Author;
  date: string;
  category: string;
}

export function ArticleHeader({ title, author, date, category }: HeaderProps) {
  return (
    <header className="space-y-6 pt-8 pb-4">
      <Badge variant="outline" className="rounded-none uppercase tracking-widest px-3 py-1 font-bold border-primary text-primary">
        {category}
      </Badge>
      
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
        {title}
      </h1>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-none border">
            <AvatarImage src={author.avatar} />
            <AvatarFallback className="rounded-none">{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-sm font-bold leading-none">{author.name}</p>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground font-medium uppercase tracking-tighter">
          Published {date}
        </div>
      </div>
      <Separator className="h-[2px] bg-foreground/10" />
    </header>
  );
}