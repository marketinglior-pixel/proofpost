import type { Metadata } from "next";
import { Poppins, Instrument_Serif } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/components/posthog-provider";
import { PostHogPageview } from "@/components/posthog-pageview";
import { AdTrackingPixels } from "@/components/ad-tracking-pixels";
import { FeedbackWidget } from "@/components/feedback-widget";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://proofpst.com"),
  title: {
    default: "ProofPost — Free Trust Card & Proof Card Builder | Verified Reviews",
    template: "%s | ProofPost",
  },
  description:
    "Create your free Trust Card in 60 seconds. Import verified reviews from Google, G2 & LinkedIn into one shareable proof card. Your link, instant credibility.",
  openGraph: {
    title: "ProofPost — Free Trust Card & Proof Card Builder | Verified Reviews",
    description:
      "Create your free Trust Card in 60 seconds. Import verified reviews from Google, G2 & LinkedIn into one shareable proof card.",
    type: "website",
    locale: "en_US",
    url: "https://proofpst.com",
    siteName: "ProofPost",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "ProofPost — Your Verified Trust Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProofPost | Your Verified Trust Page in 60 Seconds",
    description:
      "Create a premium Trust Card that showcases your verified reviews. One link. Instant trust. 60 seconds.",
    images: ["/og-image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${poppins.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageview />
          </Suspense>
          <AdTrackingPixels />
          {children}
        </PostHogProvider>
        <FeedbackWidget />
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
