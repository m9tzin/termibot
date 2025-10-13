# 🤖 TermiBOT - Chat Bot com Interface de Terminal

Um chat bot moderno com interface de terminal autêntica, construído com Next.js e Groq AI.

## ✨ Funcionalidades

- **Interface de Terminal Autêntica** - Experiência real de terminal
- **Comandos Nativos** - `clear`, `help` e outros comandos do terminal
- **AI Integration** - Powered by Groq AI (Llama 3.1)
- **Respostas Rápidas** - Até 300 tokens/segundo
- **Gratuito** - 14,400 requests/dia

## 🚀 Comandos Disponíveis

- `clear` - Limpa o terminal
- `help` - Mostra comandos disponíveis
- Qualquer outra mensagem será enviada para o AI

## 🛠️ Configuração Local

1. **Clone o repositório**
```bash
git clone <seu-repo>
cd talk-bot
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie o arquivo .env.local
GROQ_API_KEY=sua_chave_groq_aqui
```

4. **Execute o projeto**
```bash
npm run dev
```

5. **Abra no navegador**
```
http://localhost:3000
```

## 🔑 Como obter a API Key do Groq

1. Acesse [console.groq.com](https://console.groq.com)
2. Crie uma conta gratuita
3. Vá em "API Keys"
4. Crie uma nova chave
5. Copie e cole no arquivo `.env.local`

## 📦 Tecnologias

- **Next.js 15** - Framework React
- **Groq AI** - API de IA gratuita
- **Tailwind CSS** - Estilização
- **TypeScript** - Tipagem estática


## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.
