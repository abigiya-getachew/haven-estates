import type { Metadata } from "next";
import { Suspense } from "react";

import { PropertiesClient } from "@/components/properties/properties-client";
import { getPublishedProperties, type PropertySummary } from "@/lib/db/queries";

import { constructMetadata } from "@/lib/metadata";

export const instant = false;

export const metadata: Metadata = constructMetadata({
  title: "Curated Residential Properties | HAVEN Estates Addis",
  description:
    "Explore luxury apartments, architectural compounds, and premier penthouses for sale and rent in Addis Ababa's prime neighborhoods.",
  pathname: "/properties",
});

export default async function PropertiesPage() {
  let initialProperties: PropertySummary[] = [];
  try {
    const result = await getPublishedProperties({ pageSize: 48 });
    initialProperties = result.properties;
  } catch (err) {
    console.warn("Could not retrieve published properties from database:", err);
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F5F0] py-24 text-center">Loading properties...</div>}>
      <PropertiesClient initialProperties={initialProperties} />
    </Suspense>
  );
}
