interface EnhancedOutputProps {
  text: string;
}

export default function EnhancedOutput({ text }: EnhancedOutputProps) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
      <h3 className="mb-2 text-sm font-semibold text-indigo-900">Improved Version Output</h3>
      <p className="whitespace-pre-wrap text-sm leading-6 text-indigo-950">{text}</p>
    </div>
  );
}

