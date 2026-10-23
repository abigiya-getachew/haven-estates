import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Shared layout primitives (DESIGN.md 8.14, 8.15).
 */

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  /** Use the wide editorial width instead of the standard content width. */
  wide?: boolean;
}

/**
 * Centred content container with responsive gutters (DESIGN.md 5.2, 5.3).
 */
export function Container({ wide = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-content px-4 xs:px-5 sm:px-8 lg:px-10 xl:px-12",
        wide && "max-w-wide",
        className,
      )}
      {...props}
    />
  );
}

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  /** Remove the default vertical section spacing. */
  flush?: boolean;
}

/** Vertical rhythm for major page sections (DESIGN.md 5.4). */
export function Section({ flush = false, className, ...props }: SectionProps) {
  return <section className={cn(!flush && "py-12 md:py-20 lg:py-24", className)} {...props} />;
}

export interface SectionHeadingProps {
  /** Optional short label above the heading. */
  eyebrow?: string;
  heading: string;
  description?: string;
  /** Optional supporting action rendered next to the heading. */
  action?: ReactNode;
  /** Heading level, defaulting to `h2` for section-level headings. */
  as?: "h1" | "h2" | "h3";
  className?: string;
}

/**
 * Consistent section heading (DESIGN.md 8.14).
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  action,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col gap-3 md:flex-row md:items-end md:justify-between", className)}
    >
      <div className="flex flex-col gap-2">
        {eyebrow ? (
          <p className="text-label font-medium tracking-wide text-brand-accent uppercase">
            {eyebrow}
          </p>
        ) : null}
        <Heading className="text-h2">{heading}</Heading>
        {description ? (
          <p className="max-w-prose text-body-lg text-text-secondary">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
