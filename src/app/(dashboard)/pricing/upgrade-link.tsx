"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function UpgradeLink({
  href,
  plan,
  className,
  children,
}: {
  href: string;
  plan: "monthly" | "annual";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() =>
        posthog.capture("upgrade_clicked", { plan })
      }
      className={className}
    >
      {children}
    </Link>
  );
}
