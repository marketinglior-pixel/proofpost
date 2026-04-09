import OpenAI from "openai";
import { z } from "zod";

let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

const hookVariantSchema = z.object({
  id: z.string(),
  text: z.string(),
  context: z.string(),
});

export const carouselOutputSchema = z.object({
  slides: z.array(
    z.object({
      slideNumber: z.number(),
      heading: z.string(),
      body: z.string(),
      footer: z.string().optional(),
    })
  ),
  linkedinPost: z.string(),
  hookLine: z.string(),
  hookVariants: z.array(hookVariantSchema).optional(),
  reviewer: z.object({
    name: z.string(),
    title: z.string(),
    company: z.string(),
  }),
});

export type CarouselOutput = z.infer<typeof carouselOutputSchema>;
export type HookVariant = z.infer<typeof hookVariantSchema>;

const SYSTEM_PROMPT = `You are a world-class B2B content strategist who turns customer testimonials into high-converting LinkedIn carousel posts.

Your task: Take a customer review/testimonial and reviewer info, then produce a 3-slide LinkedIn carousel + LinkedIn post text.

CRITICAL LANGUAGE RULE: You MUST write ALL output content in the SAME LANGUAGE as the original review. If the review is in Spanish, write everything in Spanish. If in Hebrew, write in Hebrew. If in French, write in French. NEVER translate the review or output to English unless the original review is already in English. Preserve the original language exactly.

RULES:
1. Slide 1 (The Hook): Bold, attention-grabbing statement about the PAIN before the product. Heading under 8 words. Body under 25 words.
2. Slide 2 (The Proof): The strongest quote from the review showing TRANSFORMATION or RESULT. Heading under 6 words. Body (the quote) under 40 words. Footer should be "— [Reviewer Name]".
3. Slide 3 (The CTA): Action-oriented call-to-action. Heading like "Ready for similar results?" Body: 1 short sentence.
4. LinkedIn Post: Short, punchy (3-5 sentences) with hook, insight, and soft CTA. Line breaks between sentences. No hashtags.
5. Hook Line: Single powerful sentence under 12 words. This is the PRIMARY hook.
6. Hook Variants: Generate 3 different hook variants, each under 12 words, each with a different angle:
   - "roi" (id): Focus on measurable RESULTS and NUMBERS from the review (e.g., "Closed 23% more deals in one quarter")
   - "pain" (id): Focus on the PROBLEM that was SOLVED (e.g., "No more 45-day sales cycles killing revenue")
   - "trust" (id): Focus on SOCIAL PROOF and AUTHORITY (e.g., "Why 200+ sales teams made the switch")
7. Reviewer: Extract or confirm reviewer name, title, and company from the provided info.

FORMAT: Return valid JSON:
{
  "slides": [
    { "slideNumber": 1, "heading": "...", "body": "...", "footer": "" },
    { "slideNumber": 2, "heading": "...", "body": "...", "footer": "— Reviewer Name" },
    { "slideNumber": 3, "heading": "...", "body": "...", "footer": "" }
  ],
  "linkedinPost": "...",
  "hookLine": "...",
  "hookVariants": [
    { "id": "roi", "text": "...", "context": "results-focused" },
    { "id": "pain", "text": "...", "context": "pain-point" },
    { "id": "trust", "text": "...", "context": "social-proof" }
  ],
  "reviewer": { "name": "...", "title": "...", "company": "..." }
}`;

export interface ReviewerInfo {
  name?: string;
  title?: string;
  company?: string;
  photoUrl?: string;
}

export async function generateCarouselContent(
  rawReview: string,
  companyName: string,
  reviewerInfo?: ReviewerInfo
): Promise<CarouselOutput> {
  const reviewerContext = reviewerInfo
    ? `\nReviewer info:\n- Name: ${reviewerInfo.name || "Unknown"}\n- Title: ${reviewerInfo.title || "Unknown"}\n- Company: ${reviewerInfo.company || "Unknown"}`
    : "";

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 1200,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Company name (the brand creating this carousel): "${companyName}"
${reviewerContext}
Raw customer review/testimonial:
"""
${rawReview}
"""

Generate the 3-slide carousel content, LinkedIn post, and 3 hook variants. The CTA slide (Slide 3) should mention "${companyName}". Return valid JSON.`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  const parsed = JSON.parse(content);

  // Ensure hookLine is set to the first variant if missing
  if (!parsed.hookLine && parsed.hookVariants?.[0]) {
    parsed.hookLine = parsed.hookVariants[0].text;
  }

  return carouselOutputSchema.parse(parsed);
}
