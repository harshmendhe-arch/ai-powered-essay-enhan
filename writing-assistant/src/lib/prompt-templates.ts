import type { ReviewTone } from "@/types/essay";

export function grammarPrompt(text: string): string {
	return [
		"You are an expert academic writing assistant.",
		"Return ONLY valid JSON with shape:",
		'{"correctedText":"string","corrections":[{"id":"string","original":"string","suggestion":"string","reason":"string","severity":"low|medium|high","index":0}]}',
		"Correct grammar, punctuation, and syntax while preserving meaning.",
		"Input essay:",
		text,
	].join("\n");
}

export function enhancementPrompt(text: string, tone: ReviewTone): string {
	return [
		"You improve essay sentence structure and clarity for students.",
		`Target tone: ${tone}.`,
		"Return ONLY valid JSON with shape:",
		'{"enhancedText":"string","rewrites":[{"original":"string","improved":"string","reason":"string"}],"stats":{"rewrites":0,"readabilityDelta":0}}',
		"Input essay:",
		text,
	].join("\n");
}

export function vocabularyPrompt(text: string): string {
	return [
		"Suggest stronger academic vocabulary in context.",
		"Return ONLY valid JSON with shape:",
		'{"suggestions":[{"word":"string","suggestion":"string","reason":"string","context":"string"}]}',
		"Input essay:",
		text,
	].join("\n");
}

