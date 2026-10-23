import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Button primitives (DESIGN.md 8.2 - 8.4).
 *
 * Three variants with meaningful differences: primary for the main action of
 * a context, secondary for a supporting action, text for navigation.
 */

export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "compact" | "standard" | "large";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 ease-standard disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-brand-primary text-text-inverse hover:bg-brand-primary-hover",
  secondary: "border border-border-strong bg-surface text-text-primary hover:bg-surface-muted",
  text: "rounded-sm px-0 text-text-primary underline-offset-4 hover:text-text-secondary hover:underline",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  // A 44px minimum touch target on small screens (DESIGN.md 14.11),
  // 40px compact height from tablet width upwards (DESIGN.md 8.3).
  compact: "h-11 px-4 text-body-sm sm:h-10",
  standard: "h-12 px-6 text-body",
  large: "h-14 px-8 text-body-lg",
};

/** Builds the class list for a button variant and size. */
export function buttonVariants({
  variant = "primary",
  size = "standard",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Primary action control. */
export function Button({
  variant = "primary",
  size = "standard",
  className,
  ...props
}: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}

export interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

/** Link styled as a button, used for navigation actions. */
export function ButtonLink({
  variant = "primary",
  size = "standard",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}
