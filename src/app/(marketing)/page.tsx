import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Download,
  Zap,
  Quote,
  Check,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="grain min-h-screen bg-cream">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-cream-dark/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="text-[13px] font-semibold text-ink tracking-widest uppercase">
              ProofPost
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-ink-muted hover:text-ink transition-colors duration-200"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-cream bg-ink hover:bg-ink-light px-4 py-2 rounded-lg transition-all duration-200"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber/8 blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber/10 border border-amber/20 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-amber-dark" />
            <span className="text-[12px] font-medium text-amber-dark">
              Free tier. No credit card.
            </span>
          </div>

          <h1 className="font-heading text-[52px] sm:text-[64px] leading-[1.05] text-ink tracking-tight">
            Your reviews are<br />
            <em className="text-amber">collecting dust.</em>
          </h1>

          <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-xl mx-auto">
            You probably have dozens of great customer reviews sitting in emails
            and G2. And they just... sit there. We turn them into LinkedIn
            carousels that actually get leads. Takes about 10 seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 h-12 px-8 bg-ink hover:bg-ink-light text-cream text-[15px] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-ink/10"
            >
              Try it free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how"
              className="flex items-center gap-2 h-12 px-6 text-[15px] text-ink-muted hover:text-ink transition-colors duration-200"
            >
              See how it works
            </a>
          </div>

          <p className="mt-6 text-[13px] text-ink-muted/60">
            3 carousels per month. Free. No strings.
          </p>
        </div>
      </section>

      {/* Demo visual */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="relative rounded-2xl bg-ink p-8 sm:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-amber/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-amber/5 blur-[60px]" />

          <div className="relative grid sm:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-3">
              <div className="text-[11px] font-medium text-amber uppercase tracking-widest">
                Step 1
              </div>
              <p className="text-[15px] text-cream/90 leading-relaxed">
                Paste a review. Any review. From an email, G2, Slack, wherever.
                Copy paste. That's it.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-3">
              <div className="text-[11px] font-medium text-amber uppercase tracking-widest">
                Step 2
              </div>
              <p className="text-[15px] text-cream/90 leading-relaxed">
                AI reads it, finds the punchline, and creates 3 branded slides.
                With your logo. Your colors. Automatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-3">
              <div className="text-[11px] font-medium text-amber uppercase tracking-widest">
                Step 3
              </div>
              <p className="text-[15px] text-cream/90 leading-relaxed">
                Download. Post on LinkedIn. Get leads. The whole thing takes
                maybe 10 seconds. Not exaggerating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section id="how" className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-[36px] text-ink tracking-tight">
            You know the problem.
          </h2>
          <p className="text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
            You've got great reviews. Really great ones. Sarah from TechFlow
            said you changed her entire sales process. But that quote is sitting
            in a Gmail thread from 4 months ago. Not doing anything for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              title: "What you're doing now",
              items: [
                "Screenshotting reviews (looks terrible)",
                "Making quote images in Canva (takes 30 min)",
                "Reposting the same testimonial text (boring)",
                "Just... not posting at all (most honest answer)",
              ],
              style: "bg-white border border-cream-dark",
            },
            {
              title: "What you could be doing",
              items: [
                "Paste review, get carousel in 10 seconds",
                "Branded slides with your logo and colors",
                "AI writes the LinkedIn post text too",
                "Actually posting consistently (wild concept)",
              ],
              style: "bg-ink text-cream",
            },
          ].map((col, i) => (
            <div key={i} className={`rounded-xl p-7 space-y-5 ${col.style}`}>
              <h3
                className={`text-[13px] font-medium uppercase tracking-wider ${
                  i === 0 ? "text-ink-muted" : "text-amber"
                }`}
              >
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[14px]">
                    {i === 0 ? (
                      <span className="text-ink-muted/40 mt-0.5">✕</span>
                    ) : (
                      <Check className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                    )}
                    <span className={i === 0 ? "text-ink-muted" : "text-cream/80"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-[36px] text-ink tracking-tight">
            Not another design tool.
          </h2>
          <p className="text-lg text-ink-muted max-w-xl mx-auto">
            We don't do templates and drag-and-drop. You paste text, you get
            slides. That's the whole product. On purpose.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: Zap,
              title: "10 seconds. Seriously.",
              desc: "Paste a review. Click generate. Download slides. I timed it. It's actually faster than making coffee.",
            },
            {
              icon: Quote,
              title: "AI finds the hook",
              desc: "It reads the full review and pulls out the one sentence that makes people stop scrolling. Usually better than what you'd pick.",
            },
            {
              icon: Download,
              title: "Your brand. Automatic.",
              desc: "Upload your logo once, pick your colors. Every carousel comes out looking like your designer made it. (They didn't.)",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="card-hover rounded-xl bg-white border border-cream-dark p-7 space-y-4"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber/10">
                <feat.icon className="w-5 h-5 text-amber-dark" />
              </div>
              <h3 className="text-[15px] font-semibold text-ink">
                {feat.title}
              </h3>
              <p className="text-[14px] text-ink-muted leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="relative rounded-2xl bg-ink p-10 sm:p-14 overflow-hidden">
          <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-amber/8 blur-[80px]" />

          <Quote className="w-8 h-8 text-amber/30 mb-6 relative z-10" />
          <blockquote className="relative z-10">
            <p className="font-heading text-[22px] sm:text-[26px] text-cream leading-snug">
              I had 47 reviews on G2 and posted maybe 3 of them. Ever. Now I
              just paste them in and post. My LinkedIn impressions went from
              2K to 15K per week. Not sure if that's normal, but it happened.
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber/20" />
              <div>
                <p className="text-sm font-medium text-cream">
                  Sarah Chen
                </p>
                <p className="text-[13px] text-cream/40">
                  VP Sales, TechFlow
                </p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-[36px] text-ink tracking-tight">
            Simple pricing.
          </h2>
          <p className="text-lg text-ink-muted">
            No per-seat nonsense. No feature gates that make no sense.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free */}
          <div className="rounded-xl bg-white border border-cream-dark p-8 space-y-6">
            <div>
              <h3 className="text-[13px] font-medium text-ink-muted uppercase tracking-wider">
                Free
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-heading text-[42px] text-ink">$0</span>
                <span className="text-ink-muted">/mo</span>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "3 carousels per month",
                "1 Brand Kit",
                "AI hook extraction",
                "PNG download",
                "Small watermark",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-[14px] text-ink-muted"
                >
                  <Check className="w-4 h-4 text-ink-muted/40 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="flex items-center justify-center w-full h-11 rounded-lg border border-cream-dark text-[14px] font-medium text-ink hover:bg-cream-dark/50 transition-colors duration-200"
            >
              Get started
            </Link>
          </div>

          {/* Pro */}
          <div className="relative rounded-xl bg-ink p-8 space-y-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-amber/10 blur-[60px]" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-medium text-amber uppercase tracking-wider">
                  Pro
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber/20 text-amber">
                  Popular
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-heading text-[42px] text-cream">
                  $29
                </span>
                <span className="text-cream/40">/mo</span>
              </div>
            </div>
            <ul className="space-y-3 relative">
              {[
                "Unlimited carousels",
                "Multiple Brand Kits",
                "No watermark",
                "PDF carousel download",
                "Priority AI processing",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-[14px] text-cream/70"
                >
                  <Check className="w-4 h-4 text-amber flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="relative flex items-center justify-center w-full h-11 rounded-lg bg-amber hover:bg-amber-light text-ink text-[14px] font-semibold transition-all duration-200"
            >
              Start Pro trial
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="font-heading text-[40px] text-ink tracking-tight">
          Look, just try it.
        </h2>
        <p className="mt-4 text-lg text-ink-muted max-w-lg mx-auto">
          Paste one review. See what comes out. If it's bad, you lost 10
          seconds. If it's good, you've got a new lead generation machine.
          Probably worth the risk.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 mt-8 h-12 px-8 bg-ink hover:bg-ink-light text-cream text-[15px] font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-ink/10"
        >
          Try it free
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-cream-dark">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="text-[12px] font-medium text-ink-muted tracking-widest uppercase">
              ProofPost
            </span>
          </div>
          <p className="text-[13px] text-ink-muted/60">
            © 2026 ProofPost. Turns reviews into revenue.
          </p>
        </div>
      </footer>
    </div>
  );
}
