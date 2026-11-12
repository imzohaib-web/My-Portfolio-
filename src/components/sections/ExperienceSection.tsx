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
    <Section id="experience" aria-labelledby="experience-heading" className="bg-[#0b0b0c]">
      <Container className="relative z-10">
        <motion.div {...headerMotion}>
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8f8f94]">
              {"// 02 · EXPERIENCE"}
            </p>
            <h2
              id="experience-heading"
              className="mt-3 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-tight tracking-tight text-white"
            >
              Experience
            </h2>
            <p className="mt-3 max-w-[60ch] text-base text-[#8f8f94] md:text-lg">
              Internships where I shipped full-stack and ML work.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="mt-8 mb-10 h-px w-full bg-white/[0.08]"
          />
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-[11px] top-6 bottom-6 w-px bg-white/[0.08]"
            aria-hidden="true"
          />

          <ol role="list" className="relative flex flex-col gap-6 pl-8 md:pl-10">
            {experiences.map((role, index) => {
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
                  <div
                    className="absolute -left-[21px] md:-left-[29px] top-7 -translate-x-1/2 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#c6f432] ring-4 ring-[#0b0b0c]" />
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
