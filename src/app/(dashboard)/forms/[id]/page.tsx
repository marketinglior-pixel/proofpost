import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Check, X, Clock, Star, Zap, Link2 } from "lucide-react";
import { SubmissionActions } from "./submission-actions";
import { FormSettings } from "./form-settings";
import { ShareTemplates } from "./share-templates";

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
    .single() as { data: {
      id: string;
      title: string;
      description: string | null;
      slug: string;
      active: boolean;
      auto_approve: boolean;
      linked_widget_id: string | null;
      thank_you_message: string | null;
      questions: unknown;
      created_at: string;
    } | null };

  if (!form) redirect("/forms");

  const { data: submissions } = await supabase
    .from("submissions")
    .select("*")
    .eq("form_id", id)
    .order("created_at", { ascending: false }) as { data: Array<{
      id: string;
      reviewer_name: string;
      reviewer_title: string | null;
      reviewer_company: string | null;
      review_text: string;
      rating: number;
      status: string;
      generated_content_id: string | null;
      created_at: string;
    }> | null };

  // Fetch widgets for settings
  const { data: widgets } = await supabase
    .from("widgets")
    .select("id, name")
    .eq("user_id", user.id);

  // Get brand kit for templates
  const { data: brandKit } = await supabase
    .from("brand_kits")
    .select("company_name")
    .eq("user_id", user.id)
    .single();

  const publicUrl = `/collect/${form.slug}`;
  const pendingCount = submissions?.filter((s) => s.status === "pending").length || 0;
  const approvedCount = submissions?.filter((s) => s.status === "approved").length || 0;

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
          <div className="flex items-center gap-3 mt-2">
            {form.auto_approve && (
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                <Zap className="w-3 h-3" /> Auto-approve
              </span>
            )}
            {form.linked_widget_id && (
              <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                <Link2 className="w-3 h-3" /> Linked to widget
              </span>
            )}
          </div>
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{submissions?.length || 0}</p>
          <p className="text-xs text-slate-500">Total Submissions</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-500">{pendingCount}</p>
          <p className="text-xs text-slate-500">Pending Review</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-emerald">{approvedCount}</p>
          <p className="text-xs text-slate-500">Approved</p>
        </div>
      </div>

      {/* Share Templates */}
      <ShareTemplates
        publicUrl={publicUrl}
        companyName={brandKit?.company_name || "our product"}
      />

      {/* Form Settings */}
      <FormSettings
        formId={form.id}
        autoApprove={form.auto_approve}
        linkedWidgetId={form.linked_widget_id}
        widgets={(widgets || []) as { id: string; name: string }[]}
      />

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
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-xs text-slate-400">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </p>
                    {sub.generated_content_id && (
                      <span className="text-xs text-emerald bg-emerald/10 px-1.5 py-0.5 rounded">
                        Widget ready
                      </span>
                    )}
                  </div>
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
