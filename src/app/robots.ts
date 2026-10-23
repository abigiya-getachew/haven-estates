import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/env";

/**
 * Indexing rules (PRD.md FR-074).
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
