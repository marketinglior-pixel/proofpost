import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DemoCarousel } from "./demo-carousel";

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

      {/* Fake hero */}
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

      {/* TESTIMONIAL SECTION */}
      <section className="max-w-xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
            What our customers say
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Don&apos;t take our word for it.
          </h2>
        </div>

        {/* Live auto-sliding carousel */}
        <DemoCarousel />

        {/* Embed code */}
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

      {/* Back */}
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
