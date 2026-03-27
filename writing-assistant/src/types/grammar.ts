export type CorrectionSeverity = "low" | "medium" | "high";

export interface GrammarCorrection {
	id: string;
	original: string;
	suggestion: string;
	reason: string;
	severity: CorrectionSeverity;
	index: number;
}

export interface GrammarResult {
	correctedText: string;
	corrections: GrammarCorrection[];
}

