"use client";

import Image from "next/image";
import { ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { TechChip } from "@/components/ui/TechChip";
import { cn } from "@/lib/utils";
import { useState } from "react";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

type ProjectDetailCardProps = {
  project: Project;
  isPriority?: boolean;
  isHighlighted?: boolean;
};

export function ProjectDetailCard({
  project,
  isPriority = false,
  isHighlighted = false,
}: ProjectDetailCardProps) {
  const [selectedImage, setSelectedImage] = useState<string>(project.cover);

  const validSections = (project.sections || []).filter(
    (s) => s.heading && s.body && s.body.trim().length > 0
  );

  const displayTitle = project.fullTitle ?? project.title;
  const hasGallery = project.gallery && project.gallery.length > 1;

  return (
    <article
      id={project.slug}
      tabIndex={-1}
      className={cn(
        "scroll-mt-40 relative flex flex-col rounded-xl border border-white/[0.08] bg-[#131315] overflow-hidden transition-colors outline-none",
        isHighlighted && "border-[#c6f432] ring-1 ring-[#c6f432]"
      )}
    >
      <div className="w-full border-b border-white/[0.08] bg-[#0b0b0c] p-3 md:p-5">
        <div className="relative aspect-[5/2] w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#0b0b0c]">
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#c6f432]/30 bg-[#131315]/90 px-2.5 py-0.5 text-[11px] font-medium text-[#c6f432]">
                <Sparkles size={11} aria-hidden="true" />
                Featured
              </span>
            </div>
          )}

          <Image
            src={selectedImage}
            alt={project.coverAlt || `${displayTitle} architecture diagram`}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain p-2"
            priority={isPriority}
          />
        </div>

        {hasGallery && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {project.gallery!.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                aria-label={`View diagram ${idx + 1}`}
                className={cn(
                  "relative h-14 w-24 shrink-0 overflow-hidden rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432]",
                  selectedImage === img
                    ? "border-[#c6f432] ring-1 ring-[#c6f432]"
                    : "border-white/[0.08] opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-contain bg-[#0b0b0c]"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-white">
              {displayTitle}
            </h2>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-0.5 text-xs text-[#8f8f94] shrink-0">
              {project.category}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-[#8f8f94]">
            <span className="inline-flex items-center gap-1.5 font-normal text-[#ededed]">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  project.status === "Shipped" ? "bg-[#34d399]" : "bg-[#f59e0b]"
                )}
                aria-hidden="true"
              />
              {project.status}
            </span>
            {project.badge && <span>· {project.badge}</span>}
            {project.year && <span>· {project.year}</span>}
            {project.role && <span>· {project.role}</span>}
          </div>
        </div>

        <p className="font-mono text-xs text-[#8f8f94]">{project.subtitle}</p>

        <p className="text-base text-[#8f8f94] leading-relaxed max-w-[68ch]">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2" role="list">
          {project.tech.map((skill) => (
            <li key={skill}>
              <TechChip
                label={skill}
                className="h-7 text-xs px-2.5"
              />
            </li>
          ))}
        </ul>

        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-1 divide-y divide-white/[0.08] rounded-lg border border-white/[0.08] bg-[#0b0b0c] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col justify-center p-4">
                <span className="text-base font-medium text-white">{stat.value}</span>
                <span className="mt-0.5 font-mono text-xs text-[#8f8f94]">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {validSections.length > 0 && (
          <details className="group/details rounded-lg border border-white/[0.08] bg-[#0b0b0c] p-4 transition-colors">
            <summary className="flex cursor-pointer select-none items-center justify-between text-sm font-medium text-[#ededed] list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] rounded-sm">
              <span>How it works</span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="text-[#8f8f94] transition-transform group-open/details:rotate-180"
              />
            </summary>
            <div className="mt-4 space-y-4 border-t border-white/[0.08] pt-4">
              {validSections.map((sec, idx) => (
                <div key={idx}>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#8f8f94]">
                    {sec.heading}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#8f8f94]">{sec.body}</p>
                </div>
              ))}
            </div>
          </details>
        )}

        {(project.links?.live || project.links?.demo || project.links?.github) && (
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            {(project.links?.live || project.links?.demo) && (
              <a
                href={project.links.live ?? project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${displayTitle}`}
                className="inline-flex h-10 min-w-[44px] items-center justify-center gap-2 rounded-lg bg-[#c6f432] px-5 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#b5e028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432]"
              >
                <span>Live demo</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}

            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${displayTitle}`}
                className="inline-flex h-10 min-w-[44px] items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-transparent px-5 text-sm font-medium text-white transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432]"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
