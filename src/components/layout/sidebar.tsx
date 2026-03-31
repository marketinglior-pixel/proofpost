"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Palette,
  Wand2,
  Clock,
  BarChart3,
  LogOut,
  ArrowUpRight,
  Star,
  FileText,
  Heart,
  BookOpen,
  Download,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "@/app/(dashboard)/actions";
import posthog from "posthog-js";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Generate", href: "/generate", icon: Wand2 },
  { label: "Import", href: "/import", icon: Download },
  { label: "Forms", href: "/forms", icon: FileText },
  { label: "Wall of Love", href: "/wall-of-love", icon: Heart },
  { label: "Case Studies", href: "/case-studies", icon: BookOpen },
  { label: "History", href: "/history", icon: Clock },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Brand Kit", href: "/brand-kit", icon: Palette },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-emerald/5 blur-[80px]" />

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 h-16 relative z-10">
        <div className="w-7 h-7 rounded-lg bg-emerald flex items-center justify-center">
          <Star className="w-3.5 h-3.5 text-white" aria-hidden="true" />
        </div>
        <span className="text-[14px] font-semibold text-white tracking-tight">
          ProofPost
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-4 space-y-0.5 relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] transition-colors duration-200",
                isActive
                  ? "bg-white/10 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <item.icon
                className={cn("w-[16px] h-[16px]", isActive ? "text-emerald" : "")}
                aria-hidden="true"
              />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 space-y-2 relative z-10">
        <Link
          href="/pricing"
          onClick={onNavigate}
          className="block px-3 py-3 rounded-lg bg-emerald/10 border border-emerald/20 hover:bg-emerald/15 transition-colors"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[12px] font-medium text-emerald">
              Free Plan
            </span>
            <ArrowUpRight className="w-3 h-3 text-emerald" aria-hidden="true" />
          </div>
          <p className="text-[11px] text-slate-400">
            3 carousels/mo · Upgrade for unlimited
          </p>
        </Link>

        <form action={() => { posthog.reset(); signOut(); }}>
          <button
            type="submit"
            className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-slate-500 hover:text-slate-300 transition-colors duration-200 rounded-lg hover:bg-white/5"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            Sign Out
          </button>
        </form>
      </div>
    </>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-4 h-12 bg-navy">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
          <Star className="w-3 h-3 text-white" aria-hidden="true" />
        </div>
        <span className="text-[13px] font-semibold text-white tracking-tight">
          ProofPost
        </span>
      </div>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 z-50 flex h-screen w-[260px] flex-col bg-navy overflow-hidden transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-3 z-20 p-1.5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen md:w-[240px] flex-col bg-navy relative overflow-hidden flex-shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
