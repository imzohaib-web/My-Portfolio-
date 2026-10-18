"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero Terminal Configuration
 * All text and commands are centralized here for easy editing.
 */
export const HERO_TERMINAL_DATA = {
  windowTitle: "zohaib — portfolio",
  commands: [
    {
      id: "whoami",
      command: "whoami",
      lines: [
        "Zohaib · Full-Stack Developer",
        "AI-integrated web applications",
      ],
    },
    {
      id: "stack",
      command: "stack",
      lines: [
        "React · Next.js · TypeScript",
        "Node.js · Python · FastAPI",
      ],
    },
    {
      id: "experience",
      command: "experience",
      lines: [
        "MERN Intern @ EziTech",
      ],
    },
    {
      id: "building",
      command: "building",
      lines: [
        "FBISE Adaptive Learning Platform",
        "RAG over the curriculum",
      ],
    },
    {
      id: "status",
      command: "status",
      isStatus: true,
      lines: [
        "Open to internships",
        "AI/full-stack roles",
      ],
    },
  ],
};

export function HeroTerminal() {
  const shouldReduceMotion = useReducedMotion();
  const staticMode = shouldReduceMotion === true;

  const totalCommands = HERO_TERMINAL_DATA.commands.length;
  const [visibleCount, setVisibleCount] = useState(staticMode ? totalCommands : 1);
  const [isDone, setIsDone] = useState(staticMode);

  useEffect(() => {
    if (staticMode || isDone) return;

    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        const next = prev + 1;
        if (next >= totalCommands) {
          clearInterval(timer);
          setIsDone(true);
          return totalCommands;
        }
        return next;
      });
    }, 400);

    return () => clearInterval(timer);
  }, [staticMode, isDone, totalCommands]);

  return (
    <motion.div
      className="terminal-card relative w-full min-w-0 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6),0_0_50px_-15px_rgba(52,211,153,0.12)] overflow-hidden"
      whileHover={staticMode ? undefined : { scale: 1.004 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {/* Card Header with small, dim traffic-light dots and text-zinc-400 title */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]/40" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/40" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]/40" />
        </div>
        <span className="text-xs font-mono text-zinc-400 tracking-wide truncate select-none">
          {HERO_TERMINAL_DATA.windowTitle}
        </span>
        <div className="w-8 shrink-0" aria-hidden="true" />
      </div>

      {/* Card Content with generous spacing (20-24px between command blocks) */}
      <div
        className="p-4 sm:p-6 md:p-8 font-mono text-[14px] md:text-[15px] leading-[1.7] space-y-5 sm:space-y-6 select-text overflow-hidden"
        role="region"
        aria-label="Terminal hero card"
      >
        {HERO_TERMINAL_DATA.commands.slice(0, visibleCount).map((item) => (
          <div key={item.id} className="min-w-0">
            {/* Command line: green '$' and white semibold command text */}
            <div className="flex items-baseline gap-2">
              <span className="text-emerald-400 font-semibold select-none">$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>

            {/* Output in text-zinc-200 */}
            {item.isStatus ? (
              <div className="mt-1.5 flex items-start sm:items-center gap-2.5">
                <span className="relative flex h-2 w-2 items-center justify-center shrink-0 mt-2 sm:mt-0">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${
                      shouldReduceMotion ? "" : "animate-ping motion-reduce:animate-none"
                    }`}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                </span>
                <p className="text-zinc-200 font-medium leading-[1.7]">
                  <span className="block sm:inline">{item.lines[0]}</span>
                  <span className="hidden sm:inline"> · </span>
                  <span className="block sm:inline">{item.lines[1]}</span>
                </p>
              </div>
            ) : (
              <div className="mt-1.5 text-zinc-200">
                {item.lines.map((line, idx) => (
                  <p key={idx} className="break-words leading-[1.7]">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Active blinking terminal prompt at the end */}
        {(staticMode || isDone) && (
          <div className="flex items-center gap-2 pt-0.5" aria-hidden="true">
            <span className="text-emerald-400 font-semibold select-none">$</span>
            <span
              className={`inline-block w-1.5 h-4 bg-emerald-400/90 align-middle ${
                shouldReduceMotion ? "" : "animate-pulse motion-reduce:animate-none"
              }`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
