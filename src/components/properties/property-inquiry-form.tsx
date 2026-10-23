"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { trackEvent } from "@/lib/analytics";

interface PropertyInquiryFormProps {
  propertyTitle: string;
  propertySlug?: string;
  propertyId?: string;
  propertyType?: string;
  location?: string;
  whatsappNumber: string | null;
  contactEmail: string | null;
}

export function PropertyInquiryForm({
  propertyTitle,
  propertyId,
  propertyType,
  location,
  whatsappNumber,
  contactEmail,
}: PropertyInquiryFormProps) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hello, I would like to schedule a private viewing and receive deed documentation for ${propertyTitle}.`,
    website: "", // Honeypot
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          propertyId,
          propertyType,
          preferredLocation: location,
          website: formData.website,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Inquiry submission failed. Please try again.");
      }

      // Track property inquiry event without PII
      trackEvent("contact_form_submitted", {
        form_type: "property_inquiry",
        has_email: Boolean(formData.email),
        has_phone: Boolean(formData.phone),
        property_id: propertyId,
      });

      toast.success(
        "Inquiry Transmitted",
        `Our senior advisor for ${propertyTitle} has received your private request.`,
      );

      // If WhatsApp number is configured, offer immediate continuation
      if (whatsappNumber) {
        const text = `Hello HAVEN Estates Addis,%0A%0A*Name:* ${encodeURIComponent(
          formData.name,
        )}%0A*Property:* ${encodeURIComponent(
          propertyTitle,
        )}%0A*Message:* ${encodeURIComponent(
          formData.message,
        )}%0A*Email:* ${encodeURIComponent(
          formData.email,
        )}%0A*Phone:* ${encodeURIComponent(formData.phone)}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
      }

      setStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission unavailable. Please retry.";
      setErrorMsg(msg);
      setStatus("error");
      toast.error("Transmission Error", msg);
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-[#252723] text-[#F7F5F0] p-6 rounded-lg text-center space-y-3"
      >
        <p className="font-serif italic text-xl">Inquiry Received</p>
        <p className="text-xs text-[#F7F5F0]/70 leading-relaxed">
          Thank you, {formData.name}. Our private acquisitions advisor for {propertyTitle} will contact you within 24 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFormData({ name: "", email: "", phone: "", message: "", website: "" });
          }}
          className="mt-4 text-xs font-mono tracking-wider underline uppercase text-[#C27803] hover:text-[#E9D8C4] cursor-pointer"
        >
          Send Another Note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="pi-hp-website">Website</label>
        <input
          id="pi-hp-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-[#252723]/70 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Almaz Bekele"
          className="w-full bg-white/80 border border-[#252723]/20 px-3.5 py-2.5 text-sm rounded focus:outline-none focus:border-[#252723]"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-[#252723]/70 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="client@example.com"
          className="w-full bg-white/80 border border-[#252723]/20 px-3.5 py-2.5 text-sm rounded focus:outline-none focus:border-[#252723]"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-[#252723]/70 mb-1">
          Phone / WhatsApp
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+251 91 100 0000"
          className="w-full bg-white/80 border border-[#252723]/20 px-3.5 py-2.5 text-sm rounded focus:outline-none focus:border-[#252723]"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-mono text-[#252723]/70 mb-1">
          Message / Specific Requests *
        </label>
        <textarea
          required
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/80 border border-[#252723]/20 px-3.5 py-2.5 text-sm rounded focus:outline-none focus:border-[#252723]"
        />
      </div>

      {status === "error" && (
        <div role="alert" aria-live="assertive" className="text-xs text-red-600 font-mono">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#252723] hover:bg-[#343731] text-[#F7F5F0] py-3 text-xs uppercase tracking-[0.18em] font-medium transition-colors rounded disabled:opacity-50 cursor-pointer"
      >
        {status === "submitting" ? "Transmitting..." : "Submit Inquiry"}
      </button>

      {contactEmail && (
        <p className="text-[11px] text-center text-[#252723]/50">
          Or write to <span className="underline">{contactEmail}</span>
        </p>
      )}
    </form>
  );
}
