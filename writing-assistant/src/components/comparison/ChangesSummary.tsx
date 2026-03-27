interface ChangesSummaryProps {
  correctedIssues: number;
  changedSentences: number;
}

export default function ChangesSummary({
  correctedIssues,
  changedSentences,
}: ChangesSummaryProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
        <p className="text-slate-500">Grammar Fixes</p>
        <p className="text-2xl font-bold text-slate-900">{correctedIssues}</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
        <p className="text-slate-500">Sentences Improved</p>
        <p className="text-2xl font-bold text-slate-900">{changedSentences}</p>
      </div>
    </div>
  );
}

