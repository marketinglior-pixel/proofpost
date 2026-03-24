"use client";

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
} from "lucide-react";
import { signOut } from "@/app/(dashboard)/actions";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Generate", href: "/generate", icon: Wand2 },
  { label: "Forms", href: "/forms", icon: FileText },
  { label: "Wall of Love", href: "/wall-of-love", icon: Heart },
  { label: "Case Studies", href: "/case-studies", icon: BookOpen },
  { label: "History", href: "/history", icon: Clock },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Brand Kit", href: "/brand-kit", icon: Palette },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[240px] flex-col bg-navy relative overflow-hidden">
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

        <form action={signOut}>
          <button
            type="submit"
            className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-slate-500 hover:text-slate-300 transition-colors duration-200 rounded-lg hover:bg-white/5"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
