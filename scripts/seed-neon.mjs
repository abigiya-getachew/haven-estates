/**
 * Development seed script — HAVEN Estates Addis.
 *
 * Inserts a set of demonstration property listings that cover the full range
 * of filter combinations (DATABASE.md §14.2). Safe to rerun; uses
 * `ON CONFLICT DO UPDATE` so slugs are idempotent.
 *
 * NEVER run this against production without explicit approval.
 * Seed records are clearly fictional (DATABASE.md §14.3).
 *
 * Usage:
 *   npm run db:seed
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/lib/db/schema.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("Error: DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(databaseUrl);
const db = drizzle(sql, { schema });

/** Deterministic demo slugs (DATABASE.md §14.4). */
const SEED_PROPERTIES = [
  {
    slug: "the-obsidian-terraces-bole",
    title: "The Obsidian Terraces",
    description:
      "A rare duplex penthouse suspended above Bole Atlas featuring 360-degree panoramic glass, Italian imported marble, expansive private terraces, and dedicated secure elevator access. [DEMO LISTING]",
    transactionType: "sale",
    propertyType: "apartment",
    location: "Bole, Addis Ababa",
    priceAmount: "680000.00",
    priceCurrency: "USD",
    bedrooms: 4,
    bathrooms: 4,
    areaValue: "385.00",
    areaUnit: "sqm",
    featuredImageUrl: "/images/real-estate/bole-penthouse.jpg",
    status: "published",
    isFeatured: true,
  },
  {
    slug: "sanctuary-pavilions-old-airport",
    title: "Sanctuary Pavilions",
    description:
      "A private walled estate situated in the diplomatic enclave of Old Airport. Built with indigenous Ethiopian stone and warm teak, surrounding an internal courtyard oasis. [DEMO LISTING]",
    transactionType: "sale",
    propertyType: "villa",
    location: "Old Airport, Addis Ababa",
    priceAmount: "1250000.00",
    priceCurrency: "USD",
    bedrooms: 5,
    bathrooms: 6,
    areaValue: "620.00",
    areaUnit: "sqm",
    featuredImageUrl: "/images/real-estate/old-airport-villa.jpg",
    status: "published",
    isFeatured: true,
  },
  {
    slug: "the-zenith-loft-kazanchis",
    title: "The Zenith Loft",
    description:
      "Tailored for international executives and diplomats, this minimalist light-filled loft provides immediate proximity to UNECA and major embassies with floor-to-ceiling city views. [DEMO LISTING]",
    transactionType: "rent",
    propertyType: "apartment",
    location: "Kazanchis, Addis Ababa",
    priceAmount: "3800.00",
    priceCurrency: "USD",
    bedrooms: 2,
    bathrooms: 2,
    areaValue: "195.00",
    areaUnit: "sqm",
    featuredImageUrl: "/images/real-estate/kazanchis-loft.jpg",
    status: "published",
    isFeatured: true,
  },
  {
    slug: "entoto-skyline-retreat",
    title: "Entoto Skyline Villa",
    description:
      "Nestled against the tranquil eucalyptus forest of the Entoto foothills, this architectural sanctuary offers pure air, dramatic vistas over the metropolitan basin, and timeless stone craft. [DEMO LISTING]",
    transactionType: "sale",
    propertyType: "house",
    location: "Yeka, Addis Ababa",
    priceAmount: "890000.00",
    priceCurrency: "USD",
    bedrooms: 4,
    bathrooms: 5,
    areaValue: "480.00",
    areaUnit: "sqm",
    featuredImageUrl: "/images/real-estate/entoto-retreat.jpg",
    status: "published",
    isFeatured: true,
  },
  {
    slug: "bole-medhanialem-residence",
    title: "The Medhanialem Suite",
    description:
      "Contemporary open-plan living steps from premier dining and retail avenues. Features acoustic double-glazing, gourmet kitchen with Miele appliances, and wrap-around balconies. [DEMO LISTING]",
    transactionType: "rent",
    propertyType: "apartment",
    location: "Bole, Addis Ababa",
    priceAmount: "2900.00",
    priceCurrency: "USD",
    bedrooms: 3,
    bathrooms: 3,
    areaValue: "240.00",
    areaUnit: "sqm",
    featuredImageUrl: "/images/real-estate/luxury-living-interior.jpg",
    status: "published",
    isFeatured: true,
  },
  {
    slug: "bisrate-gabriel-manor",
    title: "Bisrate Gabriel Manor",
    description:
      "A grand multi-level family residence with double-height reception halls, manicured perimeter gardens, and seamless indoor-outdoor entertaining spaces. [DEMO LISTING]",
    transactionType: "sale",
    propertyType: "villa",
    location: "Bisrate Gabriel, Addis Ababa",
    priceAmount: "1100000.00",
    priceCurrency: "USD",
    bedrooms: 5,
    bathrooms: 5,
    areaValue: "560.00",
    areaUnit: "sqm",
    featuredImageUrl: "/images/real-estate/modern-villa-exterior.jpg",
    status: "published",
    isFeatured: false,
  },
  // --- Non-featured / draft coverage for access-control tests (DATABASE.md §14.2)
  {
    slug: "commercial-lekkos-plaza-demo",
    title: "Lekkos Plaza — Commercial Space",
    description:
      "Prime ground-floor commercial unit in the Lekkos business district. Open plan with full utilities. [DEMO LISTING]",
    transactionType: "rent",
    propertyType: "commercial",
    location: "Lebu, Addis Ababa",
    priceAmount: "45000.00",
    priceCurrency: "ETB",
    bedrooms: null,
    bathrooms: null,
    areaValue: "120.00",
    areaUnit: "sqm",
    featuredImageUrl: null,
    status: "published",
    isFeatured: false,
  },
  {
    slug: "qera-land-parcel-demo",
    title: "Qera Land Parcel",
    description:
      "Undeveloped residential land in a rapidly developing area. Title deed available. [DEMO LISTING — DRAFT]",
    transactionType: "sale",
    propertyType: "land",
    location: "Qera, Addis Ababa",
    priceAmount: "2800000.00",
    priceCurrency: "ETB",
    bedrooms: null,
    bathrooms: null,
    areaValue: "800.00",
    areaUnit: "sqm",
    featuredImageUrl: null,
    status: "draft",
    isFeatured: false,
  },
];

