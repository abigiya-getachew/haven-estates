/**
 * POST /api/inquiries — legacy endpoint (deprecated).
 *
 * The canonical endpoint is POST /api/contact (API.md §6, §20).
 * This handler forwards requests for backward compatibility.
 * Callers should migrate to /api/contact.
 */
import { NextRequest } from "next/server";

import { POST as contactPost } from "@/app/api/contact/route";

export async function POST(req: NextRequest) {
  // Re-use the canonical /api/contact handler
  return contactPost(req);
}
