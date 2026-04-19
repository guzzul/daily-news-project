import { cacheLife, cacheTag } from "next/cache";
import { apiFetch } from "../api/client";
import {
  CategoryListResponseSchema,
} from "../schemas/category.schema";
import { BASE_URL, DEFAULT_RETRIES } from "../consts";

export async function getCategories() {
  "use cache";
  cacheLife("days");
  cacheTag("categories");

  try {
    const response = await apiFetch(`${BASE_URL}/categories`, {
      schema: CategoryListResponseSchema,
      next: {
        tags: ["categories"],
      },
      retries: DEFAULT_RETRIES,
    });
    return { response, error: null };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { response: null, error };
  }
}