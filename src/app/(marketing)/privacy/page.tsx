import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ProofPost",
  description: "Privacy Policy for ProofPost — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-[13px] text-slate-400 mb-12">Effective Date: March 25, 2026</p>

        <div className="prose prose-slate prose-sm max-w-none [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-[14px] [&_p]:leading-relaxed [&_p]:text-slate-600 [&_li]:text-[14px] [&_li]:text-slate-600 [&_ul]:mt-2 [&_ul]:space-y-1">
          <h2>1. Information We Collect</h2>

          <p><strong>Account Information:</strong> When you create an account, we collect your name, email address, and authentication credentials through our authentication provider (Supabase).</p>

          <p><strong>Testimonial Data:</strong> We store the testimonials, reviews, and customer feedback you upload or collect through ProofPost forms. This may include the reviewer&apos;s name, company, role, photo, and review text.</p>

          <p><strong>Usage Data:</strong> We collect information about how you use the Service, including pages visited, features used, and widget interactions.</p>

          <p><strong>Embedded Widget Data:</strong> When your visitors view ProofPost widgets embedded on your website, we may collect anonymous analytics such as impressions and click-through rates.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5">
            <li>Provide, maintain, and improve the Service</li>
            <li>Generate AI-powered testimonial carousels and case studies</li>
            <li>Display your testimonials through embeddable widgets</li>
            <li>Send you service-related communications</li>
            <li>Analyze usage to improve the product</li>
            <li>Process payments and manage your subscription</li>
          </ul>

          <h2>3. AI Processing</h2>
          <p>
            ProofPost uses third-party AI services to generate carousel designs and case studies from your testimonial content. Your testimonial data may be sent to these AI providers for processing. We do not use your data to train AI models.
          </p>

          <h2>4. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with:</p>
          <ul className="list-disc pl-5">
            <li><strong>Service providers:</strong> Hosting (Vercel), authentication (Supabase), payment processing, and AI providers — solely to operate the Service</li>
            <li><strong>Your website visitors:</strong> Testimonial content you choose to display through widgets is publicly visible</li>
            <li><strong>Legal requirements:</strong> When required by law, regulation, or legal process</li>
          </ul>

          <h2>5. Cookies and Tracking</h2>
          <p>
            We use essential cookies to maintain your session and authentication state. Our embedded widgets may use minimal cookies or local storage to function properly. We do not use third-party advertising cookies.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your account data and testimonial content for as long as your account is active. If you delete your account, we will delete your data within 30 days, except where retention is required by law.
          </p>

          <h2>7. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including encryption in transit (HTTPS) and at rest. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>8. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data in a portable format</li>
            <li>Object to or restrict processing of your data</li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a href="mailto:marketinglior@gmail.com" className="text-emerald hover:underline">
              marketinglior@gmail.com
            </a>
            .
          </p>

          <h2>9. Children&apos;s Privacy</h2>
          <p>
            ProofPost is not intended for use by anyone under the age of 16. We do not knowingly collect personal information from children.
          </p>

          <h2>10. International Data Transfers</h2>
          <p>
            Your data may be processed in countries other than your own, including the United States and Israel. We ensure appropriate safeguards are in place for such transfers.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes via email or through the Service. The &quot;Effective Date&quot; at the top indicates when the policy was last revised.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, contact us at{" "}
            <a href="mailto:marketinglior@gmail.com" className="text-emerald hover:underline">
              marketinglior@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
