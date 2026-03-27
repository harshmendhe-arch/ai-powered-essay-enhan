import { NextResponse } from "next/server";
import { streamFromOllama } from "@/lib/ollama-client";
import { validateEssayPayload } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!validateEssayPayload(payload)) {
      return NextResponse.json(
        { message: "Invalid request payload" },
        { status: 400 }
      );
    }

    const upstream = await streamFromOllama({
      prompt: payload.text,
    });

    return new Response(upstream.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Streaming failed", details: String(error) },
      { status: 500 }
    );
  }
}
