"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Loader2, Zap, Link2 } from "lucide-react";
import Link from "next/link";

interface Widget {
  id: string;
  name: string;
}

export default function CreateFormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Share your experience");
  const [description, setDescription] = useState(
    "We'd love to hear about your experience with our product. Your review helps others make better decisions."
  );
  const [questions, setQuestions] = useState([
    "What do you like most about our product?",
    "How has it helped your business?",
  ]);
  const [autoApprove, setAutoApprove] = useState(false);
  const [linkedWidgetId, setLinkedWidgetId] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("");
  const [widgets, setWidgets] = useState<Widget[]>([]);

  // Fetch user's widgets for linking
  useEffect(() => {
    fetch("/api/widgets")
      .then((r) => r.json())
      .then((data) => {
        if (data.widgets) setWidgets(data.widgets);
      })
      .catch(() => {});
  }, []);

  const addQuestion = () => {
    if (questions.length >= 5) return;
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          questions: questions.filter((q) => q.trim()),
          autoApprove,
          linkedWidgetId: linkedWidgetId || null,
          thankYouMessage: thankYouMessage.trim() || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create form");
      }

      toast.success("Form created!");
      router.push("/forms");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <Link
        href="/forms"
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Forms
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 mb-1">Create Collection Form</h1>
      <p className="text-sm text-slate-500 mb-8">
        Your customers will see this form when they click your collection link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Form Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Share your experience"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell your customers why their feedback matters..."
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Prompt Questions (optional)</Label>
            {questions.length < 5 && (
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-1 text-xs text-emerald hover:text-emerald-dark transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add question
              </button>
            )}
          </div>
          <p className="text-xs text-slate-400">
            These questions help guide your customers to write better reviews.
          </p>
          {questions.map((q, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={q}
                onChange={(e) => updateQuestion(i, e.target.value)}
                placeholder={`Question ${i + 1}`}
              />
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(i)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Auto-Widget Section */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-900">Auto-Widget Settings</span>
          </div>

          {/* Link to Widget */}
          <div className="space-y-2">
            <Label htmlFor="widget" className="flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-slate-400" />
              Link to Widget
            </Label>
            <select
              id="widget"
              value={linkedWidgetId}
              onChange={(e) => setLinkedWidgetId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
            >
              <option value="">None — reviews won&apos;t be added to a widget</option>
              {widgets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400">
              Approved reviews will automatically appear in this widget on your website.
            </p>
          </div>

          {/* Auto-Approve Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Auto-approve reviews</p>
              <p className="text-xs text-slate-400">
                Reviews go live immediately without manual approval
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAutoApprove(!autoApprove)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoApprove ? "bg-emerald" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                  autoApprove ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {autoApprove && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
              All reviews will be published automatically. You can still reject them later from the dashboard.
            </p>
          )}
        </div>

        {/* Thank You Message */}
        <div className="space-y-2">
          <Label htmlFor="thankYou">Custom Thank You Message (optional)</Label>
          <Textarea
            id="thankYou"
            value={thankYouMessage}
            onChange={(e) => setThankYouMessage(e.target.value)}
            placeholder="Thank you for your review! It means a lot to us."
            rows={2}
          />
          <p className="text-xs text-slate-400">
            Shown after a customer submits their review. Leave empty for the default message.
          </p>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating...</>
          ) : (
            "Create Form"
          )}
        </Button>
      </form>
    </div>
  );
}
