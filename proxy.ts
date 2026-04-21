import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isSubscribed = request.cookies.has('subscribed');

  // Split the path to extract segments: /articles/[slug]/[preview]
  // segments[0] is empty, segments[1] is 'articles', segments[2] is slug, segments[3] is 'preview'
  const segments = pathname.split('/');
  const slug = segments[2];
  const isPreviewPage = segments[3] === 'preview';

  // User tries to access full article but is NOT subscribed
  if (!isPreviewPage && !isSubscribed) {
    const url = request.nextUrl.clone();
    url.pathname = `/articles/${slug}/preview`;
    return NextResponse.redirect(url);
  }

  // User is subscribed but is visiting the preview page
  if (isPreviewPage && isSubscribed) {
    const url = request.nextUrl.clone();
    url.pathname = `/articles/${slug}`;
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if it doesn't match the redirect logic
  return NextResponse.next();
}

/**
 * Configure the middleware to only run on /articles routes.
 */
export const config = {
  matcher: ['/articles/:slug/:path*'],
};