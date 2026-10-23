/**
 * Site level values that must stay stable while a page is prerendered.
 *
 * `cacheComponents` is enabled, so reading the current time during
 * prerendering is treated as an unstable value. Caching the value keeps the
 * footer static while still showing the correct year.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}
