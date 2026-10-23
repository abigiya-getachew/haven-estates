import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button, ButtonLink } from "@/components/ui/button";

describe("Button", () => {
  it("renders an accessible button", () => {
    render(<Button>Send inquiry</Button>);

    expect(screen.getByRole("button", { name: "Send inquiry" })).toBeInTheDocument();
  });

  it("disables interaction when the disabled attribute is set", () => {
    render(<Button disabled>Send inquiry</Button>);

    expect(screen.getByRole("button", { name: "Send inquiry" })).toBeDisabled();
  });
});

describe("ButtonLink", () => {
  it("renders a link with an accessible name", () => {
    render(<ButtonLink href="/properties">Browse properties</ButtonLink>);

    expect(screen.getByRole("link", { name: "Browse properties" })).toHaveAttribute(
      "href",
      "/properties",
    );
  });
});
