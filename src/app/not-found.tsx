import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-snow font-sans">
      <div className="text-center space-y-4">
        <h1 className="text-[72px] font-bold text-slate-200 tabular-nums">404</h1>
        <p className="text-[15px] text-slate-500">This page doesn&apos;t exist.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center h-10 px-6 bg-emerald text-white text-sm font-medium rounded-lg hover:bg-emerald-dark transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
