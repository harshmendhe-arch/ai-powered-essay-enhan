import { NextResponse } from "next/server";
import { runEnhancement } from "@/services/enhancementService";
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

    const result = await runEnhancement(
      payload.text,
      payload.tone ?? "academic",
      payload.model
    );
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { message: "Enhancement failed", details: String(error) },
      { status: 500 }
    );
  }
}
