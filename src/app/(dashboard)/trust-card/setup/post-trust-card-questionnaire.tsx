"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { usePostHog } from "posthog-js/react";

const QUESTIONNAIRE_ID = "post_first_trust_card";

const EASE_OPTIONS = [
  { emoji: "\ud83d\ude2b", label: "Very hard", value: 1 },
  { emoji: "\ud83d\ude15", label: "Hard", value: 2 },
  { emoji: "\ud83d\ude10", label: "Okay", value: 3 },
  { emoji: "\ud83d\ude42", label: "Easy", value: 4 },
  { emoji: "\ud83e\udd29", label: "Super easy", value: 5 },
];

const USEFUL_OPTIONS = [
  { label: "AI review import", value: "ai_import" },
  { label: "Customization options", value: "customization" },
  { label: "The final Trust Card page", value: "trust_card_page" },
  { label: "How fast it was", value: "speed" },
];

interface PostTrustCardQuestionnaireProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export function PostTrustCardQuestionnaire({
  open,
  onClose,
  userId,
}: PostTrustCardQuestionnaireProps) {
  const posthog = usePostHog();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [otherText, setOtherText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [saving, setSaving] = useState(false);
  const shownRef = useRef(false);

  const TOTAL_STEPS = 4;

  useEffect(() => {
    if (open && !shownRef.current) {
      shownRef.current = true;
      posthog?.capture("questionnaire_shown", { questionnaire: QUESTIONNAIRE_ID });
    }
  }, [open, posthog]);

  async function saveResponse(
    updatedAnswers: Record<string, unknown>,
    completed: boolean,
    skipped: boolean
  ) {
    try {
      await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionnaire: QUESTIONNAIRE_ID,
          responses: updatedAnswers,
          completed,
          skipped,
        }),
      });
    } catch {
      // Silent fail — don't block the user
    }
  }

  function handleAnswer(question: string, answer: unknown) {
    const updated = { ...answers, [question]: answer };
    setAnswers(updated);

    posthog?.capture("questionnaire_answer", {
      questionnaire: QUESTIONNAIRE_ID,
      question,
      answer,
      step: currentStep + 1,
    });

    saveResponse(updated, false, false);

    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleComplete(updated);
    }
  }

  async function handleComplete(finalAnswers?: Record<string, unknown>) {
    const final = finalAnswers || answers;
    setSaving(true);
    await saveResponse(final, true, false);

    posthog?.capture("questionnaire_completed", {
      questionnaire: QUESTIONNAIRE_ID,
      responses: final,
    });

    posthog?.setPersonProperties({
      nps_score: final.nps_score,
      ease_rating: final.ease_rating,
    });

    setSaving(false);
    onClose();
  }

  async function handleSkip() {
    posthog?.capture("questionnaire_skipped", {
      questionnaire: QUESTIONNAIRE_ID,
      last_step: currentStep + 1,
      answers_given: Object.keys(answers).length,
    });

    await saveResponse(answers, false, true);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleSkip()}>
      <DialogContent
        className="bg-[#0a0a0f] border-white/10 text-white sm:max-w-md"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Quick feedback</DialogTitle>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentStep
                  ? "bg-emerald-500 w-6"
                  : i < currentStep
                  ? "bg-emerald-500/50"
                  : "bg-white/15"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Ease rating */}
        {currentStep === 0 && (
          <div className="text-center space-y-5 py-2">
            <div>
              <p className="text-white/40 text-xs mb-1">Quick feedback</p>
              <h2 className="text-lg font-semibold">
                How easy was it to create your Trust Card?
              </h2>
            </div>
            <div className="flex justify-center gap-3">
              {EASE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer("ease_rating", opt.value)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/[0.06] transition-colors group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {opt.emoji}
                  </span>
                  <span className="text-[10px] text-white/30 group-hover:text-white/50">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Most useful part */}
        {currentStep === 1 && (
          <div className="text-center space-y-4 py-2">
            <h2 className="text-lg font-semibold">
              What was the most useful part?
            </h2>
            <div className="flex flex-col gap-2">
              {USEFUL_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer("most_useful", opt.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium text-left bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all"
                >
                  {opt.label}
                </button>
              ))}
              {/* Other option with text input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  placeholder="Other..."
                  className="flex-1 px-4 py-3 rounded-xl text-sm bg-white/[0.06] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-emerald-500/30"
                />
                {otherText && (
                  <button
                    onClick={() => handleAnswer("most_useful", otherText)}
                    className="px-4 py-3 rounded-xl text-sm font-medium bg-emerald-500 hover:bg-emerald-600 transition-colors"
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Open feedback */}
        {currentStep === 2 && (
          <div className="text-center space-y-4 py-2">
            <h2 className="text-lg font-semibold">
              What would you improve or add?
            </h2>
            <Textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Anything confusing, missing, or annoying?"
              className="bg-white/[0.06] border-white/10 text-white placeholder:text-white/20 min-h-[100px] resize-none"
              maxLength={1000}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  // Skip this question without saving an answer
                  setCurrentStep(3);
                }}
                className="flex-1 border-white/10 text-white/50 hover:bg-white/[0.06] rounded-xl"
              >
                Skip
              </Button>
              <Button
                onClick={() => handleAnswer("improvement_feedback", feedbackText)}
                disabled={!feedbackText.trim()}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
              >
                Submit
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: NPS */}
        {currentStep === 3 && (
          <div className="text-center space-y-5 py-2">
            <h2 className="text-lg font-semibold">
              Would you recommend ProofPost to a friend?
            </h2>
            <div>
              <div className="flex justify-center gap-1">
                {Array.from({ length: 11 }).map((_, i) => {
                  const color =
                    i <= 6
                      ? "bg-red-500/80 hover:bg-red-500"
                      : i <= 8
                      ? "bg-yellow-500/80 hover:bg-yellow-500"
                      : "bg-emerald-500/80 hover:bg-emerald-500";
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer("nps_score", i)}
                      className={`w-8 h-10 rounded-lg text-xs font-bold transition-all hover:scale-110 ${color}`}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[10px] text-white/30">Not at all</span>
                <span className="text-[10px] text-white/30">Absolutely</span>
              </div>
            </div>
            {saving && (
              <Loader2 className="w-4 h-4 animate-spin mx-auto text-emerald-400" />
            )}
          </div>
        )}

        {/* Skip link (always visible except on step 3 which has its own skip) */}
        {currentStep !== 2 && (
          <button
            onClick={handleSkip}
            className="text-xs text-white/25 hover:text-white/40 transition-colors mx-auto block"
          >
            Skip survey
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
