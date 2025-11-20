"use client";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface MessageRendererProps {
  content: string;
  role: string;
}

export default function MessageRenderer({ content, role }: MessageRendererProps) {
  // Para mensagens do sistema, manter o estilo original
  if (role === "system") {
    return <span className="text-green-400">{`> ${content}`}</span>;
  }

  // Para mensagens do usuário, manter o estilo original
  if (role === "user") {
    return <span>{`$ ${content}`}</span>;
  }

  // Para mensagens do assistant, renderizar com markdown e LaTeX
  return (
    <div className="markdown-content">
      <span className="text-white">{" > "}</span>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Estilizar elementos markdown para manter o tema de terminal
          p: ({ children }) => <p className="mb-2 inline">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-gray-800 px-1 py-0.5 rounded text-green-400" {...props}>
                {children}
              </code>
            ) : (
              <code className="block bg-gray-800 p-2 rounded my-2 overflow-x-auto" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-800 p-2 rounded my-2 overflow-x-auto">{children}</pre>
          ),
          ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="ml-2">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-600 pl-4 my-2 italic text-gray-300">
              {children}
            </blockquote>
          ),
          h1: ({ children }) => <h1 className="text-xl font-bold my-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold my-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold my-2">{children}</h3>,
          a: ({ href, children }) => (
            <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

