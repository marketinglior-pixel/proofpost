import { createClient } from "@/lib/supabase/server";
import { generateCarouselContent } from "@/lib/ai/generate-carousel";
import type { ImportedReview } from "./g2-importer";
import type { Database } from "@/types/database";

type BrandKit = Database["public"]["Tables"]["brand_kits"]["Row"];

/**
 * Save imported reviews to the database and optionally generate carousel content.
 * Returns the inserted review rows.
 */
export async function processImportedReviews(
  userId: string,
  platform: string,
  reviews: ImportedReview[],
  options?: { autoGenerate?: boolean; sourceUrl?: string; markVerified?: boolean }
) {
  const supabase = await createClient();

  const insertPayload = reviews.map((r) => ({
    user_id: userId,
    platform,
    source_url: r.source_url || options?.sourceUrl || null,
    reviewer_name: r.reviewer_name,
    reviewer_title: r.reviewer_title || null,
    reviewer_company: r.reviewer_company || null,
    review_text: r.review_text,
    rating: r.rating,
    review_date: r.review_date || null,
    ...(options?.markVerified ? {
      verified: true,
      verification_url: r.source_url || options?.sourceUrl || null,
    } : {}),
  }));

  const { data: inserted, error } = await supabase
    .from("imported_reviews")
    .upsert(insertPayload as never[], {
      onConflict: "user_id,platform,reviewer_name,review_text",
      ignoreDuplicates: true,
    })
    .select();

  if (error) {
    console.error("Import insert error:", error);
    throw new Error(`Failed to save reviews: ${error.message}`);
  }

  const savedReviews = (inserted || []) as Database["public"]["Tables"]["imported_reviews"]["Row"][];

  // Auto-generate carousel content if requested
  if (options?.autoGenerate && savedReviews.length > 0) {
    const { data: brandKitData } = await supabase
      .from("brand_kits")
      .select("*")
      .eq("user_id", userId)
      .single();

    const brandKit = brandKitData as BrandKit | null;

    if (brandKit) {
      // Process up to 5 reviews to avoid timeout
      const toProcess = savedReviews.slice(0, 5);

      for (const review of toProcess) {
        try {
          const llmOutput = await generateCarouselContent(
            review.review_text,
            brandKit.company_name,
            {
              name: review.reviewer_name,
              title: review.reviewer_title || undefined,
              company: review.reviewer_company || undefined,
            }
          );

          const { data: content } = await supabase
            .from("generated_content")
            .insert({
              user_id: userId,
              raw_input: review.review_text,
              llm_output: llmOutput as unknown as Record<string, unknown>,
            } as never)
            .select()
            .single();

          if (content) {
            const contentRow = content as { id: string };
            await supabase
              .from("imported_reviews")
              .update({ generated_content_id: contentRow.id } as never)
              .eq("id", review.id);
          }
        } catch (err) {
          console.error(
            `Auto-generate failed for review ${review.id}:`,
            err
          );
          // Continue with other reviews
        }
      }
    }
  }

  return savedReviews;
}
