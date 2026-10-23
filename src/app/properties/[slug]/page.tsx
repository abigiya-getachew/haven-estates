import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPublishedPropertyBySlug, getPublishedProperties } from "@/lib/db/queries";
import { getSiteContact, getSiteUrl } from "@/lib/env";
import { PropertyInquiryForm } from "@/components/properties/property-inquiry-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { RelatedProperties } from "@/components/properties/related-properties";
import { constructMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  try {
    const result = await getPublishedProperties({ pageSize: 48 });
    if (result.properties.length > 0) {
      return result.properties.map((p) => ({
        slug: p.slug,
      }));
    }
  } catch (err) {
    console.warn("Could not fetch published properties during static param generation:", err);
  }

  return [{ slug: "the-obsidian-terraces-bole" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPublishedPropertyBySlug(slug);

  if (!property) {
    return constructMetadata({
      title: "Property Not Found | HAVEN Estates Addis",
      description: "The requested architectural property could not be found.",
      pathname: `/properties/${slug}`,
      noIndex: true,
    });
  }

  const formattedPrice = property.priceAmount
    ? `${property.priceCurrency} ${Number(property.priceAmount).toLocaleString()}`
    : "";

  const siteUrl = getSiteUrl();
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(
    property.title,
  )}&location=${encodeURIComponent(
    `${property.location}, Addis Ababa`,
  )}&type=${encodeURIComponent(property.propertyType)}${
    formattedPrice ? `&price=${encodeURIComponent(formattedPrice)}` : ""
  }`;

  return constructMetadata({
    title: `${property.title} | HAVEN Estates Addis`,
    description: property.description.slice(0, 160),
    pathname: `/properties/${property.slug}`,
    openGraphImage: {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: property.title,
    },
    openGraphType: "article",
    publishedTime: property.publishedAt?.toISOString(),
  });
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPublishedPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const { whatsappNumber, contactEmail } = getSiteContact();
  const siteUrl = getSiteUrl();
  const primaryImage =
    property.featuredImageUrl ||
    property.images[0]?.imageUrl ||
    "/images/real-estate/placeholder.jpg";
  const formattedPrice = property.priceAmount
    ? `${property.priceCurrency} ${Number(property.priceAmount).toLocaleString()}`
    : "Price on Application";

  // Fetch sibling properties for related section
  let allPublishedProperties: import("@/lib/db/queries").PropertySummary[] = [];
  try {
    const listResult = await getPublishedProperties({ pageSize: 12 });
    allPublishedProperties = listResult.properties;
  } catch {
    // Graceful fallback
  }

  // Schema.org RealEstateListing / SingleFamilyResidence JSON-LD (Item 16)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${siteUrl}/properties/${property.slug}`,
    datePosted: property.publishedAt?.toISOString(),
    image: [primaryImage],
    offers: property.priceAmount
      ? {
          "@type": "Offer",
          price: property.priceAmount,
          priceCurrency: property.priceCurrency,
          availability: "https://schema.org/InStock",
        }
      : undefined,
    mainEntity: {
      "@type": "Accommodation",
      name: property.title,
      numberOfRooms: property.bedrooms ?? undefined,
      numberOfBathroomsTotal: property.bathrooms ?? undefined,
      floorSize: property.areaValue
        ? {
            "@type": "QuantitativeValue",
            value: property.areaValue,
            unitCode: property.areaUnit === "sqm" || property.areaUnit === "m²" ? "MTK" : "FTK",
          }
        : undefined,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.location,
        addressRegion: "Addis Ababa",
        addressCountry: "ET",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#252723] pb-24">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Semantic Breadcrumbs Bar */}
      <div className="border-b border-[#252723]/10 bg-[#E9D8C4]/20 py-4">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/properties" },
              { label: property.title, href: `/properties/${property.slug}`, current: true },
            ]}
          />
          <span className="font-mono text-[11px] uppercase tracking-wider bg-[#252723]/5 px-2.5 py-1 rounded">
            {property.transactionType === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-10">
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#252723]/10">
          <div>
            <div className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-[#C27803] mb-2 font-medium">
              {property.propertyType} &bull; {property.location}
            </div>
            <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-[#252723] font-normal tracking-tight">
              {property.title}
            </h1>
          </div>
          <div className="md:text-right">
            <div className="text-3xl sm:text-4xl font-serif text-[#252723] font-medium">
              {formattedPrice}
            </div>
            {property.transactionType === "rent" && (
              <p className="text-xs text-[#252723]/60 uppercase tracking-widest mt-1">
                Per Month
              </p>
            )}
          </div>
        </div>

        {/* Hero Image — Non-lazy, prioritized for LCP */}
        <div className="relative mt-8 h-[450px] sm:h-[550px] lg:h-[650px] w-full overflow-hidden rounded-xl bg-[#252723]/5">
          <Image
            src={primaryImage}
            alt={property.title}
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        {/* Secondary Gallery Images — Native lazy loading */}
        {property.images.length > 1 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {property.images.slice(1, 5).map((img, idx) => (
              <div
                key={img.id || idx}
                className="relative h-28 sm:h-36 overflow-hidden rounded-lg bg-[#252723]/5"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.altText || `${property.title} photo ${idx + 2}`}
                  fill
                  loading="lazy"
                  decoding="async"
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Main Grid: Details + Inquiry Form */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Specs Bar */}
            <div className="grid grid-cols-3 gap-4 border-y border-[#252723]/10 py-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#252723]/60 font-mono">Bedrooms</p>
                <p className="text-2xl font-serif mt-1">{property.bedrooms ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#252723]/60 font-mono">Bathrooms</p>
                <p className="text-2xl font-serif mt-1">{property.bathrooms ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#252723]/60 font-mono">Living Area</p>
                <p className="text-2xl font-serif mt-1">
                  {property.areaValue ? `${property.areaValue} ${property.areaUnit || "m²"}` : "—"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#252723]/60 mb-4">
                The Residence
              </h2>
              <p className="text-lg leading-relaxed text-[#252723]/90 font-light whitespace-pre-line">
                {property.description}
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#E9D8C4]/25 border border-[#252723]/10 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif italic text-2xl text-[#252723] mb-2">
                Inquire About This Property
              </h3>
              <p className="text-xs text-[#252723]/70 leading-relaxed mb-6">
                Directly connect with our private acquisition desk for a private tour or full title documentation.
              </p>

              <PropertyInquiryForm
                propertyTitle={property.title}
                propertySlug={property.slug}
                propertyId={property.id}
                propertyType={property.propertyType}
                location={property.location}
                whatsappNumber={whatsappNumber}
                contactEmail={contactEmail}
              />
            </div>
          </div>
        </div>

        {/* Related Content Module */}
        <RelatedProperties
          currentPropertyId={property.id}
          location={property.location}
          propertyType={property.propertyType}
          allProperties={allPublishedProperties}
        />
      </div>
    </div>
  );
}
