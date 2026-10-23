import Link from "next/link";
import Image from "next/image";
import type { PropertySummary } from "@/lib/db/queries";
import { EmptyRelatedContent } from "@/components/ui/empty-states";

interface RelatedPropertiesProps {
  currentPropertyId: string;
  location: string;
  propertyType: string;
  allProperties: PropertySummary[];
}

export function RelatedProperties({
  currentPropertyId,
  location,
  propertyType,
  allProperties,
}: RelatedPropertiesProps) {
  // Filter for matching location or propertyType, excluding current property
  const related = allProperties
    .filter((p) => p.id !== currentPropertyId)
    .filter((p) => p.location === location || p.propertyType === propertyType)
    .slice(0, 3);

  if (related.length === 0) {
    return (
      <div className="mt-20 border-t border-[#252723]/10 pt-12">
        <h3 className="font-serif italic text-2xl text-[#252723] mb-6">
          Related Residences
        </h3>
        <EmptyRelatedContent category="residences" />
      </div>
    );
  }

  return (
    <div className="mt-20 border-t border-[#252723]/10 pt-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C27803] mb-1">
            Complementary Portfolio
          </p>
          <h3 className="font-serif italic text-2xl sm:text-3xl text-[#252723]">
            Similar Residences in Addis Ababa
          </h3>
        </div>
        <Link
          href="/properties"
          className="text-xs uppercase font-mono tracking-wider underline text-[#252723] hover:text-[#C27803]"
        >
          View Full Collection &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((item) => {
          const imgUrl = item.featuredImageUrl || "/images/real-estate/placeholder.jpg";
          const formattedPrice = item.priceAmount
            ? `${item.priceCurrency} ${Number(item.priceAmount).toLocaleString()}`
            : "Price on Application";

          return (
            <Link
              key={item.id}
              href={`/properties/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#252723]/10 bg-white transition-all hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#252723]/5">
                <Image
                  src={imgUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded bg-[#252723]/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#F7F5F0] backdrop-blur-xs">
                  {item.transactionType === "sale" ? "For Sale" : "For Rent"}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#252723]/60">
                  {item.location} &bull; {item.propertyType}
                </span>
                <h4 className="mt-1 font-serif text-lg text-[#252723] group-hover:text-[#A88752] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <div className="mt-4 flex items-center justify-between border-t border-[#252723]/5 pt-3 text-xs">
                  <span className="font-semibold text-[#252723]">{formattedPrice}</span>
                  <span className="text-text-secondary">
                    {item.bedrooms ? `${item.bedrooms} Bed` : ""}
                    {item.bedrooms && item.areaValue ? " • " : ""}
                    {item.areaValue ? `${item.areaValue} ${item.areaUnit || "m²"}` : ""}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
