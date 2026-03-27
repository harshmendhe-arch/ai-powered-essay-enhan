import { NextResponse } from "next/server";
import { runGrammarCheck } from "@/services/grammarService";
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

    const result = await runGrammarCheck(payload.text, payload.model);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { message: "Grammar check failed", details: String(error) },
      { status: 500 }
    );
  }
}
