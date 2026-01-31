# 🛡️ Prompt Injection Playground

An interactive, CTF-style web app for learning how prompt injection attacks work against AI systems. Built for the [Empowerment AI](https://youtube.com/@empowermentAI) YouTube channel.

## What Is This?

Prompt injection is one of the most critical security vulnerabilities in AI applications. Instead of just reading about it, this playground lets you **actually exploit vulnerable chatbots** across 5 progressively harder levels.

## 🎮 The Levels

| Level | Name | Attack Type | Difficulty |
|-------|------|-------------|------------|
| 1 | The Unguarded Vault | Direct prompt extraction | 🟢 Easy |
| 2 | The Guarded Gate | Bypassing instruction-level defense | 🟡 Medium |
| 3 | The Data Heist | Exfiltrating sensitive data from context | 🟡 Medium |
| 4 | The Trojan Document | Indirect injection via user input | 🔴 Hard |
| 5 | Fort Knox | Multi-layer defense bypass | 🟣 Expert |

Each level has:
- A chatbot with a hidden secret (password, API key, or customer data)
- Specific defenses you need to bypass
- Hints if you get stuck
- Success detection when you crack it

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **LLM:** Claude 3.5 Haiku via [OpenRouter](https://openrouter.ai)
- **Deployment:** [Vercel](https://vercel.com)
- **Cost:** ~$0.001 per request (very cheap to run)

## 🚀 Run Locally

```bash
git clone https://github.com/empowerment-ai/prompt-injection-playground.git
cd prompt-injection-playground
npm install
```

Create `.env.local`:
```
OPENROUTER_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔑 Get an OpenRouter API Key

1. Go to [openrouter.ai](https://openrouter.ai)
2. Create an account
3. Generate an API key
4. Add it to `.env.local`

Claude 3.5 Haiku costs ~$0.25 per million input tokens — you can run hundreds of attempts for pennies.

## 📚 What You'll Learn

### Attack Techniques
- **Direct extraction:** Asking the model to reveal its system prompt
- **Instruction override:** "Ignore previous instructions..."
- **Roleplay attacks:** Getting the model to act as a different character
- **Encoding tricks:** Base64, pig latin, reverse text
- **Indirect injection:** Hiding instructions in user-provided data
- **Context manipulation:** Making the model treat secrets as "examples"

### Defense Lessons
After breaking each level, you'll understand why:
1. ❌ No defense = instant compromise
2. ❌ "Don't reveal X" instructions are trivially bypassable
3. ❌ Sensitive data in LLM context is inherently extractable
4. ❌ Processing untrusted input is an injection vector
5. ❌ Even multi-layer prompt defenses can be bypassed

### Real Defenses (What Actually Works)
- Input/output filtering and classification
- Separate context windows for sensitive data
- Never put secrets in prompts
- Tool-use architectures with permission boundaries
- Human-in-the-loop for sensitive operations

## ⚠️ Disclaimer

This is an **educational tool** for understanding AI security vulnerabilities. Understanding how attacks work is essential for building better defenses. Never use these techniques maliciously against production systems.

## 📺 YouTube Tutorial

Watch the full walkthrough: [Coming Soon]

## License

MIT — use it, learn from it, teach with it.

---

Built with 🔒 by [Empowerment AI](https://youtube.com/@empowermentAI)
