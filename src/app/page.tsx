"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
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
      const errorMessage = `Error: ${error.message}`;
      
      setMessages((prev) => [...prev, { role: "assistant", content: errorMessage }]);
    }
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
