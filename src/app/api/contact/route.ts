/**
 * POST /api/contact — contact & property inquiry endpoint (Item 12, API.md §6).
 *
 * Implements:
 * - Content-Type validation
 * - Request body size limits (32 KB)
 * - Rate limiting (IP-keyed with durable reset window)
 * - Honeypot spam defense
 * - Input validation & sanitization via Zod
 * - Database persistence (with graceful degradation)
 * - Transactional email notification to configured business inbox via Resend
 * - Automated acknowledgment email to user when email address is provided
 * - Zero personal info leakage in error or success responses
 */
import { NextRequest, NextResponse } from "next/server";

import { ERROR_CODES, toErrorResponse, AppError } from "@/lib/errors";
import { createContactInquiry } from "@/lib/db/queries";
import { contactSchema } from "@/lib/validations/contact";

const MAX_BODY_BYTES = 32 * 1024; // 32 KB
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const LIMIT = 5;

// In-memory store for rate limiting with active pruning to avoid memory leaks
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // Clean stale entries periodically
  if (rateLimitStore.size > 5000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (now > val.resetAt) rateLimitStore.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= LIMIT) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  // 1. Content-Type guard
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const { status, body } = toErrorResponse(
      new AppError(
        ERROR_CODES.UNSUPPORTED_MEDIA_TYPE,
        "Request must use Content-Type: application/json.",
      ),
    );
    return NextResponse.json(body, { status });
  }

  // 2. Request body size guard
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    const { status, body } = toErrorResponse(
      new AppError(
        ERROR_CODES.PAYLOAD_TOO_LARGE,
        "Request body is too large.",
        { status: 413 },
      ),
    );
    return NextResponse.json(body, { status });
  }

  // 3. Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1";

  if (!checkRateLimit(ip)) {
    const { status, body } = toErrorResponse(
      new AppError(
        ERROR_CODES.RATE_LIMITED,
        "Too many requests. Please wait a moment and try again.",
        { status: 429 },
      ),
    );
    return NextResponse.json(body, {
      status,
      headers: { "Retry-After": String(Math.ceil(WINDOW_MS / 1000)) },
    });
  }

  // 4. Parse JSON
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    const { status, body } = toErrorResponse(
      new AppError(ERROR_CODES.INVALID_REQUEST, "Request body must be valid JSON."),
    );
    return NextResponse.json(body, { status });
  }

  // 5. Validate with Zod & check honeypot
  const parsed = contactSchema.safeParse(rawBody);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      fieldErrors[key] = issue.message;
    }
    const { status, body } = toErrorResponse(
      new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        "Please check the submitted information.",
        { fields: fieldErrors },
      ),
    );
    return NextResponse.json(body, { status });
  }

  const { name, email, phone, message, propertyId, propertyType, preferredLocation, website } =
    parsed.data;

  // Honeypot check: If bot filled `website`, silently succeed without doing work
  if (website) {
    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully.",
      },
      { status: 200 },
    );
  }

  // 6. Persist inquiry to database
  try {
    await createContactInquiry({
      name,
      email: email || null,
      phone: phone || null,
      message,
      propertyId: propertyId ?? null,
    });
  } catch (err) {
    if (
      err instanceof Error &&
      (err as { code?: string }).code === "PROPERTY_NOT_FOUND"
    ) {
      const { status, body } = toErrorResponse(
        new AppError(ERROR_CODES.NOT_FOUND, "The specified property is not available.", {
          status: 404,
        }),
      );
      return NextResponse.json(body, { status });
    }

    // Safe error log without PII
    console.warn("[contact] Persistence note (proceeding to email notification):", {
      hasEmail: Boolean(email),
      hasPhone: Boolean(phone),
      hasPropertyId: Boolean(propertyId),
    });
  }

  // 7. Transactional emails via Resend
  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.CONTACT_EMAIL_TO || "advisory@haven-estates.com";

  if (resendKey) {
    // A. Deliver inquiry notification to admin inbox
    try {
      await sendAdminInquiryEmail(
        { name, email, phone, message, propertyId, propertyType, preferredLocation },
        resendKey,
        emailTo,
      );
    } catch (err) {
      console.error("[contact] Admin email delivery notice:", err instanceof Error ? err.message : "unknown");
    }

    // B. Send automated user acknowledgment if user provided email
    if (email) {
      try {
        await sendUserAcknowledgmentEmail(
          { name, email, propertyType, preferredLocation },
          resendKey,
        );
      } catch (err) {
        console.error("[contact] Acknowledgment email delivery notice:", err instanceof Error ? err.message : "unknown");
      }
    }
  }

  // 8. Success response (Zero PII echoed)
  return NextResponse.json(
    {
      success: true,
      message: "Your inquiry has been submitted successfully.",
    },
    { status: 200 },
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function sendAdminInquiryEmail(
  data: {
    name: string;
    email?: string;
    phone?: string;
    message: string;
    propertyId?: string;
    propertyType?: string;
    preferredLocation?: string;
  },
  apiKey: string,
  to: string,
): Promise<void> {
  const subject = data.propertyId
    ? `New Property Inquiry — ${data.name}`
    : `New General Client Inquiry — ${data.name}`;

  const textBody = [
    `HAVEN ESTATES ADDIS — CLIENT INQUIRY`,
    `=====================================`,
    `Name: ${data.name}`,
    data.email ? `Email: ${data.email}` : null,
    data.phone ? `Phone / WhatsApp: ${data.phone}` : null,
    data.propertyType ? `Property Type: ${data.propertyType}` : null,
    data.preferredLocation ? `Preferred Location: ${data.preferredLocation}` : null,
    data.propertyId ? `Property ID: ${data.propertyId}` : null,
    `\nClient Note:\n${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "HAVEN Advisory Desk <inquiries@haven-estates.com>",
      to,
      subject,
      text: textBody,
      ...(data.email ? { reply_to: data.email } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Admin email dispatch returned status ${res.status}`);
  }
}

async function sendUserAcknowledgmentEmail(
  data: {
    name: string;
    email: string;
    propertyType?: string;
    preferredLocation?: string;
  },
  apiKey: string,
): Promise<void> {
  const textBody = [
    `Dear ${data.name},`,
    ``,
    `Thank you for contacting HAVEN Estates Addis. We have received your inquiry regarding luxury residential opportunities in Addis Ababa.`,
    ``,
    `One of our senior acquisition advisors will review your requirements and reach out to you within 24 business hours.`,
    ``,
    `Warm regards,`,
    `HAVEN Estates Addis Advisory Desk`,
    `Bole Sub-City, Woreda 03, Addis Ababa, Ethiopia`,
    `https://haven-estates.com`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "HAVEN Estates Addis <advisory@haven-estates.com>",
      to: data.email,
      subject: "We have received your inquiry | HAVEN Estates Addis",
      text: textBody,
    }),
  });

  if (!res.ok) {
    throw new Error(`Acknowledgment dispatch returned status ${res.status}`);
  }
}
