import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, ExternalLink, BookOpen } from "lucide-react";

const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function CaseStudiesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: caseStudies } = await supabaseAdmin
    .from("case_studies")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }) as { data: Array<{ id: string; title: string; body: Record<string, unknown>; created_at: string }> | null };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Case Studies</h1>
          <p className="text-sm text-slate-500 mt-1">
            Turn your best testimonials into professional case studies.
          </p>
        </div>
        <Link
          href="/case-studies/generate"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald hover:bg-emerald-dark text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Generate Case Study
        </Link>
      </div>

      {!caseStudies || caseStudies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No case studies yet</h3>
          <p className="text-sm text-slate-500 mb-4">
            Select a testimonial and let AI generate a professional case study.
          </p>
          <Link
            href="/case-studies/generate"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald hover:bg-emerald-dark text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Generate your first case study
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {caseStudies.map((cs) => {
            const body = cs.body as { summary?: string; quote?: { attribution?: string } };
            return (
              <div
                key={cs.id}
                className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{cs.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {body?.quote?.attribution || ""} · {new Date(cs.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a
                  href={`/case-study/${cs.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  View
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
