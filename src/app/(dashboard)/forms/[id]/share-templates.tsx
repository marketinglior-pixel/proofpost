"use client";

import { useState } from "react";
import { Mail, MessageCircle, Copy, QrCode, Check, Link2 } from "lucide-react";
import { toast } from "sonner";

interface ShareTemplatesProps {
  publicUrl: string;
  companyName: string;
}

export function ShareTemplates({ publicUrl, companyName }: ShareTemplatesProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const fullUrl = typeof window !== "undefined"
    ? `${window.location.origin}${publicUrl}`
    : publicUrl;

  const emailTemplate = {
    subject: `Quick favor — share your experience with ${companyName}?`,
    body: `Hi {name},\n\nI hope you're doing well! We're collecting feedback from customers like you to help others understand what ${companyName} can do.\n\nWould you mind taking 2 minutes to share a quick review? It really makes a difference.\n\n${fullUrl}\n\nThanks so much!\n{your name}`,
  };

  const whatsappTemplate = `Hey! 👋 Quick favor — we'd love to hear about your experience with ${companyName}. Takes 2 minutes: ${fullUrl}`;

  const linkedinDM = `Hey {name}! We're collecting customer stories at ${companyName} and I'd love to feature yours. Takes 2 min: ${fullUrl}`;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success("Copied!");
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  // Simple QR Code via Google Charts API (no external deps needed)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}`;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 mb-8 space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
        <Mail className="w-4 h-4 text-slate-400" />
        Share with your customers
      </h3>

      {/* Direct Link */}
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-slate-500">Direct Link</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-mono truncate">
            {fullUrl}
          </code>
          <button
            onClick={() => copyToClipboard(fullUrl, "link")}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {copiedField === "link" ? <Check className="w-3 h-3 text-emerald" /> : <Copy className="w-3 h-3" />}
            Copy
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Email Template */}
        <div className="rounded-lg border border-slate-150 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Mail className="w-3.5 h-3.5 text-blue-500" /> Email
            </span>
            <button
              onClick={() => copyToClipboard(`Subject: ${emailTemplate.subject}\n\n${emailTemplate.body}`, "email")}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {copiedField === "email" ? <Check className="w-3 h-3 text-emerald" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
            Subject: {emailTemplate.subject}
          </p>
        </div>

        {/* WhatsApp Template */}
        <div className="rounded-lg border border-slate-150 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <MessageCircle className="w-3.5 h-3.5 text-green-500" /> WhatsApp
            </span>
            <button
              onClick={() => copyToClipboard(whatsappTemplate, "whatsapp")}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {copiedField === "whatsapp" ? <Check className="w-3 h-3 text-emerald" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
            {whatsappTemplate}
          </p>
        </div>

        {/* LinkedIn DM */}
        <div className="rounded-lg border border-slate-150 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Link2 className="w-3.5 h-3.5 text-blue-700" /> LinkedIn DM
            </span>
            <button
              onClick={() => copyToClipboard(linkedinDM, "linkedin")}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              {copiedField === "linkedin" ? <Check className="w-3 h-3 text-emerald" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
            {linkedinDM}
          </p>
        </div>
      </div>

      {/* QR Code */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
        >
          <QrCode className="w-3.5 h-3.5" />
          {showQR ? "Hide" : "Show"} QR Code
        </button>
        <p className="text-[11px] text-slate-400">Perfect for events, presentations, or printed materials</p>
      </div>
      {showQR && (
        <div className="flex justify-center p-4 bg-white border border-slate-200 rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt="QR Code for collection form"
            width={200}
            height={200}
            className="rounded"
          />
        </div>
      )}
    </div>
  );
}
