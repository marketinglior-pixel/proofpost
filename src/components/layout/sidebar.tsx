"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Palette,
  Wand2,
  Clock,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import { signOut } from "@/app/(dashboard)/actions";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Generate",
    href: "/generate",
    icon: Wand2,
  },
  {
    label: "History",
    href: "/history",
    icon: Clock,
  },
  {
    label: "Brand Kit",
    href: "/brand-kit",
    icon: Palette,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[240px] flex-col bg-ink text-cream/80 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-amber/5 blur-[80px]" />

      {/* Logo */}
      <div className="flex items-center gap-2 px-6 h-16 relative z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-amber" />
        <span className="text-[13px] font-semibold text-cream tracking-widest uppercase">
          ProofPost
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-4 space-y-1 relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-all duration-200",
                isActive
                  ? "bg-white/10 text-cream font-medium"
                  : "text-cream/50 hover:text-cream/80 hover:bg-white/5"
              )}
            >
              <item.icon
                className={cn(
                  "w-[16px] h-[16px]",
                  isActive ? "text-amber" : ""
                )}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1 h-1 rounded-full bg-amber" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 space-y-2 relative z-10">
        {/* Upgrade */}
        <Link
          href="/pricing"
          className="block px-3 py-3 rounded-lg bg-amber/10 border border-amber/20 hover:bg-amber/15 transition-colors"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-medium text-amber">
              Free Plan
            </span>
            <ArrowUpRight className="w-3 h-3 text-amber" />
          </div>
          <p className="text-[11px] text-cream/40">
            3 carousels/mo · Upgrade for unlimited
          </p>
        </Link>

        {/* Sign Out */}
        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-cream/30 hover:text-cream/60 transition-colors duration-200 rounded-lg hover:bg-white/5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
