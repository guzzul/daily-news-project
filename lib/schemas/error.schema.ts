import { z } from "zod";

export const ErrorCodeSchema = z.enum([
  "VALIDATION_ERROR",
  "BAD_REQUEST",
  "NOT_FOUND",
  "INTERNAL_SERVER_ERROR",
]);

export const ErrorSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string(),
  details: z.unknown().nullable(),
});

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ErrorSchema,
});