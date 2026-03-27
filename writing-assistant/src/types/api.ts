import type { EssayReviewResponse } from "./essay";
import type { EnhancementResult } from "./enhancement";
import type { GrammarResult } from "./grammar";
import type { VocabularyResult } from "./vocabulary";

export interface ApiError {
	message: string;
	details?: string;
}

export interface GrammarApiResponse {
	result: GrammarResult;
}

export interface EnhancementApiResponse {
	result: EnhancementResult;
}

export interface VocabularyApiResponse {
	result: VocabularyResult;
}

export interface FullReviewApiResponse {
	result: EssayReviewResponse;
}

