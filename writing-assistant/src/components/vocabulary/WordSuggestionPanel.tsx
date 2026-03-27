import type { WordSuggestion } from "@/types/vocabulary";

interface WordSuggestionPanelProps {
  suggestions: WordSuggestion[];
}

export default function WordSuggestionPanel({ suggestions }: WordSuggestionPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Vocabulary Suggestions
      </h3>
      {suggestions.length === 0 ? (
        <p className="text-sm text-slate-600">No vocabulary upgrades suggested.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {suggestions.map((item, index) => (
            <li
              key={`${item.word}-${index}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-slate-900">
                <span className="font-semibold">{item.word}</span> →{" "}
                <span className="font-semibold text-indigo-700">{item.suggestion}</span>
              </p>
              <p className="mt-1 text-slate-600">{item.reason}</p>
              {item.context ? (
                <p className="mt-2 text-xs italic text-slate-500">Context: {item.context}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

