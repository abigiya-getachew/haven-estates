/**
 * Database type helpers.
 *
 * The PostgreSQL schema is defined in Drizzle under `src/lib/db/schema.ts`
 * and migrations live in `drizzle/`. That module is the single source of
 * truth for the shared enums (DATABASE.md 5.5); this file exists to keep the
 * legacy import path `@/types/database.types` working for any module that
 * still references it.
 *
 * New code should import directly from `@/lib/db/schema` instead.
 */
export const TRANSACTION_TYPES = ["sale", "rent"] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];