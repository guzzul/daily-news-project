// components/article/SubscribeCTA.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SubscribeBanner() {
  return (
    <section className="my-12 p-8 border-4 border-primary bg-primary/5 rounded-none">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">Never miss a global update.</h3>
        <p className="text-muted-foreground">
          Join 50,000+ subscribers who get our deep-dive reports delivered to their inbox every Monday morning.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 pt-2">
          <Input 
            placeholder="your@email.com" 
            className="rounded-none border-foreground/20 focus-visible:ring-primary"
            required
          />
          <Button type="submit" className="rounded-none px-8 font-bold uppercase tracking-wider">
            Subscribe Now
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}