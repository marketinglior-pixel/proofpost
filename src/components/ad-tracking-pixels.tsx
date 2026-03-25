"use client";

import Script from "next/script";

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
                fbq('track', 'PageView');
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
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "${linkedinPartnerId}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
            `,
          }}
        />
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
