"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { MessageCircle, Bug, MessageSquare, Lightbulb, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { value: "bug", label: "Bug", icon: Bug, color: "text-red-500" },
  { value: "feedback", label: "Feedback", icon: MessageSquare, color: "text-blue-500" },
  { value: "idea", label: "Idea", icon: Lightbulb, color: "text-amber-500" },
] as const;

type Category = (typeof categories)[number]["value"];

// Pages where the feedback widget should NOT appear
const HIDDEN_PATHS = ["/login", "/callback"];
// Match public trust card pages: single-segment paths like /username
const isPublicTrustCard = (path: string) =>
  /^\/[a-z0-9][a-z0-9-]*$/.test(path) && !HIDDEN_PATHS.includes(path);

export function FeedbackWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hide on public trust card pages and auth pages
  if (HIDDEN_PATHS.includes(pathname) || isPublicTrustCard(pathname)) {
    return null;
  }
  const [category, setCategory] = useState<Category | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  function reset() {
    setCategory(null);
    setMessage("");
    setEmail("");
    setSending(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category || message.trim().length < 10) return;

    setSending(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          message: message.trim(),
          email: email.trim() || undefined,
          pageUrl: window.location.href,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }

      toast.success("Thanks for the feedback!");
      setOpen(false);
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <DialogTrigger
        className={cn(
          "fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-emerald text-white shadow-lg glow-emerald transition-transform hover:scale-105 active:scale-95",
          "md:size-11"
        )}
      >
        <MessageCircle className="size-5" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Send us feedback</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Category selector */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-lg border p-2.5 text-xs font-medium transition-colors",
                  category === cat.value
                    ? "border-emerald bg-emerald/5 text-foreground"
                    : "border-border text-muted-foreground hover:border-emerald/40 hover:text-foreground"
                )}
              >
                <cat.icon className={cn("size-4", category === cat.value ? cat.color : "")} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Message */}
          <Textarea
            placeholder="Tell us what's on your mind... (min 10 chars)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-24"
            required
            minLength={10}
          />

          {/* Email (optional) */}
          <Input
            type="email"
            placeholder="Email (optional, for follow-up)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={!category || message.trim().length < 10 || sending}
            className="w-full bg-emerald text-white hover:bg-emerald-dark"
          >
            {sending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Send className="size-4" data-icon="inline-start" />
                Send feedback
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
