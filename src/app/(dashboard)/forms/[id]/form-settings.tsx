"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Zap, Link2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FormSettingsProps {
  formId: string;
  autoApprove: boolean;
  linkedWidgetId: string | null;
  widgets: { id: string; name: string }[];
}

export function FormSettings({ formId, autoApprove: initialAutoApprove, linkedWidgetId: initialLinkedWidgetId, widgets }: FormSettingsProps) {
  const router = useRouter();
  const [autoApprove, setAutoApprove] = useState(initialAutoApprove);
  const [linkedWidgetId, setLinkedWidgetId] = useState(initialLinkedWidgetId || "");
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);

  const hasChanges = autoApprove !== initialAutoApprove || linkedWidgetId !== (initialLinkedWidgetId || "");

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/forms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          autoApprove,
          linkedWidgetId: linkedWidgetId || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update");
      }

      toast.success("Settings saved!");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-xl"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Settings className="w-4 h-4 text-slate-400" />
          Form Settings
        </span>
        <span className="text-xs text-slate-400">{open ? "Hide" : "Show"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
          {/* Auto-Approve Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Auto-approve reviews
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Reviews go live immediately without manual approval
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAutoApprove(!autoApprove)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoApprove ? "bg-emerald" : "bg-slate-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                  autoApprove ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Link to Widget */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-blue-500" />
              Auto-add to Widget
            </p>
            <select
              value={linkedWidgetId}
              onChange={(e) => setLinkedWidgetId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:border-transparent"
            >
              <option value="">None — manual only</option>
              {widgets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400">
              Approved reviews will automatically appear in this widget
            </p>
          </div>

          {hasChanges && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald hover:bg-emerald-dark rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              Save Changes
            </button>
          )}
        </div>
      )}
    </div>
  );
}
