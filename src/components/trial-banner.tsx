"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Clock } from "lucide-react";

export function TrialBanner({ trialEndsAt }: { trialEndsAt: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const end = new Date(trialEndsAt);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) return null;

  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return (
    <div className="relative bg-emerald/10 border-b border-emerald/20 px-4 py-2.5 flex items-center justify-center gap-3 text-[13px]">
      <Clock className="w-4 h-4 text-emerald flex-shrink-0" aria-hidden="true" />
      <span className="text-slate-700">
        <strong className="text-emerald">{daysLeft} day{daysLeft !== 1 ? "s" : ""}</strong> left in your free trial.
      </span>
      <Link
        href="/billing"
        className="font-semibold text-emerald hover:text-emerald-dark underline underline-offset-2"
      >
        Upgrade now
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 text-slate-400 hover:text-slate-600"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
