import Link from "next/link";
import { ArrowLeft, ArrowRight, Star, Copy, Check, Code2, Palette, Zap } from "lucide-react";
import { CopyButton } from "./copy-button";

const EMBED_CODE = `<script src="https://proofpst.com/embed.js" data-proofpost-id="YOUR_ID"></script>`;

const platforms = [
  {
    id: "webflow",
    name: "Webflow",
    color: "#4353FF",
    steps: [
      "Open your Webflow project and go to **Project Settings**.",
      'Click the **Custom Code** tab.',
      "Paste the embed code in the **Footer Code** section.",
      "Click **Save Changes** and publish your site.",
    ],
    tip: "Want the widget on a specific page only? Add an Embed element to that page instead, and paste the code there.",
  },
  {
    id: "wordpress",
    name: "WordPress",
    color: "#21759B",
    steps: [
      "Go to **Appearance > Widgets** in your WordPress dashboard.",
      'Add a **Custom HTML** widget to the area where you want the testimonials.',
      "Paste the embed code and click **Save**.",
    ],
    tip: 'Using a page builder like Elementor? Add an "HTML" widget and paste the code there. For site-wide placement, use a plugin like "Insert Headers and Footers".',
  },
  {
    id: "shopify",
    name: "Shopify",
    color: "#96BF48",
    steps: [
      "Go to **Online Store > Themes** in your Shopify admin.",
      'Click **Actions > Edit Code** (or the three-dot menu > Edit code).',
      'Open **theme.liquid** and paste the embed code just before the closing `</body>` tag.',
      "Click **Save**.",
    ],
    tip: "For a specific page, edit that page and switch to HTML mode to paste the code exactly where you want it.",
  },
  {
    id: "framer",
    name: "Framer",
    color: "#0055FF",
    steps: [
      'In the Framer editor, add a new **Embed** component (press "/" and search for "Embed").',
      "Paste the embed code in the HTML field.",
      "Resize the component to fit your layout.",
      "Publish your site.",
    ],
    tip: "Set the Embed component width to 100% and max-width to 500px for the best look.",
  },
  {
    id: "react",
    name: "React / Next.js",
    color: "#61DAFB",
    steps: [
      "Add the script tag to your page component or layout file.",
      "In Next.js, use the `Script` component from `next/script` with `strategy=\"afterInteractive\"`.",
      "Place a container div where you want the widget — the script injects the iframe after it.",
    ],
    tip: "In Next.js, import Script from 'next/script' and add it to your page component. The script tag works the same way in plain React — just add it to your public/index.html.",
  },
  {
    id: "html",
    name: "Any HTML site",
    color: "#374151",
    steps: [
      "Open your HTML file in any code editor.",
      "Paste the embed code where you want the widget to appear (usually inside the `<body>` section).",
      "Save and upload the file to your hosting.",
    ],
    tip: "Works with any static site, landing page builder, or CMS that allows custom HTML.",
  },
];

const configOptions = [
  {
    attr: "data-style",
    values: '"carousel" (default) | "marquee"',
    desc: "Carousel shows one review at a time with auto-sliding. Marquee shows a horizontal scrolling wall of reviews.",
  },
  {
    attr: "data-theme",
    values: '"light" (default) | "dark"',
    desc: "Match the widget to your site's color scheme.",
  },
  {
    attr: "data-max-width",
    values: '"500px" (carousel) | "100%" (marquee)',
    desc: "Control the maximum width of the widget container.",
  },
  {
    attr: "data-width",
    values: '"100%" (default)',
    desc: "Set the widget container width.",
  },
];

