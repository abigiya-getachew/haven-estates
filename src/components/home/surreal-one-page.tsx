"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { PropertySummary } from "@/lib/db/queries";
import { PROPERTIES_DATA } from "@/lib/properties-data";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface OnePageProps {
  featuredProperties?: PropertySummary[];
  whatsappNumber: string | null;
  contactEmail: string | null;
}

export function SurrealOnePage({
  featuredProperties: dbFeaturedProperties,
  whatsappNumber,
  contactEmail,
}: OnePageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "Luxury Penthouse",
    locationInterest: "Bole Atlas",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Take the db featured properties if available, fallback to mock data if empty
  const featuredProperties = (dbFeaturedProperties && dbFeaturedProperties.length > 0)
    ? dbFeaturedProperties.slice(0, 3).map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        neighborhood: p.location,
        priceFormatted: p.priceAmount ? `${p.priceCurrency} ${Number(p.priceAmount).toLocaleString()}` : "Price on Inquiry",
        description: `${p.propertyType.charAt(0).toUpperCase() + p.propertyType.slice(1)} located in ${p.location}.`,
        bedrooms: p.bedrooms ?? "—",
        bathrooms: p.bathrooms ?? "—",
        areaSqm: p.areaValue ?? "—",
        image: p.featuredImageUrl || "/images/real-estate/placeholder.jpg",
        tag: p.isFeatured ? "Featured" : p.propertyType,
      }))
    : PROPERTIES_DATA.slice(0, 3).map((p) => ({
        ...p,
        bedrooms: p.bedrooms as number | string,
        bathrooms: p.bathrooms as number | string,
        areaSqm: p.areaSqm as number | string,
      }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Submit to backend API (/api/contact)
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `[${formData.propertyType} in ${formData.locationInterest}] ${formData.message || "I would like to explore available properties."}`,
        }),
      });
    } catch (err) {
      console.warn("Backend contact submission notice:", err);
    } finally {
      setSubmitting(false);
    }

    if (whatsappNumber) {
      const text = `Hello HAVEN Estates Addis,%0A%0A*Name:* ${encodeURIComponent(
        formData.name,
      )}%0A*Interest:* ${encodeURIComponent(
        formData.propertyType,
      )} in ${encodeURIComponent(formData.locationInterest)}%0A*Message:* ${encodeURIComponent(
        formData.message || "I would like to explore available properties.",
      )}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Phone:* ${encodeURIComponent(
        formData.phone,
      )}`;
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
    }
    setSubmitted(true);
  };

  return (
    <div className="relative w-full bg-[#F7F5F0] text-[#252723] selection:bg-[#E9D8C4] selection:text-[#1C2541]">
      {/* =========================================================================
          SECTION 1: HERO — A Different Kind of Home
          Treatment: The SINGLE grand, immersive full-screen statement
          ========================================================================= */}
      <section
        id="hero"
        aria-label="Hero — A Different Kind of Home"
        className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-end overflow-hidden pb-16 pt-32 md:pb-24 lg:pb-28 text-[#F7F5F0]"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/real-estate/luxury-living-interior.jpg"
            alt="Contemporary architectural living room overlooking Addis Ababa skyline"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#1C2541] via-[#1C2541]/50 to-black/35 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">
          <div className={`max-w-2xl ${prefersReducedMotion ? "" : "animate-text-reveal"}`}>
            <p className="mb-4 text-xs font-medium tracking-[0.25em] text-[#E9D8C4] uppercase">
              HAVEN Estates Addis &bull; Prime Residential
            </p>

            <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#F7F5F0]">
              Find a place beyond ordinary.
            </h1>

            <p className="mt-5 text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#F7F5F0]/85 max-w-xl">
              Exceptional homes. Thoughtful living. Discover your next address in Addis Ababa.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#featured"
                className="btn-pill inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wider text-[#1C2541] bg-[#F7F5F0] hover:bg-[#E9D8C4] transition-all"
              >
                Explore Properties
              </a>
              <a
                href="#invitation"
                className="btn-pill inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wider text-[#F7F5F0] border border-[#F7F5F0]/30 hover:border-[#F7F5F0] hover:bg-[#F7F5F0]/10 transition-colors"
              >
                Private Advisory
              </a>
            </div>
          </div>
        </div>

        <div className="absolute right-6 sm:right-12 bottom-6 z-10 hidden sm:block text-[11px] font-mono tracking-widest text-[#E9D8C4]/70 uppercase">
          01 / Bole &bull; Addis Ababa
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FEATURED PROPERTIES — Spaces Worth Discovering
          Treatment: Clean Editorial Showcase on warm architectural sand canvas
          ========================================================================= */}
      <section
        id="featured"
        aria-label="Featured Properties — Spaces Worth Discovering"
        className="relative w-full py-24 md:py-32 bg-[#F7F5F0]"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#252723]/10">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#252723]/60 uppercase mb-3">
                Curated Selection &bull; Addis Ababa
              </p>
              <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#252723]">
                Some places stay with you.
              </h2>
              <p className="mt-4 max-w-xl text-base sm:text-lg text-[#252723]/75 leading-relaxed">
                Explore a considered selection of homes and apartments chosen for their architecture, atmosphere, and location.
              </p>
            </div>

            <div>
              <Link
                href="/properties"
                className="btn-pill inline-flex items-center justify-center px-6 py-3 text-xs font-semibold tracking-wider text-[#F7F5F0] bg-[#252723] hover:bg-[#1C2541]"
              >
                Discover All Properties &rarr;
              </Link>
            </div>
          </div>

          {/* Clean Property Cards Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <article
                key={prop.id}
                className="group flex flex-col rounded-xl overflow-hidden bg-white border border-[#252723]/10 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9D8C4]/40">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-[#1C2541]/90 backdrop-blur-md px-3 py-1 text-[11px] font-medium tracking-wider text-[#F7F5F0] uppercase">
                    {prop.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between text-xs font-mono uppercase text-[#252723]/60">
                    <span>{prop.neighborhood}</span>
                    <span className="font-serif italic text-lg font-semibold text-[#252723]">
                      {prop.priceFormatted}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif italic text-2xl text-[#252723]">
                    {prop.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#252723]/75 line-clamp-2 leading-relaxed">
                    {prop.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-[#252723]/10 pt-4 text-xs text-[#252723]/80">
                    <span>{prop.bedrooms} Beds</span>
                    <span>&bull;</span>
                    <span>{prop.bathrooms} Baths</span>
                    <span>&bull;</span>
                    <span>{prop.areaSqm} m²</span>
                  </div>

                  <div className="mt-6 pt-2 flex items-center justify-between">
                    <Link
                      href={prop.slug ? `/properties/${prop.slug}` : `/properties`}
                      className="text-xs font-medium uppercase tracking-wider text-[#252723] underline underline-offset-4 hover:text-[#1C2541]"
                    >
                      Specifications &rarr;
                    </Link>
                    <Link
                      href={`/contact?property=${encodeURIComponent(prop.title)}`}
                      className="btn-pill px-4 py-1.5 text-xs font-medium text-[#252723] border border-[#252723]/30 hover:bg-[#252723] hover:text-[#F7F5F0] transition-colors"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE HAVEN PERSPECTIVE — More Than an Address
          Treatment: Architectural Split Layout (Magazine editorial with framed photo)
          ========================================================================= */}
      <section
        id="perspective"
        aria-label="The HAVEN Perspective — More Than an Address"
        className="relative w-full py-24 md:py-32 bg-[#E9D8C4]/35 border-y border-[#252723]/10"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Architectural Visual Container */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-xl border border-[#252723]/10">
                <Image
                  src="/images/real-estate/architectural-staircase.jpg"
                  alt="Sculptural stone and timber architectural staircase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-xs font-mono text-[#252723]/60 uppercase tracking-widest text-right">
                Bespoke Interior &bull; Old Airport Residence
              </p>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <p className="text-xs font-medium tracking-[0.25em] text-[#252723]/60 uppercase">
                The HAVEN Perspective
              </p>

              <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#252723]">
                A home is a feeling.
              </h2>

              <p className="text-base sm:text-lg text-[#252723]/80 leading-relaxed">
                We believe finding a property should feel considered, personal, and clear. HAVEN Estates helps you explore spaces that suit the life you want to build in Addis Ababa.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#252723]/15">
                <div className="flex gap-4">
                  <span className="font-serif italic text-2xl text-[#252723]">01</span>
                  <div>
                    <h4 className="font-serif italic text-lg text-[#252723]">Acoustic &amp; Spatial Privacy</h4>
                    <p className="text-xs sm:text-sm text-[#252723]/70 leading-relaxed">
                      Every residence is selected for calm interior acoustics and generous natural daylight away from metropolitan noise.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-serif italic text-2xl text-[#252723]">02</span>
                  <div>
                    <h4 className="font-serif italic text-lg text-[#252723]">Uncompromising Title Clarity</h4>
                    <p className="text-xs sm:text-sm text-[#252723]/70 leading-relaxed">
                      Every property represented in our portfolio undergoes thorough legal audit of municipal records and developer covenants.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="btn-pill inline-flex items-center justify-center px-7 py-3 text-xs font-semibold tracking-wider text-[#F7F5F0] bg-[#252723] hover:bg-[#1C2541]"
                >
                  Get to Know HAVEN
                </Link>
                <a
                  href="#invitation"
                  className="btn-pill inline-flex items-center justify-center px-7 py-3 text-xs font-semibold tracking-wider text-[#252723] border border-[#252723]/30 hover:bg-[#252723]/5"
                >
                  Speak with an Advisor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: THE INVITATION — Find Your Place
          Treatment: Refined Studio Consultation Suite with clean form inputs
          ========================================================================= */}
      <section
        id="invitation"
        aria-label="The Invitation — Find Your Place"
        className="relative w-full py-24 md:py-32 bg-[#1C2541] text-[#F7F5F0]"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Context */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-medium tracking-[0.25em] text-[#E9D8C4] uppercase">
                Private Consultation
              </p>

              <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#F7F5F0]">
                Your next chapter begins somewhere.
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-[#F7F5F0]/85">
                Tell us what you&apos;re looking for. Let&apos;s find a property that feels right in Addis Ababa.
              </p>

              <div className="pt-6 border-t border-white/10 space-y-4">
                {whatsappNumber ? (
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#E9D8C4]/70 block mb-2">
                      Instant Advisory
                    </span>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Hello%20HAVEN%20Estates%20Addis,%20I%20would%20like%20to%20inquire%20about%20a%20property.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-wider text-[#1C2541] bg-[#E9D8C4] hover:bg-[#F7F5F0] transition-colors"
                    >
                      <span>Chat on WhatsApp</span>
                      <span className="text-xs">&rarr;</span>
                    </a>
                  </div>
                ) : null}

                {contactEmail ? (
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#E9D8C4]/70 block mb-1">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm font-medium text-[#F7F5F0] underline underline-offset-4 hover:text-[#E9D8C4]"
                    >
                      {contactEmail}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Right Clean Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur-md shadow-2xl">
                {submitted ? (
                  <div className="py-10 text-center">
                    <p className="font-serif italic text-3xl text-[#E9D8C4]">
                      Thank you for reaching out.
                    </p>
                    <p className="mt-3 text-sm text-[#F7F5F0]/80 max-w-md mx-auto">
                      Our senior property consultant in Addis Ababa will review your specifications and contact you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-xs text-[#E9D8C4] underline underline-offset-4 cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="client-name"
                          className="block text-xs uppercase tracking-wider text-[#E9D8C4]/90 mb-1"
                        >
                          Your Name *
                        </label>
                        <input
                          id="client-name"
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Samuel Bekele"
                          className="w-full rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-[#F7F5F0] placeholder-white/30 focus:border-[#E9D8C4] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="client-email"
                          className="block text-xs uppercase tracking-wider text-[#E9D8C4]/90 mb-1"
                        >
                          Email Address *
                        </label>
                        <input
                          id="client-email"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-[#F7F5F0] placeholder-white/30 focus:border-[#E9D8C4] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="property-type"
                          className="block text-xs uppercase tracking-wider text-[#E9D8C4]/90 mb-1"
                        >
                          Property Type
                        </label>
                        <select
                          id="property-type"
                          value={formData.propertyType}
                          onChange={(e) =>
                            setFormData({ ...formData, propertyType: e.target.value })
                          }
                          className="w-full rounded-md border border-white/15 bg-[#1C2541] px-3.5 py-2.5 text-sm text-[#F7F5F0] focus:border-[#E9D8C4] focus:outline-none"
                        >
                          <option value="Luxury Penthouse">Sky Penthouse</option>
                          <option value="Executive Villa">Executive Villa / Compound</option>
                          <option value="Modern Apartment">Modern 2-4 Bed Apartment</option>
                          <option value="Commercial Investment">Commercial / Land</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="location-interest"
                          className="block text-xs uppercase tracking-wider text-[#E9D8C4]/90 mb-1"
                        >
                          Preferred Neighborhood
                        </label>
                        <select
                          id="location-interest"
                          value={formData.locationInterest}
                          onChange={(e) =>
                            setFormData({ ...formData, locationInterest: e.target.value })
                          }
                          className="w-full rounded-md border border-white/15 bg-[#1C2541] px-3.5 py-2.5 text-sm text-[#F7F5F0] focus:border-[#E9D8C4] focus:outline-none"
                        >
                          <option value="Bole Atlas">Bole / Bole Atlas</option>
                          <option value="Old Airport">Old Airport</option>
                          <option value="Kazanchis">Kazanchis</option>
                          <option value="Entoto Hills">Entoto / Yeka Hills</option>
                          <option value="Bisrate Gabriel">Bisrate Gabriel</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="client-message"
                        className="block text-xs uppercase tracking-wider text-[#E9D8C4]/90 mb-1"
                      >
                        Tell us what you&apos;re looking for
                      </label>
                      <textarea
                        id="client-message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Bedrooms, preferred timeline, specific amenities..."
                        className="w-full rounded-md border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-[#F7F5F0] placeholder-white/30 focus:border-[#E9D8C4] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-pill w-full inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold tracking-wider text-[#1C2541] bg-[#F7F5F0] hover:bg-[#E9D8C4] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? "Transmitting..." : "Get in Touch"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
