"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

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
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
