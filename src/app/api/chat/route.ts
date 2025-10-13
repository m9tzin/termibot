import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// Inicializa o cliente do Groq com a chave da API
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: Request) {
  try {
    // Debug: Log API key status
    console.log("Groq API Key configured:", !!process.env.GROQ_API_KEY);
    console.log("API Key starts with:", process.env.GROQ_API_KEY?.substring(0, 10));
    
    // Verifica se a API key está configurada
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      return NextResponse.json(
        { error: "API key não configurada. Configure a variável GROQ_API_KEY no arquivo .env.local" },
        { status: 500 }
      );
    }

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 });
    }

    // Gera a resposta usando Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.1-8b-instant", // Modelo gratuito e rápido
      temperature: 0.7,
      max_tokens: 1024,
    });

    const response = chatCompletion.choices[0]?.message?.content || "Desculpe, não consegui gerar uma resposta.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Erro ao gerar resposta:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: `Erro interno do servidor: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

