"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle2, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

interface CollectFormProps {
  formId: string;
  accentColor: string;
  thankYouMessage?: string | null;
  autoApprove?: boolean;
  companyName?: string | null;
}

interface FollowUpQuestion {
  question: string;
  why: string;
}

type FormStep = "write" | "questions" | "enhanced" | "submitted";

export function CollectForm({ formId, accentColor, thankYouMessage, autoApprove, companyName }: CollectFormProps) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // AI enhancement state
  const [step, setStep] = useState<FormStep>("write");
  const [enhancing, setEnhancing] = useState(false);
  const [questions, setQuestions] = useState<FollowUpQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [enhancedReview, setEnhancedReview] = useState("");
  const [improvements, setImprovements] = useState<string[]>([]);
  const [useEnhanced, setUseEnhanced] = useState(false);

  const handleEnhance = async () => {
    if (review.trim().length < 10) {
      setError("Please write at least 10 characters before enhancing.");
      return;
    }
    setError("");
    setEnhancing(true);
    try {
      const res = await fetch("/api/enhance-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "questions", reviewText: review }),
      });
      if (!res.ok) throw new Error("Failed to analyze review");
      const data = await res.json();
      setQuestions(data.questions || []);
      setStep("questions");
    } catch {
      setError("AI enhancement is temporarily unavailable. You can still submit your review.");
    } finally {
      setEnhancing(false);
    }
  };

  const handleGetEnhanced = async () => {
    const answeredQuestions = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i] || "",
    })).filter((a) => a.answer.trim());

    if (answeredQuestions.length === 0) {
      setError("Please answer at least one question.");
      return;
    }

    setError("");
    setEnhancing(true);
    try {
      const res = await fetch("/api/enhance-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "enhance",
          reviewText: review,
          answers: answeredQuestions,
        }),
      });
      if (!res.ok) throw new Error("Failed to enhance review");
      const data = await res.json();
      setEnhancedReview(data.enhanced);
      setImprovements(data.improvements || []);
      setUseEnhanced(true);
      setStep("enhanced");
    } catch {
      setError("Enhancement failed. You can still submit your original review.");
      setStep("write");
    } finally {
      setEnhancing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !review.trim()) {
      setError("Name and review are required.");
      return;
    }

    const finalReview = useEnhanced && enhancedReview ? enhancedReview : review;

    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          reviewerName: name.trim(),
          reviewerTitle: title.trim() || null,
          reviewerCompany: company.trim() || null,
          reviewText: finalReview.trim(),
          rating,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }

      setStep("submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "submitted") {
    return (
      <div className="rounded-xl bg-white border border-slate-200 p-8 text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: accentColor }} />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Thank you!</h2>
        <p className="text-sm text-slate-500">
          {thankYouMessage || (
            autoApprove
              ? "Your review is now live! Thank you for sharing your experience."
              : "Your review has been submitted and is pending approval. We appreciate your feedback!"
          )}
        </p>
        {companyName && (
          <p className="text-xs text-slate-400 mt-3">
            — The {companyName} team
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white border border-slate-200 p-6 space-y-5">
      {/* Rating */}
      <div className="text-center">
        <p className="text-sm font-medium text-slate-700 mb-2">How would you rate your experience?</p>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHoveredStar(s)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className="w-7 h-7"
                fill={(hoveredStar || rating) >= s ? "#FBBF24" : "none"}
                stroke={(hoveredStar || rating) >= s ? "#FBBF24" : "#CBD5E1"}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review text */}
      {step === "write" && (
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-slate-700 mb-1.5">
            Your review <span className="text-red-400">*</span>
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us about your experience..."
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
          />
          {review.trim().length >= 10 && (
            <button
              type="button"
              onClick={handleEnhance}
              disabled={enhancing}
              className="mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{
                color: accentColor,
                backgroundColor: `${accentColor}10`,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {enhancing ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="w-3 h-3" /> Enhance with AI</>
              )}
            </button>
          )}
        </div>
      )}

      {/* Follow-up questions */}
      {step === "questions" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-sm font-semibold text-slate-900">Help us make your review even better</span>
          </div>
          <p className="text-xs text-slate-500">
            Answer these quick questions so AI can enhance your review with more detail.
          </p>
          {questions.map((q, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{q.question}</label>
              <input
                type="text"
                value={answers[i] || ""}
                onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                placeholder="Your answer..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
              />
            </div>
          ))}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep("write")}
              className="flex items-center gap-1 px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
            <button
              type="button"
              onClick={handleGetEnhanced}
              disabled={enhancing}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white rounded-lg"
              style={{ backgroundColor: accentColor }}
            >
              {enhancing ? (
                <><Loader2 className="w-3 h-3 animate-spin" /> Enhancing...</>
              ) : (
                <><Sparkles className="w-3 h-3" /> Enhance my review</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Enhanced review comparison */}
      {step === "enhanced" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-sm font-semibold text-slate-900">AI-Enhanced Version</span>
          </div>

          {improvements.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {improvements.map((imp, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  + {imp}
                </span>
              ))}
            </div>
          )}

          <div className="rounded-lg border-2 p-3 text-sm text-slate-700 leading-relaxed" style={{ borderColor: accentColor, backgroundColor: `${accentColor}05` }}>
            {enhancedReview}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setUseEnhanced(false); setStep("write"); }}
              className="flex items-center gap-1 px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Use original instead
            </button>
            <button
              type="button"
              onClick={() => setUseEnhanced(true)}
              className="flex-1 px-3 py-2 text-xs font-medium text-white rounded-lg"
              style={{ backgroundColor: accentColor, opacity: useEnhanced ? 1 : 0.7 }}
            >
              {useEnhanced ? "✓ Using enhanced version" : "Use this version"}
            </button>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
          Your name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
        />
      </div>

      {/* Title & Company */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="jobtitle" className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
          <input
            id="jobtitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="VP Marketing"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Inc."
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg text-white text-sm font-semibold transition-opacity disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
          </span>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}
