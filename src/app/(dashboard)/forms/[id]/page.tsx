import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Check, X, Clock, Star, Copy } from "lucide-react";
import { SubmissionActions } from "./submission-actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FormDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: form } = await supabase
    .from("collection_forms")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single() as { data: { id: string; title: string; description: string | null; slug: string; active: boolean; questions: unknown; created_at: string } | null };

  if (!form) redirect("/forms");

  const { data: submissions } = await supabase
    .from("submissions")
    .select("*")
    .eq("form_id", id)
    .order("created_at", { ascending: false }) as { data: Array<{ id: string; reviewer_name: string; reviewer_title: string | null; reviewer_company: string | null; review_text: string; rating: number; status: string; created_at: string }> | null };

  const publicUrl = `/collect/${form.slug}`;

  return (
    <div className="p-8 max-w-4xl">
      <Link
        href="/forms"
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Forms
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{form.title}</h1>
          {form.description && (
            <p className="text-sm text-slate-500 mt-1">{form.description}</p>
          )}
        </div>
        <a
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-emerald border border-emerald/20 rounded-lg hover:bg-emerald/5 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open Public Form
        </a>
      </div>

      {/* Share link */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-8">
        <p className="text-xs font-medium text-slate-500 mb-2">Share this link with your customers:</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-mono">
            {typeof window !== "undefined" ? window.location.origin : ""}{publicUrl}
          </code>
        </div>
      </div>

      {/* Submissions */}
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Submissions ({submissions?.length || 0})
      </h2>

      {!submissions || submissions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No submissions yet. Share the form link to start collecting reviews.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div key={sub.id} className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm text-slate-900">
                      {sub.reviewer_name}
                    </span>
                    {sub.reviewer_title && (
                      <span className="text-xs text-slate-400">
                        {sub.reviewer_title}
                        {sub.reviewer_company ? `, ${sub.reviewer_company}` : ""}
                      </span>
                    )}
                    <div className="flex gap-0.5 ml-1">
                      {Array.from({ length: sub.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    &ldquo;{sub.review_text}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {sub.status === "pending" ? (
                    <SubmissionActions submissionId={sub.id} />
                  ) : sub.status === "approved" ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald bg-emerald/10 px-2 py-1 rounded">
                      <Check className="w-3 h-3" /> Approved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded">
                      <X className="w-3 h-3" /> Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
