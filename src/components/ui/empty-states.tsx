import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionText = "Browse All Properties",
  actionHref = "/properties",
  secondaryActionText,
  secondaryActionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#252723]/10 bg-[#E9D8C4]/15 px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#252723]/5 text-[#A88752]">
        {icon || (
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        )}
      </div>

      <h3 className="font-serif text-2xl text-[#252723]">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-secondary leading-relaxed">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {actionHref && (
          <ButtonLink href={actionHref} size="compact">
            {actionText}
          </ButtonLink>
        )}
        {secondaryActionHref && secondaryActionText && (
          <ButtonLink href={secondaryActionHref} variant="secondary" size="compact">
            {secondaryActionText}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}

export function EmptyPropertyResults() {
  return (
    <EmptyState
      title="No properties match your criteria"
      description="We couldn't find any sanctuaries matching your specific filters. Try expanding your search area or clearing applied filters."
      actionText="View All Properties"
      actionHref="/properties"
      secondaryActionText="Contact Advisory Desk"
      secondaryActionHref="/contact"
      icon={
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      }
    />
  );
}

export function EmptyRelatedContent({ category = "properties" }: { category?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[#252723]/15 p-8 text-center text-sm text-text-secondary">
      <p>No additional related {category} at this time.</p>
      <Link
        href="/properties"
        className="mt-2 inline-block font-medium text-brand-accent hover:underline"
      >
        Explore full collection &rarr;
      </Link>
    </div>
  );
}
