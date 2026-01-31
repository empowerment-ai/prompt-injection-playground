"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { levels } from "@/lib/levels";

export default function LevelPage() {
  const params = useParams();
  const levelId = parseInt(params.id, 10);
  const level = levels.find((l) => l.id === levelId);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!level) {
    return (
      <div className="chat-page" style={{ justifyContent: "center", alignItems: "center" }}>
        <p>Level not found.</p>
        <Link href="/" className="back-link" style={{ marginTop: "1rem" }}>
          ← Back to levels
        </Link>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          levelId: level.id,
          messages: newMessages,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: `Error: ${data.error}. Try again.`,
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.message },
        ]);
        if (data.secretLeaked && !solved) {
          setSolved(true);
        }
      }
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Network error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-top">
          <Link href="/" className="back-link">
            ← Levels
          </Link>
          <span className="chat-level-title">
            Level {level.id}: {level.title}
          </span>
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
        <div className="chat-meta">
          <span>🎯 {level.description}</span>
        </div>
      </div>

      {/* Info Panels */}
      <div className="info-panels">
        <div className="info-panel">
          <div className="info-panel-label">🛡️ Defense</div>
          <div className="info-panel-value">{level.defense}</div>
        </div>
        <div className="info-panel">
          <div className="info-panel-label">
            🏆 Status
          </div>
          <div
            className="info-panel-value"
            style={{ color: solved ? "#10b981" : "#94a3b8" }}
          >
            {solved ? "✅ SOLVED" : "🔒 Unsolved"}
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {solved && (
        <div className="success-banner">
          <h3>🏆 Level Complete!</h3>
          <p>{level.successMessage}</p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <button
              className="breakdown-toggle-btn"
              onClick={() => setShowBreakdown(!showBreakdown)}
            >
              {showBreakdown ? "Hide" : "🔍 How This Level Works"}
            </button>
            {level.id < 5 && (
              <Link
                href={`/level/${level.id + 1}`}
                className="back-link"
                style={{ display: "inline-block" }}
                onClick={() => {
                  setMessages([]);
                  setSolved(false);
                  setShowHint(false);
                  setShowBreakdown(false);
                }}
              >
                Next Level →
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Level Breakdown - shown after solving */}
      {solved && showBreakdown && (
        <div className="breakdown-panel">
          <div className="breakdown-section">
            <h4>📋 System Prompt <span className="breakdown-label">What the AI was told</span></h4>
            <pre className="breakdown-code">{level.systemPrompt}</pre>
          </div>
          <div className="breakdown-section">
            <h4>🛡️ Defense Strategy</h4>
            <p>{level.defense}</p>
          </div>
          <div className="breakdown-section">
            <h4>🎯 The Secret</h4>
            <p className="breakdown-secret">{level.id === 3 ? "Any customer PII (SSNs, emails, credit cards, balances)" : level.secret}</p>
          </div>
          <div className="breakdown-section">
            <h4>💥 Why It Failed</h4>
            <p>{level.whyItFailed}</p>
          </div>
          <div className="breakdown-section">
            <h4>🔒 Real-World Fix</h4>
            <p>{level.realWorldFix}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="messages-area">
        {messages.length === 0 && (
          <div className="message message-system">
            🤖 The AI is waiting. Try to extract its secret. Type anything to
            start.
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${
              msg.role === "user" ? "message-user" : "message-assistant"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="message message-loading">Thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Hint */}
      <div className="hint-toggle">
        {!showHint ? (
          <button className="hint-btn" onClick={() => setShowHint(true)}>
            💡 Need a hint?
          </button>
        ) : (
          <div className="hint-text">💡 {level.hint}</div>
        )}
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <form className="chat-input-form" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              solved
                ? "Level solved! Try another approach or move to the next level..."
                : "Type your prompt injection attempt..."
            }
            rows={1}
          />
          <button className="send-btn" type="submit" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
