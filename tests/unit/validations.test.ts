import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validations/contact";
import { propertyFiltersSchema } from "@/lib/validations/properties";

describe("contactSchema", () => {
  it("validates a complete, valid inquiry", () => {
    const input = {
      name: "Liya Kebede",
      email: "liya@example.com",
      phone: "+251911000000",
      message: "I am interested in scheduling a private viewing.",
    };
    const res = contactSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("requires a name", () => {
    const input = {
      name: "   ",
      email: "liya@example.com",
      message: "Inquiry message",
    };
    const res = contactSchema.safeParse(input);
    expect(res.success).toBe(false);
  });

  it("requires at least one contact method (email or phone)", () => {
    const input = {
      name: "Abebe Bikila",
      message: "Please contact me",
    };
    const res = contactSchema.safeParse(input);
    expect(res.success).toBe(false);
  });

  it("accepts phone-only contact method", () => {
    const input = {
      name: "Abebe Bikila",
      phone: "+251911223344",
      message: "Please call me back",
    };
    const res = contactSchema.safeParse(input);
    expect(res.success).toBe(true);
  });

  it("rejects an invalid email format", () => {
    const input = {
      name: "Almaz",
      email: "not-an-email",
      message: "Hello",
    };
    const res = contactSchema.safeParse(input);
    expect(res.success).toBe(false);
  });

  it("validates optional UUID propertyId correctly", () => {
    const validUuid = "123e4567-e89b-12d3-a456-426614174000";
    const res = contactSchema.safeParse({
      name: "Marcus",
      email: "marcus@example.com",
      message: "Tour please",
      propertyId: validUuid,
    });
    expect(res.success).toBe(true);

    const invalidRes = contactSchema.safeParse({
      name: "Marcus",
      email: "marcus@example.com",
      message: "Tour please",
      propertyId: "not-a-uuid",
    });
    expect(invalidRes.success).toBe(false);
  });
});

describe("propertyFiltersSchema", () => {
  it("accepts valid filter params and defaults pagination", () => {
    const parsed = propertyFiltersSchema.parse({
      transactionType: "sale",
      propertyType: "villa",
      location: "Bole",
    });

    expect(parsed.transactionType).toBe("sale");
    expect(parsed.propertyType).toBe("villa");
    expect(parsed.page).toBe(1);
    expect(parsed.pageSize).toBe(12);
  });

  it("transforms and validates numeric price filters", () => {
    const parsed = propertyFiltersSchema.parse({
      minPrice: "100000",
      maxPrice: "500000",
      bedrooms: "3",
    });

    expect(parsed.minPrice).toBe(100000);
    expect(parsed.maxPrice).toBe(500000);
    expect(parsed.bedrooms).toBe(3);
  });

  it("rejects negative price values", () => {
    const res = propertyFiltersSchema.safeParse({
      minPrice: "-500",
    });
    expect(res.success).toBe(false);
  });

  it("caps pageSize within allowable bounds", () => {
    const res = propertyFiltersSchema.safeParse({
      pageSize: "100", // exceeds max 48
    });
    expect(res.success).toBe(false);
  });
});
