"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, Mail, QrCode } from "lucide-react";

export function LinkGenerator() {
  const [placeId, setPlaceId] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const reviewLink = `https://search.google.com/local/writereview?placeid=${placeId.trim()}`;

  const emailSubject = "We'd love your feedback!";
  const emailBody = `Hi,\n\nThank you for choosing our business! We'd really appreciate it if you could take a moment to share your experience on Google.\n\nIt only takes 30 seconds — just click the link below:\n\n${reviewLink}\n\nYour review helps other customers find us and helps us improve. Thank you!\n\nBest regards`;

  const emailTemplate = `Subject: ${emailSubject}\n\n${emailBody}`;

  const handleGenerate = () => {
    if (placeId.trim()) {
      setGenerated(true);
    }
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && placeId.trim()) {
      handleGenerate();
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8">
        <h2 className="text-[16px] font-semibold text-slate-900 mb-6">
          Enter your Google Place ID
        </h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={placeId}
              onChange={(e) => {
                setPlaceId(e.target.value);
                setGenerated(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4"
              className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
            />
            <p className="mt-2 text-[12px] text-slate-400">
              Your Place ID starts with &quot;ChI&quot; and is a unique
              identifier for your business on Google.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={!placeId.trim()}
            className="w-full sm:w-auto text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark disabled:opacity-40 disabled:cursor-not-allowed px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Generate Link
          </button>
        </div>

        {/* How to find Place ID */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h3 className="text-[14px] font-semibold text-slate-900 mb-3">
            How to find your Google Place ID
          </h3>
          <ol className="space-y-3 text-[13px] text-slate-500 leading-relaxed">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald/10 text-emerald text-[11px] font-bold flex items-center justify-center mt-0.5">
                1
              </span>
              <span>
                Go to{" "}
                <a
                  href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald hover:underline inline-flex items-center gap-1"
                >
                  Google Place ID Finder
                  <ExternalLink className="w-3 h-3" />
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald/10 text-emerald text-[11px] font-bold flex items-center justify-center mt-0.5">
                2
              </span>
              <span>
                Search for your business name in the map search bar.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald/10 text-emerald text-[11px] font-bold flex items-center justify-center mt-0.5">
                3
              </span>
              <span>
                Click on your business in the results. Your Place ID will appear
                in the info window below the map.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald/10 text-emerald text-[11px] font-bold flex items-center justify-center mt-0.5">
                4
              </span>
              <span>
                Copy the Place ID (starts with &quot;ChI&quot;) and paste it
                above.
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* Results Section */}
      {generated && placeId.trim() && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Direct Review Link */}
          <div>
            <p className="text-[13px] font-medium text-slate-400 uppercase tracking-wider mb-3">
              Your Google Review Link
            </p>
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-4">
              <p className="flex-1 text-[14px] text-emerald font-mono break-all">
                {reviewLink}
              </p>
              <button
                onClick={() => handleCopy(reviewLink, "link")}
                className="flex-shrink-0 p-2 rounded-md hover:bg-slate-200/60 transition-colors"
                title="Copy link"
              >
                {copied === "link" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => handleCopy(reviewLink, "link")}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
              >
                {copied === "link" ? (
                  <Check className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                Copy Link
              </button>
              <a
                href={reviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Test Link
              </a>
            </div>
          </div>

          {/* Short Link Preview */}
          <div className="border-t border-slate-100 pt-6">
            <p className="text-[13px] font-medium text-slate-400 uppercase tracking-wider mb-3">
              Short Link Preview
            </p>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-[14px] text-slate-600 font-mono break-all">
                g.page/review/{placeId.trim().slice(0, 12)}...
              </p>
              <p className="mt-2 text-[12px] text-slate-400">
                Tip: Use a URL shortener like Bitly or TinyURL to create a
                cleaner, branded short link from the full URL above.
              </p>
            </div>
          </div>

          {/* QR Code Ready */}
          <div className="border-t border-slate-100 pt-6">
            <p className="text-[13px] font-medium text-slate-400 uppercase tracking-wider mb-3">
              QR Code Ready
            </p>
            <div className="bg-slate-50 rounded-lg p-4 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald/10 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-emerald" />
              </div>
              <div>
                <p className="text-[14px] text-slate-700 font-medium">
                  Create a QR code from your review link
                </p>
                <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
                  Copy the link above and paste it into any free QR code
                  generator. Print it on business cards, receipts, table tents,
                  or in-store signage.
                </p>
                <button
                  onClick={() => handleCopy(reviewLink, "qr")}
                  className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-medium text-emerald hover:text-emerald-dark transition-colors"
                >
                  {copied === "qr" ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied === "qr" ? "Copied!" : "Copy link for QR code"}
                </button>
              </div>
            </div>
          </div>

          {/* Email Template */}
          <div className="border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-medium text-slate-400 uppercase tracking-wider">
                Pre-formatted Email Template
              </p>
              <button
                onClick={() => handleCopy(emailTemplate, "email")}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-700 transition-colors"
              >
                {copied === "email" ? (
                  <Check className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied === "email" ? "Copied!" : "Copy template"}
              </button>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
                <Mail className="w-4 h-4 text-slate-400" />
                <p className="text-[13px] font-medium text-slate-700">
                  Subject: {emailSubject}
                </p>
              </div>
              <div className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line">
                {emailBody}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
