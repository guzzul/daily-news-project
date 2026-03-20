import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Newspaper, ArrowRight } from "lucide-react";

export default function NewsHero() {
  const featuredArticleHref = "/articles/future-of-ai-architecture";
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-18 bg-background border-b">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                Breaking News: The Future of Tech
              </div>
              <Link href={featuredArticleHref} className="group block">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none">
                  Insights that shape the{" "}
                  <span className="text-primary">Global Narrative.</span>
                </h1>
              </Link>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Stay ahead of the curve with deep-dives into economics, policy,
                and the innovations redefining our world. Delivered fresh, every
                single morning.
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="px-8">
                <Link href="/articles">
                  Browse All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background"
                />
                <Button variant="outline" type="submit">
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Newspaper className="h-4 w-4" />
              <span>Join 50,000+ daily readers across the globe.</span>
            </div>
          </div>

          {/* Visual Element */}
          <Link
            href={featuredArticleHref}
            className="relative group aspect-video overflow-hidden rounded-xl bg-muted lg:aspect-square"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted lg:aspect-square">
              <Image
                src="/api/placeholder/800/800" // Replace with your featured image
                alt="Featured Story Image"
                fill
                className="object-cover"
                priority
              />
              {/* Optional Overlay for context */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Feature Story
                  </p>
                  <h3 className="text-lg font-semibold">
                    How AI is Reshaping Urban Architecture
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
