"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { levels } from "@/lib/levels";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("openrouter_api_key") || "";
    if (stored) {
      setApiKey(stored);
      setSaved(true);
    }
  }, []);

  function handleSaveKey() {
    const trimmed = apiKey.trim();
    if (trimmed) {
      localStorage.setItem("openrouter_api_key", trimmed);
      setSaved(true);
    }
  }

  function handleClearKey() {
    localStorage.removeItem("openrouter_api_key");
    setApiKey("");
    setSaved(false);
  }

  return (
    <div className="landing">
      <div className="hero">
        <span className="hero-badge">⚔️ Interactive AI Security Lab</span>
        <h1>Prompt Injection Playground</h1>
        <p>
          Learn how prompt injection attacks work by exploiting vulnerable AI
          chatbots. 4 levels from beginner to expert. Test attacks across multiple AI models
          to see how safety training changes everything. No theory — just hands-on hacking.
        </p>
      </div>

      {/* API Key Setup */}
      <div className="api-key-box">
        <div className="api-key-header">
          <span className="api-key-icon">🔑</span>
          <h3>OpenRouter API Key</h3>
        </div>
        <p className="api-key-desc">
          This playground uses your own OpenRouter API key to chat with AI models.
          Get a free key at{" "}
          <a href="https://openrouter.ai/keys" target="_blank" rel="noopener">
            openrouter.ai/keys
          </a>{" "}
          — most models cost fractions of a cent per message. Your key is stored
          only in your browser (localStorage) and never saved on our servers.
        </p>
        <div className="api-key-tips">
          <h4>🔒 Security Tips</h4>
          <ul>
            <li><strong>Create a dedicated key</strong> just for this playground — don&apos;t reuse your main API key.</li>
            <li><strong>Set a budget limit</strong> of $0.50 or less on the key at{" "}
              <a href="https://openrouter.ai/settings/limits" target="_blank" rel="noopener">
                openrouter.ai/settings/limits
              </a>
              . If the key is ever compromised, the damage is capped.
            </li>
            <li><strong>Delete the key</strong> when you&apos;re done experimenting.</li>
            <li><strong>Privacy-conscious?</strong> Clone the{" "}
              <a href="https://github.com/empowerment-ai/prompt-injection-playground" target="_blank" rel="noopener">
                repo
              </a>{" "}and run it locally — <code>npm install &amp;&amp; npm run dev</code>.
            </li>
          </ul>
        </div>
        <div className="api-key-input-row">
          <div className="api-key-input-wrapper">
            <input
              type={showKey ? "text" : "password"}
              className="api-key-input"
              value={apiKey}
              onChange={(e) => { setApiKey(e.target.value); setSaved(false); }}
              placeholder="sk-or-v1-..."
              spellCheck={false}
              autoComplete="off"
            />
            <button
              className="api-key-toggle"
              onClick={() => setShowKey(!showKey)}
              title={showKey ? "Hide key" : "Show key"}
            >
              {showKey ? "🙈" : "👁️"}
            </button>
          </div>
          {!saved ? (
            <button
              className="api-key-save-btn"
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
            >
              Save Key
            </button>
          ) : (
            <button className="api-key-clear-btn" onClick={handleClearKey}>
              Clear
            </button>
          )}
        </div>
        {saved && (
          <div className="api-key-status">
            ✅ Key saved — you&apos;re ready to play!
          </div>
        )}
      </div>

      <div className="levels-grid">
        {levels.map((level) => (
          <Link
            href={`/level/${level.id}`}
            key={level.id}
            className={`level-card ${!saved ? "level-card-disabled" : ""}`}
            onClick={(e) => {
              if (!saved) {
                e.preventDefault();
                document.querySelector(".api-key-input")?.focus();
              }
            }}
          >
            <div className="level-number">
              {level.isBossLevel ? "🏰" : level.id}
            </div>
            <div className="level-info">
              <div className="level-header">
                <span className="level-title">{level.title}</span>
                <span
                  className="difficulty-badge"
                  style={{
                    color: level.difficultyColor,
                    background: level.difficultyColor + "18",
                    border: `1px solid ${level.difficultyColor}44`,
                  }}
                >
                  {level.difficulty}
                </span>
              </div>
              <div className="level-subtitle">{level.subtitle}</div>
              <div className="level-desc">{level.description}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Model Info */}
      <div className="model-info-box">
        <h3>🤖 Multi-Model Support</h3>
        <p>
          Each level lets you switch between different AI models to see how safety training
          affects vulnerability. The default model (GPT-4o Mini) is balanced for learning — but try
          Claude Haiku (nearly unbreakable), Llama 3.3 (open-source), or GPT-4.1 Nano (try it on
          the boss level!) to see dramatically different behaviors from the same attack.
        </p>
      </div>

      <div className="warning-box">
        <h3>⚠️ Educational Purpose Only</h3>
        <p>
          This tool is for learning about AI security vulnerabilities.
          Understanding attacks is the first step to building better defenses.
          Never use these techniques maliciously against real systems.
        </p>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <a href="https://empowerment-ai.com" target="_blank" rel="noopener">Empowerment AI</a>
          <span className="footer-sep">·</span>
          <a href="https://prompt-injection-scanner.empowerment-ai.com" target="_blank" rel="noopener">🛡️ Scanner</a>
          <span className="footer-sep">·</span>
          <a href="https://github.com/empowerment-ai/prompt-injection-playground" target="_blank" rel="noopener">GitHub</a>
          <span className="footer-sep">·</span>
          <a href="https://owasp.org/www-project-top-10-for-large-language-model-applications/" target="_blank" rel="noopener">OWASP LLM Top 10</a>
          <span className="footer-sep">·</span>
          <a href="https://youtube.com/@empowermentAI" target="_blank" rel="noopener">YouTube</a>
        </div>
        <p className="footer-tagline">
          Built by{" "}
          <a href="https://empowerment-ai.com" target="_blank" rel="noopener">Empowerment AI</a>
          {" "}— Realize Your Potential, Harness the Power of AI
        </p>
      </footer>
    </div>
  );
}
