"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/billing-portal");
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank");
      } else {
        alert("Could not open billing portal. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 h-9 px-4 border border-slate-200 text-[13px] font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
    >
      {loading ? "Opening..." : "Manage Subscription"}
      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
    </button>
  );
}
