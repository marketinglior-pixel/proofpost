import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "./onboarding-wizard";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: brandKit } = await supabase
    .from("brand_kits")
    .select("id")
    .eq("user_id", user.id)
    .single();

  const { count: contentCount } = await supabase
    .from("generated_content")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  // User has completed onboarding — send to dashboard
  if (brandKit && (contentCount ?? 0) > 0) {
    redirect("/dashboard");
  }

  // Determine which step to start on
  const initialStep = brandKit ? 2 : 1;

  return <OnboardingWizard userId={user.id} initialStep={initialStep} />;
}
