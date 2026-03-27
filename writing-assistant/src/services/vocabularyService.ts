import { vocabularyPrompt } from "@/lib/prompt-templates";
import { generateJson } from "@/services/ollama";
import type { VocabularyResult } from "@/types/vocabulary";

export async function runVocabularySuggestions(
	text: string,
	model?: string
): Promise<VocabularyResult> {
	const fallback: VocabularyResult = {
		suggestions: [],
	};

	return generateJson<VocabularyResult>(vocabularyPrompt(text), fallback, model);
}

