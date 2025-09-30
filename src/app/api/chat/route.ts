import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST request to the API
export async function POST(request: Request) {
  const { message } = await request.json();

const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: message }],
});

return NextResponse.json({
    response: completion.choices[0].message.content,
});
}

// GET request to the API
export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello, world!" });
}