/**
 * Supabase database types.
 *
 * These types mirror the PostgreSQL schema defined in DATABASE.md. The schema
 * is created in the database phase; the types are regenerated from the
 * database at that point and must not be hand-edited afterwards
 * (AGENTS.md 20.3, generated artifacts).
 */
export interface Json {
  [key: string]: Json | undefined;
}

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      transaction_type: "sale" | "rent";
    };
    CompositeTypes: Record<string, never>;
  };
}

/** Transaction type values allowed by the data model (DATABASE.md 5.5). */
export const TRANSACTION_TYPES = ["sale", "rent"] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];
