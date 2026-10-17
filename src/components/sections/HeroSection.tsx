"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HeroTerminal } from "./HeroTerminal";

const PROOF_CHIPS = ["3+ shipped projects", "RAG & agents", "MERN + Next.js intern"];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [hideScrollCue, setHideScrollCue] = useState(false);

  useEffect(() => {
    const onScroll = () => setHideScrollCue(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enter = (index: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.45, delay: index * 0.08, ease: "easeOut" as const },
  });

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[calc(100svh-80px)] flex-col pt-28 pb-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[18%] h-[280px] w-[280px] rounded-full bg-[var(--accent-secondary)] opacity-[0.22] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-[12%] h-[320px] w-[320px] rounded-full bg-[var(--accent-primary)] opacity-[0.2] blur-[120px]"
      />

      <Container className="relative z-10 flex flex-1 items-center">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-5 text-left lg:gap-6">
            <motion.span
              {...enter(0)}
              className="font-mono text-[13px] tracking-[0.22em] uppercase text-[var(--accent-primary)]"
            >
              AI Engineer &amp; Full-Stack Developer
            </motion.span>

            <motion.h1
              {...enter(1)}
              className="max-w-[14ch] text-[clamp(2.75rem,6.5vw,5.25rem)] font-extrabold leading-[1.02] tracking-tight text-white"
            >
              <span>I build </span>
              <span
                className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent"
                style={{ textShadow: "0 0 40px rgba(34, 211, 238, 0.35)" }}
              >
                AI
              </span>
              <span> that actually ships.</span>
            </motion.h1>

            <motion.p
              {...enter(2)}
              className="max-w-[52ch] text-lg leading-relaxed text-zinc-300 lg:text-xl"
            >
              I&apos;m Zohaib, a Software Engineering student at COMSATS building RAG systems,
              LLM apps and full&#8209;stack products that go from prototype to production.
            </motion.p>

            <motion.div {...enter(3)} className="flex flex-wrap gap-2">
              {PROOF_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-400"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              {...enter(4)}
              className="flex flex-wrap items-center gap-3 pt-1 sm:gap-3"
            >
              <a
                href="#projects"
                className={`inline-flex h-12 w-full min-w-[44px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-zinc-950 transition-colors hover:bg-zinc-200 sm:w-auto ${focusRing}`}
              >
                <span>View my work</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className={`inline-flex h-12 min-w-[44px] items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 text-[15px] font-medium text-white transition-colors hover:bg-white/5 sm:w-auto ${focusRing}`}
              >
                <span>Let&apos;s talk</span>
              </a>
              <a
                href="/resume/Zohaib_Umer_CV.pdf"
                download="Zohaib_Umer_CV.pdf"
                type="application/pdf"
                rel="noopener"
                className={`inline-flex h-12 min-w-[44px] items-center justify-center gap-2 px-4 text-[15px] font-medium text-zinc-400 transition-colors hover:text-white ${focusRing}`}
              >
                <Download size={18} aria-hidden="true" />
                <span>Resume</span>
                <span className="font-mono text-xs text-zinc-500">PDF</span>
              </a>
            </motion.div>

            <motion.div {...enter(5)} className="flex items-center gap-1 pt-1">
              <a
                href="https://github.com/imzohaib-web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 transition-all hover:-translate-y-0.5 hover:text-white ${focusRing}`}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/zohaib-umer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 transition-all hover:-translate-y-0.5 hover:text-white ${focusRing}`}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </motion.div>
          </div>

          <motion.div {...enter(6)} className="min-w-0 w-full">
            <HeroTerminal />
          </motion.div>
        </div>
      </Container>

      {!shouldReduceMotion && (
        <motion.a
          href="#skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: hideScrollCue ? 0 : 1 }}
          transition={{ duration: 0.35 }}
          aria-hidden={hideScrollCue}
          tabIndex={hideScrollCue ? -1 : 0}
          className={`pointer-events-auto absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300 md:flex ${hideScrollCue ? "pointer-events-none" : ""} ${focusRing}`}
          aria-label="Scroll to skills section"
        >
          <span>Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        </motion.a>
      )}
    </section>
  );
}
