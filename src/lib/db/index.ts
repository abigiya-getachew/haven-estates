import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

/**
 * Server-side Neon/Drizzle database client (ARCHITECTURE.md §8, DATABASE.md §2.2).
 *
 * `server-only` ensures this module cannot be imported into client bundles.
 * DATABASE_URL must be set in the server environment; the application will
 * throw at startup if it is absent, preventing silent misconfigurations.
 */

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. " +
      "Add it to your .env file (see .env.example). " +
      "Never expose it through a NEXT_PUBLIC_ variable.",
  );
}

export const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
