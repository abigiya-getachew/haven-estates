import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Custom 404 Page (Item 1).
 * Features:
 * - Branded, claymorphism architectural illustration and card surfaces.
 * - Friendly, concise message.
 * - Clear primary CTA back to property discovery.
 * - Useful links to Home, Properties, and Contact.
 * - Full keyboard navigation and contrast compliant with WCAG 2.2 AA.
 */
export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-[#F7F5F0] py-16 px-6">
      {/* Background architectural clay aura */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-radial from-[#E9D8C4]/60 to-transparent blur-2xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 max-w-2xl text-center">
        {/* Architectural Clay Illustration */}
        <div className="mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FAF8F5] to-[#E9D8C4]/60 p-6 shadow-[8px_8px_24px_rgba(37,39,35,0.08),-6px_-6px_16px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.9)] border border-white/60">
          <svg
            className="h-28 w-28 text-[#252723]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Claymorphic arch gateway */}
            <path
              d="M20 85V48C20 31.4315 33.4315 18 50 18C66.5685 18 80 31.4315 80 48V85"
              stroke="#252723"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Inner sanctuary portal */}
            <path
              d="M36 85V54C36 46.268 42.268 40 50 40C57.732 40 64 46.268 64 54V85"
              stroke="#A88752"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Keystone marker */}
            <rect
              x="45"
              y="26"
              width="10"
              height="8"
              rx="2"
              fill="#A88752"
            />
            {/* Floating 404 badge */}
            <circle cx="50" cy="62" r="12" fill="#252723" />
            <text
              x="50"
              y="66"
              textAnchor="middle"
              fill="#F7F5F0"
              fontSize="9"
              fontWeight="bold"
              fontFamily="monospace"
            >
              404
            </text>
          </svg>
        </div>

        {/* Status & Friendly Message */}
        <span className="inline-block rounded-full bg-[#A88752]/15 px-3.5 py-1 text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#8F7040] mb-4">
          Sanctuary Not Located &bull; 404
        </span>

        <h1 className="font-serif italic text-4xl sm:text-5xl text-[#252723] mb-4 font-normal">
          The sanctuary you are looking for has departed
        </h1>

        <p className="mx-auto max-w-lg text-base text-text-secondary leading-relaxed mb-8">
          The residence or page you requested might have been private-listed, sold, or relocated.
          Discover our active portfolio across Addis Ababa or let our acquisitions desk guide you.
        </p>

        {/* Primary and Secondary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <ButtonLink href="/properties" className="w-full sm:w-auto px-8 py-3.5">
            Browse All Properties &rarr;
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto px-8 py-3.5">
            Contact Advisory Desk
          </ButtonLink>
        </div>

        {/* Quick Navigation Destination Links */}
        <div className="border-t border-[#252723]/10 pt-6">
          <p className="text-xs uppercase font-mono tracking-wider text-text-secondary mb-3">
            Quick Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link
              href="/"
              className="text-[#252723] hover:text-[#A88752] transition-colors underline-offset-4 hover:underline"
            >
              Home
            </Link>
            <span className="text-[#252723]/20" aria-hidden="true">&bull;</span>
            <Link
              href="/properties"
              className="text-[#252723] hover:text-[#A88752] transition-colors underline-offset-4 hover:underline"
            >
              Properties Portfolio
            </Link>
            <span className="text-[#252723]/20" aria-hidden="true">&bull;</span>
            <Link
              href="/about"
              className="text-[#252723] hover:text-[#A88752] transition-colors underline-offset-4 hover:underline"
            >
              About HAVEN
            </Link>
            <span className="text-[#252723]/20" aria-hidden="true">&bull;</span>
            <Link
              href="/contact"
              className="text-[#252723] hover:text-[#A88752] transition-colors underline-offset-4 hover:underline"
            >
              Direct Inquiry
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
