import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fake SaaS header */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600" />
            <span className="font-semibold text-gray-900 text-[15px]">
              AcmeSaaS
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>Features</span>
            <span>Pricing</span>
            <span>Blog</span>
            <span className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-[13px] font-medium">
              Get Started
            </span>
          </div>
        </div>
      </nav>

      {/* Fake hero section */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          The CRM that your team
          <br />
          will actually use.
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto">
          Stop fighting with complex tools. Start closing more deals.
        </p>
      </section>

      {/* TESTIMONIAL SECTION — This is where the embed goes */}
      <section className="max-w-xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
            What our customers say
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Don&apos;t take our word for it.
          </h2>
        </div>

        {/* THE EMBED WIDGET — This is what the customer pastes */}
        <div className="relative">
          {/* Glow effect behind widget */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-50 to-transparent rounded-3xl blur-2xl opacity-50" />

          {/* The actual embed iframe simulation */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/50 bg-white">
            {/* Stars */}
            <div className="p-9 pb-6">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-lg text-amber">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-7">
                <span className="absolute -top-4 -left-1 text-7xl text-violet-500/10 font-serif leading-none">
                  &ldquo;
                </span>
                <p className="text-[17px] leading-relaxed text-gray-800 italic pl-1">
                  We switched from HubSpot to their platform 6 months ago and
                  it&apos;s been a game-changer. Within the first week, our
                  sales reps were actually logging their calls and the pipeline
                  finally reflected reality. We closed 23% more deals last
                  quarter.
                </p>
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-[14px] font-bold">
                  SC
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-gray-900">
                    Sarah Chen
                  </div>
                  <div className="text-[13px] text-gray-400">
                    VP Sales, TechFlow
                  </div>
                </div>
              </div>
            </div>

            {/* Animated slide indicator */}
            <div className="px-9 pb-4 flex items-center gap-6">
              <div className="flex gap-1.5 items-center">
                <div className="w-6 h-1.5 rounded-full bg-violet-500 transition-all" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
              </div>
              <span className="text-[11px] text-gray-300">
                Auto-slides every 5s
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-9 py-3 border-t border-gray-50 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-violet-500 to-purple-600" />
                <span className="text-[11px] font-semibold text-gray-400">
                  AcmeSaaS
                </span>
              </div>
              <span className="text-[10px] text-gray-300">
                ✦ ProofPost
              </span>
            </div>
          </div>
        </div>

        {/* The embed code */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-[13px] text-gray-400">
            ↑ This is the ProofPost widget. One line of code:
          </p>
          <div className="inline-block rounded-lg bg-gray-900 px-5 py-3">
            <code className="text-[12px] text-amber-light/80 font-mono">
              {'<script src="proofpost.app/embed.js" data-proofpost-id="...">'}
              {"</script>"}
            </code>
          </div>
        </div>
      </section>

      {/* Back to ProofPost link */}
      <div className="text-center pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to ProofPost
        </Link>
      </div>
    </div>
  );
}
