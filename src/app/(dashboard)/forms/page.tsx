import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Plus, ExternalLink, FileText, ToggleLeft, ToggleRight } from "lucide-react";

export default async function FormsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: forms } = await supabase
    .from("collection_forms")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }) as { data: Array<{ id: string; title: string; slug: string; active: boolean; created_at: string }> | null };

  // Count submissions per form
  const { data: submissions } = await supabase
    .from("submissions")
    .select("form_id, status")
    .eq("user_id", user.id) as { data: Array<{ form_id: string; status: string }> | null };

  const submissionCounts = (forms || []).map((form) => {
    const formSubs = (submissions || []).filter((s) => s.form_id === form.id);
    return {
      total: formSubs.length,
      pending: formSubs.filter((s) => s.status === "pending").length,
    };
  });

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Collection Forms</h1>
          <p className="text-sm text-slate-500 mt-1">
            Create forms to collect testimonials from your customers.
          </p>
        </div>
        <Link
          href="/forms/create"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald hover:bg-emerald-dark text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Form
        </Link>
      </div>

      {!forms || forms.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No forms yet</h3>
          <p className="text-sm text-slate-500 mb-4">
            Create a collection form and share the link with your customers.
          </p>
          <Link
            href="/forms/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald hover:bg-emerald-dark text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create your first form
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {forms.map((form, i) => (
            <div
              key={form.id}
              className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <Link href={`/forms/${form.id}`} className="text-sm font-semibold text-slate-900 hover:text-emerald transition-colors">
                    {form.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-400">
                      {submissionCounts[i]?.total || 0} submissions
                    </span>
                    {(submissionCounts[i]?.pending || 0) > 0 && (
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        {submissionCounts[i].pending} pending
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      {form.active ? (
                        <><ToggleRight className="w-3 h-3 text-emerald" /> Active</>
                      ) : (
                        <><ToggleLeft className="w-3 h-3" /> Inactive</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/collect/${form.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Public Link
                </a>
                <Link
                  href={`/forms/${form.id}`}
                  className="px-3 py-1.5 text-xs font-medium text-emerald hover:text-emerald-dark border border-emerald/20 rounded-lg hover:bg-emerald/5 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
