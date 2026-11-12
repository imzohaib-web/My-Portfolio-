"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HeroTerminal } from "./HeroTerminal";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { PROFILE } from "@/lib/profile";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: PROFILE.github,
    ariaLabel: "GitHub",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    isExternal: true,
  },
  {
    name: "LinkedIn",
    href: PROFILE.linkedin,
    ariaLabel: "LinkedIn",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    isExternal: true,
  },
  {
    name: "Email",
    href: `mailto:${PROFILE.email}`,
    ariaLabel: "Email",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    isExternal: false,
  },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const statChips = [
    `${projects.length} projects built`,
    `${experiences.length} internships`,
    "Alibaba Cloud AI Hackathon",
  ];

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[calc(100svh-80px)] flex-col pt-28 pb-16 bg-[#0b0b0c]"
    >
      <Container className="relative z-10 flex flex-1 items-center">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-5 text-left lg:gap-6">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#8f8f94]">
              {PROFILE.role}
            </span>

            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-serif max-w-[15ch] text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[1.04] tracking-[-0.01em] [text-wrap:balance] text-white"
            >
              <span>I build </span>
              <span className="italic text-[#c6f432] px-[0.08em]">AI</span>
              <span> that actually ships.</span>
            </motion.h1>

            <p className="max-w-[50ch] text-base leading-relaxed text-[#8f8f94] lg:text-lg">
              I&apos;m Zohaib, a final-year Software Engineering student at COMSATS building RAG systems,
              LLM apps and full&#8209;stack products from prototype to production.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {statChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex h-7 items-center rounded-md border border-white/[0.08] bg-[#131315] px-2.5 font-mono text-xs text-[#8f8f94]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button href="#projects" variant="primary">
                <span>View my work</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="ghost">
                <span>Let&apos;s talk</span>
              </Button>
              <a
                href="/resume/Zohaib_Umer_CV.pdf"
                download="Zohaib_Umer_CV.pdf"
                type="application/pdf"
                rel="noopener"
                className={`inline-flex h-10 min-w-[44px] items-center justify-center gap-2 px-3 text-sm font-medium text-[#8f8f94] transition-colors hover:text-white rounded-lg ${focusRing}`}
              >
                <Download size={16} aria-hidden="true" />
                <span>Resume</span>
                <span className="font-mono text-xs text-[#8f8f94]">PDF</span>
              </a>
            </div>

            <div className="flex items-center gap-1 pt-1">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  aria-label={link.ariaLabel}
                  title={link.name}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#8f8f94] transition-colors hover:text-[#c6f432] ${focusRing}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="min-w-0 w-full">
            <HeroTerminal />
          </div>
        </div>
      </Container>
    </section>
  );
}
