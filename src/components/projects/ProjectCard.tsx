"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectAccentStyles, projectInitials } from "@/lib/project-styles";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";

function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

type ProjectCardProps = {
  project: Project;
  slideLabel?: string;
  duplicate?: boolean;
  priorityImage?: boolean;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function ProjectCard({
  project,
  slideLabel,
  duplicate = false,
  priorityImage = false,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const styles = projectAccentStyles[project.accent];
  const [imgError, setImgError] = useState(false);
  const visibleTech = project.tech.slice(0, 4);
  const extraTech = project.tech.length - visibleTech.length;
  const initials = projectInitials(project.title);

  const statusClass =
    project.status === "Shipped"
      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30"
      : "text-amber-400 bg-amber-400/10 border-amber-400/30";

  return (
    <article
      className={cn(
        "project-card group/card relative flex h-full w-[300px] flex-[0_0_auto] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 sm:w-[360px] lg:w-[400px]",
        !shouldReduceMotion && "transition-all duration-200 hover:-translate-y-1",
        styles.cardHover
      )}
      data-accent={project.accent}
      aria-hidden={duplicate || undefined}
      aria-label={slideLabel}
    >
      {/* 16:10 Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-zinc-900">
        {!imgError ? (
          <Image
            src={project.image}
            alt={`${project.title} architecture diagram`}
            fill
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 400px"
            className="object-cover"
            priority={priorityImage}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900"
            aria-hidden="true"
          >
            <span className={cn("text-4xl font-bold opacity-40", styles.text)}>{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />

        {/* Category badge & optional FYP badge */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm",
              styles.badge
            )}
          >
            {project.category}
          </span>
          {project.badge && (
            <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-0.5 text-[11px] text-zinc-200 backdrop-blur-sm">
              {project.badge}
            </span>
          )}
        </div>

        {/* Status pill */}
        <span
          className={cn(
            "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm",
            statusClass
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
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-xl font-semibold text-white">
          <Link
            href={`/projects/${project.slug}`}
            className={cn(
              "after:absolute after:inset-0 focus-visible:ring-0",
              focusRing,
              duplicate && "pointer-events-none"
            )}
            tabIndex={duplicate ? -1 : 0}
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-300 md:text-[15px]">
          {project.summary}
        </p>

        {/* Tech chips: max 4 + "+N", contrast >= 4.5:1 */}
        <ul className="mt-4 flex flex-wrap gap-2" role="list">
          {visibleTech.map((tag) => (
            <li key={tag}>
              <span
                className={cn(
                  "group/chip inline-flex h-8 items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 text-xs font-medium text-zinc-100 transition-colors md:text-[12px]",
                  styles.chipHover,
                  !shouldReduceMotion && "transition-colors duration-200"
                )}
              >
                {tag}
              </span>
            </li>
          ))}
          {extraTech > 0 && (
            <li>
              <span className="inline-flex h-8 items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 text-xs text-zinc-300">
                +{extraTech}
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/5 p-5 pt-4">
        <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", styles.link)}>
          View case study
          <ArrowRight size={16} aria-hidden="true" />
        </span>
        <div className="flex items-center gap-1">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className={cn(
                "relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-white",
                focusRing
              )}
              tabIndex={duplicate ? -1 : 0}
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          )}
          {(project.links?.live || project.links?.demo) && (
            <a
              href={project.links.live ?? project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              className={cn(
                "relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:text-white",
                focusRing
              )}
              tabIndex={duplicate ? -1 : 0}
            >
              <ExternalLink size={20} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
