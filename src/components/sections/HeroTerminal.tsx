"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TerminalBlock {
  command: string;
  output: string | string[];
  variant?: "plain" | "tokens" | "highlight";
}

const BLOCKS: TerminalBlock[] = [
  {
    command: "whoami",
    output: "Prototype → production · RAG & agents · based in Wah Cantt",
    variant: "plain",
  },
  {
    command: "education",
    output: "Software Engineering — COMSATS University Islamabad",
    variant: "plain",
  },
  {
    command: "experience",
    output: [
      "MERN Stack Intern — Eziline",
      "Frontend Intern — Erudite Coaching Center",
    ],
    variant: "plain",
  },
  {
    command: "cat stack.txt",
    output: "React · Next.js · TypeScript · Node.js · FastAPI",
    variant: "tokens",
  },
  {
    command: "cat focus.txt",
    output: "Generative AI · RAG Systems · LLM Applications · AI Agents",
    variant: "tokens",
  },
  {
    command: "cat current-project.txt",
    output: "AI Adaptive Learning Platform — FBISE Curriculum",
    variant: "highlight",
  },
  {
    command: "cat status.txt",
    output: "Open to internships & AI engineer roles",
    variant: "plain",
  },
  {
    command: "location",
    output: "Wah Cantt, Pakistan",
    variant: "plain",
  },
];

const TOKEN_COLORS = [
  "text-[var(--accent-primary)]",
  "text-[var(--accent-secondary)]",
  "text-emerald-400",
];

function TokenLine({ text }: { text: string }) {
  const parts = text.split("·").map((p) => p.trim());
  return (
    <p className="mt-1 pl-4 break-words leading-relaxed">
      {parts.map((part, i) => (
        <span key={`${part}-${i}`}>
          {i > 0 && <span className="text-zinc-500 mx-1.5">·</span>}
          <span className={TOKEN_COLORS[i % TOKEN_COLORS.length]}>{part}</span>
        </span>
      ))}
    </p>
  );
}

function BlockOutput({ block }: { block: TerminalBlock }) {
  if (block.variant === "tokens" && typeof block.output === "string") {
    return <TokenLine text={block.output} />;
  }

  const lines = Array.isArray(block.output) ? block.output : [block.output];
  const lineClass =
    block.variant === "highlight"
      ? "text-[var(--accent-secondary)] font-medium"
      : "text-zinc-300";

  return (
    <div className="mt-1 pl-4 space-y-0.5">
      {lines.map((line) => (
        <p key={line} className={`${lineClass} break-words leading-relaxed`}>
          {line}
        </p>
      ))}
    </div>
  );
}

export function HeroTerminal() {
  const shouldReduceMotion = useReducedMotion();
  const staticMode = shouldReduceMotion === true;

  const [blockIndex, setBlockIndex] = useState(staticMode ? BLOCKS.length : 0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"command" | "output" | "done">(
    staticMode ? "done" : "command"
  );

  const terminalSummary = useMemo(
    () =>
      BLOCKS.map((b) => {
        const out = Array.isArray(b.output) ? b.output.join("; ") : b.output;
        return `$ ${b.command}: ${out}`;
      }).join(". "),
    []
  );

  useEffect(() => {
    if (staticMode || phase === "done" || blockIndex >= BLOCKS.length) return;

    const block = BLOCKS[blockIndex];
    if (!block) return;

    if (phase === "command") {
      if (charIndex < block.command.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), 25);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setPhase("output");
        setCharIndex(0);
      }, 120);
      return () => clearTimeout(t);
    }

    if (phase === "output") {
      const t = setTimeout(() => {
        if (blockIndex + 1 >= BLOCKS.length) {
          setPhase("done");
        } else {
          setBlockIndex((i) => i + 1);
          setPhase("command");
          setCharIndex(0);
        }
      }, 280);
      return () => clearTimeout(t);
    }
  }, [blockIndex, charIndex, phase, staticMode]);

  const completedBlocks = staticMode ? BLOCKS : BLOCKS.slice(0, blockIndex);
  const currentBlock = staticMode ? null : BLOCKS[blockIndex];
  const typingCommand =
    !staticMode && phase === "command" && currentBlock
      ? currentBlock.command.slice(0, charIndex)
      : "";
  const showCurrentOutput =
    !staticMode && phase === "output" && currentBlock !== undefined;

  return (
    <motion.div
      className="terminal-card relative w-full min-w-0"
      whileHover={staticMode ? undefined : { scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <div className="relative rounded-2xl border border-white/10 bg-zinc-950/70 backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(34,211,238,0.25)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="flex-1 text-center text-xs font-mono text-zinc-400 truncate select-none">
            zohaib@portfolio — bash
          </span>
          <div className="w-10 shrink-0" aria-hidden="true" />
        </div>

        <div
          className="px-4 py-4 md:px-5 md:py-5 font-mono text-[13px] md:text-sm leading-relaxed space-y-3 select-text"
          aria-label={`Terminal session: ${terminalSummary}`}
        >
          {completedBlocks.map((block) => (
            <div key={block.command}>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[var(--success)] font-semibold select-none">$</span>
                <span className="text-white font-semibold">{block.command}</span>
              </div>
              <BlockOutput block={block} />
            </div>
          ))}

          {!staticMode && currentBlock && phase === "command" && (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[var(--success)] font-semibold select-none">$</span>
                <span className="text-white font-semibold">{typingCommand}</span>
                <span
                  className="w-1.5 h-4 bg-[var(--success)]/90 inline-block animate-pulse"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          {showCurrentOutput && currentBlock && (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[var(--success)] font-semibold select-none">$</span>
                <span className="text-white font-semibold">{currentBlock.command}</span>
              </div>
              <BlockOutput block={currentBlock} />
            </div>
          )}

          {(staticMode || phase === "done") && (
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[var(--success)] font-semibold select-none">$</span>
              {!staticMode && (
                <span
                  className="w-1.5 h-4 bg-[var(--success)]/90 inline-block animate-pulse"
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
