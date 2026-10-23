/**
 * Drizzle schema — HAVEN Estates Addis.
 *
 * Tables, columns, and constraints follow DATABASE.md exactly.
 * Do not add columns or tables without a corresponding documentation update
 * and approved requirement (AGENTS.md 11.1).
 */

import {
  boolean,
  check,
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Approved enum values (DATABASE.md 5.5, 5.6, 5.12)
// ---------------------------------------------------------------------------

export const TRANSACTION_TYPES = ["sale", "rent"] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const PROPERTY_TYPES = [
  "apartment",
  "house",
  "villa",
  "commercial",
  "land",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PROPERTY_STATUSES = ["draft", "published", "archived"] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

export const AREA_UNITS = ["sqm", "sqft"] as const;
export type AreaUnit = (typeof AREA_UNITS)[number];

export const CURRENCIES = ["ETB", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const INQUIRY_STATUSES = [
  "new",
  "in_progress",
  "resolved",
  "spam",
] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

// ---------------------------------------------------------------------------
// Table: properties (DATABASE.md §5)
// ---------------------------------------------------------------------------

export const properties = pgTable(
  "properties",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    /** URL slug — unique, lowercase, hyphens (DATABASE.md 5.4). */
    slug: text("slug").notNull().unique(),

    title: text("title").notNull(),
    description: text("description").notNull(),

    /** 'sale' | 'rent' (DATABASE.md 5.5). */
    transactionType: text("transaction_type").notNull(),

    /** Controlled property category (DATABASE.md 5.6). */
    propertyType: text("property_type").notNull(),

    /** Display location, e.g. "Bole, Addis Ababa" (DATABASE.md 5.7). */
    location: text("location").notNull(),

    /** Exact numeric price — no floating-point (DATABASE.md 5.8). */
    priceAmount: numeric("price_amount", { precision: 14, scale: 2 }).notNull(),

    /** Approved currency code (DATABASE.md 5.8). */
    priceCurrency: text("price_currency").notNull().default("ETB"),

    /** Nullable — not all property types have bedrooms (DATABASE.md 5.9). */
    bedrooms: integer("bedrooms"),

    /** Nullable — not all property types have bathrooms (DATABASE.md 5.9). */
    bathrooms: integer("bathrooms"),

    /** Nullable — area when known (DATABASE.md 5.10). */
    areaValue: numeric("area_value", { precision: 12, scale: 2 }),

    /** Nullable — unit when area_value is set (DATABASE.md 5.10). */
    areaUnit: text("area_unit"),

    /**
     * Primary image URL (DATABASE.md 5.11).
     * We keep this field alongside property_images as the canonical "hero"
     * reference for fast reads. The property_images table drives the full
     * gallery ordering. The two must stay in sync through the admin workflow.
     */
    featuredImageUrl: text("featured_image_url"),

    /** 'draft' | 'published' | 'archived' (DATABASE.md 5.12). */
    status: text("status").notNull().default("draft"),

    /** Whether the listing may appear in featured sections. */
    isFeatured: boolean("is_featured").notNull().default(false),

    /** Set when status transitions to 'published' (DATABASE.md 5.13). */
    publishedAt: timestamp("published_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    // --- CHECK constraints (DATABASE.md §8.1) ---
    check(
      "properties_slug_nonempty",
      sql`char_length(trim(${table.slug})) > 0`,
    ),
    check(
      "properties_title_nonempty",
      sql`char_length(trim(${table.title})) > 0`,
    ),
    check(
      "properties_description_nonempty",
      sql`char_length(trim(${table.description})) > 0`,
    ),
    check(
      "properties_location_nonempty",
      sql`char_length(trim(${table.location})) > 0`,
    ),
    check(
      "properties_transaction_type_valid",
      sql`${table.transactionType} IN ('sale', 'rent')`,
    ),
    check(
      "properties_property_type_valid",
      sql`${table.propertyType} IN ('apartment', 'house', 'villa', 'commercial', 'land')`,
    ),
    check(
      "properties_status_valid",
      sql`${table.status} IN ('draft', 'published', 'archived')`,
    ),
    check(
      "properties_price_amount_nonneg",
      sql`${table.priceAmount} >= 0`,
    ),
    check(
      "properties_currency_valid",
      sql`${table.priceCurrency} IN ('ETB', 'USD')`,
    ),
    check(
      "properties_bedrooms_nonneg",
      sql`${table.bedrooms} IS NULL OR ${table.bedrooms} >= 0`,
    ),
    check(
      "properties_bathrooms_nonneg",
      sql`${table.bathrooms} IS NULL OR ${table.bathrooms} >= 0`,
    ),
    check(
      "properties_area_value_positive",
      sql`${table.areaValue} IS NULL OR ${table.areaValue} > 0`,
    ),
    check(
      "properties_area_unit_valid",
      sql`${table.areaUnit} IS NULL OR ${table.areaUnit} IN ('sqm', 'sqft')`,
    ),
    // area_value and area_unit must be present or absent together
    check(
      "properties_area_consistency",
      sql`(${table.areaValue} IS NULL) = (${table.areaUnit} IS NULL)`,
    ),
    // --- Indexes (DATABASE.md §9.1) ---
    index("properties_status_idx").on(table.status),
    index("properties_transaction_type_idx").on(table.transactionType),
    index("properties_property_type_idx").on(table.propertyType),
    index("properties_location_idx").on(table.location),
    // Partial index for the common "published + featured" homepage query
    index("properties_published_featured_idx")
      .on(table.status, table.isFeatured)
      .where(sql`${table.status} = 'published' AND ${table.isFeatured} = true`),
  ],
);

// ---------------------------------------------------------------------------
// Table: property_images (DATABASE.md §6)
// ---------------------------------------------------------------------------

export const propertyImages = pgTable(
  "property_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    /** FK to properties; CASCADE on delete (DATABASE.md 6.3). */
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "cascade" }),

    /** Stable image URL or storage path (DATABASE.md 6.5). */
    imageUrl: text("image_url").notNull(),

    /** Accessible description — required, meaningful (DATABASE.md 6.4). */
    altText: text("alt_text").notNull(),

    /** Gallery order; sort by sort_order ASC, id ASC (DATABASE.md 6.6). */
    sortOrder: integer("sort_order").notNull().default(0),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check(
      "property_images_image_url_nonempty",
      sql`char_length(trim(${table.imageUrl})) > 0`,
    ),
    check(
      "property_images_alt_text_nonempty",
      sql`char_length(trim(${table.altText})) > 0`,
    ),
    check(
      "property_images_sort_order_nonneg",
      sql`${table.sortOrder} >= 0`,
    ),
    // FK index — efficient image retrieval (DATABASE.md 9.1)
    index("property_images_property_id_idx").on(table.propertyId),
    // Gallery ordering index
    index("property_images_order_idx").on(table.propertyId, table.sortOrder),
  ],
);

