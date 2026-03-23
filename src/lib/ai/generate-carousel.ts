import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// The structured output schema the LLM must return
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
});

export type CarouselOutput = z.infer<typeof carouselOutputSchema>;

const SYSTEM_PROMPT = `You are a world-class B2B content strategist who specializes in turning customer testimonials into high-converting LinkedIn carousel posts.

Your task: Take a raw customer review/testimonial and produce a structured 3-slide LinkedIn carousel plus an accompanying LinkedIn post.

RULES:
1. Slide 1 (The Hook): Start with a bold, attention-grabbing statement or question that highlights the PAIN the customer had BEFORE using the product. Make it relatable to the target audience. Keep the heading under 8 words. Body text under 25 words.
2. Slide 2 (The Proof): Feature the strongest quote or snippet from the review. Highlight the TRANSFORMATION or specific RESULT. Keep the heading under 6 words. Body text (the quote) under 40 words.
3. Slide 3 (The CTA): A clean call-to-action slide. Heading should be action-oriented (e.g., "Ready to see similar results?"). Body should be 1 short sentence.
4. LinkedIn Post: Write a short, punchy LinkedIn post (3-5 sentences) that hooks the reader, references the review insight, and ends with a soft CTA. Use line breaks between sentences for readability. Do NOT use hashtags.
5. Hook Line: A single powerful sentence (under 12 words) that captures the essence of the testimonial.

FORMAT: Return valid JSON matching this exact structure:
{
  "slides": [
    { "slideNumber": 1, "heading": "...", "body": "...", "footer": "" },
    { "slideNumber": 2, "heading": "...", "body": "...", "footer": "— Customer Name" },
    { "slideNumber": 3, "heading": "...", "body": "...", "footer": "" }
  ],
  "linkedinPost": "...",
  "hookLine": "..."
}`;

export async function generateCarouselContent(
  rawReview: string,
  companyName: string
): Promise<CarouselOutput> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 1000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Company name: "${companyName}"

Raw customer review/testimonial:
"""
${rawReview}
"""

Generate the 3-slide carousel content and LinkedIn post. The CTA slide (Slide 3) should mention the company name "${companyName}". Return valid JSON.`,
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
