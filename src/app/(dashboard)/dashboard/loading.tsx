export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-48 bg-slate-200 rounded" />
        <div className="h-4 w-64 bg-slate-100 rounded" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
            <div className="h-3 w-24 bg-slate-100 rounded" />
            <div className="h-8 w-16 bg-slate-200 rounded" />
          </div>
        ))}
      </div>

      {/* Content area */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="h-5 w-40 bg-slate-200 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-slate-50 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
