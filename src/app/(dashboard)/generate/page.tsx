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

  // Check if brand kit exists
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Generate Carousel
        </h1>
        <p className="text-slate-500 mt-1">
          Paste a customer review and we&apos;ll create a branded LinkedIn
          carousel in seconds.
        </p>
      </div>

      <GenerateForm />
    </div>
  );
}
