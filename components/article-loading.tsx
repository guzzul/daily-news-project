import { Loader2 } from "lucide-react";

export function ArticleLoading() {
  return (
    <div
      className="flex min-h-dvh w-full items-center justify-center"
      role="status"
      aria-label="Loading article"
    >
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
}