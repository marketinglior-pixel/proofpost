import { createClient } from "@supabase/supabase-js";
import { generateCarouselContent } from "@/lib/ai/generate-carousel";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Submission {
  id: string;
  form_id: string;
  user_id: string;
  reviewer_name: string;
  reviewer_title: string | null;
  reviewer_company: string | null;
  reviewer_photo_url: string | null;
  review_text: string;
}

/**
 * Process an approved submission:
 * 1. Generate carousel content via AI
 * 2. Save to generated_content
 * 3. Link content to submission
 * 4. Add to linked widget if configured
 */
export async function processApprovedSubmission(submission: Submission): Promise<{
  contentId: string | null;
  addedToWidget: boolean;
}> {
  let contentId: string | null = null;
  let addedToWidget = false;

  try {
    // Get brand kit for the user
    const { data: brandKit } = await supabaseAdmin
      .from("brand_kits")
      .select("company_name")
      .eq("user_id", submission.user_id)
      .single();

    if (!brandKit) {
      console.error("No brand kit found for user:", submission.user_id);
      return { contentId: null, addedToWidget: false };
    }

    // Generate carousel content
    const llmOutput = await generateCarouselContent(
      submission.review_text,
      brandKit.company_name,
      {
        name: submission.reviewer_name,
        title: submission.reviewer_title || undefined,
        company: submission.reviewer_company || undefined,
        photoUrl: submission.reviewer_photo_url || undefined,
      }
    );

    const outputWithPhoto = {
      ...llmOutput,
      reviewerPhotoUrl: submission.reviewer_photo_url || null,
    };

    // Save generated content
    const { data: saved, error: saveError } = await supabaseAdmin
      .from("generated_content")
      .insert({
        user_id: submission.user_id,
        raw_input: submission.review_text,
        llm_output: outputWithPhoto as unknown as Record<string, unknown>,
      })
      .select("id")
      .single();

    if (saveError || !saved) {
      console.error("Failed to save generated content:", saveError);
      return { contentId: null, addedToWidget: false };
    }

    contentId = saved.id;

    // Link content to submission
    await supabaseAdmin
      .from("submissions")
      .update({ generated_content_id: contentId })
      .eq("id", submission.id);

    // Check if form has a linked widget
    const { data: form } = await supabaseAdmin
      .from("collection_forms")
      .select("linked_widget_id")
      .eq("id", submission.form_id)
      .single();

    if (form?.linked_widget_id) {
      // Get current widget content_ids
      const { data: widget } = await supabaseAdmin
        .from("widgets")
        .select("content_ids")
        .eq("id", form.linked_widget_id)
        .single();

      if (widget) {
        const currentIds = (widget.content_ids as string[]) || [];
        // Add new content ID to the widget
        const { error: updateError } = await supabaseAdmin
          .from("widgets")
          .update({
            content_ids: [...currentIds, contentId],
            updated_at: new Date().toISOString(),
          })
          .eq("id", form.linked_widget_id);

        if (!updateError) {
          addedToWidget = true;
        }
      }
    }
  } catch (err) {
    console.error("Error processing submission:", err);
  }

  return { contentId, addedToWidget };
}
