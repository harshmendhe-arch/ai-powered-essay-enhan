export interface SentenceRewrite {
	original: string;
	improved: string;
	reason: string;
}

export interface EnhancementStats {
	rewrites: number;
	readabilityDelta: number;
}

export interface EnhancementResult {
	enhancedText: string;
	rewrites: SentenceRewrite[];
	stats: EnhancementStats;
}

