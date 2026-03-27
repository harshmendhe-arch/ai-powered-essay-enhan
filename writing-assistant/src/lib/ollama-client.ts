import { OLLAMA_BASE_URL, OLLAMA_MODEL, OLLAMA_TIMEOUT_MS } from "@/config/ollama.config";

interface OllamaGenerateResponse {
	response: string;
	done: boolean;
}

interface GenerateOptions {
	prompt: string;
	model?: string;
	jsonMode?: boolean;
}

export async function generateFromOllama({
	prompt,
	model = OLLAMA_MODEL,
	jsonMode = false,
}: GenerateOptions): Promise<string> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);

	try {
		const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model,
				prompt,
				stream: false,
				...(jsonMode ? { format: "json" } : {}),
			}),
			signal: controller.signal,
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`Ollama request failed: ${response.status}`);
		}

		const payload = (await response.json()) as OllamaGenerateResponse;
		return payload.response;
	} finally {
		clearTimeout(timeout);
	}
}

export async function streamFromOllama({
	prompt,
	model = OLLAMA_MODEL,
}: GenerateOptions): Promise<Response> {
	const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model,
			prompt,
			stream: true,
		}),
		cache: "no-store",
	});

	if (!response.ok || !response.body) {
		throw new Error(`Ollama stream failed: ${response.status}`);
	}

	return response;
}

