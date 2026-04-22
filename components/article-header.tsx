import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Author} from "@/lib/schemas/author.schema";

interface HeaderProps {
  title: string;
  author: Author;
  date: string;
  category: string;
}

export function ArticleHeader({ title, author, date, category }: HeaderProps) {
  const [year, month, day] = date.split('T')[0].split('-');
  const dateStr = `${month}/${day}/${year}`;
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
        
        <div className="text-sm text-muted-foreground flex gap-2 font-medium uppercase tracking-tighter">
          <CalendarDays className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-tight">
            {dateStr}
          </span>
        </div>
      </div>
      <Separator className="h-[2px] bg-foreground/10" />
    </header>
  );
}