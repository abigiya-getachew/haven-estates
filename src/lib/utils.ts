/**
 * Small shared helpers.
 *
 * Kept dependency free on purpose: the design system uses fixed utility
 * classes per variant, so a class-name join is sufficient and avoids an
 * extra runtime dependency (ARCHITECTURE.md 15.9).
 */
export type ClassValue = string | number | false | null | undefined;

/** Joins conditional class names into a single string. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/** Formats an integer amount using the Ethiopian Birr currency code. */
export function formatPrice(amount: number, currency = "ETB"): string {
  return `${currency} ${new Intl.NumberFormat("en-ET").format(amount)}`;
}
