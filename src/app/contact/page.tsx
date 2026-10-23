import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactClient } from "@/components/contact/contact-client";
import { getSiteContact } from "@/lib/env";

import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Contact Private Advisory Desk | HAVEN Estates Addis",
  description:
    "Direct confidential contact for luxury residential acquisitions, deed documentation, and private tours in Addis Ababa.",
  pathname: "/contact",
});

export default function ContactPage() {
  const { whatsappNumber, contactEmail } = getSiteContact();

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F5F0] py-24 text-center">Loading contact...</div>}>
      <ContactClient whatsappNumber={whatsappNumber} contactEmail={contactEmail} />
    </Suspense>
  );
}
