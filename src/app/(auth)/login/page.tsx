"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import posthog from "posthog-js";
import { trackFbEvent, trackLinkedinConversion } from "@/components/ad-tracking-pixels";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
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
    <div className="grain min-h-screen flex">
      {/* Left — Dark editorial panel */}
      <div className="hidden lg:flex lg:w-[520px] xl:w-[580px] flex-col justify-between bg-ink p-12 relative overflow-hidden">
        {/* Subtle gradient orb */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber/10 blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-amber/5 blur-[80px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber" />
            <span className="text-sm font-medium text-warm-gray tracking-wide uppercase">
              ProofPost
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <h1 className="font-heading text-[44px] leading-[1.1] text-cream tracking-tight">
            Reviews become
            <br />
            <em className="text-amber">revenue.</em>
          </h1>
          <p className="text-lg text-warm-gray leading-relaxed max-w-sm">
            Transform customer testimonials into high&#8209;converting LinkedIn
            carousels. Branded, beautiful, in seconds.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
              ].map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-navy object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-warm-gray">
              <span className="text-white font-medium">200+</span> marketers
              creating carousels
            </p>
          </div>
        </div>

        <p className="relative z-10 text-xs text-ink-muted">
          © 2026 ProofPost. Built for B2B growth teams.
        </p>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center bg-cream p-8">
        <div className="w-full max-w-[400px] space-y-10">
          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber" />
            <span className="text-sm font-medium text-ink tracking-wide uppercase">
              ProofPost
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-[32px] text-ink tracking-tight leading-tight">
              {isLogin ? "Welcome back" : "Get started"}
            </h2>
            <p className="text-[15px] text-ink-muted">
              {isLogin
                ? "Sign in to your account"
                : "Create your free account — 3 carousels per month"}
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
            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-cream-dark bg-white hover:bg-slate-100 text-[15px] font-medium text-ink transition-colors duration-200"
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
            <div className="flex-1 h-px bg-cream-dark" />
            <span className="text-[12px] text-ink-muted">or</span>
            <div className="flex-1 h-px bg-cream-dark" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-[13px] font-medium text-ink-muted uppercase tracking-wider"
              >
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
                className="h-12 text-[15px] bg-white border-cream-dark focus:border-amber focus:ring-amber/20 rounded-lg placeholder:text-warm-gray/60"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-[13px] font-medium text-ink-muted uppercase tracking-wider"
              >
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
                autoComplete={
                  isLogin ? "current-password" : "new-password"
                }
                className="h-12 text-[15px] bg-white border-cream-dark focus:border-amber focus:ring-amber/20 rounded-lg placeholder:text-warm-gray/60"
              />
            </div>

            {message && (
              <div
                className={`text-sm rounded-lg px-4 py-3 ${
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
              className="w-full h-12 bg-ink hover:bg-ink-light text-cream text-[15px] font-medium rounded-lg shadow-none transition-colors duration-300 hover:shadow-lg hover:shadow-ink/10"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-cream-dark" />
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage(null);
              }}
              className="text-[13px] text-ink-muted hover:text-amber transition-colors duration-300"
            >
              {isLogin ? "Create an account" : "Sign in instead"}
            </button>
            <div className="flex-1 h-px bg-cream-dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
