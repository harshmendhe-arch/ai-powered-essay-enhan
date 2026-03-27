interface SideBySideViewProps {
  original: string;
  improved: string;
}

export default function SideBySideView({
  original,
  improved,
}: SideBySideViewProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Original Essay</h3>
        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-800">{original}</p>
      </article>
      <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-emerald-900">Improved Essay</h3>
        <p className="whitespace-pre-wrap text-sm leading-6 text-emerald-950">{improved}</p>
      </article>
    </div>
  );
}

