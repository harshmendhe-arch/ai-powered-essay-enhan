import { estimateReadability } from "@/lib/readability";
import { enhancementPrompt } from "@/lib/prompt-templates";
import { generateJson } from "@/services/ollama";
import type { ReviewTone } from "@/types/essay";
import type { EnhancementResult } from "@/types/enhancement";

export async function runEnhancement(
	text: string,
	tone: ReviewTone = "academic",
	model?: string
): Promise<EnhancementResult> {
	const baseline = estimateReadability(text);
	const fallback: EnhancementResult = {
		enhancedText: text,
		rewrites: [],
		stats: {
			rewrites: 0,
			readabilityDelta: 0,
		},
	};

	const result = await generateJson<EnhancementResult>(
		enhancementPrompt(text, tone),
		fallback,
		model
	);

	const updated = estimateReadability(result.enhancedText);
	result.stats.readabilityDelta = Number((updated - baseline).toFixed(1));
	result.stats.rewrites = result.rewrites.length;
	return result;
}

