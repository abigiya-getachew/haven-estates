"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import type { PropertySummary } from "@/lib/db/queries";
import { PROPERTIES_DATA, Property } from "@/lib/properties-data";
import { EmptyPropertyResults } from "@/components/ui/empty-states";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { trackEvent } from "@/lib/analytics";

interface PropertiesClientProps {
  initialProperties?: PropertySummary[];
}

export function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("transaction_type") || "all";

  const [typeFilter, setTypeFilter] = useState<string>(initialType);
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const dataset: Property[] = useMemo(() => {
    if (initialProperties && initialProperties.length > 0) {
      return initialProperties.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        neighborhood: p.location,
        city: "Addis Ababa",
        transactionType: p.transactionType as "sale" | "rent",
        priceFormatted: p.priceAmount ? `${p.priceCurrency} ${Number(p.priceAmount).toLocaleString()}` : "Price on Inquiry",
        priceNote: p.transactionType === "rent" ? "Per Month" : "Fixed / Negotiable",
        bedrooms: p.bedrooms ?? 0,
        bathrooms: p.bathrooms ?? 0,
        areaSqm: p.areaValue ? Number(p.areaValue) : 0,
        image: p.featuredImageUrl || "/images/real-estate/placeholder.jpg",
        tag: p.propertyType.toUpperCase(),
        description: `${p.title} — refined residence situated in ${p.location}.`,
        features: ["Secure Compound", "Backup Generator", "Dedicated Parking", "Prime Location"],
      }));
    }
    return PROPERTIES_DATA;
  }, [initialProperties]);

  const filteredProperties = useMemo(() => {
    return dataset.filter((p) => {
      const matchesType =
        typeFilter === "all" || p.transactionType === typeFilter;
      const matchesArea =
        areaFilter === "all" ||
        p.neighborhood.toLowerCase().includes(areaFilter.toLowerCase());
      return matchesType && matchesArea;
    });
  }, [dataset, typeFilter, areaFilter]);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#252723] pb-24">
      {/* Editorial Header */}
      <div className="border-b border-[#252723]/10 bg-[#E9D8C4]/30 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Properties", href: "/properties", current: true },
              ]}
            />
          </div>
          <p className="text-xs font-medium tracking-[0.2em] text-[#252723]/60 uppercase mb-3">
            Portfolio &bull; Addis Ababa, Ethiopia
          </p>
          <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#252723]">
            Curated Properties
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#252723]/80 leading-relaxed">
            Distinctive residences selected for their architectural character, craftsmanship, and prime location across Addis Ababa.
          </p>

          {/* Filter Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#252723]/15 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "All Properties", value: "all" },
                { label: "For Sale", value: "sale" },
                { label: "For Rent", value: "rent" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setTypeFilter(tab.value);
                    trackEvent("property_cta_click", { cta_label: `filter_${tab.value}` });
                  }}
                  className={`btn-pill px-5 py-2 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                    typeFilter === tab.value
                      ? "bg-[#252723] text-[#F7F5F0]"
                      : "bg-white/70 text-[#252723]/80 hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#252723]/60 uppercase tracking-wider hidden sm:inline">
                Location:
              </span>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="rounded-full border border-[#252723]/20 bg-white px-4 py-2 text-xs font-medium tracking-wide text-[#252723] focus:outline-none"
              >
                <option value="all">All Neighborhoods</option>
                <option value="Bole">Bole / Bole Atlas</option>
                <option value="Old Airport">Old Airport</option>
                <option value="Kazanchis">Kazanchis</option>
                <option value="Entoto">Yeka / Entoto</option>
                <option value="Bisrate">Bisrate Gabriel</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Property Showcase Grid */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-12">
        <div className="flex items-center justify-between pb-6 border-b border-[#252723]/10">
          <p className="text-xs font-mono uppercase tracking-wider text-[#252723]/60">
            Showing {filteredProperties.length} Available Residences
          </p>
          <span className="text-xs italic text-[#252723]/60">
            *Inquire for off-market portfolio listings
          </span>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="py-12">
            <EmptyPropertyResults />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <article
              key={property.id}
              className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#252723]/10 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9D8C4]/40">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="rounded-full bg-[#1C2541]/85 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wider text-[#F7F5F0] uppercase">
                    {property.tag}
                  </span>
                  <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wider text-[#252723] uppercase">
                    For {property.transactionType === "sale" ? "Sale" : "Lease"}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#252723]/60">
                    {property.neighborhood}, {property.city}
                  </p>
                  <p className="font-serif italic text-xl font-semibold text-[#252723]">
                    {property.priceFormatted}
                  </p>
                </div>

                <h2 className="mt-2 font-serif italic text-2xl font-normal text-[#252723]">
                  {property.title}
                </h2>

                <p className="mt-3 text-sm text-[#252723]/75 line-clamp-2 leading-relaxed">
                  {property.description}
                </p>

                {/* Specs */}
                <div className="mt-6 flex items-center gap-4 border-y border-[#252723]/10 py-3 text-xs text-[#252723]/80">
                  <span>
                    <strong className="font-semibold text-[#252723]">{property.bedrooms}</strong> Beds
                  </span>
                  <span>&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#252723]">{property.bathrooms}</strong> Baths
                  </span>
                  <span>&bull;</span>
                  <span>
                    <strong className="font-semibold text-[#252723]">{property.areaSqm}</strong> m²
                  </span>
                </div>

                {/* Action */}
                <div className="mt-6 pt-2 flex items-center justify-between">
                  <Link
                    href={`/properties/${property.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#252723] underline underline-offset-4 hover:text-[#1C2541] cursor-pointer"
                  >
                    View Details &rarr;
                  </Link>
                  <Link
                    href={`/contact?property=${encodeURIComponent(property.title)}`}
                    className="btn-pill px-4 py-2 text-xs font-medium tracking-wider text-[#F7F5F0] bg-[#252723] hover:bg-[#1C2541]"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>

      {/* Property Details Modal */}
      {selectedProperty ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#F7F5F0] p-6 sm:p-8 shadow-2xl border border-[#252723]/15">
            <button
              type="button"
              onClick={() => setSelectedProperty(null)}
              className="absolute top-5 right-5 text-sm font-semibold text-[#252723]/60 hover:text-[#252723] cursor-pointer"
            >
              ✕ Close
            </button>

            <span className="text-xs font-mono uppercase tracking-widest text-[#252723]/60">
              {selectedProperty.neighborhood} &bull; For {selectedProperty.transactionType === "sale" ? "Sale" : "Rent"}
            </span>

            <h3 className="mt-2 font-serif italic text-3xl sm:text-4xl text-[#252723]">
              {selectedProperty.title}
            </h3>

            <p className="mt-1 font-serif text-2xl text-[#252723] font-semibold">
              {selectedProperty.priceFormatted}{" "}
              <span className="text-xs font-sans font-normal text-[#252723]/60">
                ({selectedProperty.priceNote})
              </span>
            </p>

            <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src={selectedProperty.image}
                alt={selectedProperty.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#252723]/80">
              {selectedProperty.description}
            </p>

            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#252723]/80 mb-3">
                Key Highlights &amp; Amenities
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-xs text-[#252723]/75">
                {selectedProperty.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <span className="text-[#252723]">&check;</span> {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-[#252723]/15 pt-6">
              <Link
                href={`/contact?property=${encodeURIComponent(selectedProperty.title)}`}
                className="btn-pill flex-1 inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wider text-[#F7F5F0] bg-[#252723] hover:bg-[#1C2541]"
              >
                Inquire About This Property
              </Link>
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="btn-pill px-6 py-3 text-sm font-medium tracking-wider text-[#252723] border border-[#252723]/30 hover:bg-[#252723]/5"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
