import { createClient } from "@/lib/supabase/server";
import { BrandKitForm } from "./brand-kit-form";
import type { Database } from "@/types/database";

type BrandKit = Database["public"]["Tables"]["brand_kits"]["Row"];

export default async function BrandKitPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("brand_kits")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  const brandKit = data as BrandKit | null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Brand Kit</h1>
        <p className="text-slate-500 mt-1">
          Set up your brand identity. This will be applied to every carousel you
          generate.
        </p>
      </div>

      <BrandKitForm
        userId={user!.id}
        initialData={
          brandKit
            ? {
                companyName: brandKit.company_name,
                logoUrl: brandKit.logo_url,
                primaryColor: brandKit.primary_color,
                secondaryColor: brandKit.secondary_color,
              }
            : undefined
        }
      />
    </div>
  );
}
