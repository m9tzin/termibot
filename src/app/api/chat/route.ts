import { NextResponse } from "next/server";

// Função para gerar respostas inteligentes baseadas em palavras-chave
function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Saudações
  if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Olá! Como posso ajudá-lo hoje?";
  }
  
  // Perguntas sobre tempo
  if (lowerMessage.includes('tempo') || lowerMessage.includes('clima') || lowerMessage.includes('weather')) {
    return "Não posso verificar o tempo em tempo real, mas recomendo verificar um site de meteorologia confiável!";
  }
  
  // Perguntas sobre programação
  if (lowerMessage.includes('código') || lowerMessage.includes('programação') || lowerMessage.includes('javascript') || lowerMessage.includes('python')) {
    return "Posso ajudar com questões de programação! Que linguagem ou conceito específico você gostaria de discutir?";
  }
  
  // Perguntas sobre ajuda
  if (lowerMessage.includes('ajuda') || lowerMessage.includes('help')) {
    return "Estou aqui para ajudar! Você pode me fazer perguntas sobre programação, tecnologia, ou qualquer outro tópico.";
  }
  
  // Perguntas sobre como está
  if (lowerMessage.includes('como você está') || lowerMessage.includes('como vai') || lowerMessage.includes('tudo bem')) {
    return "Estou funcionando perfeitamente! Obrigado por perguntar. E você, como está?";
  }
  
  // Perguntas sobre o que pode fazer
  if (lowerMessage.includes('o que você pode') || lowerMessage.includes('o que faz') || lowerMessage.includes('capacidades')) {
    return "Posso conversar sobre diversos tópicos, ajudar com programação, responder perguntas gerais e manter uma conversa amigável!";
  }
  
  // Perguntas sobre nome
  if (lowerMessage.includes('nome') || lowerMessage.includes('chama')) {
    return "Sou um assistente de IA! Você pode me chamar como quiser. Como você gostaria de me chamar?";
  }
  
  // Resposta padrão inteligente
  const responses = [
    "Interessante! Pode me contar mais sobre isso?",
    "Entendo. O que mais você gostaria de saber?",
    "Essa é uma boa pergunta! O que você acha sobre isso?",
    "Posso ajudar com isso. Tem alguma dúvida específica?",
    "Muito interessante! Continue, estou ouvindo.",
    "Entendi. Há algo mais que posso esclarecer para você?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// GET request to the API
export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello, world!" });
}