"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Trophy,
  GraduationCap,
  Award,
  Users,
  Brain,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import type { Milestone, MilestoneCategory } from "@/data/milestones";
import { cn } from "@/lib/utils";

const slugIconMap: Record<
  string,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
> = {
  "alibaba-ai-hackathon": Trophy,
  "adaptive-learning-platform": Brain,
  "genai-chatbot-bano-qabil": Sparkles,
  "microsoft-student-ambassadors": Award,
  "aspire-leaders": Users,
  "english-access-scholarship": GraduationCap,
};

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  slug: string;
  category: MilestoneCategory;
  priority?: boolean;
};

export function ImageWithFallback({
  src,
  alt,
  slug,
  category,
  priority = false,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const IconComponent = slugIconMap[slug] ?? Sparkles;

  if (hasError) {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-950/20 via-purple-950/20 to-zinc-950 border border-white/5 select-none">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12)_0%,rgba(176,38,255,0.08)_50%,transparent_80%)]"
        />
        <div className="relative z-10 flex flex-col items-center gap-2 p-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-inner shadow-cyan-500/10 transition-transform duration-500 group-hover/card:scale-110 motion-reduce:transform-none">
            <IconComponent className="h-7 w-7 text-cyan-400" aria-hidden="true" />
          </div>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            {category}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDE2IDEwIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIGZpbGw9IiMxODE4MWIiLz48L3N2Zz4="
      onError={() => setHasError(true)}
      className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.04] motion-reduce:transform-none"
    />
  );
}

const statusConfig = {
  completed: {
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
    label: "Completed",
  },
  applied: {
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    label: "Applied",
  },
  ongoing: {
    dot: "bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.6)]",
    label: "Ongoing",
  },
};

type MilestoneCardProps = {
  milestone: Milestone;
  priority?: boolean;
};

export function MilestoneCard({ milestone, priority = false }: MilestoneCardProps) {
  const isExternal = milestone.href.startsWith("http");
  const statusInfo = statusConfig[milestone.status] ?? statusConfig.completed;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (milestone.certificateId) {
      e.preventDefault();
      window.dispatchEvent(
        new CustomEvent("select-certificate", { detail: milestone.certificateId })
      );
      const certSection = document.getElementById("certifications");
      if (certSection) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        certSection.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    } else if (milestone.href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(milestone.href.slice(1));
      if (target) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    }
  };

  return (
    <article className="group/card relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_12px_40px_-10px_rgba(0,255,255,0.18)] motion-reduce:transform-none motion-reduce:transition-none cursor-pointer">
      {/* Top 16:10 Image with Overlays */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-900/80">
        <ImageWithFallback
          src={milestone.image}
          alt={milestone.imageAlt}
          slug={milestone.slug}
          category={milestone.category}
          priority={priority}
        />

        {/* Subtle bottom gradient overlay */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"
          aria-hidden="true"
        />

        {/* Top-left: Glass pill with category */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center rounded-md border border-white/10 bg-black/60 px-2 py-0.5 backdrop-blur-md">
          <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-cyan-400">
            {milestone.category}
          </span>
        </div>

        {/* Top-right: Glass pill with year */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center rounded-md border border-white/10 bg-black/60 px-2 py-0.5 backdrop-blur-md">
          <span className="font-mono text-[11px] font-medium text-zinc-300">
            {milestone.year}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2 transition-colors group-hover/card:text-white">
          {milestone.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-3">
          {milestone.description}
        </p>

        {/* Footer pinned to bottom */}
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          {/* Left: status dot + label */}
          <div className="flex items-center gap-1.5 select-none">
            <span
              className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusInfo.dot)}
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-zinc-300">{statusInfo.label}</span>
          </div>

          {/* Right: ghost link with ArrowUpRight */}
          <a
            href={milestone.href}
            onClick={handleClick}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group/link min-h-[44px] inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-zinc-300 transition-colors hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-sm py-2 px-1 select-none"
            aria-label={`${milestone.linkLabel} for ${milestone.title}`}
          >
            <span className="transition-colors group-hover/link:text-cyan-400">
              {milestone.linkLabel || "Details"}
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-zinc-400 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-cyan-400 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
}
