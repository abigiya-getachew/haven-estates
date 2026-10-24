import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button, ButtonLink } from "@/components/ui/button";

describe("Button", () => {
  it("renders an accessible button", () => {
    const { container } = render(<Button>Send inquiry</Button>);

    const button = container.querySelector("button");
    expect(button).toBeInTheDocument();
  });

  it("disables interaction when the disabled attribute is set", () => {
    const { container } = render(<Button disabled>Send inquiry</Button>);

    const button = container.querySelector("button");
    expect(button).toBeDisabled();
  });
});

describe("ButtonLink", () => {
  it("renders a link with an accessible name", () => {
    const { container } = render(<ButtonLink href="/properties">Browse properties</ButtonLink>);

    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/properties");
  });
});
