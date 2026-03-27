import type { GrammarCorrection } from "@/types/grammar";

interface GrammarPanelProps {
  corrections: GrammarCorrection[];
}

export default function GrammarPanel({ corrections }: GrammarPanelProps) {
  function severityClass(severity: GrammarCorrection["severity"]) {
    if (severity === "high") return "bg-rose-100 text-rose-700 border-rose-200";
    if (severity === "low") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  if (corrections.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 shadow-sm">
        No grammar issues were detected.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Grammar Corrections
      </h3>
      <ul className="space-y-3 text-sm">
        {corrections.map((item) => (
          <li key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500">Correction</span>
              <span
                className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase ${severityClass(item.severity)}`}
              >
                {item.severity}
              </span>
            </div>
            <p className="text-slate-700">
              <span className="font-semibold">Original:</span> {item.original}
            </p>
            <p className="mt-1 text-slate-900">
              <span className="font-semibold">Suggestion:</span> {item.suggestion}
            </p>
            <p className="mt-2 text-slate-600">{item.reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

