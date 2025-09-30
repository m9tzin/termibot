"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // call the API
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // add the response from the "bot"
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono p-4">
      <div className="space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {m.role === "user" ? `$ ${m.content}` : `> ${m.content}`}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <span className="text-white">$</span>
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
