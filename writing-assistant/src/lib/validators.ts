import type { EssayReviewRequest } from "@/types/essay";

export function isNonEmptyText(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

export function validateEssayPayload(payload: unknown): payload is EssayReviewRequest {
	if (!payload || typeof payload !== "object") {
		return false;
	}

	const maybePayload = payload as Partial<EssayReviewRequest>;
	if (!isNonEmptyText(maybePayload.text)) {
		return false;
	}

	if (
		maybePayload.tone &&
		!["academic", "formal", "casual", "technical", "literary"].includes(maybePayload.tone)
	) {
		return false;
	}

	if (
		typeof maybePayload.model !== "undefined" &&
		(typeof maybePayload.model !== "string" || maybePayload.model.trim().length === 0)
	) {
		return false;
	}

	return true;
}

