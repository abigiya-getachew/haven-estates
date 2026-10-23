/**
 * Server-side data-access layer — HAVEN Estates Addis.
 *
 * All database queries go through this module. Page components and Route
 * Handlers must NOT query the database directly (AGENTS.md 11.2).
 *
 * Public read functions always filter to status = 'published' so draft and
 * archived listings can never leak into public responses (DATABASE.md 10.1,
 * ARCHITECTURE.md 8.2).
 */
import "server-only";

import { and, asc, desc, eq, gte, lte } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  contactInquiries,
  properties,
  propertyImages,
  type ContactInquiryRow,
  type NewContactInquiryRow,
  type PropertyImageRow,
  type PropertyRow,
} from "@/lib/db/schema";

// ---------------------------------------------------------------------------
// Public domain types — expose only the fields each caller actually needs.
// (AGENTS.md 7.3 — avoid leaking raw row types everywhere)
// ---------------------------------------------------------------------------

export type PropertySummary = {
  id: string;
  slug: string;
  title: string;
  transactionType: string;
  propertyType: string;
  location: string;
  priceAmount: string;
  priceCurrency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  areaValue: string | null;
  areaUnit: string | null;
  featuredImageUrl: string | null;
  isFeatured: boolean;
  publishedAt: Date | null;
};

export type PropertyDetail = PropertySummary & {
  description: string;
  createdAt: Date;
  updatedAt: Date;
  images: PropertyImageRow[];
};

// ---------------------------------------------------------------------------
// Property reads — PUBLIC (status = 'published' enforced)
// ---------------------------------------------------------------------------

const PUBLISHED = eq(properties.status, "published");

/** Default and max page sizes (API.md §5.4). */
const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 48;

export interface PropertyFilters {
  transactionType?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  page?: number;
  pageSize?: number;
}

/**
 * Retrieve published properties with optional filters and pagination.
 * All filters are validated before reaching here (API.md §5.3).
 */
export async function getPublishedProperties(filters: PropertyFilters = {}): Promise<{
  properties: PropertySummary[];
  page: number;
  pageSize: number;
  hasMore: boolean;
}> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(
    Math.max(1, filters.pageSize ?? DEFAULT_PAGE_SIZE),
    MAX_PAGE_SIZE,
  );
  const offset = (page - 1) * pageSize;

  const conditions = [PUBLISHED];

  if (filters.transactionType) {
    conditions.push(eq(properties.transactionType, filters.transactionType));
  }
  if (filters.propertyType) {
    conditions.push(eq(properties.propertyType, filters.propertyType));
  }
  if (filters.location) {
    // Exact match for now; a ILIKE/trigram approach can be added later (DATABASE.md 9.5)
    conditions.push(eq(properties.location, filters.location));
  }
  if (filters.minPrice !== undefined) {
    conditions.push(gte(properties.priceAmount, String(filters.minPrice)));
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(lte(properties.priceAmount, String(filters.maxPrice)));
  }
  if (filters.bedrooms !== undefined) {
    conditions.push(eq(properties.bedrooms, filters.bedrooms));
  }

  // Fetch one extra record to determine hasMore without a COUNT query (API.md §5.4)
  const rows = await db
    .select({
      id: properties.id,
      slug: properties.slug,
      title: properties.title,
      transactionType: properties.transactionType,
      propertyType: properties.propertyType,
      location: properties.location,
      priceAmount: properties.priceAmount,
      priceCurrency: properties.priceCurrency,
      bedrooms: properties.bedrooms,
      bathrooms: properties.bathrooms,
      areaValue: properties.areaValue,
      areaUnit: properties.areaUnit,
      featuredImageUrl: properties.featuredImageUrl,
      isFeatured: properties.isFeatured,
      publishedAt: properties.publishedAt,
    })
    .from(properties)
    .where(and(...conditions))
    .orderBy(desc(properties.publishedAt), asc(properties.id))
    .limit(pageSize + 1)
    .offset(offset);

  const hasMore = rows.length > pageSize;
  return {
    properties: rows.slice(0, pageSize),
    page,
    pageSize,
    hasMore,
  };
}

