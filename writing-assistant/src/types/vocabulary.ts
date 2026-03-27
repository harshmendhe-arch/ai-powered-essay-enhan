export interface WordSuggestion {
	word: string;
	suggestion: string;
	reason: string;
	context: string;
}

export interface VocabularyResult {
	suggestions: WordSuggestion[];
}