async function seed() {
  console.log("🌱 Seeding database with demonstration properties...\n");

  for (const item of SEED_PROPERTIES) {
    const publishedAt =
      item.status === "published" ? new Date() : null;

    let attempts = 0;
    while (attempts < 5) {
      try {
        attempts++;
        await db
          .insert(schema.properties)
          .values({ ...item, publishedAt })
          .onConflictDoUpdate({
            target: schema.properties.slug,
            set: {
              title: item.title,
              description: item.description,
              transactionType: item.transactionType,
              propertyType: item.propertyType,
              location: item.location,
              priceAmount: item.priceAmount,
              priceCurrency: item.priceCurrency,
              bedrooms: item.bedrooms,
              bathrooms: item.bathrooms,
              areaValue: item.areaValue,
              areaUnit: item.areaUnit,
              featuredImageUrl: item.featuredImageUrl,
              status: item.status,
              isFeatured: item.isFeatured,
              publishedAt,
              updatedAt: new Date(),
            },
          });
        break;
      } catch (e) {
        if (attempts >= 5) throw e;
        console.warn(`Retry attempt ${attempts} for ${item.slug}...`);
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    const icon = item.status === "draft" ? "📋" : "✓";
    console.log(`${icon} ${item.title} (${item.slug}) [${item.status}]`);
  }

  console.log(`\n✅ Seed complete. ${SEED_PROPERTIES.length} properties processed.`);
  console.log(
    "   Published:",
    SEED_PROPERTIES.filter((p) => p.status === "published").length,
  );
  console.log(
    "   Draft:    ",
    SEED_PROPERTIES.filter((p) => p.status === "draft").length,
  );
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
