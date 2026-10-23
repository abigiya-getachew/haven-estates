CREATE TABLE "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_slug" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"neighborhood" text NOT NULL,
	"city" text DEFAULT 'Addis Ababa' NOT NULL,
	"transaction_type" text NOT NULL,
	"price_formatted" text NOT NULL,
	"price_note" text,
	"bedrooms" integer DEFAULT 0 NOT NULL,
	"bathrooms" numeric(3, 1) DEFAULT '1' NOT NULL,
	"area_sqm" integer DEFAULT 0 NOT NULL,
	"image" text NOT NULL,
	"tag" text NOT NULL,
	"description" text NOT NULL,
	"features" text[] DEFAULT '{}' NOT NULL,
	"status" text DEFAULT 'published' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "properties_slug_unique" UNIQUE("slug")
);
