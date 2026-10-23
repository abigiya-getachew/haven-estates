/**
 * Shared validation schemas for contact and property inquiries (Item 12, API.md §6).
 */
import { z } from "zod";

const MAX_NAME = 160;
const MAX_MESSAGE = 5000;
const MAX_PHONE = 50;
const MAX_EMAIL = 254;

export const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(MAX_NAME, `Name must not exceed ${MAX_NAME} characters.`),

    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(MAX_EMAIL, `Email must not exceed ${MAX_EMAIL} characters.`)
      .optional()
      .or(z.literal("")),

    phone: z
      .string()
      .trim()
      .max(MAX_PHONE, `Phone must not exceed ${MAX_PHONE} characters.`)
      .optional()
      .or(z.literal("")),

    message: z
      .string()
      .trim()
      .min(1, "Message is required.")
      .max(MAX_MESSAGE, `Message must not exceed ${MAX_MESSAGE} characters.`),

    /** UUID of the related property, when the inquiry is property-specific. */
    propertyId: z
      .string()
      .uuid("Property ID must be a valid UUID.")
      .optional()
      .or(z.literal("").transform(() => undefined)),

    propertyType: z.string().trim().max(100).optional(),
    preferredLocation: z.string().trim().max(100).optional(),

    /** Honeypot field for spam detection. Must be empty. */
    website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  })
  .refine(
    (data) =>
      (data.email !== undefined && data.email !== "") ||
      (data.phone !== undefined && data.phone !== ""),
    {
      message:
        "Please provide at least one contact method: an email address or a phone number.",
      path: ["email"],
    },
  );

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  propertyId?: unknown;
  propertyType?: unknown;
  preferredLocation?: unknown;
  website?: unknown;
};
