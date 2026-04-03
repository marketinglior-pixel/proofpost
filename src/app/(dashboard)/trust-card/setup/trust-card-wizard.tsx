"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Loader2,
  Sparkles,
  User,
  Palette,
  Link as LinkIcon,
  Share2,
} from "lucide-react";

const PROOFPOST_HOST = "https://proofpst.com";

const STEPS = [
  { number: 1, label: "Username" },
  { number: 2, label: "Import" },
  { number: 3, label: "Customize" },
  { number: 4, label: "Live!" },
];

const ACCENT_COLORS = [
  "#10B981", "#6366F1", "#F59E0B", "#EF4444", "#8B5CF6",
  "#EC4899", "#14B8A6", "#3B82F6", "#F97316", "#06B6D4",
];

interface TrustCardWizardProps {
  userId: string;
}

export function TrustCardWizard({ userId }: TrustCardWizardProps) {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(1);

  // Step 1: Username
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [claimingUsername, setClaimingUsername] = useState(false);

  // Step 2: Import
  const [importUrl, setImportUrl] = useState("");
  const [importPlatform, setImportPlatform] = useState<"google" | "g2" | null>(null);
  const [importing, setImporting] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  // Step 3: Customize
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaLabel, setCtaLabel] = useState("Book a Call");
  const [accentColor, setAccentColor] = useState("#10B981");
  const [saving, setSaving] = useState(false);

  // Step 4: Live
  const [copied, setCopied] = useState(false);

  // Auto-generate username from display name
  useEffect(() => {
    if (displayName && !username) {
      const slug = displayName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 30);
      if (slug.length >= 3) {
        setUsername(slug);
      }
    }
  }, [displayName]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check username availability with debounce
  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        const res = await fetch(`/api/claim-username?username=${encodeURIComponent(username)}`);
        const data = await res.json();
        setUsernameAvailable(data.available);
      } catch {
        setUsernameAvailable(null);
      } finally {
        setCheckingUsername(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  // Step 1: Claim username
  async function handleClaimUsername() {
    if (!username || !displayName) return;
    setClaimingUsername(true);
    try {
      const res = await fetch("/api/claim-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, displayName }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to claim username");
        return;
      }
      toast.success("Username claimed!");
      setStep(2);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setClaimingUsername(false);
    }
  }

  // Step 2: Import reviews
  async function handleImport() {
    if (!importUrl || !importPlatform) return;
    setImporting(true);
    try {
      const res = await fetch("/api/import-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: importUrl,
          platform: importPlatform,
          markVerified: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Import failed");
        return;
      }
      setImportedCount(data.imported || data.count || 0);
      toast.success(`Imported ${data.imported || data.count || 0} reviews!`);
    } catch {
      toast.error("Import failed. Check the URL and try again.");
    } finally {
      setImporting(false);
    }
  }

  // Step 3: Save customization
  async function handleSaveCustomization() {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("trust_cards")
        .update({
          headline: headline || null,
          bio: bio || null,
          cta_url: ctaUrl || null,
          cta_label: ctaLabel || "Book a Call",
          accent_color: accentColor,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        toast.error("Failed to save. Please try again.");
        return;
      }
      setStep(4);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  const trustCardUrl = `${PROOFPOST_HOST}/${username}`;

  async function copyUrl() {
    await navigator.clipboard.writeText(trustCardUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-5 py-12">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-10">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s) => (
            <div key={s.number} className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  transition-all duration-300
                  ${step >= s.number
                    ? "bg-emerald-500 text-white"
                    : "bg-white/10 text-white/30"
                  }
                `}
              >
                {step > s.number ? <Check className="w-4 h-4" /> : s.number}
              </div>
              <span className={`text-[11px] ${step >= s.number ? "text-white/60" : "text-white/20"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Card container */}
      <div className="w-full max-w-md">
        {/* ============ STEP 1: USERNAME ============ */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <User className="w-7 h-7 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Create your Trust Card</h1>
              <p className="text-white/50 mt-2 text-sm">Choose a username for your public page</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Your name or business name</label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Sarah Chen"
                  className="bg-white/[0.06] border-white/10 text-white placeholder:text-white/20 h-11"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                    proofpst.com/
                  </span>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    className="bg-white/[0.06] border-white/10 text-white pl-[110px] h-11"
                    maxLength={30}
                  />
                </div>
                {/* Availability indicator */}
                {username.length >= 3 && (
                  <p className={`text-xs mt-1.5 ${
                    checkingUsername ? "text-white/30" :
                    usernameAvailable === true ? "text-emerald-400" :
                    usernameAvailable === false ? "text-red-400" : "text-white/30"
                  }`}>
                    {checkingUsername ? "Checking..." :
                     usernameAvailable === true ? "Available!" :
                     usernameAvailable === false ? "Already taken" : ""}
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleClaimUsername}
              disabled={!displayName || !username || username.length < 3 || usernameAvailable !== true || claimingUsername}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl"
            >
              {claimingUsername ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Claim Username <ArrowRight className="w-4 h-4 ml-1" /></>
              )}
            </Button>
          </div>
        )}

        {/* ============ STEP 2: IMPORT ============ */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Import your reviews</h1>
              <p className="text-white/50 mt-2 text-sm">Pull verified reviews from your favorite platform</p>
            </div>

            {/* Platform selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setImportPlatform("google")}
                className={`
                  p-4 rounded-xl border text-left transition-all
                  ${importPlatform === "google"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                    : "bg-white/[0.04] border-white/10 text-white/50 hover:bg-white/[0.06]"
                  }
                `}
              >
                <span className="text-lg">🔍</span>
                <p className="font-semibold text-sm mt-2">Google Reviews</p>
                <p className="text-[11px] text-white/30 mt-0.5">Google Business Profile</p>
              </button>
              <button
                onClick={() => setImportPlatform("g2")}
                className={`
                  p-4 rounded-xl border text-left transition-all
                  ${importPlatform === "g2"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                    : "bg-white/[0.04] border-white/10 text-white/50 hover:bg-white/[0.06]"
                  }
                `}
              >
                <span className="text-lg">⭐</span>
                <p className="font-semibold text-sm mt-2">G2</p>
                <p className="text-[11px] text-white/30 mt-0.5">G2.com product page</p>
              </button>
            </div>

            {importPlatform && (
              <div className="space-y-3">
                <Input
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  placeholder={importPlatform === "google" ? "Paste your Google Maps URL..." : "Paste your G2 product URL..."}
                  className="bg-white/[0.06] border-white/10 text-white placeholder:text-white/20 h-11"
                />
                <Button
                  onClick={handleImport}
                  disabled={!importUrl || importing}
                  className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl"
                >
                  {importing ? (
                    <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Importing...</>
                  ) : (
                    <>Import Reviews</>
                  )}
                </Button>
              </div>
            )}

            {importedCount > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                <p className="text-emerald-400 font-bold text-lg">{importedCount} reviews imported!</p>
                <p className="text-white/40 text-xs mt-1">All verified from the original source</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="border-white/10 text-white/50 hover:bg-white/[0.06] rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 h-11 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl"
              >
                {importedCount > 0 ? "Next" : "Skip for now"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* ============ STEP 3: CUSTOMIZE ============ */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Palette className="w-7 h-7 text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Make it yours</h1>
              <p className="text-white/50 mt-2 text-sm">Add a headline, bio, and your booking link</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Headline</label>
                <Input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Freelance Designer | 50+ Happy Clients"
                  className="bg-white/[0.06] border-white/10 text-white placeholder:text-white/20 h-11"
                  maxLength={120}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Short bio</label>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="I help startups build products that people love..."
                  className="bg-white/[0.06] border-white/10 text-white placeholder:text-white/20 min-h-[80px] resize-none"
                  maxLength={300}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1.5 block">CTA button link</label>
                <Input
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="https://calendly.com/you"
                  className="bg-white/[0.06] border-white/10 text-white placeholder:text-white/20 h-11"
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1.5 block">CTA button text</label>
                <Input
                  value={ctaLabel}
                  onChange={(e) => setCtaLabel(e.target.value)}
                  placeholder="Book a Call"
                  className="bg-white/[0.06] border-white/10 text-white placeholder:text-white/20 h-11"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Accent color</label>
                <div className="flex gap-2 flex-wrap">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`
                        w-8 h-8 rounded-full transition-all
                        ${accentColor === color ? "ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0f] scale-110" : "hover:scale-110"}
                      `}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="border-white/10 text-white/50 hover:bg-white/[0.06] rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleSaveCustomization}
                disabled={saving}
                className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Go Live <Sparkles className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ============ STEP 4: LIVE ============ */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-bold text-white">You&apos;re live! 🎉</h1>
              <p className="text-white/50 mt-2 text-sm">Your Trust Card is ready to share</p>
            </div>

            {/* URL display */}
            <div className="bg-white/[0.06] border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <LinkIcon className="w-4 h-4 text-white/30 shrink-0" />
              <span className="text-white text-sm font-mono truncate flex-1">{trustCardUrl}</span>
              <button
                onClick={copyUrl}
                className="shrink-0 p-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-white/50" />
                )}
              </button>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center gap-2 p-3 rounded-xl
                  bg-white/[0.06] border border-white/10 text-white/70
                  hover:bg-white/10 transition-colors text-sm font-medium
                "
              >
                <ExternalLink className="w-4 h-4" />
                View Page
              </a>
              <button
                onClick={() => {
                  const text = `Check out what my clients say: ${trustCardUrl}`;
                  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                  window.open(twitterUrl, "_blank");
                }}
                className="
                  flex items-center justify-center gap-2 p-3 rounded-xl
                  bg-white/[0.06] border border-white/10 text-white/70
                  hover:bg-white/10 transition-colors text-sm font-medium
                "
              >
                <Share2 className="w-4 h-4" />
                Share on X
              </button>
            </div>

            <Button
              onClick={() => router.push("/trust-card")}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl"
            >
              Go to Editor <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
