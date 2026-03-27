import { generateFromOllama } from "@/lib/ollama-client";

function extractJsonBlock(raw: string): string {
	const fencedMatch = raw.match(/```json\s*([\s\S]*?)```/i);
	if (fencedMatch?.[1]) {
		return fencedMatch[1].trim();
	}

	const firstBrace = raw.indexOf("{");
	const lastBrace = raw.lastIndexOf("}");
	if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
		return raw.slice(firstBrace, lastBrace + 1);
	}

	return raw.trim();
}

export async function generateText(prompt: string, model?: string): Promise<string> {
	return generateFromOllama({ prompt, model });
}

export async function generateJson<T>(
	prompt: string,
	fallback: T,
	model?: string
): Promise<T> {
	try {
		const raw = await generateFromOllama({ prompt, jsonMode: true, model });
		const content = extractJsonBlock(raw);
		return JSON.parse(content) as T;
	} catch {
		try {
			const repairPrompt = [
				"IMPORTANT: Return only minified valid JSON. No markdown and no explanation.",
				prompt,
			].join("\n");

			const repaired = await generateFromOllama({
				prompt: repairPrompt,
				jsonMode: true,
				model,
			});
			return JSON.parse(extractJsonBlock(repaired)) as T;
		} catch {
			return fallback;
		}
	}
}

