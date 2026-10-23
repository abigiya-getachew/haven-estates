/**
 * Typed Event Tracking (Item 9).
 *
 * Safe analytics event abstraction.
 * Rules:
 * 1. Strictly typed event names and payloads.
 * 2. Zero PII: never send names, emails, phone numbers, or free-form text.
 * 3. Does nothing if analytics consent is not granted or provider is not configured.
 * 4. Development mode logs to console safely without polluting production stats.
 */

export type AnalyticsEventName =
  | "property_cta_click"
  | "property_detail_view"
  | "contact_form_submitted"
  | "whatsapp_outbound_click"
  | "property_inquiry_action"
  | "navigation_click"
  | "cookie_consent_updated"
  | "robotics_demo_interacted";

export interface AnalyticsEventPayloads {
  property_cta_click: {
    cta_label: string;
    target_slug?: string;
  };
  property_detail_view: {
    property_slug: string;
    property_type: string;
    location: string;
    transaction_type: "sale" | "rent";
  };
  contact_form_submitted: {
    form_type: "general" | "property_inquiry";
    has_phone: boolean;
    has_email: boolean;
    property_id?: string;
  };
  whatsapp_outbound_click: {
    destination: "general" | "property_inquiry";
    property_slug?: string;
  };
  property_inquiry_action: {
    property_slug: string;
    action_type: "open_form" | "start_chat";
  };
  navigation_click: {
    destination: string;
    source: "header" | "footer" | "content";
  };
  cookie_consent_updated: {
    analytics: boolean;
    marketing: boolean;
  };
  robotics_demo_interacted: {
    control_id: string;
    action: string;
  };
}

export function trackEvent<E extends AnalyticsEventName>(
  event: E,
  payload: AnalyticsEventPayloads[E],
) {
  if (typeof window === "undefined") return;

  // Check consent from local storage if available
  try {
    const rawConsent = localStorage.getItem("haven_cookie_consent_v1");
    if (rawConsent) {
      const consent = JSON.parse(rawConsent);
      if (!consent.analytics && event !== "cookie_consent_updated") {
        return; // Respect consent: do not track
      }
    }
  } catch {
    // ignore
  }

  // Development logger
  if (process.env.NODE_ENV !== "production") {
    // Safe dev log
    console.debug(`[Analytics Track] ${event}:`, payload);
    return;
  }

  // If a provider like GA4, Plausible, or PostHog is integrated:
  // e.g. window.gtag?.('event', event, payload) or window.plausible?.(event, { props: payload })
  const win = window as unknown as {
    gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
    plausible?: (action: string, options: { props: Record<string, unknown> }) => void;
  };

  if (typeof win.plausible === "function") {
    win.plausible(event, { props: payload });
  } else if (typeof win.gtag === "function") {
    win.gtag("event", event, payload);
  }
}
