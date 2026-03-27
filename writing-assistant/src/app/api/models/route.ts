import { NextResponse } from "next/server";
import { OLLAMA_BASE_URL, OLLAMA_MODEL } from "@/config/ollama.config";

interface OllamaTagItem {
  name: string;
}

interface OllamaTagsResponse {
  models?: OllamaTagItem[];
}

export async function GET() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Unable to fetch models (${response.status})`, models: [], defaultModel: OLLAMA_MODEL },
        { status: 503 }
      );
    }

    const payload = (await response.json()) as OllamaTagsResponse;
    const models = (payload.models ?? [])
      .map((item) => item.name)
      .filter((name) => typeof name === "string" && name.trim().length > 0);

    return NextResponse.json({
      models,
      defaultModel: OLLAMA_MODEL,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: String(error),
        models: [],
        defaultModel: OLLAMA_MODEL,
      },
      { status: 503 }
    );
  }
}
