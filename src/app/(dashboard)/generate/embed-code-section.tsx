"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Code2, Copy, Check, ExternalLink } from "lucide-react";

const PROOFPOST_HOST = "https://proofpost-alpha.vercel.app";

export function EmbedCodeSection({ contentId }: { contentId: string }) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${contentId}"></script>`;

  async function handleCopy() {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Embed code copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl bg-white border border-cream-dark p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-ink flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-dark" />
            Embed on Your Website
          </h3>
          <p className="text-[14px] text-ink-muted mt-0.5">
            Add this testimonial widget anywhere on your site
          </p>
        </div>
        <a
          href={`${PROOFPOST_HOST}/embed/${contentId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-amber-dark hover:text-amber flex items-center gap-1 transition-colors"
        >
          Preview
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="rounded-lg bg-ink p-4 relative group">
        <code className="text-[13px] text-amber-light/80 font-mono break-all leading-relaxed">
          {embedCode}
        </code>
      </div>

      <Button
        onClick={handleCopy}
        className="w-full h-11 bg-ink hover:bg-ink-light text-cream font-medium shadow-none transition-all duration-200"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2 text-emerald-400" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy Embed Code
          </>
        )}
      </Button>

      <p className="text-[12px] text-ink-muted/60 text-center">
        Works on any website. Just paste the code where you want the widget.
      </p>
    </div>
  );
}
