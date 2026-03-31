import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Step 1: Analyze review and generate follow-up questions
const questionsSchema = z.object({
  analysis: z.string(),
  questions: z.array(
    z.object({
      question: z.string(),
      why: z.string(),
    })
  ),
});

export type EnhanceQuestions = z.infer<typeof questionsSchema>;

const QUESTIONS_PROMPT = `You help customers write more compelling, conversion-ready testimonials.

CRITICAL LANGUAGE RULE: You MUST respond in the SAME LANGUAGE as the original review. If the review is in Spanish, ask questions in Spanish. If in Hebrew, respond in Hebrew. NEVER translate to English unless the review is already in English.

Analyze this review and identify what's missing that would make it more powerful:
- Specific numbers or metrics (revenue, time saved, percentage improvement)?
- A clear before/after comparison?
- The specific problem that was solved?
- Time savings, ROI, or business impact?

Return 2-3 short, friendly follow-up questions that would help fill in the gaps.
Each question should feel natural and easy to answer.

FORMAT: Return valid JSON:
{
  "analysis": "Brief analysis of what's strong and what's missing",
  "questions": [
    { "question": "...", "why": "This would add specificity" },
    { "question": "...", "why": "This would add measurable impact" }
  ]
}`;

export async function generateFollowUpQuestions(
  reviewText: string
): Promise<EnhanceQuestions> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 500,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: QUESTIONS_PROMPT },
      {
        role: "user",
        content: `Customer review:\n"""\n${reviewText}\n"""\n\nGenerate follow-up questions to make this review more compelling. Return valid JSON.`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from OpenAI");
  return questionsSchema.parse(JSON.parse(content));
}

// Step 2: Enhance the review with answers
const enhancedSchema = z.object({
  enhanced: z.string(),
  improvements: z.array(z.string()),
});

export type EnhancedReview = z.infer<typeof enhancedSchema>;

const ENHANCE_PROMPT = `You rewrite customer testimonials to be more compelling and conversion-ready.

CRITICAL LANGUAGE RULE: You MUST write the enhanced review in the SAME LANGUAGE as the original review. If the original is in Spanish, write in Spanish. If in Hebrew, write in Hebrew. NEVER translate to English. Preserve the original language.

RULES:
1. Keep the customer's authentic voice and tone
2. Incorporate the follow-up answers naturally into the review
3. Add specific numbers and measurable results
4. Include a before/after element if possible
5. Keep it under 150 words
6. Must feel genuine, not salesy or corporate
7. Don't invent facts - only use what the customer provided

FORMAT: Return valid JSON:
{
  "enhanced": "The improved testimonial text",
  "improvements": ["Added specific metric", "Added before/after comparison"]
}`;

export async function enhanceReview(
  originalReview: string,
  answers: { question: string; answer: string }[]
): Promise<EnhancedReview> {
  const answersText = answers
    .map((a) => `Q: ${a.question}\nA: ${a.answer}`)
    .join("\n\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.6,
    max_tokens: 500,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: ENHANCE_PROMPT },
      {
        role: "user",
        content: `Original review:\n"""\n${originalReview}\n"""\n\nFollow-up answers:\n${answersText}\n\nRewrite the review incorporating these details. Return valid JSON.`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from OpenAI");
  return enhancedSchema.parse(JSON.parse(content));
}
