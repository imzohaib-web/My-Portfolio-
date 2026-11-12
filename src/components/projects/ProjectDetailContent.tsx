"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { ProjectGalleryLightbox } from "./ProjectGalleryLightbox";
import { TechChip } from "@/components/ui/TechChip";
import { cn } from "@/lib/utils";

function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

type ProjectDetailContentProps = {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

export function ProjectDetailContent({
  project,
  prevProject,
  nextProject,
}: ProjectDetailContentProps) {
  const shouldReduceMotion = useReducedMotion();

  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];

  const validSections = (project.sections || []).filter(
    (s) => s.heading && s.body && s.body.trim().length > 0
  );

  const enter = (index: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.45, delay: index * 0.08, ease: "easeOut" as const },
  });

  return (
    <div className="mx-auto w-full max-w-[1100px] px-6 pt-28 pb-24 md:px-10">
      <motion.div
        {...enter(0)}
        className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5"
      >
        <Link
          href="/projects"
          className={cn(
            "group inline-flex items-center gap-2 text-sm font-medium text-[#8f8f94] transition-colors hover:text-white",
            focusRing
          )}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>All projects</span>
        </Link>

        <div className="flex items-center gap-4 text-sm text-[#8f8f94]">
          {prevProject && (
            <Link
              href={`/projects/${prevProject.slug}`}
              className={cn(
                "group inline-flex items-center gap-1.5 transition-colors hover:text-white",
                focusRing
              )}
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              <span className="hidden sm:inline">Previous:</span>
              <span className="max-w-[120px] truncate text-[#ededed] sm:max-w-[160px]">
                {prevProject.title}
              </span>
            </Link>
          )}

          {prevProject && nextProject && (
            <span className="text-zinc-600" aria-hidden="true">
              ·
            </span>
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className={cn(
                "group inline-flex items-center gap-1.5 transition-colors hover:text-white",
                focusRing
              )}
            >
              <span className="hidden sm:inline">Next:</span>
              <span className="max-w-[120px] truncate text-[#ededed] sm:max-w-[160px]">
                {nextProject.title}
              </span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
        </div>
      </motion.div>

      <div className="space-y-10">
        <motion.div {...enter(1)}>
          <ProjectGalleryLightbox
            title={project.title}
            images={galleryImages}
            priority={true}
          />
        </motion.div>

        <motion.div {...enter(2)} className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="font-serif text-3xl font-normal tracking-tight text-white md:text-4xl">
              {project.title}
            </h1>

            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#8f8f94]">
                {project.category}
              </span>
              {project.badge && (
                <span className="rounded-full border border-white/[0.08] bg-[#131315] px-3 py-1 text-xs font-medium text-[#ededed]">
                  {project.badge}
                </span>
              )}
            </div>
          </div>

          <p className="font-mono text-xs text-[#8f8f94]">
            {project.subtitle}
          </p>

          <p className="max-w-[65ch] text-base leading-relaxed text-[#8f8f94] md:text-lg">
            {project.description}
          </p>
        </motion.div>

        <motion.div {...enter(3)} className="flex flex-wrap gap-2">
          {project.tech.map((skill) => (
            <TechChip
              key={skill}
              label={skill}
            />
          ))}
        </motion.div>

        <motion.div
          {...enter(4)}
          className="grid grid-cols-1 divide-y divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#131315] md:grid-cols-3 md:divide-x md:divide-y-0"
        >
          {project.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col justify-center p-5 sm:p-6">
              <span className="text-lg font-medium text-white sm:text-xl">
                {stat.value}
              </span>
              <span className="mt-1 font-mono text-xs uppercase tracking-wider text-[#8f8f94]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {(project.links?.live || project.links?.demo || project.links?.github) && (
          <motion.div {...enter(5)} className="flex flex-wrap items-center gap-3 pt-2">
            {(project.links?.live || project.links?.demo) && (
              <a
                href={project.links.live ?? project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-10 min-w-[44px] items-center justify-center gap-2 rounded-lg bg-[#c6f432] px-5 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#b5e028]",
                  focusRing
                )}
              >
                <span>Live demo</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}

            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-10 min-w-[44px] items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-transparent px-5 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]",
                  focusRing
                )}
              >
                <GithubIcon className="h-4 w-4" />
                <span>View on GitHub</span>
              </a>
            )}
          </motion.div>
        )}

        {validSections.length > 0 && (
          <motion.div
            {...enter(6)}
            className="mt-16 border-t border-white/[0.08] pt-12 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12"
          >
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-3">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#8f8f94]">
                  Contents
                </p>
                <nav aria-label="Section navigation" className="flex flex-col space-y-2">
                  {validSections.map((section, idx) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className={cn(
                        "text-sm text-[#8f8f94] transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white",
                        focusRing
                      )}
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-12">
              {validSections.map((section, idx) => (
                <section
                  key={idx}
                  id={`section-${idx}`}
                  className="scroll-mt-28 space-y-3"
                >
                  <h2 className="font-serif text-2xl font-normal tracking-tight text-white">
                    {section.heading}
                  </h2>
                  <p className="text-base leading-relaxed text-[#8f8f94] md:text-lg">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          {...enter(7)}
          className="mt-20 border-t border-white/[0.08] pt-12"
        >
          {nextProject ? (
            <div className="rounded-xl border border-white/[0.08] bg-[#131315] p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="font-mono text-xs tracking-wider uppercase text-[#8f8f94]">
                    Next Case Study
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-normal text-white">
                    {nextProject.title}
                  </h3>
                  <p className="mt-1 max-w-[50ch] text-sm text-[#8f8f94]">
                    {nextProject.summary}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className={cn(
                      "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#c6f432] px-5 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#b5e028]",
                      focusRing
                    )}
                  >
                    <span>Read next</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link
                href="/projects"
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-transparent px-6 text-sm font-medium text-white hover:bg-white/[0.04]",
                  focusRing
                )}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to all projects</span>
              </Link>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-6">
            <Link
              href="/#projects"
              className={cn(
                "inline-flex items-center gap-2 text-sm text-[#8f8f94] hover:text-white",
                focusRing
              )}
            >
              <span>← Featured on home</span>
            </Link>
            <Link
              href="/projects"
              className={cn(
                "inline-flex items-center gap-2 text-sm text-[#8f8f94] hover:text-white",
                focusRing
              )}
            >
              <span>All projects</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
