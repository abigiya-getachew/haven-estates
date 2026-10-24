#!/usr/bin/env node
/**
 * Validates the environment configuration for local development, CI, and
 * deployment (ARCHITECTURE.md 13.3, API.md 14).
 *
 * Fails with a clear message when mandatory configuration is missing. It never
 * substitutes insecure defaults and never prints secret values.
 *
 * Usage: npm run env:check
 */
import nextEnv from "@next/env";

import { parseClientEnv, parseServerEnv } from "../src/lib/env.ts";

const { loadEnvConfig } = nextEnv;

// Load the same environment files, with the same precedence, that Next.js
// loads for the application itself.
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

const REQUIRED_VARIABLES = ["NEXT_PUBLIC_SITE_URL", "DATABASE_URL"];

const OPTIONAL_VARIABLES = [
  "RESEND_API_KEY",
  "CONTACT_EMAIL_TO",
  "ADMIN_EMAIL_ALLOWLIST",
  "WHATSAPP_BUSINESS_NUMBER",
];

const problems = [];

try {
  parseClientEnv(process.env);
} catch (error) {
  problems.push(...error.issues);
}

try {
  parseServerEnv(process.env);
} catch (error) {
  problems.push(...error.issues);
}

if (problems.length > 0) {
  console.error("Environment configuration is incomplete:\n");
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  console.error("\nCopy .env.example to .env.local and fill in the missing values.");
  process.exit(1);
}

console.log("Environment configuration is valid.");
console.log(`  Required: ${REQUIRED_VARIABLES.join(", ")}`);

const configuredOptional = OPTIONAL_VARIABLES.filter(
  (name) => typeof process.env[name] === "string" && process.env[name].trim().length > 0,
);

console.log(
  configuredOptional.length > 0
    ? `  Configured optional: ${configuredOptional.join(", ")}`
    : "  No optional integrations are configured.",
);