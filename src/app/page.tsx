import { SurrealOnePage } from "@/components/home/surreal-one-page";
import { getSiteContact } from "@/lib/env";
import { getFeaturedProperties, type PropertySummary } from "@/lib/db/queries";

import type { Metadata } from "next";
import { connection } from "next/server";
import { constructMetadata } from "@/lib/metadata";
import { getSiteUrl } from "@/lib/env";

export const instant = false;

export const metadata: Metadata = constructMetadata({
  title: "HAVEN Estates Addis | Architectural Sanctuaries & Prime Residences",
  description:
    "Curated residential sales, bespoke leasing, and architectural compounds across Addis Ababa's prime diplomatic and residential districts.",
  pathname: "/",
});

/**
 * Homepage — Pure Surrealism One-Page Website for HAVEN Estates Addis.
 *
 * Implements the 4-part architectural surrealism journey:
 * 1. Hero — A Different Kind of Home (Luminous Moon in Living Room)
 * 2. Featured Properties — Spaces Worth Discovering (Connected directly to Neon DB)
 * 3. The HAVEN Perspective — More Than an Address (Staircase into Lavender Sky)
 * 4. The Invitation — Find Your Place (Monumental Twilight Doorway & Verified Inquiry)
 */
export default async function HomePage() {
  await connection();
  const { whatsappNumber, contactEmail } = getSiteContact();
  let featuredProperties: PropertySummary[] = [];
  try {
    featuredProperties = await getFeaturedProperties(3);
  } catch (err) {
    console.warn("Could not load featured properties from database:", err);
  }

  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#organization`,
        name: "HAVEN Estates Addis",
        url: siteUrl,
        logo: `${siteUrl}/icon-512x512.png`,
        description:
          "Curated residential sales, bespoke leasing, and architectural compounds across Addis Ababa's prime diplomatic and residential districts.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressRegion: "Addis Ababa",
          addressCountry: "ET",
        },
        telephone: "+251911234567",
        email: contactEmail || "advisory@haven-estates.com",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "HAVEN Estates Addis",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/properties?transaction_type={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SurrealOnePage
        featuredProperties={featuredProperties}
        whatsappNumber={whatsappNumber}
        contactEmail={contactEmail}
      />
    </>
  );
}
