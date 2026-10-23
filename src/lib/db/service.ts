/**
 * Backward-compat re-export shim (AGENTS.md 3.1 — do not break existing callers).
 *
 * This file originally contained property and inquiry functions that matched
 * the old schema. Now that the schema follows DATABASE.md exactly, callers
 * should migrate to `@/lib/db/queries`. This shim keeps the old API surface
 * alive until callers are updated, mapping between the old `Property` shape
 * and the new `PropertySummary` shape.
 *
 * TODO: Migrate all callers to @/lib/db/queries and remove this file.
 */
import "server-only";

export {
  getPublishedProperties as getProperties,
  getPublishedPropertyBySlug as getPropertyBySlug,
  getFeaturedProperties,
  createContactInquiry as submitInquiry,
} from "@/lib/db/queries";
