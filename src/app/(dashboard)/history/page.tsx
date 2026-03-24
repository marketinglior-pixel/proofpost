import { createClient } from "@/lib/supabase/server";
import { HistoryList } from "./history-list";
import type { Database } from "@/types/database";

type GeneratedContent =
  Database["public"]["Tables"]["generated_content"]["Row"];
type BrandKit = Database["public"]["Tables"]["brand_kits"]["Row"];

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: contentData } = await supabase
    .from("generated_content")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const { data: brandKitData } = await supabase
    .from("brand_kits")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  const { data: profileData } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user!.id)
    .single();

  const items = (contentData ?? []) as GeneratedContent[];
  const brandKit = brandKitData as BrandKit | null;
  const plan = ((profileData as { plan: string } | null)?.plan || "free") as "free" | "pro";

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-[28px] text-ink tracking-tight">
          History
        </h1>
        <p className="text-[15px] text-ink-muted mt-1">
          All your generated carousels. Re-download or copy anytime.
        </p>
      </div>

      <HistoryList items={items} brandKit={brandKit} plan={plan} />
    </div>
  );
}
