"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectAccentStyles } from "@/lib/project-styles";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";

type ProjectCardProps = {
  project: Project;
  priorityImage?: boolean;
};

export function ProjectCard({
  project,
  priorityImage = false,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const styles = projectAccentStyles[project.accent];
  const [imgError, setImgError] = useState(false);
  const visibleTech = project.tech.slice(0, 3);

  return (
    <article
      className={cn(
        "project-card group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60",
        !shouldReduceMotion && "transition-all duration-200 hover:-translate-y-1",
        styles.cardHover
      )}
      data-accent={project.accent}
    >
      {/* 5:2 Thumbnail with object-contain and bottom fade only */}
      <div className="relative aspect-[5/2] w-full overflow-hidden rounded-t-2xl bg-zinc-950">
        {!imgError ? (
          <Image
            src={project.cardImage}
            alt={project.cardAlt || `${project.title} architecture diagram`}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 380px"
            className="object-contain"
            priority={priorityImage}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-zinc-950"
            aria-hidden="true"
          >
            <span className={cn("text-3xl font-bold opacity-40", styles.text)}>
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Seamless bottom fade: only at the bottom 24px fading into the card bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-zinc-950 to-transparent"
        />

        {/* ONE pill top-left: category (min 11px) */}
        <div className="absolute left-3 top-3 z-10">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm",
              styles.badge
            )}
          >
            {project.category}
          </span>
        </div>

        {/* Top-right pill ONLY when status is "In progress" (amber dot) */}
        {project.status === "In progress" && (
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              In progress
            </span>
          </div>
        )}
      </div>

      {/* Body p-5 */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-white line-clamp-1">
          <Link
            href={`/projects#${project.slug}`}
            className="after:absolute after:inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            {project.title}
          </Link>
        </h3>

        {/* Tagline text-sm text-zinc-300 leading-relaxed line-clamp-2 min-h-[2.75rem] */}
        <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-zinc-300 line-clamp-2">
          {project.tagline}
        </p>

        {/* Exactly the first 3 tech chips (h-7, text-xs 12px, text-zinc-200, bg-white/5, border-white/10) */}
        <ul className="mt-4 flex flex-wrap gap-2" role="list">
          {visibleTech.map((tag) => (
            <li key={tag}>
              <span className="inline-flex h-7 items-center rounded-full border border-white/10 bg-white/5 px-2.5 text-xs font-medium text-zinc-200 select-none">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer (mt-auto) - single cyan color on all cards */}
        <div className="mt-auto pt-4 flex items-center">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400">
            <span>View case study</span>
            <ArrowRight
              size={15}
              aria-hidden="true"
              className={cn(
                "transition-transform",
                !shouldReduceMotion && "group-hover/card:translate-x-1"
              )}
            />
          </span>
        </div>
      </div>
    </article>
  );
}
