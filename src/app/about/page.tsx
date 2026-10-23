import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "About Our Ethos & Standards | HAVEN Estates Addis",
  description:
    "Discover the philosophy, bespoke advisory ethos, and legal diligence standards of HAVEN Estates Addis in Addis Ababa, Ethiopia.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#252723] pb-24">
      {/* Hero Narrative */}
      <section className="relative overflow-hidden bg-[#1C2541] text-[#F7F5F0] py-24 md:py-32">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/real-estate/addis-skyline.jpg"
            alt="Panoramic view across the dynamic architecture of Addis Ababa, Ethiopia"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C2541] via-[#1C2541]/75 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.25em] text-[#E9D8C4] uppercase mb-4">
              Our Ethos &bull; Addis Ababa
            </p>
            <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#F7F5F0]">
              A home is an enduring feeling.
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#F7F5F0]/85">
              HAVEN Estates was established to elevate residential advisory in Addis Ababa. We believe that acquiring a luxury home should feel considered, deeply personal, and completely transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Editorial Sections */}
      <section className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#252723]/60">
              01 / The Addis Ababa Context
            </span>
            <h2 className="font-serif italic text-3xl sm:text-5xl font-normal text-[#252723]">
              Rooted in the highland capital.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#252723]/80">
              Addis Ababa is evolving at unprecedented speed. From the diplomatic serenity of Old Airport and the verdant slopes of Entoto, to the cosmopolitan pulse of Bole Atlas and Kazanchis, our advisory team maintains unmatched local intelligence on architectural developments, land rights, and master planning.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#252723]/80">
              We exclusively represent residences that champion thoughtful structural design, acoustic privacy, natural ventilation, and honest Ethiopian stonework.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/real-estate/modern-villa-exterior.jpg"
                alt="Contemporary architecture in Addis Ababa"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="mt-28 border-t border-[#252723]/15 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-mono uppercase tracking-widest text-[#252723]/60 mb-2">
              Our Core Standards
            </p>
            <h2 className="font-serif italic text-3xl sm:text-4xl text-[#252723]">
              The principles we operate by
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl bg-white p-8 border border-[#252723]/10 shadow-sm">
              <span className="font-serif italic text-3xl text-[#252723] block mb-4">01</span>
              <h3 className="text-lg font-serif italic text-[#252723] mb-2">Bespoke Curation</h3>
              <p className="text-xs sm:text-sm text-[#252723]/75 leading-relaxed">
                We do not overwhelm clients with dozens of generic listings. We present only a considered portfolio tailored specifically to your architectural preferences and life stage.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 border border-[#252723]/10 shadow-sm">
              <span className="font-serif italic text-3xl text-[#252723] block mb-4">02</span>
              <h3 className="text-lg font-serif italic text-[#252723] mb-2">Absolute Discretion</h3>
              <p className="text-xs sm:text-sm text-[#252723]/75 leading-relaxed">
                Trusted by international diplomats, diaspora investors, and family offices, our transactions are handled with strict privacy and confidential agreements.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 border border-[#252723]/10 shadow-sm">
              <span className="font-serif italic text-3xl text-[#252723] block mb-4">03</span>
              <h3 className="text-lg font-serif italic text-[#252723] mb-2">Legal Verification</h3>
              <p className="text-xs sm:text-sm text-[#252723]/75 leading-relaxed">
                Every title deed, lease agreement, and developer credential is independently audited by experienced Ethiopian legal counsel before presentation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="mt-24 rounded-2xl bg-[#E9D8C4] p-10 sm:p-14 text-center">
          <h2 className="font-serif italic text-3xl sm:text-4xl text-[#252723]">
            Begin your property search in Addis Ababa
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#252723]/80 max-w-xl mx-auto">
            Whether acquiring a permanent home, securing an executive lease, or investing in prime land, let us guide you with clarity.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/properties"
              className="btn-pill px-8 py-3.5 text-sm font-medium tracking-wider text-[#F7F5F0] bg-[#252723] hover:bg-[#1C2541]"
            >
              Explore Portfolio
            </Link>
            <Link
              href="/contact"
              className="btn-pill px-8 py-3.5 text-sm font-medium tracking-wider text-[#252723] border border-[#252723]/30 hover:bg-white/40"
            >
              Contact Advisory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
