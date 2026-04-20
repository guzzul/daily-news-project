import { SearchCode } from "lucide-react";

export function SearchEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed">
      <SearchCode className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-bold">No results found</h3>
      <p className="text-muted-foreground">
        Try adjusting your filters or search term.
      </p>
    </div>
  );
}