const faqs = [
  {
    q: "Does it slow down my site?",
    a: 'No. The script is tiny (~2KB), loads lazily, and the widget renders inside an isolated iframe. It won\'t affect your page\'s performance or layout.',
  },
  {
    q: "Can I customize the colors?",
    a: "Yes. Go to your Brand Kit in the ProofPost dashboard to set your primary color, logo, and company name. The widget picks these up automatically.",
  },
  {
    q: "How do I update the reviews shown?",
    a: "Just update your widget in the ProofPost dashboard. The embed code stays the same — the widget fetches the latest reviews automatically.",
  },
  {
    q: "Can I remove the ProofPost watermark?",
    a: "Yes, upgrading to the Pro plan removes the watermark and gives you full white-label control.",
  },
  {
    q: "Do I need to update the code when I add new reviews?",
    a: "Never. The embed code is a one-time setup. When you add or change reviews in your dashboard, the widget updates everywhere automatically.",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
              <Star className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-[15px] font-semibold text-slate-900">
              ProofPost
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-white bg-emerald hover:bg-emerald-dark px-5 py-2.5 rounded-lg transition-colors duration-200"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald/5 text-emerald text-[13px] font-medium px-4 py-1.5 rounded-full mb-6">
          <Zap className="w-3.5 h-3.5" />
          Takes less than 2 minutes
        </div>
        <h1 className="text-[40px] sm:text-[48px] font-bold text-slate-900 tracking-tight leading-[1.1]">
          Add ProofPost to your site.
        </h1>
        <p className="mt-4 text-[17px] text-slate-500 max-w-lg mx-auto leading-relaxed">
          One line of code. Works on every platform.
          No developer needed.
        </p>
      </section>

      {/* Universal embed code */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-slate-900">
              Your embed code
            </h2>
            <CopyButton code={EMBED_CODE} />
          </div>
          <div className="rounded-lg bg-slate-900 px-5 py-4 overflow-x-auto">
            <code className="text-[13px] text-amber-300/90 font-mono whitespace-nowrap">
              {EMBED_CODE}
            </code>
          </div>
          <p className="text-[13px] text-slate-400">
            Replace <code className="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[12px]">YOUR_ID</code> with your widget ID from the{" "}
            <Link href="/login" className="text-emerald hover:underline">
              ProofPost dashboard
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Platform guides */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-[24px] font-bold text-slate-900 text-center mb-3">
          Step-by-step for your platform.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-md mx-auto">
          Pick your platform below. Same code, slightly different steps.
        </p>

        <div className="space-y-6">
          {platforms.map((p) => (
            <div
              key={p.id}
              id={p.id}
              className="scroll-mt-24 rounded-xl border border-slate-200 overflow-hidden"
            >
              {/* Platform header */}
              <div
                className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <h3 className="text-[16px] font-semibold text-slate-900">
                  {p.name}
                </h3>
              </div>

              {/* Steps */}
              <div className="px-6 py-5 space-y-4">
                <ol className="space-y-3">
                  {p.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald/10 text-emerald text-[12px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span
                        className="text-[14px] text-slate-600 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: step.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-slate-900 font-semibold">$1</strong>'
                          ).replace(
                            /`(.*?)`/g,
                            '<code class="text-[12px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">$1</code>'
                          ),
                        }}
                      />
                    </li>
                  ))}
                </ol>

                {/* Tip */}
                <div className="bg-amber-50/60 border border-amber-100 rounded-lg px-4 py-3">
                  <p className="text-[13px] text-amber-800 leading-relaxed">
                    <span className="font-semibold">Tip:</span>{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: p.tip.replace(
                          /`(.*?)`/g,
                          '<code class="text-[12px] bg-amber-100 text-amber-900 px-1 py-0.5 rounded">$1</code>'
                        ),
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Configuration options */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-2 justify-center mb-3">
            <Palette className="w-5 h-5 text-slate-400" />
            <h2 className="text-[24px] font-bold text-slate-900">
              Customization options
            </h2>
          </div>
          <p className="text-[15px] text-slate-500 text-center mb-10 max-w-md mx-auto">
            Add these attributes to your embed code to customize the widget.
          </p>

          <div className="space-y-3">
            {configOptions.map((opt) => (
              <div
                key={opt.attr}
                className="rounded-lg border border-slate-200 bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
              >
                <code className="text-[13px] font-semibold text-emerald bg-emerald/5 px-2.5 py-1 rounded flex-shrink-0">
                  {opt.attr}
                </code>
                <div className="space-y-1">
                  <p className="text-[13px] text-slate-400 font-mono">
                    {opt.values}
                  </p>
                  <p className="text-[14px] text-slate-600">
                    {opt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-slate-900 p-5">
            <p className="text-[12px] text-slate-400 mb-3 font-medium">
              Example: Marquee style with dark theme
            </p>
            <code className="text-[13px] text-amber-300/90 font-mono leading-relaxed block overflow-x-auto">
              {'<script src="https://proofpst.com/embed.js" data-proofpost-id="YOUR_ID" data-style="marquee" data-theme="dark"></script>'}
            </code>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-[24px] font-bold text-slate-900 text-center mb-10">
          Common questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-[15px] font-semibold text-slate-900">
                {faq.q}
              </h3>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-[28px] font-bold text-white tracking-tight">
            Ready to add social proof?
          </h2>
          <p className="text-[16px] text-slate-400 max-w-md mx-auto">
            Paste a review, let AI extract the hook, embed the widget.
            60 seconds. Free to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 h-13 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demo"
              className="text-[14px] text-slate-400 hover:text-white transition-colors"
            >
              See live demo &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
