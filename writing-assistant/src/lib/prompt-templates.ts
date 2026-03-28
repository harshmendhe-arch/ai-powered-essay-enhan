import type { ReviewTone } from "@/types/essay";

export function grammarPrompt(text: string): string {
	return [
		"You are an expert academic grammar checker. Your task is to identify and correct ALL grammar mistakes in the essay.",
		"Check thoroughly for these error types: subject-verb agreement, incorrect tense, missing or extra articles (a/an/the), wrong prepositions, comma splices, run-on sentences, sentence fragments, dangling modifiers, pronoun-antecedent disagreement, incorrect word forms (e.g. effect/affect, its/it's), spelling errors, missing punctuation, and redundant words.",
		"Rules:",
		"1. If there are no errors, return an empty corrections array.",
		"2. Every detected error MUST appear as a separate entry in the corrections array.",
		"3. The 'original' field must be the exact erroneous phrase or word as it appears in the text.",
		"4. The 'suggestion' field must contain the corrected replacement.",
		"5. The 'reason' field must briefly explain why it is wrong.",
		"6. Set 'severity' to 'high' for errors that change meaning, 'medium' for standard grammar errors, and 'low' for style/punctuation issues.",
		"7. The 'index' field should be the character position of the error in the input text (use 0 if unknown).",
		"8. The 'correctedText' field must be the full essay with ALL corrections applied.",
		"Return ONLY minified valid JSON — no markdown, no code fences, no extra text — with this exact shape:",
		'{"correctedText":"<full corrected essay>","corrections":[{"id":"g-0","original":"<erroneous text>","suggestion":"<corrected text>","reason":"<short explanation>","severity":"medium","index":0}]}',
		"Input essay:",
		text,
	].join("\n");
}

const toneDescriptions: Record<ReviewTone, string> = {
	academic: "formal academic writing suitable for university essays and research papers",
	formal: "professional formal writing with precise language",
	casual: "clear and approachable writing that is easy to read",
	technical: "precise technical writing for engineering, science, or computing topics with accurate terminology",
	literary: "expressive literary writing with varied sentence structure, figurative language, and narrative depth",
};

export function enhancementPrompt(text: string, tone: ReviewTone): string {
	const description = toneDescriptions[tone];
	return [
		"You improve essay sentence structure and clarity for students.",
		`Target style: ${description}.`,
		"For each sentence that can be improved, provide a rewrite that matches the target style while preserving the original meaning.",
		"Return ONLY minified valid JSON — no markdown, no code fences, no extra text — with this exact shape:",
		'{"enhancedText":"<full enhanced essay>","rewrites":[{"original":"<original sentence>","improved":"<improved sentence>","reason":"<why this is better>"}],"stats":{"rewrites":0,"readabilityDelta":0}}',
		"Input essay:",
		text,
	].join("\n");
}

export function vocabularyPrompt(text: string): string {
	return [
		"You are a vocabulary enhancement assistant for college students. Identify words in the essay that could be replaced with stronger, more precise, or more academically appropriate alternatives.",
		"For each suggestion: 'word' is the original word, 'suggestion' is the recommended replacement, 'reason' explains why the replacement is better, and 'context' shows the surrounding phrase for clarity.",
		"Return ONLY minified valid JSON — no markdown, no code fences, no extra text — with this exact shape:",
		'{"suggestions":[{"word":"<original word>","suggestion":"<better word>","reason":"<explanation>","context":"<surrounding phrase>"}]}',
		"Input essay:",
		text,
	].join("\n");
}

