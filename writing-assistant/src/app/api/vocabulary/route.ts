import { NextResponse } from "next/server";
import { runVocabularySuggestions } from "@/services/vocabularyService";
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

    const result = await runVocabularySuggestions(payload.text, payload.model);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { message: "Vocabulary suggestion failed", details: String(error) },
      { status: 500 }
    );
  }
}
