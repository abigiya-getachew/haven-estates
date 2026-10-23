import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/env";

export interface SharedMetadataInput {
  title: string;
  description: string;
  pathname?: string;
  openGraphImage?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  openGraphType?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

/**
 * Shared metadata helper (Item 8).
 * Ensures consistency across title, description, canonical URL, OpenGraph, and Twitter cards.
 */
export function constructMetadata({
  title,
  description,
  pathname = "/",
  openGraphImage,
  openGraphType = "website",
  publishedTime,
  noIndex = false,
}: SharedMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonicalUrl = `${siteUrl}${cleanPath === "/" ? "" : cleanPath}`;

  const defaultOgImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(
    title,
  )}&desc=${encodeURIComponent(description)}`;

  const finalImageUrl = openGraphImage?.url || defaultOgImageUrl;
  const imageWidth = openGraphImage?.width ?? 1200;
  const imageHeight = openGraphImage?.height ?? 630;
  const imageAlt = openGraphImage?.alt ?? title;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "HAVEN Estates Addis",
      locale: "en_ET",
      type: openGraphType,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: finalImageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [finalImageUrl],
    },
  };
}
