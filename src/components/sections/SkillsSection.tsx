"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { skillCategories, type SkillAccent } from "@/data/skills";
import { cn } from "@/lib/utils";
import { LayoutGrid, Server, Sparkles, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  frontend: LayoutGrid,
  backend: Server,
  "generative-ai": Sparkles,
  tools: Wrench,
};

const accentStyles: Record<
  SkillAccent,
  {
    tile: string;
    cardHover: string;
    chipHover: string;
    gradient: string;
  }
> = {
  cyan: {
    tile: "bg-cyan-400/10 border-cyan-400/20 text-cyan-400",
    cardHover: "hover:shadow-[0_16px_48px_-16px_rgba(34,211,238,0.15)]",
    chipHover:
      "group-hover:border-cyan-400/35 group-hover:text-cyan-50 group-hover:bg-cyan-400/[0.06]",
    gradient: "from-cyan-400/25 via-cyan-400/5 to-transparent",
  },
  violet: {
    tile: "bg-violet-400/10 border-violet-400/20 text-violet-400",
    cardHover: "hover:shadow-[0_16px_48px_-16px_rgba(168,85,247,0.15)]",
    chipHover:
      "group-hover:border-violet-400/35 group-hover:text-violet-50 group-hover:bg-violet-400/[0.06]",
    gradient: "from-violet-400/25 via-violet-400/5 to-transparent",
  },
  emerald: {
    tile: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
    cardHover: "hover:shadow-[0_16px_48px_-16px_rgba(52,211,153,0.15)]",
    chipHover:
      "group-hover:border-emerald-400/35 group-hover:text-emerald-50 group-hover:bg-emerald-400/[0.06]",
    gradient: "from-emerald-400/25 via-emerald-400/5 to-transparent",
  },
  amber: {
    tile: "bg-amber-400/10 border-amber-400/20 text-amber-400",
    cardHover: "hover:shadow-[0_16px_48px_-16px_rgba(251,191,36,0.15)]",
    chipHover:
      "group-hover:border-amber-400/35 group-hover:text-amber-50 group-hover:bg-amber-400/[0.06]",
    gradient: "from-amber-400/25 via-amber-400/5 to-transparent",
  },
};

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  const headerMotion = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_15%,transparent_100%)] opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15%] top-[10%] h-[min(360px,50vw)] w-[min(360px,50vw)] rounded-full bg-violet-600 opacity-[0.14] blur-[120px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] top-[20%] h-[min(380px,52vw)] w-[min(380px,52vw)] rounded-full bg-teal-400 opacity-[0.14] blur-[120px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />

      <Container className="relative z-10">
        <motion.header {...headerMotion} className="max-w-3xl">
          <p className="font-mono text-[13px] tracking-[0.22em] uppercase text-[var(--accent-primary)]">
            {"// 02 · SKILLS"}
          </p>
          <h2
            id="skills-heading"
            className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-tight text-white"
          >
            Tech Stack
          </h2>
          <p className="mt-4 max-w-[60ch] text-base text-zinc-300 md:text-lg">
            The stack I use to ship AI products, from React interfaces to RAG pipelines and
            LLM-powered backends.
          </p>
          <div
            aria-hidden="true"
            className="mt-8 h-px w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary)]/40 to-transparent"
          />
        </motion.header>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:gap-6">
          {skillCategories.map((category, cardIndex) => {
            const styles = accentStyles[category.accent];
            const CategoryIcon = categoryIcons[category.id] ?? Sparkles;

            return (
              <motion.article
                key={category.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : cardIndex * 0.1,
                  ease: "easeOut",
                }}
                className={cn(
                  "skill-card group/card flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-950/60 p-5 backdrop-blur-sm md:p-8",
                  !shouldReduceMotion && "transition-all duration-200 hover:-translate-y-1",
                  styles.cardHover
                )}
                data-accent={category.accent}
              >
                <div className="mb-6 flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                      styles.tile
                    )}
                  >
                    <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{category.description}</p>
                  </div>
                </div>

                <ul role="list" className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, chipIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.li
                        key={skill.name}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.25,
                          delay: shouldReduceMotion ? 0 : cardIndex * 0.1 + chipIndex * 0.03,
                        }}
                        className={cn(
                          "group inline-flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-[13px] font-medium text-zinc-100 md:h-10 md:px-3.5 md:text-sm",
                          styles.chipHover,
                          !shouldReduceMotion && "transition-colors duration-200"
                        )}
                      >
                        <SkillIcon
                          className="h-4 w-4 shrink-0 text-zinc-400 transition-colors duration-200 group-hover:text-current md:h-[18px] md:w-[18px]"
                          aria-hidden="true"
                        />
                        <span>{skill.name}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
