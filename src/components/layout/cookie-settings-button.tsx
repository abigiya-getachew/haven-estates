"use client";

import React from "react";
import { useCookieConsent } from "./cookie-consent";

export function CookieSettingsButton() {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-xs font-mono text-[#F7F5F0]/60 hover:text-[#E9D8C4] underline underline-offset-4 transition-colors"
    >
      Cookie Preferences
    </button>
  );
}
