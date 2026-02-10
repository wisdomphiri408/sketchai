import { NextResponse } from "next/server";

const MODEL = "gemini-2.0-flash";

type ExplainBody = {
  prompt?: string;
};

function buildSystemPrompt(userPrompt: string): string {
  return [
    "You are SketchAI. Explain the topic in beginner-friendly language.",
    "Return plain text only. No markdown code fences.",
    "You may insert inline animation tags in this exact format: [anim:bounce-ball] or [anim:pulse-dot].",
    "Use at most 2 animation tags and only when they help understanding.",
    `User topic: ${userPrompt}`
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Missing GOOGLE_API_KEY. Create a key in Google AI Studio and add it to .env.local."
      },
      { status: 500 }
    );
  }

  const body = (await request.json()) as ExplainBody;
  const prompt = body.prompt?.trim();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: buildSystemPrompt(prompt) }]
        }
      ]
    })
  });

  if (!response.ok) {
    const details = await response.text();
    return NextResponse.json(
      { error: "Google API request failed.", details },
      { status: response.status }
    );
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
      .join("\n")
      .trim() ?? "";

  if (!text) {
    return NextResponse.json(
      { error: "No explanation text returned by model." },
      { status: 502 }
    );
  }

  return NextResponse.json({ text });
}
