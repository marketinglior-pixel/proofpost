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

export class ExtractionError extends Error {
  constructor(
    message: string,
    public readonly code: "api_error" | "parse_error" | "validation_error" | "no_response",
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = "ExtractionError";
  }
}

export async function extractReviewsFromScreenshot(
  imageBase64: string,
  mimeType: string = "image/png"
): Promise<ExtractionResult> {
  let response;
  try {
    response = await openai.chat.completions.create({
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
  } catch (err: unknown) {
    const apiErr = err as { status?: number; message?: string; code?: string };
    console.error("OpenAI API error:", { status: apiErr.status, message: apiErr.message, code: apiErr.code });

    if (apiErr.status === 429) {
      throw new ExtractionError("AI service is busy. Please try again in a moment.", "api_error", 429);
    }
    if (apiErr.code === "image_parse_error") {
      throw new ExtractionError("Could not process this image. Try a different screenshot format (PNG or JPEG).", "api_error", 400);
    }
    throw new ExtractionError(
      "Failed to analyze the screenshot. Please try again.",
      "api_error",
      apiErr.status || 500
    );
  }

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new ExtractionError("No response from AI", "no_response");
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    console.error("Failed to parse AI response:", content.slice(0, 500));
    throw new ExtractionError("Failed to parse AI response", "parse_error");
  }

  try {
    return extractionResultSchema.parse(parsed);
  } catch (err) {
    console.error("AI response validation failed:", JSON.stringify(parsed).slice(0, 500));
    throw new ExtractionError("AI returned an unexpected format. Please try again.", "validation_error");
  }
}
