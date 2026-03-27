import { NextResponse } from "next/server";
import { OLLAMA_BASE_URL } from "@/config/ollama.config";

export async function GET() {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: "down", message: `Ollama returned ${response.status}` },
        { status: 503 }
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json(
      { status: "down", message: String(error) },
      { status: 503 }
    );
  }
}
