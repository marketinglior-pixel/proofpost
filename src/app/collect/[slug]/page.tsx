import { createClient } from "@supabase/supabase-js";
import { CollectForm } from "./collect-form";
import { Star } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: form } = await supabase
    .from("collection_forms")
    .select("id, user_id, title, description, questions, active, brand_kit_id")
    .eq("slug", slug)
    .single();

  if (!form || !form.active) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg font-semibold text-slate-700">
            This form is no longer accepting submissions.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Please contact the person who shared this link.
          </p>
        </div>
      </div>
    );
  }

  // Fetch brand kit if available
  let brandKit = null;
  if (form.brand_kit_id) {
    const { data } = await supabase
      .from("brand_kits")
      .select("company_name, logo_url, primary_color")
      .eq("id", form.brand_kit_id)
      .single();
    brandKit = data;
  } else {
    // Try to get default brand kit for user
    const { data } = await supabase
      .from("brand_kits")
      .select("company_name, logo_url, primary_color")
      .eq("user_id", form.user_id)
      .limit(1)
      .single();
    brandKit = data;
  }

  const questions = (form.questions as string[]) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-lg mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          {brandKit?.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brandKit.logo_url}
              alt={brandKit.company_name || ""}
              className="h-10 mx-auto mb-4 object-contain"
            />
          ) : brandKit?.company_name ? (
            <p className="text-lg font-bold text-slate-900 mb-4">{brandKit.company_name}</p>
          ) : null}
          <h1 className="text-2xl font-bold text-slate-900">{form.title}</h1>
          {form.description && (
            <p className="text-sm text-slate-500 mt-2">{form.description}</p>
          )}
        </div>

        {/* Questions hint */}
        {questions.length > 0 && (
          <div className="rounded-xl bg-white border border-slate-200 p-4 mb-6">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Things to consider
            </p>
            <ul className="space-y-1.5">
              {questions.map((q, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="text-emerald mt-0.5">&#10003;</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}

        <CollectForm
          formId={form.id}
          accentColor={brandKit?.primary_color || "#10B981"}
        />

        {/* Footer */}
        <div className="flex items-center justify-center gap-1.5 mt-8 text-xs text-slate-300">
          <Star className="w-3 h-3" />
          <span>Powered by ProofPost</span>
        </div>
      </div>
    </div>
  );
}
