import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/components/posthog-provider";
import { PostHogPageview } from "@/components/posthog-pageview";
import { Suspense } from "react";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    default: "ProofPost | Turn Reviews into B2B LinkedIn Carousels",
    template: "%s | ProofPost",
  },
  description:
    "The #1 B2B LinkedIn carousel generator. Turn customer reviews into branded social proof content in seconds. Transform testimonials into LinkedIn posts that convert.",
  themeColor: "#faf8f4",
  openGraph: {
    title: "ProofPost | Turn Reviews into B2B LinkedIn Carousels",
    description:
      "The #1 B2B LinkedIn carousel generator. Turn customer reviews into branded social proof content in seconds.",
    type: "website",
    locale: "en_US",
    url: "https://proofpst.com",
    siteName: "ProofPost",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "ProofPost — Turn Reviews into LinkedIn Carousels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProofPost | Turn Reviews into B2B LinkedIn Carousels",
    description:
      "The #1 B2B LinkedIn carousel generator. Turn customer reviews into branded social proof content in seconds.",
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
      className={`${dmSans.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <PostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageview />
          </Suspense>
          {children}
        </PostHogProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
