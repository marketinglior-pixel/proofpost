"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UTM_STORAGE_KEY = "proofpost_utm";

/**
 * Capture UTM parameters from the URL on first visit and persist them.
 * Sets them as PostHog super properties so every event includes attribution data.
 */
function captureUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utmValues: Record<string, string> = {};

  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) utmValues[key] = value;
  }

  // If we have UTMs in the URL, save them (overwrites previous)
  if (Object.keys(utmValues).length > 0) {
    try {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmValues));
    } catch {
      // localStorage unavailable
    }
    posthog.register(utmValues);
    return;
  }

  // No UTMs in URL — restore from localStorage (returning visitor)
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      posthog.register(JSON.parse(stored));
    }
  } catch {
    // localStorage unavailable or corrupted
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false, // We capture manually via PostHogPageview
        capture_pageleave: true,
        // Session Replay
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: false,
          maskInputFn: (text, element) => {
            // Mask password fields and sensitive inputs
            if (element?.getAttribute("type") === "password") return "*".repeat(text.length);
            if (element?.getAttribute("name")?.includes("key")) return "***";
            return text;
          },
        },
      });

      captureUtmParams();
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

/**
 * Returns stored UTM params (for passing through signup to Supabase).
 */
export function getStoredUtmParams(): Record<string, string> {
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
