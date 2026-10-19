"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MilestoneCard } from "@/components/ui/MilestoneCard";
import { milestones } from "@/data/milestones";

export function MilestonesSection() {
  const shouldReduceMotion = useReducedMotion();

  const headerMotion = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  return (
    <Section
      id="milestones"
      aria-labelledby="milestones-heading"
      className="z-10 relative scroll-mt-24 py-24"
    >
      {/* Background Ambience & Subtle Grid with #050505, cyan #0ff, purple #b026ff */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_15%,transparent_100%)] opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-[20%] h-[min(400px,50vw)] w-[min(400px,50vw)] rounded-full bg-[#00ffff] opacity-[0.07] blur-[130px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-[35%] h-[min(420px,52vw)] w-[min(420px,52vw)] rounded-full bg-[#b026ff] opacity-[0.08] blur-[130px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />

      <Container className="relative z-10">
        {/* Header: Mono label, Heading "Milestones.", Subtitle, and 1px gradient divider */}
        <motion.div {...headerMotion} className="mb-12 max-w-3xl">
          <p className="font-mono text-[13px] tracking-[0.22em] uppercase text-cyan-400">
            {"// milestones"}
          </p>
          <h2
            id="milestones-heading"
            className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            Milestones.
          </h2>
          <p className="mt-4 max-w-[60ch] text-base text-zinc-400 md:text-lg">
            Hackathons, programs and learning that shaped how I build.
          </p>
          <div
            aria-hidden="true"
            className="mt-6 h-px w-full bg-gradient-to-r from-cyan-400 via-purple-500/40 to-transparent"
          />
        </motion.div>

        {/* Responsive Grid: 3 cols on lg, 2 on md, 1 on mobile, gap-6, auto-rows equal height */}
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {milestones.map((milestone, index) => (
            <motion.li
              key={milestone.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: "easeOut",
              }}
              className="flex h-full"
            >
              <MilestoneCard milestone={milestone} priority={false} />
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
