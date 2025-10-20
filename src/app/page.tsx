"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { 
      role: "system", 
      content: "seja bem-vindo ao termiBOT :) \nDigite 'help' para ver os comandos disponíveis ou comece a conversar!" 
    }
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    
    // Check for native commands
    if (userMessage.toLowerCase() === "neofetch" || userMessage.toLowerCase() === "tech") {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
      try {
        const res = await fetch("/api/neofetch", { method: "GET" });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Falha ao obter stack");
        }

        const s = data.stack;
        const logo = [
          " _                    _ ____   ___ _____",
          "| |_ ___ _ __ _ __ _ (_) __ ) / _ \\_   _|",
          "| __/ _ \\ '__| '_ ` || |  _ \\| | | || |  ",
          "| ||  __/ |  | | | | | | |_) | |_| || |  ",
          " \\__\\___|_|  |_| |_| |_|____/ \\___/ |_|  ",
          "                    :)                   ",
        ].join("\n");

        let output = `${logo}\n`;
        output += `\nproject     : ${s.project} (${s.version})`;
        output += `\nnode        : ${s.runtime.node} (${s.runtime.platform}/${s.runtime.arch})`;
        output += `\nframework   : Next ${s.framework.next}, React ${s.framework.react}`;
        output += `\nreact-dom   : ${s.framework["react-dom"]}`;
        output += `\ntailwindcss : ${s.framework.tailwindcss}`;
        output += `\ntypescript  : ${s.framework.typescript}`;
        output += `\nai sdks     : groq ${s.ai_sdks["groq-sdk"]}, openai ${s.ai_sdks.openai}`;
        output += `\n             : google/gen-ai ${s.ai_sdks["@google/generative-ai"]}`;
        output += `\ntooling     : eslint ${s.tooling.eslint}, eslint-config-next ${s.tooling["eslint-config-next"]}`;

        setMessages((prev) => [...prev, { role: "assistant", content: output }]);
      } catch (error) {
        const msg = `Erro ao executar neofetch: ${error instanceof Error ? error.message : 'Unknown error'}`;
        setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
      }
      return;
    }
    if (userMessage.toLowerCase() === "clear") {
      setMessages([]);
      setInput("");
      return;
    }
    
    if (userMessage.toLowerCase() === "help") {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Comandos disponíveis:\n• clear - Limpa o terminal\n• help - Mostra esta ajuda\n• neofetch/tech - Mostra tecnologias do projeto\n• Qualquer outra mensagem será enviada para o AI" 
      }]);
      setInput("");
      return;
    }


    // user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput(""); // Clear input immediately

    try {
      // call the API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      // add the response from the "bot"
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
      setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }]);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono p-4">
      <div className="space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {m.role === "user" ? (
              `$ ${m.content}`
            ) : m.role === "system" ? (
              <span className="text-green-400">{`> ${m.content}`}</span>
            ) : (
              `> ${m.content}`
            )}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <span className="text-white">$ </span>
        <input
          className="bg-black text-white flex-1 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          autoFocus
        />
      </div>
    </main>
  );
}
