/**
 * Navigation configuration for HAVEN Estates Addis.
 *
 * Header navigation is kept minimal and refined (luxury editorial style).
 * Footer categorizes links clearly for discovery.
 */

export const HEADER_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_EXPLORE_ITEMS = [
  { label: "All Properties", href: "/properties" },
  { label: "Buy / For Sale", href: "/properties?transaction_type=sale" },
  { label: "Executive Rent", href: "/properties?transaction_type=rent" },
] as const;

export const FOOTER_AGENCY_ITEMS = [
  { label: "About HAVEN", href: "/about" },
  { label: "Private Inquiries", href: "/contact" },
] as const;

// Backwards-compatible export for any components referencing NAVIGATION_ITEMS
export const NAVIGATION_ITEMS = HEADER_NAV_ITEMS;

export type NavigationItem = (typeof HEADER_NAV_ITEMS)[number];
