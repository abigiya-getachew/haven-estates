import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/env";
import { getPublishedProperties } from "@/lib/db/queries";

/**
 * XML Sitemap (Item 14, PRD.md FR-074, ARCHITECTURE.md 13.4).
 *
 * Uses the canonical site URL rather than the request host.
 * Dynamically queries published property details and merges with core indexable routes.
 * Excludes admin, auth-only, demonstration, and draft routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/properties`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const { properties } = await getPublishedProperties({ pageSize: 100 });
    propertyRoutes = properties.map((prop) => ({
      url: `${siteUrl}/properties/${prop.slug}`,
      lastModified: prop.publishedAt ? new Date(prop.publishedAt) : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    console.warn("Could not query published properties for sitemap:", err);
  }

  return [...staticRoutes, ...propertyRoutes];
}
