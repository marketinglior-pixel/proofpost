import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TrustCardEditor } from "./editor";
import type { Database } from "@/types/database";

type TrustCardRow = Database["public"]["Tables"]["trust_cards"]["Row"];
type ReviewRow = Database["public"]["Tables"]["imported_reviews"]["Row"];

export default async function TrustCardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user has a trust card
  const { data: trustCardData } = await supabase
    .from("trust_cards")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  const trustCard = trustCardData as TrustCardRow | null;

  // No trust card yet — redirect to setup wizard
  if (!trustCard) {
    redirect("/trust-card/setup");
  }

  // Fetch reviews for management
  const { data: reviewsData } = await supabase
    .from("imported_reviews")
    .select("id, reviewer_name, review_text, rating, platform, verified, display_on_trust_card, display_order")
    .eq("user_id", user.id)
    .order("display_order", { ascending: true })
    .order("imported_at", { ascending: false });

  const reviews = (reviewsData || []) as Pick<ReviewRow, "id" | "reviewer_name" | "review_text" | "rating" | "platform" | "verified" | "display_on_trust_card" | "display_order">[];

  // Fetch view count
  const { count: viewCount } = await supabase
    .from("trust_card_views")
    .select("*", { count: "exact", head: true })
    .eq("trust_card_id", trustCard.id);

  return (
    <TrustCardEditor
      trustCard={trustCard}
      reviews={reviews}
      viewCount={viewCount || 0}
    />
  );
}
