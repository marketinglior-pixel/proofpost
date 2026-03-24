"use client";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <h1 className="text-[26px] font-bold text-slate-900">Something went wrong</h1>
      <p className="text-[15px] text-slate-500">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="inline-flex items-center h-10 px-6 bg-emerald text-white text-sm font-medium rounded-lg hover:bg-emerald-dark transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
