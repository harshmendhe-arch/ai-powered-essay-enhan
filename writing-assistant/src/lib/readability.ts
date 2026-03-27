export function countWords(text: string): number {
	return text
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;
}

export function countSentences(text: string): number {
	return text
		.split(/[.!?]+/)
		.map((value) => value.trim())
		.filter(Boolean).length;
}

export function estimateReadability(text: string): number {
	const words = Math.max(countWords(text), 1);
	const sentences = Math.max(countSentences(text), 1);
	const chars = text.replace(/\s/g, "").length;

	const avgWordsPerSentence = words / sentences;
	const avgCharsPerWord = chars / words;

	// Rough readability score scaled to 0-100 where higher is easier to read.
	const score = 100 - avgWordsPerSentence * 1.8 - avgCharsPerWord * 7;
	return Math.max(0, Math.min(100, Number(score.toFixed(1))));
}

