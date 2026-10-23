import { z } from "zod";

/**
 * Centralised configuration access (PRD.md FR-063).
 *
 * This module never reads `process.env` at import time and never exposes
 * secrets. Callers pass an explicit source object, which keeps the schemas
 * pure and testable, and keeps server-only values out of client bundles.
 *
 * Variable names and exposure rules follow ARCHITECTURE.md 13.2 and API.md 14.
 */

/** Variables that are safe to expose to the browser. */
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url("is required and must be an absolute URL"),
});

/** Variables that must never reach the browser. */
export const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "must not be empty").optional(),
  RESEND_API_KEY: z.string().min(1, "must not be empty").optional(),
  CONTACT_EMAIL_TO: z.email("must be a valid email address").optional(),
  ADMIN_EMAIL_ALLOWLIST: z.string().min(1, "must not be empty").optional(),
  WHATSAPP_BUSINESS_NUMBER: z.string().min(1, "must not be empty").optional(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

/**
 * Raised when required configuration is missing or invalid.
 * The message names the offending variables so failures are actionable
 * (ARCHITECTURE.md 13.3).
 */
export class EnvValidationError extends Error {
  readonly issues: string[];

  constructor(scope: "client" | "server", issues: string[]) {
    super(
      `Invalid ${scope} environment configuration:\n${issues
        .map((issue) => `  - ${issue}`)
        .join("\n")}`,
    );
    this.name = "EnvValidationError";
    this.issues = issues;
  }
}

function formatIssues(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
}

/** Parses and validates the public configuration. */
export function parseClientEnv(source: Record<string, unknown>): ClientEnv {
  const result = clientEnvSchema.safeParse(source);
  if (!result.success) {
    throw new EnvValidationError("client", formatIssues(result.error));
  }
  return result.data;
}

/** Parses and validates the server-only configuration. */
export function parseServerEnv(source: Record<string, unknown>): ServerEnv {
  const result = serverEnvSchema.safeParse(source);
  if (!result.success) {
    throw new EnvValidationError("server", formatIssues(result.error));
  }
  return result.data;
}

const LOCAL_SITE_URL = "http://localhost:3000";

/**
 * Canonical site URL (ARCHITECTURE.md 13.4).
 *
 * Falls back to the local development URL so the project stays runnable
 * without configuration. Production deployments must set
 * `NEXT_PUBLIC_SITE_URL`; `npm run env:check` enforces that in CI.
 */
export function getSiteUrl(source: Record<string, unknown> = process.env): string {
  const value = source.NEXT_PUBLIC_SITE_URL;
  if (typeof value !== "string" || value.length === 0) {
    return LOCAL_SITE_URL;
  }
  return value.replace(/\/+$/, "");
}

/** Agency contact details that are safe to render publicly. */
export interface SiteContact {
  /** WhatsApp number in international format, when configured. */
  whatsappNumber: string | null;
  /** Agency inbox for contact form notifications, when configured. */
  contactEmail: string | null;
}

/** Reads the public contact configuration without failing when it is absent. */
export function getSiteContact(source: Record<string, unknown> = process.env): SiteContact {
  const whatsappNumber = source.WHATSAPP_BUSINESS_NUMBER;
  const contactEmail = source.CONTACT_EMAIL_TO;

  return {
    whatsappNumber:
      typeof whatsappNumber === "string" && whatsappNumber.length > 0
        ? whatsappNumber.replace(/[^\d]/g, "")
        : null,
    contactEmail: typeof contactEmail === "string" && contactEmail.length > 0 ? contactEmail : null,
  };
}
