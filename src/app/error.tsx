"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Route-level error boundary (DESIGN.md 12.11).
 *
 * The visitor receives a plain explanation and a way to retry. Internal
 * details are not exposed (ARCHITECTURE.md 14.2).
 */
export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex flex-col items-start gap-6 py-20 md:py-28">
      <div className="flex max-w-prose flex-col gap-3">
        <h1 className="text-h1">Something went wrong</h1>
        <p className="text-body-lg text-text-secondary">
          This page could not be loaded. Please try again, and contact the agency if the problem
          continues.
        </p>
      </div>

      <Button onClick={reset}>Try again</Button>
    </Container>
  );
}
