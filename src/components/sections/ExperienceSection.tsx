"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { RoleCard } from "@/components/experience/RoleCard";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();

  const headerMotion = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  return (
    <Section id="experience" aria-labelledby="experience-heading" className="z-10">
      {/* Background ambient radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_15%,transparent_100%)] opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[12%] top-[20%] h-[min(360px,50vw)] w-[min(360px,50vw)] rounded-full bg-cyan-500 opacity-[0.09] blur-[120px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-[30%] h-[min(380px,52vw)] w-[min(380px,52vw)] rounded-full bg-violet-600 opacity-[0.09] blur-[120px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />

      <Container className="relative z-10">
        {/* Header: Eyebrow, H2, Subtitle, Divider */}
        <motion.div {...headerMotion}>
          <div className="max-w-3xl">
            <p className="font-mono text-[13px] tracking-[0.22em] uppercase text-[var(--accent-primary)]">
              {"// 02 · EXPERIENCE"}
            </p>
            <h2
              id="experience-heading"
              className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-[-0.02em] text-white"
            >
              Experience
            </h2>
            <p className="mt-4 max-w-[60ch] text-base text-zinc-300 md:text-lg">
              Internships where I shipped full-stack and ML work.
            </p>
          </div>

          {/* 1px gradient-fade divider with mb-10 */}
          <div
            aria-hidden="true"
            className="mt-8 mb-10 h-px w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary)]/40 to-transparent"
          />
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Animated 1px vertical line */}
          <motion.div
            initial={shouldReduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-[11px] top-6 bottom-6 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-white/5"
            aria-hidden="true"
          />

          <ol role="list" className="relative flex flex-col gap-6 pl-8 md:pl-10">
            {experiences.map((role, index) => {
              const isNewest = index === 0;
              return (
                <motion.li
                  key={role.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                    ease: "easeOut",
                  }}
                  className="relative"
                >
                  {/* 12px dot centered on the line at left-[11px] */}
                  <div
                    className="absolute -left-[21px] md:-left-[29px] top-7 -translate-x-1/2 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {isNewest && !shouldReduceMotion && (
                      <span className="absolute h-5 w-5 rounded-full bg-cyan-400/35 animate-ping opacity-75" />
                    )}
                    <span className="relative h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-[#05060a]" />
                  </div>

                  <RoleCard role={role} />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
