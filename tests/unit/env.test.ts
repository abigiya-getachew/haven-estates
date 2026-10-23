import { describe, expect, it } from "vitest";

import { getSiteContact, getSiteUrl, parseClientEnv, parseServerEnv } from "@/lib/env";

describe("parseClientEnv", () => {
  it("accepts a complete public configuration", () => {
    const env = parseClientEnv({
      NEXT_PUBLIC_SITE_URL: "https://haven.example.com",
      NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "publishable-key",
    });

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://haven.example.com");
  });

  it("names the missing variable when configuration is incomplete", () => {
    expect(() => parseClientEnv({})).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });
});

describe("parseServerEnv", () => {
  it("treats optional integrations as optional", () => {
    expect(parseServerEnv({})).toEqual({});
  });

  it("rejects a malformed contact address", () => {
    expect(() => parseServerEnv({ CONTACT_EMAIL_TO: "not-an-email" })).toThrow(/CONTACT_EMAIL_TO/);
  });
});

describe("getSiteUrl", () => {
  it("falls back to the local development URL when unset", () => {
    expect(getSiteUrl({})).toBe("http://localhost:3000");
  });

  it("removes a trailing slash from the configured URL", () => {
    expect(getSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://haven.example.com/" })).toBe(
      "https://haven.example.com",
    );
  });
});

describe("getSiteContact", () => {
  it("returns null when contact details are not configured", () => {
    expect(getSiteContact({})).toEqual({ whatsappNumber: null, contactEmail: null });
  });

  it("normalises the WhatsApp number to digits only", () => {
    expect(getSiteContact({ WHATSAPP_BUSINESS_NUMBER: "+251 90 000 0000" }).whatsappNumber).toBe(
      "251900000000",
    );
  });
});