// ---------------------------------------------------------------------------
// Table: contact_inquiries (DATABASE.md §7)
// Included because the approved contact workflow stores inquiries (API.md §6).
// ---------------------------------------------------------------------------

export const contactInquiries = pgTable(
  "contact_inquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    /**
     * Associated property, when applicable (DATABASE.md 7.3).
     * SET NULL on delete so inquiries survive property deletion.
     */
    propertyId: uuid("property_id").references(() => properties.id, {
      onDelete: "set null",
    }),

    name: text("name").notNull(),

    /**
     * At least one of email/phone must be non-null (DATABASE.md 7.4).
     * Enforced via CHECK constraint and server-side validation.
     */
    email: text("email"),
    phone: text("phone"),

    message: text("message").notNull(),

    /** Processing status (DATABASE.md 7.5). */
    status: text("status").notNull().default("new"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check("contact_inquiries_name_nonempty", sql`char_length(trim(${table.name})) > 0`),
    check("contact_inquiries_message_nonempty", sql`char_length(trim(${table.message})) > 0`),
    // At least one contact method must be provided (DATABASE.md 7.4)
    check(
      "contact_inquiries_contact_method",
      sql`(${table.email} IS NOT NULL AND char_length(trim(${table.email})) > 0)
          OR (${table.phone} IS NOT NULL AND char_length(trim(${table.phone})) > 0)`,
    ),
    check(
      "contact_inquiries_status_valid",
      sql`${table.status} IN ('new', 'in_progress', 'resolved', 'spam')`,
    ),
    // Support newest-first inquiry management (DATABASE.md 9.1)
    index("contact_inquiries_created_at_idx").on(table.createdAt),
    // Inquiry lookup by property (DATABASE.md 9.1)
    index("contact_inquiries_property_id_idx").on(table.propertyId),
  ],
);

// ---------------------------------------------------------------------------
// Inferred TypeScript types
// ---------------------------------------------------------------------------

export type PropertyRow = typeof properties.$inferSelect;
export type NewPropertyRow = typeof properties.$inferInsert;
export type PropertyImageRow = typeof propertyImages.$inferSelect;
export type NewPropertyImageRow = typeof propertyImages.$inferInsert;
export type ContactInquiryRow = typeof contactInquiries.$inferSelect;
export type NewContactInquiryRow = typeof contactInquiries.$inferInsert;
