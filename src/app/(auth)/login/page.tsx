"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Star, ShieldCheck } from "lucide-react";
import posthog from "posthog-js";
import { trackFbEvent, trackLinkedinConversion } from "@/components/ad-tracking-pixels";

function LoginForm() {
  const searchParams = useSearchParams();
  const defaultMode = searchParams.get("mode");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        posthog.capture("user_logged_in", { method: "email" });
        window.location.href = "/trust-card";
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
        },
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        posthog.capture("user_signed_up", { method: "email" });
        trackFbEvent("Lead", { content_name: "signup", method: "email" });
        trackLinkedinConversion(process.env.NEXT_PUBLIC_LINKEDIN_SIGNUP_CONVERSION_ID ?? "");
        setMessage({
          type: "success",
          text: "Check your email for a confirmation link!",
        });
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Trust Card value prop */}
      <div className="hidden lg:flex lg:w-[520px] xl:w-[580px] flex-col justify-between bg-slate-900 p-12 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[14px] font-semibold text-white tracking-tight">
              ProofPost
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <h1 className="text-[40px] leading-[1.1] text-white font-bold tracking-tight">
            Your trust page.
            <br />
            <span className="text-emerald-400">Live in 60 seconds.</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-sm">
            Showcase your verified reviews on a premium page.
            One link in your bio. No website needed.
          </p>

          {/* Benefits */}
          <div className="space-y-3 pt-2">
            {[
              "Verified reviews from Google, G2 & more",
              "Upload WhatsApp screenshots & DMs",
              "Premium design, mobile-first",
              "Free to start, no credit card",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[14px] text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-slate-600">
          © 2026 ProofPost
        </p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[14px] font-semibold text-slate-900 tracking-tight">
              ProofPost
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-[28px] text-slate-900 font-bold tracking-tight">
              {isLogin ? "Welcome back" : "Create your Trust Card"}
            </h2>
            <p className="text-[15px] text-slate-500">
              {isLogin
                ? "Sign in to your account"
                : "Free account — your trust page in 60 seconds"}
            </p>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={async () => {
              posthog.capture("user_auth_started", { method: "google" });
              await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: `${window.location.origin}/callback`,
                },
              });
            }}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[15px] font-medium text-slate-900 transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[12px] text-slate-400">or use email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[13px] font-medium text-slate-500">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-12 text-[15px] rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[13px] font-medium text-slate-500">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="h-12 text-[15px] rounded-xl"
              />
            </div>

            {message && (
              <div
                className={`text-sm rounded-xl px-4 py-3 ${
                  message.type === "error"
                    ? "bg-red-50 text-red-700 border border-red-100"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                }`}
              >
                {message.text}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white text-[15px] font-semibold rounded-xl transition-colors duration-200"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Free Account"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage(null);
              }}
              className="text-[13px] text-slate-400 hover:text-emerald-500 transition-colors"
            >
              {isLogin ? "Create an account" : "Already have an account? Sign in"}
            </button>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
