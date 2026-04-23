# The Guzzul Daily News Project

A modern Next.js 16 news platform with subscription-gated content, dark mode, and advanced caching strategies.

Open [https://daily-news-project-guzzul.vercel.app/](https://daily-news-project-guzzul.vercel.app/) to view the application.

## Architecture Overview

This application is built on **Next.js 16** using the App Router, leveraging React 19, TypeScript, and Tailwind CSS. The architecture follows a service-oriented pattern with clear separation between API clients, services, and UI components.

```
app/                    # Next.js App Router pages
├── articles/           # Article routes with [slug] dynamic segments
│   ├── actions.ts      # Server Actions for subscription management
│   └── [slug]/         # Dynamic article pages
├── search/             # Search page with filters
└── layout.tsx          # Root layout with ThemeProvider

components/             # Reusable UI components
├── ui/                 # shadcn/ui components
├── article-*.tsx       # Article-specific components
└── theme-provider.tsx  # Dark mode provider

lib/
├── api/                # API client with retry logic
├── services/           # Data fetching services with caching
└── schemas/            # Zod validation schemas
```

---

## Features

### 🔒 Gated Content via Proxy Middleware

Content access is controlled through Next.js middleware in proxy.ts:

- **Preview Mode**: Non-subscribed users see only preview pages (`/articles/[slug]/preview`)
- **Full Access**: Subscribed users are redirected to full articles (`/articles/[slug]`)
- **Cookie-based Subsription**: Uses `subscribed` cookie to track subscription status

### 🌙 Dark Mode Support

Powered by `next-themes` with system preference detection:

- **System Detection**: Automatically respects `prefers-color-scheme`

### ⚡ Cached Components

The app uses Next.js 16's built-in caching with `cacheLife` and `cacheTag`:

| Service | Cache Duration | Use Case |
|---------|---------------|----------|
| `getFeaturedStory` | Hours | Homepage hero |
| `getFeaturedArticles` | Hours | Article grid |
| `getArticleBySlug` | Days | Individual articles |
| `getAllArticles` | Days | Article listings |
| `getTrendingArticles` | Hours | Trending section |

### 📧 Subscription via Server Actions

Subscription management uses Next.js Server Actions:

- **Subscribe**: Sets `subscribed` cookie for 1 week
- **Unsubscribe**: Removes cookie and redirects to preview
- **Secure Cookies**: `httpOnly`, `secure`, `sameSite: 'lax'`

### 🔍 Search Features

Simple search with category filtering:

- **URL-based State**: Search params (`?query=...&category=...`) enable shareable URLs
- **Category Filters**: Dynamic category dropdown populated from API
- **Pending States**: `useTransition` for smooth UI during navigation
- **Suspense Boundaries**: Progressive loading with fallback components

### 🔄 Fetch Retries with Exponential Backoff

Robust error handling with automatic retry logic:

- **Exponential Backoff**: Delay doubles after each retry (300ms → 600ms → 1200ms...)
- **Configurable Attempts**: Default retries defined in consts.ts
- **Graceful Degradation**: Fails gracefully after all retries exhausted

```typescript
export async function retry<T>(
  fn: () => Promise<T>,
  retries: number,
  delay = 300,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((res) => setTimeout(res, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}
```

### ✅ Dynamic API Schema Validation via Zod

Runtime type safety using Zod schemas in schemas:

- **Runtime Validation**: API responses validated against Zod schemas before use
- **Type Inference**: Schemas generate TypeScript types automatically
- **Error Flattening**: Validation errors are captured and reported clearly
- **Centralized Schemas**: Article, Author, Category, ContentBlock schemas in schemas

```typescript
const parsed = schema.safeParse(json);

if (!parsed.success) {
  throw new ApiError(500, "Invalid API response", parsed.error.flatten());
}

return parsed.data;
```

### 🚀 Static Page Generation

Next.js 16's `cacheComponents` enabled in next.config.ts:

- **ISR (Incremental Static Regeneration)**: Cache tags enable on-demand revalidation
- **Image Optimization**: Vercel Blob storage integration
- **SEO Optimized**: Dynamic metadata generation for articles

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.7 |
| UI | React 19, Tailwind CSS 4 |
| Components | shadcn/ui, Radix UI |
| Validation | Zod 4 |
| Data Fetching | Native Fetch with retries, Next.js Cache |
| Icons | Lucide React |
| Fonts | Geist (Sans + Mono) |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```
