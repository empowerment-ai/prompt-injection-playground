import Link from "next/link";
import { levels } from "@/lib/levels";

export default function Home() {
  return (
    <div className="landing">
      <div className="hero">
        <span className="hero-badge">⚔️ Interactive AI Security Lab</span>
        <h1>Prompt Injection Playground</h1>
        <p>
          Learn how prompt injection attacks work by exploiting vulnerable AI
          chatbots. 5 levels from beginner to expert. No theory — just hands-on
          hacking.
        </p>
      </div>

      <div className="levels-grid">
        {levels.map((level) => (
          <Link
            href={`/level/${level.id}`}
            key={level.id}
            className="level-card"
          >
            <div className="level-number">{level.id}</div>
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

      <div className="warning-box">
        <h3>⚠️ Educational Purpose Only</h3>
        <p>
          This tool is for learning about AI security vulnerabilities.
          Understanding attacks is the first step to building better defenses.
          Never use these techniques maliciously against real systems.
        </p>
      </div>

      <footer className="footer">
        Built by{" "}
        <a
          href="https://youtube.com/@empowermentAI"
          target="_blank"
          rel="noopener"
        >
          Empowerment AI
        </a>{" "}
        — Realize Your Potential, Harness the Power of AI
      </footer>
    </div>
  );
}
