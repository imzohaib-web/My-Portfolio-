"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsCtaBar } from "@/components/projects/ProjectsCtaBar";
import { getFeaturedProjects, getAllProjects } from "@/data/projects";

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();
  const featuredProjects = getFeaturedProjects();
  const totalProjects = getAllProjects().length;

  const headerMotion = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  return (
    <Section id="projects" aria-labelledby="projects-heading">
      {/* Background ambient radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_15%,transparent_100%)] opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15%] top-[12%] h-[min(360px,50vw)] w-[min(360px,50vw)] rounded-full bg-violet-600 opacity-[0.12] blur-[120px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[12%] top-[22%] h-[min(380px,52vw)] w-[min(380px,52vw)] rounded-full bg-teal-400 opacity-[0.12] blur-[120px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />

      <Container className="relative z-10">
        {/* Header: Eyebrow, H2, Subtitle, Divider (No top-right link) */}
        <motion.div {...headerMotion}>
          <div className="max-w-3xl">
            <p className="font-mono text-[13px] tracking-[0.22em] uppercase text-[var(--accent-primary)]">
              {"// 01 · PROJECTS"}
            </p>
            <h2
              id="projects-heading"
              className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-[-0.02em] text-white"
            >
              Featured Projects
            </h2>
            <p className="mt-4 max-w-[60ch] text-base text-zinc-300 md:text-lg">
              AI products, agents and full-stack apps, from prototype to production.
            </p>
          </div>

          {/* 1px gradient-fade divider with mb-10 */}
          <div
            aria-hidden="true"
            className="mt-8 mb-10 h-px w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary)]/40 to-transparent"
          />
        </motion.div>

        {/* Featured Projects Layout: lg+ 3-col grid; below lg horizontal swipe row */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-5 lg:gap-y-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-stretch">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: "easeOut",
              }}
              className="w-[82%] sm:w-[48%] lg:w-auto shrink-0 snap-start flex flex-col"
            >
              <ProjectCard project={project} priorityImage={idx === 0} />
            </motion.div>
          ))}
        </div>

        {/* "View all" CTA bar under the cards */}
        <ProjectsCtaBar totalProjects={totalProjects} />
      </Container>
    </Section>
  );
}
