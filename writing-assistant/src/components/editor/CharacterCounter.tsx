interface CharacterCounterProps {
  text: string;
}

export default function CharacterCounter({ text }: CharacterCounterProps) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
      <span className="font-semibold">Words:</span> {words} | <span className="font-semibold">Characters:</span> {chars}
    </div>
  );
}

