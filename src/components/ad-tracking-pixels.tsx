"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Facebook Pixel + LinkedIn Insight Tag.
 * Both are gated behind env vars — they won't render until you add the IDs.
 *
 * Required env vars:
 *   NEXT_PUBLIC_FB_PIXEL_ID        — Facebook Pixel ID (e.g. "123456789")
 *   NEXT_PUBLIC_LINKEDIN_PARTNER_ID — LinkedIn Partner ID (e.g. "1234567")
 */
export function AdTrackingPixels() {
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const linkedinPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  // Fire PageView on route changes (App Router doesn't trigger full reloads).
  // The init script no longer fires PageView, so this is the single source of truth.
  // We intentionally ignore searchParams to avoid forcing all pages into client rendering
  // (useSearchParams requires a Suspense boundary and breaks static generation of marketing pages).
  useEffect(() => {
    if (!fbPixelId) return;
    if (typeof window === "undefined") return;
    const fbq = (window as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq !== "function") return;
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
    fbq("track", "PageView");
  }, [pathname, fbPixelId]);

  return (
    <>
      {/* ===== Facebook Pixel ===== */}
      {fbPixelId && (
        <>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
                // PageView is fired by the React effect below on route changes,
                // to avoid duplicate fires from React Strict Mode or Script re-mounts.
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* ===== LinkedIn Insight Tag ===== */}
      {linkedinPartnerId && (
        <>
          <Script
            id="linkedin-insight-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window._linkedin_partner_id="${linkedinPartnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(window._linkedin_partner_id);`,
            }}
          />
          <Script
            id="linkedin-insight-lib"
            strategy="afterInteractive"
            src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
          />
        </>
      )}
    </>
  );
}

// ===== Conversion event helpers =====

/**
 * Fire a Facebook Pixel standard event.
 */
export function trackFbEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
    (window as any).fbq("track", eventName, params);
  }
}

/**
 * Fire a LinkedIn conversion event.
 */
export function trackLinkedinConversion(conversionId: string) {
  if (typeof window !== "undefined" && typeof (window as any).lintrk === "function") {
    (window as any).lintrk("track", { conversion_id: conversionId });
  }
}
