import { Skeleton } from "@/components/ui/skeleton";

export function SearchLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <Skeleton className="h-6 w-3/4 rounded-none" />
          <Skeleton className="h-4 w-1/2 rounded-none" />
        </div>
      ))}
    </div>
  );
}