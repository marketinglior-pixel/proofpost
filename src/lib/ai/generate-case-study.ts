import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const caseStudySchema = z.object({
  title: z.string(),
  summary: z.string(),
  challenge: z.object({
    heading: z.string(),
    body: z.string(),
  }),
  solution: z.object({
    heading: z.string(),
    body: z.string(),
  }),
  results: z.object({
    heading: z.string(),
    body: z.string(),
    metrics: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
  }),
  quote: z.object({
    text: z.string(),
    attribution: z.string(),
  }),
});

export type CaseStudyOutput = z.infer<typeof caseStudySchema>;

const SYSTEM_PROMPT = `You generate professional B2B case studies from customer reviews/testimonials.

Given a customer review and reviewer info, create a compelling case study.

RULES:
1. Title: Short, compelling (under 10 words). Focus on the result.
2. Summary: 2-3 sentence overview of the entire case study.
3. Challenge: What problem the customer faced BEFORE the product. 2-3 sentences.
4. Solution: How the product helped solve the problem. 2-3 sentences.
5. Results: Specific outcomes with numbers. 2-3 sentences + 2-3 key metrics.
6. Quote: The strongest, most conversion-ready sentence from the review.
7. Keep the professional but conversational B2B tone.
8. If the review lacks specific numbers, infer reasonable ones from context (e.g., "much faster" → "60% faster").
9. Total word count: under 400 words.

FORMAT: Return valid JSON:
{
  "title": "...",
  "summary": "...",
  "challenge": { "heading": "The Challenge", "body": "..." },
  "solution": { "heading": "The Solution", "body": "..." },
  "results": {
    "heading": "The Results",
    "body": "...",
    "metrics": [
      { "value": "23%", "label": "More deals closed" },
      { "value": "2 days", "label": "Onboarding time" }
    ]
  },
  "quote": { "text": "...", "attribution": "Name, Title at Company" }
}`;

export async function generateCaseStudy(
  reviewText: string,
  reviewerName: string,
  reviewerTitle: string,
  reviewerCompany: string,
  companyName: string
): Promise<CaseStudyOutput> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 1200,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Product/Company: "${companyName}"
Reviewer: ${reviewerName}, ${reviewerTitle} at ${reviewerCompany}

Customer review:
"""
${reviewText}
"""

Generate a professional B2B case study. Return valid JSON.`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from OpenAI");
  return caseStudySchema.parse(JSON.parse(content));
}
