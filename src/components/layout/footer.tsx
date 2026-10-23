import Image from "next/image";
import Link from "next/link";

import { FOOTER_AGENCY_ITEMS, FOOTER_EXPLORE_ITEMS } from "@/components/layout/navigation";
import { Container } from "@/components/ui/container";
import { getSiteContact } from "@/lib/env";
import { getCurrentYear } from "@/lib/site";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";

/**
 * High-impact luxury architectural footer for HAVEN Estates Addis.
 *
 * Features a clearly visible, cinematic skyline backdrop with rich depth,
 * luminous golden-sand accents, frosted glass containers, and elevated hierarchy.
 */
export async function Footer() {
  const { whatsappNumber, contactEmail } = getSiteContact();
  const year = await getCurrentYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#0D1322] text-[#F7F5F0]">
      {/* Cinematic Architectural Background Image — Clearly visible & atmospheric */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/real-estate/addis-night-lights.jpg"
          alt="Illuminated architectural skyline and night city lights"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45 mix-blend-luminosity scale-105"
        />
        {/* Rich multi-stop gradient scrim to guarantee text contrast while letting the cityscape glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1322] via-[#0D1322]/80 to-[#1C2541]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0D1322]/50 to-[#0D1322]" />
      </div>

      <div className="relative z-10">
        {/* Main Content Grid */}
        <Container className="pt-20 pb-16 md:pt-24 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Column 1: Brand Identity & Distinctive Addis Focus */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="inline-block rounded-full border border-[#E9D8C4]/30 bg-[#E9D8C4]/10 px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] text-[#E9D8C4] mb-3 backdrop-blur-sm">
                  Addis Ababa &bull; Prime Properties
                </span>
                <Link
                  href="/"
                  className="font-serif italic text-3xl sm:text-4xl tracking-tight text-[#F7F5F0] hover:text-[#E9D8C4] transition-colors block"
                >
                  HAVEN Estates Addis
                </Link>
              </div>

              <p className="text-sm text-[#F7F5F0]/80 leading-relaxed max-w-md">
                Connecting discerning buyers, international diplomats, and diaspora families with architectural masterpieces, private compounds, and sky residences across Addis Ababa.
              </p>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md max-w-md space-y-1">
                <p className="text-xs font-medium text-[#E9D8C4]">
                  Bole Sub-City, Woreda 03 &bull; Addis Ababa, Ethiopia
                </p>
                <p className="font-mono text-[11px] text-[#F7F5F0]/60 uppercase tracking-wider">
                  Private Consultations &bull; By Appointment Only
                </p>
              </div>
            </div>

            {/* Column 2: Residences Directory */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#E9D8C4]">
                Residences
              </h3>
              <ul className="space-y-3">
                {FOOTER_EXPLORE_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1.5 text-sm text-[#F7F5F0]/85 hover:text-[#E9D8C4] transition-colors"
                    >
                      <span className="text-[#E9D8C4]/40 group-hover:text-[#E9D8C4] transition-colors">
                        &rsaquo;
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: The Agency */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#E9D8C4]">
                The Agency
              </h3>
              <ul className="space-y-3">
                {FOOTER_AGENCY_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-1.5 text-sm text-[#F7F5F0]/85 hover:text-[#E9D8C4] transition-colors"
                    >
                      <span className="text-[#E9D8C4]/40 group-hover:text-[#E9D8C4] transition-colors">
                        &rsaquo;
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: High-Visibility Direct Advisory Box */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md shadow-xl space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#E9D8C4]">
                  Direct Advisory
                </h3>

                <p className="text-xs text-[#F7F5F0]/75 leading-relaxed">
                  Direct connection with our senior residential consultant in Addis Ababa.
                </p>

                {whatsappNumber ? (
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill flex items-center justify-center gap-2 w-full py-3 px-4 text-xs font-semibold tracking-wider text-[#0D1322] bg-[#E9D8C4] hover:bg-[#F7F5F0] transition-all shadow-md"
                  >
                    <span>WhatsApp Consultation</span>
                    <span>&rarr;</span>
                  </a>
                ) : null}

                {contactEmail ? (
                  <a
                    href={`mailto:${contactEmail}`}
                    className="block text-center text-xs font-medium text-[#F7F5F0]/90 underline underline-offset-4 hover:text-[#E9D8C4] transition-colors pt-1"
                  >
                    {contactEmail}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Container>

        {/* Dramatic Architectural Monogram & Brand Watermark */}
        <div className="relative border-t border-white/10 overflow-hidden py-8">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-serif italic text-4xl sm:text-6xl text-white/[0.12] tracking-wider uppercase select-none">
                HAVEN ESTATES
              </p>
              <div className="flex items-center gap-6 text-xs text-[#F7F5F0]/60 font-mono">
                <span>BOLE</span>
                <span>&bull;</span>
                <span>OLD AIRPORT</span>
                <span>&bull;</span>
                <span>KAZANCHIS</span>
                <span>&bull;</span>
                <span>ENTOTO</span>
              </div>
            </div>
          </Container>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-white/10 bg-black/40">
          <Container className="flex flex-col sm:flex-row items-center justify-between py-5 gap-3">
            <p className="text-xs font-mono text-[#F7F5F0]/50">
              &copy; {year} HAVEN Estates Addis. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <CookieSettingsButton />
              <span className="text-[#F7F5F0]/30">&bull;</span>
              <p className="text-xs text-[#F7F5F0]/50">
                Prime luxury real estate consultancy &bull; Addis Ababa, Ethiopia
              </p>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}