/**
 * Retrieve featured published properties for the homepage (DATABASE.md §16.1).
 * Returns a bounded, deterministic set.
 */
export async function getFeaturedProperties(limit = 6): Promise<PropertySummary[]> {
  return db
    .select({
      id: properties.id,
      slug: properties.slug,
      title: properties.title,
      transactionType: properties.transactionType,
      propertyType: properties.propertyType,
      location: properties.location,
      priceAmount: properties.priceAmount,
      priceCurrency: properties.priceCurrency,
      bedrooms: properties.bedrooms,
      bathrooms: properties.bathrooms,
      areaValue: properties.areaValue,
      areaUnit: properties.areaUnit,
      featuredImageUrl: properties.featuredImageUrl,
      isFeatured: properties.isFeatured,
      publishedAt: properties.publishedAt,
    })
    .from(properties)
    .where(and(PUBLISHED, eq(properties.isFeatured, true)))
    .orderBy(desc(properties.publishedAt), asc(properties.id))
    .limit(limit);
}

/**
 * Retrieve a single published property by slug with its gallery images.
 * Returns null when no published property matches — callers must render
 * a not-found response (DATABASE.md §16.3, ARCHITECTURE.md 8.2).
 */
export async function getPublishedPropertyBySlug(
  slug: string,
): Promise<PropertyDetail | null> {
  const [row] = await db
    .select()
    .from(properties)
    .where(and(PUBLISHED, eq(properties.slug, slug)))
    .limit(1);

  if (!row) {
    return null;
  }

  const images = await db
    .select()
    .from(propertyImages)
    .where(eq(propertyImages.propertyId, row.id))
    .orderBy(asc(propertyImages.sortOrder), asc(propertyImages.id));

  return { ...row, images };
}

// ---------------------------------------------------------------------------
// Contact inquiry writes — PUBLIC path (validated by the contact endpoint)
// ---------------------------------------------------------------------------

/**
 * Insert a validated contact inquiry (DATABASE.md §16.4, API.md §6).
 * The property_id FK is verified to reference a published property when
 * provided — unpublished property details must not be disclosed (API.md 6.6).
 */
export async function createContactInquiry(
  data: Omit<NewContactInquiryRow, "id" | "createdAt" | "status">,
): Promise<ContactInquiryRow> {
  // Validate property reference points to a published listing (API.md 6.6)
  if (data.propertyId !== null && data.propertyId !== undefined) {
    const [pub] = await db
      .select({ id: properties.id })
      .from(properties)
      .where(and(PUBLISHED, eq(properties.id, data.propertyId)))
      .limit(1);

    if (!pub) {
      throw Object.assign(
        new Error("The specified property is not available."),
        { code: "PROPERTY_NOT_FOUND" },
      );
    }
  }

  const [inserted] = await db
    .insert(contactInquiries)
    .values({ ...data, status: "new" })
    .returning();

  return inserted;
}

// ---------------------------------------------------------------------------
// Administrative reads (require verified authorization before calling)
// ---------------------------------------------------------------------------

/**
 * Retrieve all properties regardless of status — for the admin dashboard.
 * MUST be called only after authorization is verified on the server
 * (AGENTS.md 10.3, DATABASE.md 10.2).
 */
export async function adminGetAllProperties(): Promise<PropertyRow[]> {
  return db
    .select()
    .from(properties)
    .orderBy(desc(properties.createdAt));
}

/**
 * Retrieve a single property by ID for admin editing (all statuses).
 */
export async function adminGetPropertyById(id: string): Promise<PropertyRow | null> {
  const [row] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, id))
    .limit(1);
  return row ?? null;
}

/**
 * Retrieve all images for a property — for admin management.
 */
export async function adminGetPropertyImages(propertyId: string): Promise<PropertyImageRow[]> {
  return db
    .select()
    .from(propertyImages)
    .where(eq(propertyImages.propertyId, propertyId))
    .orderBy(asc(propertyImages.sortOrder), asc(propertyImages.id));
}

/**
 * Retrieve contact inquiries newest-first — for admin review.
 */
