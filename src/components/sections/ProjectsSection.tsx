"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";
import { ProjectsCtaBar } from "@/components/projects/ProjectsCtaBar";
import { getProjectsForDisplay, getAllProjects } from "@/data/projects";

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();
  const projects = getProjectsForDisplay();
  const totalProjects = getAllProjects().length;

  const headerMotion = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  return (
    <Section id="projects" aria-labelledby="projects-heading" className="py-20 md:py-28 bg-[#0b0b0c]">
      <ProjectsCarousel
        projects={projects}
        renderHeader={(controls) => (
          <Container className="relative z-10">
            <motion.div {...headerMotion}>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl pt-1">
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8f8f94]">
                    {"// 01 · PROJECTS"}
                  </p>
                  <h2
                    id="projects-heading"
                    className="mt-3 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-tight tracking-tight text-white"
                  >
                    Featured Projects
                  </h2>
                  <p className="mt-3 max-w-[60ch] text-base text-[#8f8f94] md:text-lg">
                    AI products, agents and full-stack apps, from prototype to production.
                  </p>
                </div>
                <div className="hidden shrink-0 md:block">{controls}</div>
              </div>
              <div
                aria-hidden="true"
                className="mt-8 mb-10 h-px w-full bg-white/[0.08]"
              />
            </motion.div>
          </Container>
        )}
      />

      <Container className="relative z-10">
        <ProjectsCtaBar totalProjects={totalProjects} />
      </Container>
    </Section>
  );
}
