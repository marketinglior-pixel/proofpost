import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

const touchpoints = [
  {
    number: "1",
    title: "Instagram Bio Link",
    why: "Every prospect who checks your profile sees this first. It's the highest-traffic link you own.",
    how: "Replace your current link-in-bio with your Trust Card URL, or add it as the primary link in your Linktree/Stan Store. If you only pick one touchpoint, make it this one.",
    example: "proofpst.com/yourname",
  },
  {
    number: "2",
    title: "Link-in-Bio Tool (Linktree, Stan Store, etc.)",
    why: "If you use a link-in-bio tool, your Trust Card should be the first or second link. Prospects click through from your IG bio and the first thing they should see is proof.",
    how: "Add a button called \"See Client Results\" or \"What Clients Say\" at the top of your link list. Point it to your Trust Card URL.",
    example: "Button label: \"See Client Results\" → proofpst.com/yourname",
  },
  {
    number: "3",
    title: "Email Signature",
    why: "Every email you send becomes a trust-building touchpoint. Proposals, follow-ups, invoices. Your proof is always one click away.",
    how: "Add a line below your name: \"See what my clients say → [Trust Card URL]\". Keep it simple. Most email clients let you add a clickable link in signature settings.",
    example: "[Your Name] | [Title]\nSee what my clients say → proofpst.com/yourname",
  },
  {
    number: "4",
    title: "Proposal / Invoice Footer",
    why: "Right when they're deciding whether to pay you. A link to verified reviews at the bottom of a proposal removes last-minute doubt.",
    how: "Add a small section at the bottom of your proposal template: \"Don't just take my word for it\" with your Trust Card link. Works in Google Docs, Notion, PDF proposals, anywhere.",
    example: "Don't just take my word for it → proofpst.com/yourname",
  },
  {
    number: "5",
    title: "Calendly Confirmation Page",
    why: "After someone books a call, there's a gap before the actual call happens. That's when doubt creeps in. Your Trust Card fills that gap with confidence.",
    how: "In Calendly settings → Confirmation Page → Redirect to external site → paste your Trust Card URL. Now everyone who books a call immediately sees your best reviews.",
    example: "Calendly → Event → Confirmation → Redirect to: proofpst.com/yourname",
  },
  {
    number: "6",
    title: "LinkedIn Featured Section",
    why: "LinkedIn's featured section is prime real estate. Most people waste it on a random post. You'll use it to show verified proof.",
    how: "Go to your LinkedIn profile → Featured → Add a Link → paste your Trust Card URL. Add a title like \"Client Results\" or \"What It's Like Working With Me.\"",
    example: "LinkedIn Featured → Add Link → Title: \"Client Results\"",
  },
  {
    number: "7",
    title: "Auto-Reply / Welcome DM",
    why: "If you use an auto-reply or welcome message for new followers or DM inquiries, include your Trust Card. First impressions with built-in credibility.",
    how: "Add your Trust Card link to your automated welcome message. Something like: \"Thanks for reaching out! Here's a quick look at what my clients say: [link]\". Works with ManyChat, IG auto-replies, or manual saved replies.",
    example: "\"Thanks for reaching out! Here's what my clients say → proofpst.com/yourname\"",
  },
];

export default async function TrustTouchpointsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("plan").eq("id", user!.id).single();
  const plan = (profile as { plan: string } | null)?.plan || "free";
  if (plan !== "pro") redirect("/bonuses");

  return (
    <div className="flex-1 overflow-y-auto bg-snow">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/bonuses"
          className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Bonuses
        </Link>

        <div className="mb-10">
          <span className="text-[11px] font-bold text-emerald uppercase tracking-wider">
            BONUS KIT
          </span>
          <h1 className="text-[24px] font-bold text-slate-900 mt-2 mb-3">
            7 Trust Touchpoints
          </h1>
          <p className="text-[15px] text-slate-500 max-w-lg">
            The 7 places your Trust Card link should live. Most people put
            their link in one place. You'll have it in seven.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-emerald/20 bg-emerald/5 p-5 mb-8">
          <p className="text-[13px] text-slate-700 leading-relaxed">
            <strong>The goal:</strong> Your proof should be working for you
            even when you're not in DMs. Every touchpoint is a chance for a
            prospect to see your results before you even talk to them. Set
            these up once, and they work forever.
          </p>
        </div>

        <div className="space-y-4">
          {touchpoints.map((tp) => (
            <div
              key={tp.number}
              className="rounded-xl bg-white border border-slate-200 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald/10 flex-shrink-0 mt-0.5">
                  <span className="text-[13px] font-bold text-emerald">
                    {tp.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0 space-y-3">
                  <h3 className="text-[16px] font-semibold text-slate-900">
                    {tp.title}
                  </h3>

                  <div>
                    <p className="text-[12px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Why
                    </p>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {tp.why}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      How to set it up
                    </p>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {tp.how}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3">
                    <p className="text-[12px] text-slate-400 font-medium mb-1">
                      Example
                    </p>
                    <p className="text-[13px] text-slate-700 font-mono whitespace-pre-wrap">
                      {tp.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-white border border-slate-200 p-6">
          <h3 className="text-[16px] font-semibold text-slate-900 mb-3">
            Quick checklist
          </h3>
          <div className="space-y-2.5">
            {touchpoints.map((tp) => (
              <label
                key={tp.number}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-5 h-5 rounded border-2 border-slate-200 group-hover:border-emerald/50 flex items-center justify-center transition-colors">
                  <Check className="w-3 h-3 text-transparent group-hover:text-emerald/30 transition-colors" />
                </div>
                <span className="text-[14px] text-slate-600">
                  {tp.title}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
