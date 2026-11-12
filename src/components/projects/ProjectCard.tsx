"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";

type ProjectCardProps = {
  project: Project;
  priorityImage?: boolean;
  duplicate?: boolean;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function ProjectCard({
  project,
  priorityImage = false,
  duplicate = false,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const visibleTech = project.tech.slice(0, 3);

  return (
    <article
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#131315] hover:border-white/20 transition-colors",
        !shouldReduceMotion && "transition-all duration-200"
      )}
      aria-hidden={duplicate || undefined}
    >
      <div className="relative aspect-[5/2] w-full overflow-hidden rounded-t-xl bg-[#0b0b0c] border-b border-white/[0.08]">
        {!imgError ? (
          <Image
            src={project.cardImage}
            alt={project.cardAlt || `${project.title} architecture diagram`}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 380px"
            className="object-contain p-2"
            priority={priorityImage}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#0b0b0c]"
            aria-hidden="true"
          >
            <span className="text-3xl font-serif text-[#8f8f94]/40">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 z-10">
          <span className="rounded-full border border-white/[0.08] bg-[#0b0b0c]/90 px-2.5 py-0.5 text-[11px] font-medium text-[#8f8f94]">
            {project.category}
          </span>
        </div>

        {project.status === "In progress" && (
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#0b0b0c]/90 px-2.5 py-0.5 text-[11px] font-normal text-[#ededed]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" aria-hidden="true" />
            <span>In progress</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-medium text-white line-clamp-1">
          <Link
            href={`/projects/${project.slug}`}
            tabIndex={duplicate ? -1 : 0}
            className={cn(
              "after:absolute after:inset-0 rounded-xl",
              focusRing,
              duplicate && "pointer-events-none"
            )}
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-[#8f8f94] line-clamp-2">
          {project.tagline}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" role="list">
          {visibleTech.map((tag) => (
            <li key={tag}>
              <span className="inline-flex h-6 items-center rounded-md border border-white/[0.08] bg-white/[0.02] px-2 text-xs text-[#8f8f94] select-none">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/[0.08] pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#c6f432]">
            <span>View case study</span>
            <ArrowRight
              size={14}
              aria-hidden="true"
              className={cn(
                "transition-transform",
                !shouldReduceMotion && "group-hover/card:translate-x-0.5"
              )}
            />
          </span>
          <div className="flex items-center gap-1">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${project.title}`}
                tabIndex={duplicate ? -1 : 0}
                className={cn(
                  "relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#8f8f94] transition-colors hover:text-white",
                  focusRing
                )}
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {(project.links?.live || project.links?.demo) && (
              <a
                href={project.links.live ?? project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
                tabIndex={duplicate ? -1 : 0}
                className={cn(
                  "relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#8f8f94] transition-colors hover:text-white",
                  focusRing
                )}
              >
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
