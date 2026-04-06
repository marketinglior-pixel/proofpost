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
  Settings,
  BadgeCheck,
  ChevronDown,
  Code2,
  Gift,
} from "lucide-react";
import { signOut } from "@/app/(dashboard)/actions";
import posthog from "posthog-js";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
}

const primaryItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Trust Card", href: "/trust-card", icon: BadgeCheck },
];

const embedGroup: NavGroup = {
  label: "Embed Tools",
  icon: Code2,
  items: [
    { label: "Generate", href: "/generate", icon: Wand2 },
    { label: "Import", href: "/import", icon: Download },
    { label: "Wall of Love", href: "/wall-of-love", icon: Heart },
    { label: "Case Studies", href: "/case-studies", icon: BookOpen },
    { label: "History", href: "/history", icon: Clock },
  ],
};

const secondaryItems: NavItem[] = [
  { label: "Forms", href: "/forms", icon: FileText },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Bonuses", href: "/bonuses", icon: Gift },
  { label: "Brand Kit", href: "/brand-kit", icon: Palette },
  { label: "Settings", href: "/settings", icon: Settings },
];

function NavLink({ item, isActive, onNavigate }: { item: NavItem; isActive: boolean; onNavigate?: () => void }) {
  return (
    <Link
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
}

function SidebarContent({ onNavigate, plan }: { onNavigate?: () => void; plan: string }) {
  const pathname = usePathname();
  const [embedOpen, setEmbedOpen] = useState(false);

  // Auto-expand embed group if current page is inside it
  useEffect(() => {
    if (embedGroup.items.some((item) => pathname === item.href)) {
      setEmbedOpen(true);
    }
  }, [pathname]);

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
        {/* Primary items (Dashboard, Trust Card) */}
        {primaryItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
            onNavigate={onNavigate}
          />
        ))}

        {/* Embed Tools collapsible group */}
        <div className="pt-2">
          <button
            onClick={() => setEmbedOpen(!embedOpen)}
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-[13px] text-slate-500 hover:text-slate-300 transition-colors"
          >
            <embedGroup.icon className="w-4 h-4" aria-hidden="true" />
            {embedGroup.label}
            <ChevronDown
              className={cn("w-3 h-3 ml-auto transition-transform", embedOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>
          {embedOpen && (
            <div className="ml-2 space-y-0.5">
              {embedGroup.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </div>

        {/* Secondary items (Forms, Analytics, etc.) */}
        <div className="pt-2 space-y-0.5">
          {secondaryItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 space-y-2 relative z-10">
        {plan !== "free" ? (
          <Link
            href="/settings"
            onClick={onNavigate}
            className="block px-3 py-3 rounded-lg bg-emerald/10 border border-emerald/20 hover:bg-emerald/15 transition-colors"
          >
            <span className="text-[12px] font-medium text-emerald capitalize">
              {plan} Plan
            </span>
          </Link>
        ) : (
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
              Remove watermark · Custom domain
            </p>
          </Link>
        )}

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

export function Sidebar({ plan }: { plan: string }) {
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
        <SidebarContent onNavigate={() => setMobileOpen(false)} plan={plan} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen md:w-[240px] flex-col bg-navy relative overflow-hidden flex-shrink-0">
        <SidebarContent plan={plan} />
      </aside>
    </>
  );
}
