"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/analytics";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const STORAGE_KEY = "haven_cookie_consent_v1";

interface ConsentContextValue {
  preferences: CookiePreferences;
  hasAnswered: boolean;
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function getConsentSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function subscribeConsent(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [internalOverride, setInternalOverride] = useState<CookiePreferences | null>(null);

  const rawStorage = useSyncExternalStore(subscribeConsent, getConsentSnapshot, () => null);

  const preferences: CookiePreferences = React.useMemo(() => {
    if (internalOverride) return internalOverride;
    if (rawStorage) {
      try {
        return JSON.parse(rawStorage);
      } catch {
        return DEFAULT_PREFERENCES;
      }
    }
    return DEFAULT_PREFERENCES;
  }, [internalOverride, rawStorage]);

  const hasAnswered = Boolean(rawStorage || internalOverride);

  const save = (newPrefs: CookiePreferences) => {
    const finalized = { ...newPrefs, necessary: true };
    setInternalOverride(finalized);
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalized));
    } catch {
      // storage unavailable
    }
    trackEvent("cookie_consent_updated", {
      analytics: finalized.analytics,
      marketing: finalized.marketing,
    });
  };

  const acceptAll = () => {
    save({ necessary: true, analytics: true, marketing: true });
  };

  const rejectOptional = () => {
    save({ necessary: true, analytics: false, marketing: false });
  };

  return (
    <ConsentContext.Provider
      value={{
        preferences,
        hasAnswered,
        isOpen,
        openSettings: () => setIsOpen(true),
        closeSettings: () => setIsOpen(false),
        acceptAll,
        rejectOptional,
        savePreferences: save,
      }}
    >
      {children}
      {(!hasAnswered || isOpen) && <CookieConsentModal />}
    </ConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

function CookieConsentModal() {
  const { preferences, savePreferences, acceptAll, rejectOptional } = useCookieConsent();

  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [marketing, setMarketing] = useState(preferences.marketing);

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6 bg-black/40 backdrop-blur-xs"
    >
      <div className="w-full max-w-xl rounded-2xl border border-[#252723]/15 bg-[#F7F5F0] p-6 shadow-2xl text-[#252723]">
        <h3 id="cookie-consent-title" className="font-serif text-2xl">
          Privacy &amp; Cookie Preferences
        </h3>
        <p id="cookie-consent-desc" className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
          HAVEN Estates Addis uses strictly necessary cookies to ensure site functionality. With your permission,
          we use privacy-focused analytics to improve your real estate discovery experience.
        </p>

        {customizing ? (
          <div className="my-5 space-y-4 rounded-xl border border-[#252723]/10 bg-white/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Strictly Necessary</p>
                <p className="text-xs text-text-secondary">Essential for site security and navigation.</p>
              </div>
              <span className="text-xs font-mono uppercase text-brand-accent">Required</span>
            </div>

            <div className="flex items-center justify-between border-t border-[#252723]/10 pt-3">
              <div>
                <label htmlFor="analytics-pref" className="text-sm font-medium cursor-pointer">
                  Analytics &amp; Performance
                </label>
                <p className="text-xs text-text-secondary">Helps us understand property interest anonymously.</p>
              </div>
              <input
                id="analytics-pref"
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 rounded accent-[#252723] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between border-t border-[#252723]/10 pt-3">
              <div>
                <label htmlFor="marketing-pref" className="text-sm font-medium cursor-pointer">
                  Marketing &amp; Personalization
                </label>
                <p className="text-xs text-text-secondary">Delivers relevant property collections.</p>
              </div>
              <input
                id="marketing-pref"
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 rounded accent-[#252723] cursor-pointer"
              />
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
          {customizing ? (
            <>
              <button
                type="button"
                onClick={() => setCustomizing(false)}
                className="text-xs uppercase font-mono tracking-wider text-text-secondary hover:text-text-primary cursor-pointer"
              >
                &larr; Back
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    savePreferences({
                      necessary: true,
                      analytics,
                      marketing,
                    })
                  }
                  className="rounded-full bg-[#252723] px-5 py-2.5 text-xs uppercase tracking-wider text-[#F7F5F0] hover:bg-[#383a35] transition-colors cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setCustomizing(true)}
                className="text-xs uppercase font-mono tracking-wider text-brand-accent underline hover:text-brand-primary cursor-pointer"
              >
                Customize Settings
              </button>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="rounded-full border border-[#252723]/30 px-4 py-2 text-xs uppercase tracking-wider text-[#252723] hover:bg-[#252723]/5 transition-colors cursor-pointer"
                >
                  Reject Optional
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="rounded-full bg-[#252723] px-5 py-2 text-xs uppercase tracking-wider text-[#F7F5F0] hover:bg-[#383a35] transition-colors cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
