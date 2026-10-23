"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { NAVIGATION_ITEMS } from "@/components/layout/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop primary navigation (DESIGN.md 9.1, 9.3).
 *
 * The active item is indicated by an underline and a weight change, so the
 * state is not communicated by colour alone.
 */
export function PrimaryNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const transactionType = searchParams.get("transaction_type");

  return (
    <ul className="flex items-center gap-1">
      {NAVIGATION_ITEMS.map((item) => {
        const [itemPath, itemQuery] = item.href.split("?");
        const isTransactionFilter = itemQuery?.includes("transaction_type=") ?? false;
        const isActive = isTransactionFilter
          ? pathname === itemPath && transactionType === itemQuery.split("=")[1]
          : pathname === itemPath && !isTransactionFilter && !transactionType;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex h-11 items-center rounded-sm px-3 text-body-sm font-medium transition-colors duration-200 ease-standard hover:text-text-secondary",
                isActive && "underline decoration-2 underline-offset-8 hover:text-text-primary",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
