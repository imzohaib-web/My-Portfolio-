"use client";

import Image from "next/image";
import { ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectAccentStyles } from "@/lib/project-styles";
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
  const styles = projectAccentStyles[project.accent];
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
        "project-card scroll-mt-40 relative flex flex-col rounded-2xl border border-white/10 bg-zinc-950/60 overflow-hidden transition-all duration-300 outline-none",
        isHighlighted && "deep-link-highlight"
      )}
      style={
        {
          "--highlight-color":
            project.accent === "cyan"
              ? "rgba(34, 211, 238, 0.85)"
              : project.accent === "violet"
              ? "rgba(168, 85, 247, 0.85)"
              : project.accent === "emerald"
              ? "rgba(52, 211, 153, 0.85)"
              : "rgba(251, 191, 36, 0.85)",
        } as React.CSSProperties
      }
      data-accent={project.accent}
    >
      {/* Media: full width on top, p-3 md:p-5, bg-zinc-950, border-b border-white/10 */}
      <div className="w-full border-b border-white/10 bg-zinc-950 p-3 md:p-5">
        <div className="relative aspect-[5/2] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-400 backdrop-blur-md">
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
            className="object-contain"
            priority={isPriority}
          />
        </div>

        {/* Optional Gallery thumbnails row */}
        {hasGallery && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {project.gallery!.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                aria-label={`View diagram ${idx + 1}`}
                className={cn(
                  "relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
                  selectedImage === img
                    ? "border-cyan-400 ring-1 ring-cyan-400"
                    : "border-white/10 opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-contain bg-zinc-950"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Body: p-6 md:p-8 flex flex-col gap-5 */}
      <div className="flex flex-col gap-5 p-6 md:p-8">
        {/* 1. Row: Title left, category pill right */}
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {displayTitle}
            </h2>
            <span
              className={cn(
                "rounded-full border px-3 py-0.5 text-xs font-semibold backdrop-blur-sm shrink-0",
                styles.badge
              )}
            >
              {project.category}
            </span>
          </div>

          {/* Under it a meta line: status dot + status, badge, year, role */}
          <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 font-medium",
                project.status === "Shipped" ? "text-emerald-400" : "text-amber-400"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  project.status === "Shipped" ? "bg-emerald-400" : "bg-amber-400"
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

        {/* 2. Subtitle: mono text-sm text-zinc-400, dot-separated */}
        <p className="font-mono text-sm text-zinc-400">{project.subtitle}</p>

        {/* 3. Description: text-base text-zinc-300 leading-relaxed max-w-[68ch] */}
        <p className="text-base text-zinc-300 leading-relaxed max-w-[68ch]">
          {project.description}
        </p>

        {/* 4. All tech chips (Skills chip component, flex-wrap gap-2, text-sm) */}
        <ul className="flex flex-wrap gap-2" role="list">
          {project.tech.map((skill) => (
            <li key={skill}>
              <TechChip
                label={skill}
                accentHoverClass={styles.chipHover}
                className="h-8 md:h-8 text-xs md:text-sm px-3"
              />
            </li>
          ))}
        </ul>

        {/* 5. Stats row: 3 equal columns, rounded-xl border, divide-x divide-white/10 (divide-y on <sm). Hide if no stats */}
        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-1 divide-y divide-white/10 rounded-xl border border-white/10 bg-zinc-900/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {project.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col justify-center p-4">
                <span className="text-base font-semibold text-white">{stat.value}</span>
                <span className="mt-0.5 font-mono text-xs text-zinc-400">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* 6. Native <details><summary>How it works</summary> with Problem / Solution / Architecture / Challenges */}
        {validSections.length > 0 && (
          <details className="group/details rounded-xl border border-white/10 bg-zinc-900/40 p-4 transition-colors open:bg-zinc-900/60">
            <summary className="flex cursor-pointer select-none items-center justify-between text-sm font-medium text-zinc-200 list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm">
              <span>How it works</span>
              <ChevronDown
                size={16}
                aria-hidden="true"
                className="text-zinc-400 transition-transform group-open/details:rotate-180"
              />
            </summary>
            <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
              {validSections.map((sec, idx) => (
                <div key={idx}>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    {sec.heading}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-300">{sec.body}</p>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* 7. Actions (h-11) */}
        {(project.links?.live || project.links?.demo || project.links?.github) && (
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            {(project.links?.live || project.links?.demo) && (
              <a
                href={project.links.live ?? project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${displayTitle}`}
                className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                aria-label={`GitHub repository for ${displayTitle}`}
                className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-5 text-sm font-medium text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
