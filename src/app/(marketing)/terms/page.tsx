import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | ProofPost",
  description: "Terms of Service for ProofPost — AI-powered testimonial widgets.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-700 transition-colors mb-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-[13px] text-slate-400 mb-12">Effective Date: March 25, 2026</p>

        <div className="prose prose-slate prose-sm max-w-none [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-[14px] [&_p]:leading-relaxed [&_p]:text-slate-600 [&_li]:text-[14px] [&_li]:text-slate-600 [&_ul]:mt-2 [&_ul]:space-y-1">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using ProofPost (&quot;the Service&quot;), operated by ProofPost (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            ProofPost is an AI-powered platform that helps businesses collect, manage, and display customer testimonials. Our Service includes:
          </p>
          <ul className="list-disc pl-5">
            <li>AI-generated testimonial carousel widgets</li>
            <li>Embeddable widgets for websites</li>
            <li>Review collection forms</li>
            <li>Wall of Love social proof pages</li>
            <li>Case study generation</li>
            <li>Brand kit customization</li>
          </ul>

          <h2>3. Account Registration</h2>
          <p>
            To use certain features of the Service, you must create an account. You agree to provide accurate, complete information and to keep your account credentials secure. You are responsible for all activity that occurs under your account.
          </p>

          <h2>4. Free Trial and Payment</h2>
          <p>
            ProofPost offers a free tier with limited features. Paid plans are billed on a monthly or annual basis as described on our pricing page. All fees are non-refundable except as required by law. We reserve the right to change pricing with 30 days&apos; notice.
          </p>

          <h2>5. Your Content</h2>
          <p>
            You retain ownership of all testimonials, reviews, and content you upload to ProofPost (&quot;Your Content&quot;). By using the Service, you grant us a limited license to host, display, and process Your Content solely for the purpose of providing the Service to you.
          </p>
          <p>
            You represent that you have the right to use and share any testimonials or reviews you upload, including any necessary consent from the individuals who provided them.
          </p>

          <h2>6. AI-Generated Content</h2>
          <p>
            ProofPost uses AI to generate carousel designs, case studies, and other content based on your inputs. You are responsible for reviewing and approving all AI-generated content before publishing. We do not guarantee the accuracy of AI-generated output.
          </p>

          <h2>7. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5">
            <li>Use the Service for any unlawful purpose</li>
            <li>Upload fabricated or misleading testimonials</li>
            <li>Attempt to reverse-engineer or tamper with the Service</li>
            <li>Resell or redistribute access to the Service</li>
            <li>Use the Service to harass, spam, or deceive others</li>
          </ul>

          <h2>8. Embedded Widgets</h2>
          <p>
            When you embed ProofPost widgets on your website, you are responsible for ensuring the embed code is used in accordance with these Terms. We may display a small &quot;Powered by ProofPost&quot; attribution on free-tier widgets.
          </p>

          <h2>9. Intellectual Property</h2>
          <p>
            The Service, including its design, code, and branding, is owned by ProofPost and protected by intellectual property laws. These Terms do not grant you any rights to our trademarks, logos, or other brand features.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, ProofPost shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
          </p>

          <h2>11. Termination</h2>
          <p>
            You may cancel your account at any time. We may suspend or terminate your access if you violate these Terms. Upon termination, your right to use the Service ceases immediately. We may delete your data 30 days after account termination.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of material changes via email or through the Service. Continued use after changes constitutes acceptance of the updated Terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Israel. Any disputes shall be resolved in the competent courts of Tel Aviv-Jaffa, Israel.
          </p>

          <h2>14. Contact</h2>
          <p>
            If you have questions about these Terms, contact us at{" "}
            <a href="mailto:support@proofpost.com" className="text-emerald hover:underline">
              support@proofpost.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
