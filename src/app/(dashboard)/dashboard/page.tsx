import { createClient } from "@/lib/supabase/server";
import { Palette, ArrowRight, Wand2, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: brandKit } = await supabase
    .from("brand_kits")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  const { count: contentCount } = await supabase
    .from("generated_content")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-heading text-[28px] text-ink tracking-tight">
          Dashboard
        </h1>
        <p className="text-[15px] text-ink-muted mt-1">
          Turn your best reviews into LinkedIn carousels.
        </p>
      </div>

      {/* Setup CTA if no brand kit */}
      {!brandKit && (
        <Link href="/brand-kit" className="block">
          <div className="card-hover rounded-xl border border-dashed border-amber/40 bg-amber/5 p-6 flex items-center gap-5 cursor-pointer">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber/15">
              <Palette className="w-5 h-5 text-amber-dark" />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-ink">
                Set up your Brand Kit
              </h3>
              <p className="text-sm text-ink-muted mt-0.5">
                Upload your logo and colors to generate branded carousels
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-dark" />
          </div>
        </Link>
      )}

      {/* Quick Action CTA */}
      {brandKit && (
        <Link href="/generate" className="block">
          <div className="card-hover relative rounded-xl bg-ink p-6 flex items-center gap-5 cursor-pointer overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-amber/10 blur-[80px]" />
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-amber/15 border border-amber/20">
              <Wand2 className="w-5 h-5 text-amber" />
            </div>
            <div className="relative flex-1">
              <h3 className="text-[15px] font-semibold text-cream">
                Generate a new carousel
              </h3>
              <p className="text-sm text-cream/50 mt-0.5">
                Paste a review → get branded slides in seconds
              </p>
            </div>
            <ArrowRight className="relative w-4 h-4 text-amber/60" />
          </div>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card-hover rounded-xl bg-white border border-cream-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
              Carousels Created
            </span>
            <TrendingUp className="w-4 h-4 text-ink-muted/50" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-[36px] text-ink tabular-nums">
              {contentCount ?? 0}
            </span>
          </div>
        </div>

        <div className="card-hover rounded-xl bg-white border border-cream-dark p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
              Current Plan
            </span>
            <Zap className="w-4 h-4 text-amber/60" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-[36px] text-ink">Free</span>
            <span className="text-sm text-ink-muted">3 / month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
