"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { trackEvent } from "@/lib/analytics";

interface ContactClientProps {
  whatsappNumber: string | null;
  contactEmail: string | null;
}

export function ContactClient({ whatsappNumber, contactEmail }: ContactClientProps) {
  const searchParams = useSearchParams();
  const propertyParam = searchParams.get("property") || "";
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    preferredLocation: "",
    propertyInterest: propertyParam || "",
    message: propertyParam
      ? `Hello, I would like to arrange a private viewing or receive full documentation for ${propertyParam}.`
      : "",
    website: "", // Honeypot field
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          propertyType: formData.propertyType,
          preferredLocation: formData.preferredLocation,
          message: formData.message || "General consultation inquiry",
          website: formData.website,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Inquiry submission failed. Please try again.");
      }

      // Track submission event without PII
      trackEvent("contact_form_submitted", {
        form_type: propertyParam ? "property_inquiry" : "general",
        has_email: Boolean(formData.email),
        has_phone: Boolean(formData.phone),
      });

      toast.success(
        "Inquiry Transmitted",
        "Your private request has been routed to our acquisitions desk.",
      );

      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission unavailable. Please retry.";
      setErrorMessage(msg);
      setStatus("error");
      toast.error("Transmission Error", msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#252723] pb-24">
      {/* Header */}
      <div className="border-b border-[#252723]/10 bg-[#E9D8C4]/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <p className="text-xs font-medium tracking-[0.2em] text-[#252723]/60 uppercase mb-3">
            Inquiries &bull; Private Consultations
          </p>
          <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#252723]">
            Start a Conversation
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#252723]/80 leading-relaxed">
            Reach our advisory team directly regarding residential acquisitions, private viewings, or property management across Addis Ababa.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Details & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif italic text-2xl sm:text-3xl text-[#252723]">
                Direct Advisory Channels
              </h2>
              <p className="mt-2 text-sm text-[#252723]/75 leading-relaxed">
                We prioritize clear communication. Reach us via encrypted instant chat or schedule an in-person meeting in Addis Ababa.
              </p>
            </div>

            <div className="space-y-4">
              {whatsappNumber ? (
                <div className="rounded-xl bg-white p-6 border border-[#252723]/10 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif italic text-lg text-[#252723]">WhatsApp Business</h3>
                      <p className="mt-1 text-xs text-[#252723]/70">
                        Fastest response for inquiries &amp; location shares
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("whatsapp_outbound_click", {
                          destination: "general",
                        })
                      }
                      className="btn-pill px-4 py-2 text-xs font-medium tracking-wider text-[#F7F5F0] bg-[#252723] hover:bg-[#1C2541]"
                    >
                      Chat Now &rarr;
                    </a>
                  </div>
                </div>
              ) : null}

              {contactEmail ? (
                <div className="rounded-xl bg-white p-6 border border-[#252723]/10 shadow-sm">
                  <h3 className="font-serif italic text-lg text-[#252723]">Formal Correspondence</h3>
                  <p className="mt-1 text-xs text-[#252723]/70">
                    For title deed submissions, portfolios &amp; institutional inquiries
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-3 inline-block text-sm font-medium text-[#252723] underline underline-offset-4 hover:text-[#1C2541]"
                  >
                    {contactEmail}
                  </a>
                </div>
              ) : null}

              <div className="rounded-xl bg-white p-6 border border-[#252723]/10 shadow-sm">
                <h3 className="font-serif italic text-lg text-[#252723]">Office &bull; Addis Ababa</h3>
                <p className="mt-1 text-xs text-[#252723]/75 leading-relaxed">
                  Bole Sub-City, Woreda 03<br />
                  Addis Ababa, Ethiopia
                </p>
                <p className="mt-2 text-[11px] font-mono text-[#252723]/60 uppercase">
                  Monday &ndash; Saturday &bull; By Appointment
                </p>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-8 sm:p-10 border border-[#252723]/10 shadow-lg">
              {status === "success" ? (
                <div className="py-12 text-center" role="status" aria-live="polite">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#286746]/10 text-[#286746]">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif italic text-3xl sm:text-4xl text-[#252723]">
                    Your inquiry has been received.
                  </h3>
                  <p className="mt-4 text-sm text-[#252723]/75 max-w-md mx-auto leading-relaxed">
                    A dedicated senior consultant from HAVEN Estates Addis will review your request and get in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        propertyType: "",
                        preferredLocation: "",
                        propertyInterest: "",
                        message: "",
                        website: "",
                      });
                    }}
                    className="mt-8 btn-pill px-6 py-2.5 text-xs font-medium tracking-wider text-[#252723] border border-[#252723]/30 hover:bg-[#252723]/5 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp-website">Website</label>
                    <input
                      id="hp-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  <div>
                    <h3 className="font-serif italic text-2xl text-[#252723]">
                      Inquiry Specification
                    </h3>
                    <p className="text-xs text-[#252723]/60 mt-1">
                      All details are handled under strict confidentiality.
                    </p>
                  </div>

                  {status === "error" && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="rounded-lg bg-[#B42318]/10 border border-[#B42318]/30 p-4 text-xs text-[#B42318]"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-wider font-semibold text-[#252723]/80 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Almaz Tadesse"
                        className="w-full rounded-md border border-[#252723]/20 bg-[#F7F5F0]/50 px-4 py-2.5 text-sm text-[#252723] placeholder-[#252723]/35 focus:border-[#252723] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-wider font-semibold text-[#252723]/80 mb-1"
                      >
                        Email Address (or Phone) *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full rounded-md border border-[#252723]/20 bg-[#F7F5F0]/50 px-4 py-2.5 text-sm text-[#252723] placeholder-[#252723]/35 focus:border-[#252723] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs uppercase tracking-wider font-semibold text-[#252723]/80 mb-1"
                      >
                        Phone / WhatsApp
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 9... / +1..."
                        className="w-full rounded-md border border-[#252723]/20 bg-[#F7F5F0]/50 px-4 py-2.5 text-sm text-[#252723] placeholder-[#252723]/35 focus:border-[#252723] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="preferred-location"
                        className="block text-xs uppercase tracking-wider font-semibold text-[#252723]/80 mb-1"
                      >
                        Preferred District
                      </label>
                      <input
                        id="preferred-location"
                        type="text"
                        value={formData.preferredLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredLocation: e.target.value })
                        }
                        placeholder="e.g. Bole, Old Airport, Kazanchis"
                        className="w-full rounded-md border border-[#252723]/20 bg-[#F7F5F0]/50 px-4 py-2.5 text-sm text-[#252723] placeholder-[#252723]/35 focus:border-[#252723] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#252723]/80 mb-1"
                    >
                      Specifications / Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention preferred move-in timeline, bedrooms, or any specific viewing requirements..."
                      className="w-full rounded-md border border-[#252723]/20 bg-[#F7F5F0]/50 px-4 py-2.5 text-sm text-[#252723] placeholder-[#252723]/35 focus:border-[#252723] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-pill w-full inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-wider text-[#F7F5F0] bg-[#252723] hover:bg-[#1C2541] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {status === "submitting" ? "Transmitting..." : "Submit Private Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