export async function adminGetInquiries(limit = 50): Promise<ContactInquiryRow[]> {
  return db
    .select()
    .from(contactInquiries)
    .orderBy(desc(contactInquiries.createdAt))
    .limit(limit);
}

// ---------------------------------------------------------------------------
// Administrative mutations (require verified authorization before calling)
// ---------------------------------------------------------------------------

export type CreatePropertyInput = {
  slug: string;
  title: string;
  description: string;
  transactionType: string;
  propertyType: string;
  location: string;
  priceAmount: string;
  priceCurrency: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaValue?: string | null;
  areaUnit?: string | null;
  featuredImageUrl?: string | null;
  isFeatured?: boolean;
};

/**
 * Create a new property listing in draft state.
 * Slug normalization and uniqueness validation should be performed by the
 * caller before invoking this function (API.md §7.3).
 */
export async function adminCreateProperty(
  input: CreatePropertyInput,
): Promise<PropertyRow> {
  const [created] = await db
    .insert(properties)
    .values({
      ...input,
      status: "draft",
      isFeatured: input.isFeatured ?? false,
      publishedAt: null,
    })
    .returning();
  return created;
}

export type UpdatePropertyInput = Partial<CreatePropertyInput>;

/**
 * Update an existing property's fields.
 * Always sets updatedAt to now (DATABASE.md 5.14).
 */
export async function adminUpdateProperty(
  id: string,
  input: UpdatePropertyInput,
): Promise<PropertyRow | null> {
  const [updated] = await db
    .update(properties)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(properties.id, id))
    .returning();
  return updated ?? null;
}

/**
 * Transition a property's publication status.
 * Sets publishedAt when transitioning to 'published' for the first time
 * and retains it on subsequent publishes (DATABASE.md 5.13).
 */
export async function adminSetPropertyStatus(
  id: string,
  status: "published" | "draft" | "archived",
): Promise<PropertyRow | null> {
  const current = await adminGetPropertyById(id);
  if (!current) return null;

  // Only stamp publishedAt on the first publish (DATABASE.md 5.13)
  const publishedAt =
    status === "published" && !current.publishedAt
      ? new Date()
      : current.publishedAt;

  const [updated] = await db
    .update(properties)
    .set({ status, publishedAt, updatedAt: new Date() })
    .where(eq(properties.id, id))
    .returning();

  return updated ?? null;
}

/**
 * Permanently delete a property. Use archival (`adminSetPropertyStatus`) in
 * preference to deletion for active listings. Related images cascade-delete.
 */
export async function adminDeleteProperty(id: string): Promise<boolean> {
  const result = await db.delete(properties).where(eq(properties.id, id));
  return (result.rowCount ?? 0) > 0;
}

/**
 * Add an image to a property gallery.
 */
export async function adminAddPropertyImage(
  propertyId: string,
  imageUrl: string,
  altText: string,
  sortOrder = 0,
): Promise<PropertyImageRow> {
  const [image] = await db
    .insert(propertyImages)
    .values({ propertyId, imageUrl, altText, sortOrder })
    .returning();
  return image;
}

/**
 * Remove a property image by its ID.
 */
export async function adminDeletePropertyImage(imageId: string): Promise<boolean> {
  const result = await db.delete(propertyImages).where(eq(propertyImages.id, imageId));
  return (result.rowCount ?? 0) > 0;
}

/**
 * Update inquiry status — for admin workflow.
 */
export async function adminUpdateInquiryStatus(
  id: string,
  status: "new" | "in_progress" | "resolved" | "spam",
): Promise<ContactInquiryRow | null> {
  const [updated] = await db
    .update(contactInquiries)
    .set({ status })
    .where(eq(contactInquiries.id, id))
    .returning();
  return updated ?? null;
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/**
 * Normalise a raw string into a URL-safe slug (DATABASE.md 5.4).
 */
export function normaliseSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_]+/g, "-") // spaces/underscores → hyphens
    .replace(/-{2,}/g, "-") // collapse multiple hyphens
    .replace(/^-|-$/g, ""); // strip leading/trailing hyphens
}
