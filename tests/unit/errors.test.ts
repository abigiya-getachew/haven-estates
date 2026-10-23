import { describe, expect, it } from "vitest";

import { AppError, ERROR_CODES, toErrorResponse } from "@/lib/errors";

describe("toErrorResponse", () => {
  it("maps an application error to its documented status and code", () => {
    const result = toErrorResponse(
      new AppError(ERROR_CODES.VALIDATION_ERROR, "Please check the submitted information."),
    );

    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Please check the submitted information.",
      },
    });
  });

  it("includes field errors when they are provided", () => {
    const result = toErrorResponse(
      new AppError(ERROR_CODES.VALIDATION_ERROR, "Invalid input.", {
        fields: { email: "Enter a valid email address." },
      }),
    );

    expect(result.body.error.fields).toEqual({ email: "Enter a valid email address." });
  });

  it("does not leak internal details for unexpected failures", () => {
    const result = toErrorResponse(new Error("connection string: secret"));

    expect(result.status).toBe(500);
    expect(result.body.error.code).toBe("INTERNAL_ERROR");
    expect(result.body.error.message).not.toContain("secret");
  });
});
