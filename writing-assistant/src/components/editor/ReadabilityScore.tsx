interface ReadabilityScoreProps {
  score: number;
}

export default function ReadabilityScore({ score }: ReadabilityScoreProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-amber-50 px-3 py-2 text-xs text-slate-700">
      <span className="font-semibold">Readability:</span> {score}/100
    </div>
  );
}

