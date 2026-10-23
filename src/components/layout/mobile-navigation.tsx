"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAVIGATION_ITEMS } from "@/components/layout/navigation";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation (DESIGN.md 9.4).
 *
 * A disclosure button with an accessible name and expanded state. The panel
 * closes on Escape and whenever the route changes, and never traps keyboard
 * focus.
 */
export function MobileNavigation() {
  const pathname = usePathname();
  // The panel is open only for the route it was opened on, so navigating away
  // closes it without an effect that resets state.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isOpen = openedAt === pathname;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenedAt(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpenedAt(isOpen ? null : pathname)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-strong bg-surface text-text-primary transition-colors duration-200 ease-standard hover:bg-surface-muted"
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        >
          {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className={cn(
          "absolute inset-x-0 top-full z-40 border-b border-border bg-background shadow-overlay",
          "px-4 pt-2 pb-6 xs:px-5",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpenedAt(null)}
                  className="flex h-12 items-center border-b border-border text-body-lg font-medium text-text-primary last:border-b-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6">
          <ButtonLink href="/contact" size="standard" className="w-full">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
