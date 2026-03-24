import { NextRequest, NextResponse } from "next/server";
import { generateFollowUpQuestions, enhanceReview } from "@/lib/ai/enhance-review";

// Public endpoint - no auth required (called from public collection form)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { step, reviewText, answers } = body;

    if (!reviewText || typeof reviewText !== "string" || reviewText.trim().length < 10) {
      return NextResponse.json(
        { error: "Review must be at least 10 characters" },
        { status: 400 }
      );
    }

    if (step === "questions") {
      // Step 1: Generate follow-up questions
      const result = await generateFollowUpQuestions(reviewText.trim());
      return NextResponse.json(result);
    }

    if (step === "enhance") {
      // Step 2: Enhance the review with answers
      if (!answers || !Array.isArray(answers) || answers.length === 0) {
        return NextResponse.json(
          { error: "Answers are required for enhancement" },
          { status: 400 }
        );
      }
      const result = await enhanceReview(reviewText.trim(), answers);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Invalid step" }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process review" },
      { status: 500 }
    );
  }
}
