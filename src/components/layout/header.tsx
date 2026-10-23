import Link from "next/link";
import { Suspense } from "react";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { PrimaryNav } from "@/components/layout/primary-nav";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Site header (DESIGN.md 8.16, 9.1, 9.4).
 *
 * Stays visually quiet so property imagery and the homepage hero keep the
 * emphasis. Navigation is rendered on the server; only the pieces that need
 * the current route are client components.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md transition-colors">
      <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="flex items-baseline gap-2 font-display text-h4 italic tracking-wide text-text-primary"
        >
          HAVEN
          <span className="hidden font-sans text-label font-normal tracking-wider text-text-secondary xs:inline uppercase">
            Estates Addis
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <Suspense fallback={<div className="h-11" />}>
            <PrimaryNav />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/contact"
            size="compact"
            className="hidden rounded-full px-5 text-label font-medium uppercase tracking-wider md:inline-flex"
          >
            Inquire
          </ButtonLink>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
