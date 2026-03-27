interface EssayInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EssayInput({ value, onChange }: EssayInputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">Essay Input</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste or write your essay here..."
        className="min-h-60 w-full rounded-xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </label>
  );
}

