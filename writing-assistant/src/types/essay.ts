import type { EnhancementResult } from "./enhancement";
import type { GrammarResult } from "./grammar";
import type { VocabularyResult } from "./vocabulary";

export type ReviewTone = "academic" | "formal" | "casual" | "technical" | "literary";

export type StudentDiscipline = "general" | "engineering" | "literature";

export interface EssayReviewRequest {
	text: string;
	tone?: ReviewTone;
	model?: string;
}

export interface EssayReviewResponse {
	originalText: string;
	grammar: GrammarResult;
	enhancement: EnhancementResult;
	vocabulary: VocabularyResult;
	comparison: {
		changedSentences: number;
		correctedIssues: number;
	};
}

