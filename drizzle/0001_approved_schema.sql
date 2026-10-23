-- Migration: 0001_approved_schema.sql
-- HAVEN Estates Addis — DATABASE.md compliant schema migration.
--
-- This migration:
--   1. Drops the old non-conformant tables (inquiries, properties).
--   2. Creates the approved schema from DATABASE.md §5, §6, §7.
--   3. Adds all required CHECK constraints (DATABASE.md §8.1).
--   4. Adds all required indexes (DATABASE.md §9).
--   5. Creates the updated_at trigger (DATABASE.md §5.14).
--   6. Enables Row Level Security (DATABASE.md §11).
--
-- ⚠ Production note: back up data before running.
-- ⚠ This drops the old `inquiries` and `properties` tables.

--> statement-breakpoint

-- Drop old tables in dependency order
DROP TABLE IF EXISTS "inquiries" CASCADE;
DROP TABLE IF EXISTS "properties" CASCADE;

--> statement-breakpoint

-- ---------------------------------------------------------------------------
-- Table: properties (DATABASE.md §5)
-- ---------------------------------------------------------------------------
CREATE TABLE "properties" (
  "id"                 UUID          PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug"               TEXT          NOT NULL,
  "title"              TEXT          NOT NULL,
  "description"        TEXT          NOT NULL,
  "transaction_type"   TEXT          NOT NULL,
  "property_type"      TEXT          NOT NULL,
  "location"           TEXT          NOT NULL,
  "price_amount"       NUMERIC(14,2) NOT NULL,
  "price_currency"     TEXT          NOT NULL DEFAULT 'ETB',
  "bedrooms"           INTEGER,
  "bathrooms"          INTEGER,
  "area_value"         NUMERIC(12,2),
  "area_unit"          TEXT,
  "featured_image_url" TEXT,
  "status"             TEXT          NOT NULL DEFAULT 'draft',
  "is_featured"        BOOLEAN       NOT NULL DEFAULT FALSE,
  "published_at"       TIMESTAMPTZ,
  "created_at"         TIMESTAMPTZ   NOT NULL DEFAULT now(),
  "updated_at"         TIMESTAMPTZ   NOT NULL DEFAULT now(),

  -- Slug uniqueness (DATABASE.md 5.4)
  CONSTRAINT "properties_slug_unique" UNIQUE ("slug"),

  -- Non-empty text fields (DATABASE.md §8.1)
  CONSTRAINT "properties_slug_nonempty"
    CHECK (char_length(trim("slug")) > 0),
  CONSTRAINT "properties_title_nonempty"
    CHECK (char_length(trim("title")) > 0),
  CONSTRAINT "properties_description_nonempty"
    CHECK (char_length(trim("description")) > 0),
  CONSTRAINT "properties_location_nonempty"
    CHECK (char_length(trim("location")) > 0),

  -- Controlled values (DATABASE.md 5.5, 5.6, 5.12)
  CONSTRAINT "properties_transaction_type_valid"
    CHECK ("transaction_type" IN ('sale', 'rent')),
  CONSTRAINT "properties_property_type_valid"
    CHECK ("property_type" IN ('apartment', 'house', 'villa', 'commercial', 'land')),
  CONSTRAINT "properties_status_valid"
    CHECK ("status" IN ('draft', 'published', 'archived')),
  CONSTRAINT "properties_currency_valid"
    CHECK ("price_currency" IN ('ETB', 'USD')),

  -- Numeric constraints (DATABASE.md §8.1)
  CONSTRAINT "properties_price_amount_nonneg"
    CHECK ("price_amount" >= 0),
  CONSTRAINT "properties_bedrooms_nonneg"
    CHECK ("bedrooms" IS NULL OR "bedrooms" >= 0),
  CONSTRAINT "properties_bathrooms_nonneg"
    CHECK ("bathrooms" IS NULL OR "bathrooms" >= 0),
  CONSTRAINT "properties_area_value_positive"
    CHECK ("area_value" IS NULL OR "area_value" > 0),
  CONSTRAINT "properties_area_unit_valid"
    CHECK ("area_unit" IS NULL OR "area_unit" IN ('sqm', 'sqft')),

  -- Area value and unit must be present or absent together (DATABASE.md 5.10)
  CONSTRAINT "properties_area_consistency"
    CHECK (("area_value" IS NULL) = ("area_unit" IS NULL))
);

--> statement-breakpoint

-- Indexes (DATABASE.md §9.1, §9.2)
CREATE INDEX "properties_status_idx"
  ON "properties" ("status");

