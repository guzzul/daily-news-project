import { z } from "zod";
import { retry } from "./retry";
import { ApiError } from "./errors";

type FetchOptions<T> = {
  schema: z.ZodSchema<T>;
  init?: RequestInit;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
  retries?: number;
};

/**
 * Core fetch wrapper with:
 * - Zod validation
 * - Retries
 * - Next.js caching
 */
export async function apiFetch<T>(
  url: string,
  options: FetchOptions<T>,
): Promise<T> {
  const { schema, init, next, retries = 2 } = options;

  const fetcher = async () => {
    const res = await fetch(url, {
      ...init,
      next,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });

    if (!res.ok) {
      throw new ApiError(res.status, await res.text());
    }

    const json = await res.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      throw new ApiError(500, "Invalid API response", parsed.error.flatten());
    }

    return parsed.data;
  };

  return retry(fetcher, retries);
}
