import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
  reviewer: z.object({
    name: z.string(),
    title: z.string(),
    company: z.string(),
  }),
});

export type CarouselOutput = z.infer<typeof carouselOutputSchema>;

const SYSTEM_PROMPT = `You are a world-class B2B content strategist who turns customer testimonials into high-converting LinkedIn carousel posts.

Your task: Take a customer review/testimonial and reviewer info, then produce a 3-slide LinkedIn carousel + LinkedIn post text.

RULES:
1. Slide 1 (The Hook): Bold, attention-grabbing statement about the PAIN before the product. Heading under 8 words. Body under 25 words.
2. Slide 2 (The Proof): The strongest quote from the review showing TRANSFORMATION or RESULT. Heading under 6 words. Body (the quote) under 40 words. Footer should be "— [Reviewer Name]".
3. Slide 3 (The CTA): Action-oriented call-to-action. Heading like "Ready for similar results?" Body: 1 short sentence.
4. LinkedIn Post: Short, punchy (3-5 sentences) with hook, insight, and soft CTA. Line breaks between sentences. No hashtags.
5. Hook Line: Single powerful sentence under 12 words.
6. Reviewer: Extract or confirm reviewer name, title, and company from the provided info.

FORMAT: Return valid JSON:
{
  "slides": [
    { "slideNumber": 1, "heading": "...", "body": "...", "footer": "" },
    { "slideNumber": 2, "heading": "...", "body": "...", "footer": "— Reviewer Name" },
    { "slideNumber": 3, "heading": "...", "body": "...", "footer": "" }
  ],
  "linkedinPost": "...",
  "hookLine": "...",
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

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 1000,
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

Generate the 3-slide carousel content and LinkedIn post. The CTA slide (Slide 3) should mention "${companyName}". Return valid JSON.`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  const parsed = JSON.parse(content);
  return carouselOutputSchema.parse(parsed);
}
