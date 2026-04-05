import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Lock,
  ArrowUpRight,
  MessageSquareText,
  Send,
  MapPin,
  ArrowRight,
} from "lucide-react";

const bonuses = [
  {
    title: "Testimonial Request Kit",
    description:
      "3 email templates + 2 DM scripts to get 5 new testimonials this week. Includes the follow-up message if they don't respond.",
    href: "/bonuses/testimonial-request-kit",
    icon: MessageSquareText,
    value: "$97",
    items: "5 templates",
  },
  {
    title: "DM Drop Playbook",
    description:
      "4 copy-paste scripts for sharing your Trust Card naturally in any DM conversation. Cold, warm, proof request, and follow-up.",
    href: "/bonuses/dm-drop-playbook",
    icon: Send,
    value: "$67",
    items: "4 scripts",
  },
  {
    title: "7 Trust Touchpoints",
    description:
      "The 7 places your Trust Card link should live, so your proof works for you 24/7. With setup instructions for each.",
    href: "/bonuses/trust-touchpoints",
    icon: MapPin,
    value: "$47",
    items: "7 placements",
  },
];

export default async function BonusesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user!.id)
    .single();
  const plan = (profile as { plan: string } | null)?.plan || "free";
  const isPro = plan === "pro";

  if (!isPro) {
    return (
      <div className="flex-1 overflow-y-auto bg-snow">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 mx-auto mb-6">
            <Lock className="w-6 h-6 text-slate-400" />
          </div>
          <h1 className="text-[24px] font-bold text-slate-900 mb-3">
            Pro Bonuses
          </h1>
          <p className="text-[15px] text-slate-500 mb-8 max-w-md mx-auto">
            Upgrade to Pro to unlock 3 bonus kits: testimonial request
            templates, DM scripts, and the trust touchpoints checklist.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 h-12 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors glow-emerald"
          >
            Upgrade to Pro
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-snow">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-[24px] font-bold text-slate-900 mb-2">
            Your Bonus Kits
          </h1>
          <p className="text-[15px] text-slate-500">
            Copy-paste templates and scripts included with your DM Closer Kit.
          </p>
        </div>

        <div className="space-y-4">
          {bonuses.map((bonus) => (
            <Link
              key={bonus.href}
              href={bonus.href}
              className="block rounded-xl bg-white border border-slate-200 p-6 hover:border-emerald/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald/10 flex-shrink-0">
                  <bonus.icon className="w-5 h-5 text-emerald-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-[16px] font-semibold text-slate-900 group-hover:text-emerald-dark transition-colors">
                      {bonus.title}
                    </h2>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-3">
                    {bonus.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-emerald bg-emerald/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {bonus.items}
                    </span>
                    <span className="text-[12px] text-slate-400">
                      Value: {bonus.value}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
