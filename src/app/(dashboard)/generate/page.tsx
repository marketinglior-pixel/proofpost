import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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
          Add reviews on the left. Your carousel builds on the right.
        </p>
      </div>

      <GenerateForm />
    </div>
  );
}
