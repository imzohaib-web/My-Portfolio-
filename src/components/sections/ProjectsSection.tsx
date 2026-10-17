"use client";

import { getProjectsForDisplay } from "@/data/projects";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";

export function ProjectsSection() {
  const projects = getProjectsForDisplay();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background grid and ambient radial glows matching Hero/Skills sections */}
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

      <ProjectsCarousel projects={projects} />
    </section>
  );
}
