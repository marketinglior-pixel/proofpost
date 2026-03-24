"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-snow font-sans">
      <div className="text-center space-y-4">
        <h1 className="text-[72px] font-bold text-slate-200 tabular-nums">500</h1>
        <p className="text-[15px] text-slate-500">Something went wrong.</p>
        <button
          onClick={reset}
          className="inline-flex items-center h-10 px-6 bg-emerald text-white text-sm font-medium rounded-lg hover:bg-emerald-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
