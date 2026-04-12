import { PricingSection } from "../pricing-section";
import { Star } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — ProofPost",
  description:
    "Free to start, no credit card. Upgrade when you're ready. Plans from $7/mo.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal navbar */}
      <nav className="flex items-center justify-between max-w-5xl mx-auto px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[14px] font-semibold text-slate-900 tracking-tight">
            ProofPost
          </span>
        </Link>
        <Link
          href="/login"
          className="text-[14px] font-medium text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors"
        >
          Start Free
        </Link>
      </nav>

      <PricingSection />
    </div>
  );
}
