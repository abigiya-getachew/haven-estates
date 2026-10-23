/**
 * GET /api/properties — retrieve published properties with validated filters
 * (API.md §5.2, ARCHITECTURE.md §9.2).
 *
 * This endpoint is optional; server-rendered pages use the data-access layer
 * directly. It is provided for any client-side filter interaction that needs
 * fresh results without a full page reload.
 */
import { NextRequest, NextResponse } from "next/server";

import { toErrorResponse } from "@/lib/errors";
import { getPublishedProperties } from "@/lib/db/queries";
import { propertyFiltersSchema } from "@/lib/validations/properties";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const parsed = propertyFiltersSchema.safeParse({
    transactionType: searchParams.get("transaction_type") ?? undefined,
    propertyType: searchParams.get("property_type") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    minPrice: searchParams.get("min_price") ?? undefined,
    maxPrice: searchParams.get("max_price") ?? undefined,
    bedrooms: searchParams.get("bedrooms") ?? undefined,
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("page_size") ?? undefined,
  });

  if (!parsed.success) {
    const { status, body } = toErrorResponse(
      Object.assign(new Error("Invalid filter parameters."), {
        code: "VALIDATION_ERROR",
        status: 400,
        fields: Object.fromEntries(
          parsed.error.issues.map((i) => [i.path.join("."), i.message]),
        ),
      }),
    );
    return NextResponse.json(body, { status });
  }

  try {
    const result = await getPublishedProperties(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[GET /api/properties] Failed to fetch properties:", {
      error: error instanceof Error ? error.message : "unknown",
    });
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
