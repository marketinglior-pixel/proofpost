import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Download } from "lucide-react";
import { GenerateForm } from "./generate-form";
import type { Database } from "@/types/database";

type BrandKit = Database["public"]["Tables"]["brand_kits"]["Row"];

export default async function GeneratePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: brandKitData } = await supabase
    .from("brand_kits")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  const brandKit = brandKitData as BrandKit | null;

  if (!brandKit) {
    redirect("/brand-kit");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 tracking-tight">
          Build Your Carousel
        </h1>
        <p className="text-[14px] sm:text-[15px] text-slate-500 mt-1">
          One review → one widget. Paste a link, text, or screenshot.
        </p>
      </div>

      {/* Cross-link to Import */}
      <Link
        href="/import"
        className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-5 py-3.5 hover:border-emerald/40 hover:bg-emerald/5 transition-colors group"
      >
        <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald" />
        <div>
          <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">
            Have dozens of reviews on G2 or Google?
          </span>
          <span className="text-[12px] text-slate-400 ml-1.5">
            Bulk import →
          </span>
        </div>
      </Link>

      <GenerateForm />
    </div>
  );
}
