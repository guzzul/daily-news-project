// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_PATHS = [
  "articles",
  "breaking-news",
  "categories",
  "health",
  "publication",
  "subscription",
];

function isValidPath(url: string): boolean {
  const segments = url.split("/").filter(Boolean);
  return segments.some((segment) => ALLOWED_PATHS.includes(segment));
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Only target your specific API prefix
  if (pathname.startsWith("/api/") && isValidPath(pathname)) {
    const apiPath = pathname.replace("/api", "");
    const externalEndpoint = new URL(
      `${process.env.VERCEL_NEWS_API_ENDPOINT_URL}${apiPath}${search}`,
    );

    // Create a new Headers object based on the original
    const modifiedHeaders = new Headers(request.headers);

    // INJECT the secret header for authentication
    modifiedHeaders.set(
      "x-vercel-protection-bypass",
      `${process.env.VERCEL_NEWS_API_TOKEN || ""}`,
    );

    // Forward the request with the new headers
    return NextResponse.rewrite(externalEndpoint, {
      request: {
        headers: modifiedHeaders,
      },
    });
  }

  return NextResponse.next();
}

// Ensure middleware only runs for this specific route
export const config = {
  matcher: "/api/:path*",
};
