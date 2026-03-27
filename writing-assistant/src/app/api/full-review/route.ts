import { NextResponse } from "next/server";
import { runEnhancement } from "@/services/enhancementService";
import { runGrammarCheck } from "@/services/grammarService";
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

    const grammar = await runGrammarCheck(payload.text, payload.model);
    const baseText = grammar.correctedText || payload.text;

    const [enhancement, vocabulary] = await Promise.all([
      runEnhancement(baseText, payload.tone ?? "academic", payload.model),
      runVocabularySuggestions(baseText, payload.model),
    ]);

    const result = {
      originalText: payload.text,
      grammar,
      enhancement,
      vocabulary,
      comparison: {
        changedSentences: enhancement.rewrites.length,
        correctedIssues: grammar.corrections.length,
      },
    };

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { message: "Full review failed", details: String(error) },
      { status: 500 }
    );
  }
}
