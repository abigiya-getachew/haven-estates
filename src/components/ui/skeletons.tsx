import React from "react";

export function Skeleton({
  className = "",
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-[#252723]/10 dark:bg-white/10 ${className}`}
      style={style}
      {...props}
    />
  );
}

export function PropertyCardSkeleton() {
  return (
    <div
      aria-label="Loading property..."
      aria-busy="true"
      className="flex flex-col overflow-hidden rounded-xl border border-[#252723]/10 bg-surface p-4 shadow-sm"
    >
      <Skeleton className="h-56 w-full rounded-lg" />
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-6 w-3/4" />
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function PropertyListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      aria-label="Loading properties..."
      aria-busy="true"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PropertyDetailSkeleton() {
  return (
    <div
      aria-label="Loading property details..."
      aria-busy="true"
      className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-16"
    >
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="flex flex-col justify-between gap-6 pb-8 md:flex-row md:items-end">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-96 max-w-full" />
        </div>
        <Skeleton className="h-10 w-44" />
      </div>

      <Skeleton className="mt-6 h-[450px] w-full rounded-xl sm:h-[550px]" />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <Skeleton className="h-24 w-full rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
        <div className="lg:col-span-5">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
