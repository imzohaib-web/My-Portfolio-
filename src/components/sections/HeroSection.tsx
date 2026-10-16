"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";

interface TerminalStep {
  type: "prompt" | "output" | "building" | "location";
  text?: string;
  prefix?: string;
  value?: string;
}

const TERMINAL_LINES: TerminalStep[] = [
  { type: "prompt", text: "whoami" },
  { type: "output", text: "Zohaib Umer, AI Engineer & Full-Stack Dev" },
  { type: "prompt", text: "cat stack.txt" },
  { type: "output", text: "LangChain · FastAPI · Next.js · TypeScript" },
  { type: "prompt", text: "cat focus.txt" },
  { type: "output", text: "RAG · LLM agents · adaptive learning" },
  { type: "prompt", text: "status" },
  { type: "building", prefix: "building: ", value: "AI tutor for FBISE Math & Science" },
  { type: "location", prefix: "location: ", value: "Wah Cantt, Pakistan" },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // Typewriter state
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const isDone = shouldReduceMotion || lineIndex >= TERMINAL_LINES.length;
  const effectiveLineIndex = shouldReduceMotion ? TERMINAL_LINES.length : lineIndex;

  useEffect(() => {
    if (shouldReduceMotion || lineIndex >= TERMINAL_LINES.length) {
      return;
    }

    const currentLine = TERMINAL_LINES[lineIndex];
    const targetText =
      currentLine.type === "building" || currentLine.type === "location"
        ? (currentLine.prefix || "") + (currentLine.value || "")
        : currentLine.text || "";

    if (charIndex < targetText.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 36);
      return () => clearTimeout(timer);
    } else {
      const pauseDuration = currentLine.type === "prompt" ? 180 : 110;
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, pauseDuration);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, shouldReduceMotion]);

  // Motion variants for staggering left column
  const createStagger = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: "easeOut" as const },
  });

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:py-0 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 w-full">
        {/* Desktop 7/5 split, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* 1. Mono label */}
            <motion.div {...createStagger(0)}>
              <span className="font-mono text-[12px] tracking-widest text-[#0ff] uppercase select-none inline-block">
                {"// ai engineer & full-stack developer"}
              </span>
            </motion.div>

            {/* 2. Headline */}
            <motion.h1
              {...createStagger(0.08)}
              className="text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-white"
            >
              <span>I build </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ff] to-[#b026ff]">
                AI
              </span>
              <span> that</span>
              <br />
              <span>actually ships.</span>
            </motion.h1>

            {/* 3. Paragraph */}
            <motion.p
              {...createStagger(0.16)}
              className="text-zinc-400 text-lg max-w-xl leading-relaxed"
            >
              Hi, I&apos;m Zohaib, a final-year Software Engineering student at COMSATS Islamabad.
              I design RAG systems, multi-agent workflows and full-stack web apps, taking ideas
              from vector search all the way to a polished production UI.
            </motion.p>

            {/* 4. Buttons row */}
            <motion.div
              {...createStagger(0.24)}
              className="flex flex-wrap items-center gap-4 pt-1 w-full"
            >
              {/* Primary: View my work */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] active:scale-[0.98]"
              >
                <span>View my work</span>
                <ArrowRight size={16} />
              </a>

              {/* Secondary: Let's talk */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/20 hover:bg-white/[0.1] text-white font-medium text-sm transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] active:scale-[0.98]"
              >
                <Mail size={16} className="text-zinc-300" />
                <span>Let&apos;s talk</span>
              </a>

              {/* Tertiary: Resume */}
              <a
                href="/resume/Zohaib_Umer_CV.pdf"
                download="Zohaib_Umer_CV.pdf"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] rounded-lg"
              >
                <Download size={15} />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* 5. Social icons row */}
            <motion.div
              {...createStagger(0.32)}
              className="flex items-center gap-5 pt-1"
            >
              <a
                href="https://github.com/imzohaib-web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-zinc-400 hover:text-[#0ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] rounded p-1"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/zohaib-umer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-zinc-400 hover:text-[#0ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] rounded p-1"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="mailto:umerzohaibumer@gmail.com"
                aria-label="Email Zohaib"
                className="text-zinc-400 hover:text-[#0ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] rounded p-1"
              >
                <Mail size={20} />
              </a>
            </motion.div>

            {/* 6. Stats row */}
            <motion.div
              {...createStagger(0.4)}
              className="pt-6 sm:pt-8 border-t border-white/10 w-full grid grid-cols-3 gap-2 sm:gap-6 divide-x divide-white/10"
            >
              <div className="flex flex-col pr-2 sm:pr-4">
                <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  5+
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-zinc-500 mt-1 leading-snug">
                  AI projects built
                </span>
              </div>

              <div className="flex flex-col px-2 sm:px-4">
                <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  2
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-zinc-500 mt-1 leading-snug">
                  internships completed
                </span>
              </div>

              <div className="flex flex-col pl-2 sm:pl-4">
                <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  1
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-zinc-500 mt-1 leading-snug">
                  RAG tutor for FBISE (FYP)
                </span>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT COLUMN (TERMINAL CARD) ================= */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end relative"
          >
            {/* Soft cyan glow behind terminal */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 bg-gradient-to-tr from-[#0ff]/20 via-[#b026ff]/10 to-[#0ff]/10 rounded-3xl blur-2xl opacity-60 pointer-events-none"
            />

            {/* Floating Glass Chips (hidden on mobile, visible on lg) */}
            {/* Chip 1: RAG */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -6, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                      delay: 0,
                    }
              }
              className="hidden lg:flex absolute -top-5 right-6 z-20 items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-xs font-mono font-medium text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)] select-none pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0ff] shadow-[0_0_6px_#0ff]" />
              <span>RAG</span>
            </motion.div>

            {/* Chip 2: LLM Agents */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, 6, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 5.4,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                      delay: 1.2,
                    }
              }
              className="hidden lg:flex absolute top-1/2 -left-7 z-20 items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-xs font-mono font-medium text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)] select-none pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#b026ff] shadow-[0_0_6px_#b026ff]" />
              <span>LLM Agents</span>
            </motion.div>

            {/* Chip 3: Next.js */}
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -6, 0],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                      delay: 2.4,
                    }
              }
              className="hidden lg:flex absolute -bottom-5 right-10 z-20 items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-xs font-mono font-medium text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)] select-none pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_white]" />
              <span>Next.js</span>
            </motion.div>

            {/* Glass Terminal Card */}
            <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl overflow-hidden text-left z-10">
              
              {/* Terminal macOS-style 3-dot Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 inline-block" />
                </div>
                <span className="text-xs font-mono text-zinc-400 select-none">
                  zohaib@portfolio ~
                </span>
                <div className="w-12" aria-hidden="true" />
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 min-h-[310px] select-text">
                {TERMINAL_LINES.map((step, idx) => {
                  if (idx > effectiveLineIndex) return null;

                  const isCurrent = idx === effectiveLineIndex && !isDone;

                  if (step.type === "prompt") {
                    const textToShow = isCurrent
                      ? (step.text || "").slice(0, charIndex)
                      : step.text;

                    return (
                      <div key={idx} className="flex items-center gap-2 pt-1 first:pt-0">
                        <span className="text-[#0ff] font-semibold select-none">$</span>
                        <span className="text-zinc-200">{textToShow}</span>
                        {isCurrent && (
                          <span className="w-2 h-4 bg-[#0ff] inline-block animate-pulse align-middle" />
                        )}
                      </div>
                    );
                  }

                  if (step.type === "output") {
                    const textToShow = isCurrent
                      ? (step.text || "").slice(0, charIndex)
                      : step.text;

                    return (
                      <div key={idx} className="flex items-start gap-2 pl-3">
                        <span className="text-zinc-500 select-none">&gt;</span>
                        <span className="text-zinc-300">{textToShow}</span>
                        {isCurrent && (
                          <span className="w-2 h-4 bg-[#0ff] inline-block animate-pulse align-middle ml-1" />
                        )}
                      </div>
                    );
                  }

                  if (step.type === "building") {
                    const prefix = step.prefix || "building: ";
                    const val = step.value || "";
                    const prefixLen = prefix.length;

                    return (
                      <div key={idx} className="flex items-start gap-2 pl-3">
                        <span className="text-zinc-500 select-none">&gt;</span>
                        <span>
                          {isCurrent ? (
                            <>
                              <span className="text-zinc-400">
                                {prefix.slice(0, Math.min(charIndex, prefixLen))}
                              </span>
                              {charIndex > prefixLen && (
                                <span className="text-[#b026ff] font-medium">
                                  {val.slice(0, charIndex - prefixLen)}
                                </span>
                              )}
                              <span className="w-2 h-4 bg-[#0ff] inline-block animate-pulse align-middle ml-1" />
                            </>
                          ) : (
                            <>
                              <span className="text-zinc-400">{prefix}</span>
                              <span className="text-[#b026ff] font-medium">{val}</span>
                            </>
                          )}
                        </span>
                      </div>
                    );
                  }

                  if (step.type === "location") {
                    const prefix = step.prefix || "location: ";
                    const val = step.value || "";
                    const prefixLen = prefix.length;

                    return (
                      <div key={idx} className="flex items-start gap-2 pl-3">
                        <span className="text-zinc-500 select-none">&gt;</span>
                        <span>
                          {isCurrent ? (
                            <>
                              <span className="text-zinc-400">
                                {prefix.slice(0, Math.min(charIndex, prefixLen))}
                              </span>
                              {charIndex > prefixLen && (
                                <span className="text-zinc-300">
                                  {val.slice(0, charIndex - prefixLen)}
                                </span>
                              )}
                              <span className="w-2 h-4 bg-[#0ff] inline-block animate-pulse align-middle ml-1" />
                            </>
                          ) : (
                            <>
                              <span className="text-zinc-400">{prefix}</span>
                              <span className="text-zinc-300">{val}</span>
                            </>
                          )}
                        </span>
                      </div>
                    );
                  }

                  return null;
                })}

                {/* Blinking cursor at end when all lines finished typing */}
                {isDone && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[#0ff] font-semibold select-none">$</span>
                    <span className="w-2 h-4 bg-[#0ff] inline-block animate-pulse align-middle" />
                  </div>
                )}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
