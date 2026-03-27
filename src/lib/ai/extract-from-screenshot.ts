import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const extractedReviewSchema = z.object({
  reviewerName: z.string(),
  reviewerTitle: z.string().optional(),
  reviewerCompany: z.string().optional(),
  reviewText: z.string(),
  rating: z.number().min(1).max(5).optional(),
  source: z.enum(["google", "g2", "linkedin", "trustpilot", "whatsapp", "email", "other"]).optional(),
});

const extractionResultSchema = z.object({
  reviews: z.array(extractedReviewSchema),
  sourceDetected: z.string().optional(),
});

export type ExtractedReview = z.infer<typeof extractedReviewSchema>;
export type ExtractionResult = z.infer<typeof extractionResultSchema>;

const SYSTEM_PROMPT = `You are a review extraction specialist. Given a screenshot image, extract ALL customer reviews/testimonials visible in it.

For each review found, extract:
- reviewerName: The name of the person who wrote the review
- reviewerTitle: Their job title (if visible)
- reviewerCompany: Their company (if visible)
- reviewText: The full review text
- rating: Star rating 1-5 (if visible, otherwise omit)
- source: Where this review is from: "google", "g2", "linkedin", "trustpilot", "whatsapp", "email", or "other"

Also detect the overall source platform (sourceDetected).

RULES:
1. Extract ALL reviews visible in the screenshot, not just the first one
2. Keep the review text EXACTLY as written - don't paraphrase or summarize
3. If a name is partially visible, include what you can read
4. For WhatsApp/email screenshots, the "reviewer" is the sender
5. If you can't identify the source, use "other"
6. For star ratings, count the filled stars
7. If text is in a non-English language, keep it in the original language

Return valid JSON matching the schema.`;

export async function extractReviewsFromScreenshot(
  imageBase64: string,
  mimeType: string = "image/png"
): Promise<ExtractionResult> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${imageBase64}`,
              detail: "high",
            },
          },
          {
            type: "text",
            text: "Extract all reviews from this screenshot. Return JSON with a 'reviews' array and 'sourceDetected' string.",
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: 4000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI");
  }

  const parsed = JSON.parse(content);
  const validated = extractionResultSchema.parse(parsed);

  return validated;
}
