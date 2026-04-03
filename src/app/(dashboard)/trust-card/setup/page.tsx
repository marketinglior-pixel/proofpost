import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TrustCardWizard } from "./trust-card-wizard";

export default async function TrustCardSetupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // If user already has a trust card, go to editor
  const { data: existingCard } = await supabase
    .from("trust_cards")
    .select("id, username")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (existingCard) {
    redirect("/trust-card");
  }

  return <TrustCardWizard userId={user.id} />;
}
