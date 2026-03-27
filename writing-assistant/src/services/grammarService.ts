import { grammarPrompt } from "@/lib/prompt-templates";
import { generateJson } from "@/services/ollama";
import type { GrammarResult } from "@/types/grammar";

export async function runGrammarCheck(
	text: string,
	model?: string
): Promise<GrammarResult> {
	const fallback: GrammarResult = {
		correctedText: text,
		corrections: [],
	};

	const raw = await generateJson<GrammarResult>(grammarPrompt(text), fallback, model);

	return {
		correctedText:
			typeof raw.correctedText === "string" && raw.correctedText.trim().length > 0
				? raw.correctedText
				: text,
		corrections: Array.isArray(raw.corrections)
			? raw.corrections
					.filter(
						(item) =>
							typeof item.original === "string" &&
							typeof item.suggestion === "string" &&
							item.original.trim().length > 0 &&
							item.suggestion.trim().length > 0
					)
					.map((item, index) => ({
						id: item.id ?? `g-${index}`,
						original: item.original,
						suggestion: item.suggestion,
						reason: item.reason ?? "Grammar improvement",
						severity:
							item.severity === "high" ||
							item.severity === "medium" ||
							item.severity === "low"
								? item.severity
								: "medium",
						index: typeof item.index === "number" ? item.index : index,
					}))
			: [],
	};
}

