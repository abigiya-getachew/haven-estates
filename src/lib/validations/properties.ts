/**
 * Shared validation schemas for property filters (API.md §5.3, AGENTS.md 13.1).
 *
 * Used by server-rendered listing pages and the property data-access layer.
 * Client-safe: no server-only imports.
 */
import { z } from "zod";

import {
  PROPERTY_TYPES,
  TRANSACTION_TYPES,
} from "@/lib/db/schema";

export const propertyFiltersSchema = z.object({
  transactionType: z
    .enum(TRANSACTION_TYPES)
    .optional(),

  propertyType: z
    .enum(PROPERTY_TYPES)
    .optional(),

  /** Exact or partial location match (DATABASE.md 9.5). */
  location: z.string().trim().max(180).optional(),

  minPrice: z
    .string()
    .optional()
    .transform((v) => (v ? parseFloat(v) : undefined))
    .refine((v) => v === undefined || (!isNaN(v) && v >= 0), {
      message: "Minimum price must be 0 or greater.",
    }),

  maxPrice: z
    .string()
    .optional()
    .transform((v) => (v ? parseFloat(v) : undefined))
    .refine((v) => v === undefined || (!isNaN(v) && v >= 0), {
      message: "Maximum price must be 0 or greater.",
    }),

  bedrooms: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined))
    .refine((v) => v === undefined || (!isNaN(v) && Number.isInteger(v) && v >= 0), {
      message: "Bedrooms must be a positive integer or zero.",
    }),

  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .refine((v) => !isNaN(v) && v >= 1, {
      message: "Page must be 1 or greater.",
    })
    .default(1),

  pageSize: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 12))
    .refine((v) => !isNaN(v) && v >= 1 && v <= 48, {
      message: "Page size must be between 1 and 48.",
    })
    .default(12),
});

export type PropertyFiltersInput = z.infer<typeof propertyFiltersSchema>;
