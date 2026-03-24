"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SubmissionActions({ submissionId }: { submissionId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (status: "approved" | "rejected") => {
    setLoading(status);
    try {
      const res = await fetch("/api/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, status }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update");
      }

      const result = await res.json();
      if (status === "approved" && result.contentId) {
        toast.success("Approved! Carousel generated.");
      } else if (status === "approved") {
        toast.success("Approved!");
      } else {
        toast.success("Rejected.");
      }
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => handleAction("approved")}
        disabled={loading !== null}
        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald bg-emerald/10 hover:bg-emerald/20 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading === "approved" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
        Approve
      </button>
      <button
        onClick={() => handleAction("rejected")}
        disabled={loading !== null}
        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading === "rejected" ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
        Reject
      </button>
    </div>
  );
}
