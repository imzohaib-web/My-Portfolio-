"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import { LayoutGrid, Server, Sparkles, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  frontend: LayoutGrid,
  backend: Server,
  "generative-ai": Sparkles,
  tools: Wrench,
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
    <Section id="skills" aria-labelledby="skills-heading" className="bg-[#0b0b0c]">
      <Container className="relative z-10">
        <motion.header {...headerMotion} className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8f8f94]">
            {"// 03 · SKILLS"}
          </p>
          <h2
            id="skills-heading"
            className="mt-3 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-tight tracking-tight text-white"
          >
            Tech Stack
          </h2>
          <p className="mt-3 max-w-[60ch] text-base text-[#8f8f94] md:text-lg">
            The stack I use to ship AI products, from React interfaces to RAG pipelines and
            LLM-powered backends.
          </p>
          <div
            aria-hidden="true"
            className="mt-8 h-px w-full bg-white/[0.08]"
          />
        </motion.header>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:gap-6">
          {skillCategories.map((category, cardIndex) => {
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
                  "flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#131315] p-5 md:p-7 hover:border-white/20 transition-colors",
                  !shouldReduceMotion && "transition-all duration-200"
                )}
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#c6f432]">
                    <CategoryIcon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{category.title}</h3>
                    <p className="mt-0.5 text-xs text-[#8f8f94]">{category.description}</p>
                  </div>
                </div>

                <ul role="list" className="flex flex-wrap gap-2">
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
                        className="inline-flex h-8 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 text-xs text-[#ededed] hover:border-white/20 transition-colors select-none"
                      >
                        <SkillIcon
                          className="h-3.5 w-3.5 shrink-0 text-[#8f8f94]"
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
    </Section>
  );
}