CREATE INDEX "properties_transaction_type_idx"
  ON "properties" ("transaction_type");

CREATE INDEX "properties_property_type_idx"
  ON "properties" ("property_type");

CREATE INDEX "properties_location_idx"
  ON "properties" ("location");

-- Partial index for the "published featured" homepage query (DATABASE.md §9.4)
CREATE INDEX "properties_published_featured_idx"
  ON "properties" ("status", "is_featured")
  WHERE "status" = 'published' AND "is_featured" = TRUE;

--> statement-breakpoint

-- updated_at trigger function (DATABASE.md §5.14)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "properties_set_updated_at"
  BEFORE UPDATE ON "properties"
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

--> statement-breakpoint

-- Row Level Security (DATABASE.md §11.2)
ALTER TABLE "properties" ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors may read only published properties
CREATE POLICY "properties_anon_read_published"
  ON "properties"
  FOR SELECT
  TO PUBLIC
  USING ("status" = 'published');

-- All write operations denied for anonymous — only server-side writes
-- (using the service connection that bypasses RLS) are allowed.
-- (DATABASE.md §11.2, ARCHITECTURE.md §10.5)

--> statement-breakpoint

-- ---------------------------------------------------------------------------
-- Table: property_images (DATABASE.md §6)
-- ---------------------------------------------------------------------------
CREATE TABLE "property_images" (
  "id"          UUID        PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "property_id" UUID        NOT NULL
                            REFERENCES "properties" ("id") ON DELETE CASCADE,
  "image_url"   TEXT        NOT NULL,
  "alt_text"    TEXT        NOT NULL,
  "sort_order"  INTEGER     NOT NULL DEFAULT 0,
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "property_images_image_url_nonempty"
    CHECK (char_length(trim("image_url")) > 0),
  CONSTRAINT "property_images_alt_text_nonempty"
    CHECK (char_length(trim("alt_text")) > 0),
  CONSTRAINT "property_images_sort_order_nonneg"
    CHECK ("sort_order" >= 0)
);

--> statement-breakpoint

-- FK index and ordering index (DATABASE.md §9.1)
CREATE INDEX "property_images_property_id_idx"
  ON "property_images" ("property_id");

CREATE INDEX "property_images_order_idx"
  ON "property_images" ("property_id", "sort_order");

--> statement-breakpoint

-- RLS for property_images (DATABASE.md §11.3)
ALTER TABLE "property_images" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "property_images_anon_read_published"
  ON "property_images"
  FOR SELECT
  TO PUBLIC
  USING (
    EXISTS (
      SELECT 1 FROM "properties"
      WHERE "properties"."id" = "property_images"."property_id"
        AND "properties"."status" = 'published'
    )
  );

--> statement-breakpoint

-- ---------------------------------------------------------------------------
-- Table: contact_inquiries (DATABASE.md §7)
-- ---------------------------------------------------------------------------
CREATE TABLE "contact_inquiries" (
  "id"          UUID        PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "property_id" UUID        REFERENCES "properties" ("id") ON DELETE SET NULL,
  "name"        TEXT        NOT NULL,
  "email"       TEXT,
  "phone"       TEXT,
  "message"     TEXT        NOT NULL,
  "status"      TEXT        NOT NULL DEFAULT 'new',
  "created_at"  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "contact_inquiries_name_nonempty"
    CHECK (char_length(trim("name")) > 0),
  CONSTRAINT "contact_inquiries_message_nonempty"
    CHECK (char_length(trim("message")) > 0),

  -- At least one contact method must be supplied (DATABASE.md §7.4)
  CONSTRAINT "contact_inquiries_contact_method"
    CHECK (
      ("email" IS NOT NULL AND char_length(trim("email")) > 0)
      OR
      ("phone" IS NOT NULL AND char_length(trim("phone")) > 0)
    ),

  CONSTRAINT "contact_inquiries_status_valid"
    CHECK ("status" IN ('new', 'in_progress', 'resolved', 'spam'))
);

--> statement-breakpoint

-- Indexes (DATABASE.md §9.1)
CREATE INDEX "contact_inquiries_created_at_idx"
  ON "contact_inquiries" ("created_at" DESC);

CREATE INDEX "contact_inquiries_property_id_idx"
  ON "contact_inquiries" ("property_id");

--> statement-breakpoint

-- RLS for contact_inquiries (DATABASE.md §11.4)
-- Anonymous users cannot read, insert, update, or delete.
-- All operations go through the server-side service client.
ALTER TABLE "contact_inquiries" ENABLE ROW LEVEL SECURITY;

-- No public policies — all access through the server service role only.
