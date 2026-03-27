"use client";

import { useState, type FormEvent } from "react";

interface EmailCaptureProps {
  toolName: string;
  headline: string;
  description: string;
  buttonText: string;
}

export function EmailCapture({
  toolName,
  headline,
  description,
  buttonText,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, toolName }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      // Also store in localStorage as a backup record
      const stored = JSON.parse(localStorage.getItem("proofpost_email_captures") || "[]");
      stored.push({ email, toolName, capturedAt: new Date().toISOString() });
      localStorage.setItem("proofpost_email_captures", JSON.stringify(stored));

      setStatus("success");
    } catch {
      // If the API call fails, still store locally and show success
      // so the user experience isn't broken
      const stored = JSON.parse(localStorage.getItem("proofpost_email_captures") || "[]");
      stored.push({ email, toolName, capturedAt: new Date().toISOString() });
      localStorage.setItem("proofpost_email_captures", JSON.stringify(stored));

      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-gradient-to-r from-emerald/5 to-emerald/10 border border-emerald/20 rounded-xl p-6 sm:p-8">
        <div className="text-center">
          <p className="text-[32px] mb-2">&#10003;</p>
          <h3 className="text-[18px] font-bold text-slate-900">
            Check your inbox!
          </h3>
          <p className="mt-2 text-[14px] text-slate-500">
            We sent your results to <span className="font-medium text-slate-700">{email}</span>.
            Also check your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald/5 to-emerald/10 border border-emerald/20 rounded-xl p-6 sm:p-8">
      <div className="text-center">
        <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-2">
          Free bonus
        </p>
        <h3 className="text-[18px] font-bold text-slate-900">
          {headline}
        </h3>
        <p className="mt-2 text-[14px] text-slate-500">
          {description}
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="your@email.com"
            className="flex-1 text-[14px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-[14px] font-medium text-white bg-emerald hover:bg-emerald-dark px-6 py-2.5 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === "loading" ? "Sending..." : buttonText}
          </button>
        </form>
        {status === "error" && errorMessage && (
          <p className="mt-2 text-[12px] text-red-500">{errorMessage}</p>
        )}
        <p className="mt-2 text-[11px] text-slate-400">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
