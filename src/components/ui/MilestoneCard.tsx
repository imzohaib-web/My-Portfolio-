"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Trophy, GraduationCap, Users, ArrowUpRight } from "lucide-react";
import type { Milestone, MilestoneCategory } from "@/data/milestones";
import { certifications } from "@/data/certifications";
import { cn } from "@/lib/utils";

const validCertIds = new Set(certifications.map((c) => c.id));

const categoryConfig: Record<
  MilestoneCategory,
  {
    accent: string;
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
    pillText: string;
    hoverBorder: string;
    glow: string;
    posterGrad: string;
    tileBorder: string;
    firstChipText: string;
  }
> = {
  Hackathon: {
    accent: "amber",
    icon: Trophy,
    pillText: "text-amber-400",
    hoverBorder: "hover:border-amber-400/40",
    glow: "hover:shadow-[0_12px_40px_-10px_rgba(251,191,36,0.18)]",
    posterGrad: "from-amber-500/20 via-zinc-950/60 to-zinc-950",
    tileBorder: "border-amber-400/20 bg-amber-400/10 text-amber-400",
    firstChipText: "text-amber-300",
  },
  Leadership: {
    accent: "cyan",
    icon: Users,
    pillText: "text-cyan-400",
    hoverBorder: "hover:border-cyan-400/40",
    glow: "hover:shadow-[0_12px_40px_-10px_rgba(34,211,238,0.18)]",
    posterGrad: "from-cyan-500/20 via-zinc-950/60 to-zinc-950",
    tileBorder: "border-cyan-400/20 bg-cyan-400/10 text-cyan-400",
    firstChipText: "text-cyan-300",
  },
  Scholarship: {
    accent: "emerald",
    icon: GraduationCap,
    pillText: "text-emerald-400",
    hoverBorder: "hover:border-emerald-400/40",
    glow: "hover:shadow-[0_12px_40px_-10px_rgba(52,211,153,0.18)]",
    posterGrad: "from-emerald-500/20 via-zinc-950/60 to-zinc-950",
    tileBorder: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
    firstChipText: "text-emerald-300",
  },
};

export type MilestoneCardProps = {
  milestone: Milestone;
  index?: number;
  priority?: boolean;
  onOpenLightbox?: (index: number, triggerRef: React.RefObject<HTMLButtonElement | null>) => void;
};

export function MilestoneCard({
  milestone,
  index = 0,
  priority = false,
  onOpenLightbox,
}: MilestoneCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageButtonRef = useRef<HTMLButtonElement>(null);

  const config = categoryConfig[milestone.category] ?? categoryConfig.Hackathon;
  const CategoryIcon = config.icon;
  const hasImage = Boolean(milestone.image) && !imageError;

  const hasValidCert = Boolean(
    milestone.certificateId && validCertIds.has(milestone.certificateId)
  );
  const hasLink = Boolean(milestone.link?.href);
  const showFooter = hasValidCert || hasLink;

  const handleCertificateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!milestone.certificateId) return;

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
  };

  const handleImageClick = () => {
    if (onOpenLightbox) {
      onOpenLightbox(index, imageButtonRef);
    }
  };

  return (
    <article
      data-accent={config.accent}
      className={cn(
        "milestone-card group/card relative flex h-full w-full flex-col md:grid md:grid-cols-[42%_1fr] lg:flex lg:flex-col",
        "rounded-2xl border border-white/10 bg-zinc-950/60 overflow-hidden",
        "transition-all duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none",
        config.hoverBorder,
        config.glow
      )}
    >
      {/* Media: Image or Designed Poster */}
      <button
        ref={imageButtonRef}
        type="button"
        onClick={handleImageClick}
        aria-label={`View photo: ${milestone.title}`}
        className="milestone-media group/media relative w-full overflow-hidden bg-zinc-950 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer block select-none"
      >
        {hasImage && milestone.image ? (
          <Image
            src={milestone.image}
            alt={milestone.imageAlt || milestone.title}
            fill
            sizes="(min-width: 1024px) 33vw, 92vw"
            loading={priority ? undefined : "lazy"}
            priority={priority}
            style={{ objectPosition: milestone.imagePosition || "center" }}
            onError={() => setImageError(true)}
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          <div
            className={cn(
              "relative flex h-full min-h-[220px] w-full flex-col overflow-hidden bg-gradient-to-br select-none",
              config.posterGrad
            )}
          >
            {/* Huge faint period numeral bottom-right */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 right-3 font-mono text-7xl font-extrabold text-white/5 select-none tracking-tight"
            >
              {milestone.period}
            </span>

            {/* Category lucide icon in 48px tile top-left */}
            <div
              className={cn(
                "absolute top-12 left-3 md:top-14 md:left-4 flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-md transition-transform duration-500 group-hover/card:scale-105 motion-reduce:transform-none shadow-inner",
                config.tileBorder
              )}
            >
              <CategoryIcon className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        )}

        {/* Dark gradient overlay on bottom 45% */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/70 to-transparent"
          aria-hidden="true"
        />

        {/* Top-left: Category pill */}
        <div className="absolute top-3 left-3 z-10 flex items-center rounded-full border border-white/15 bg-black/50 px-2.5 py-1 backdrop-blur-md">
          <span
            className={cn(
              "font-mono text-[11px] md:text-xs font-medium uppercase tracking-wider",
              config.pillText
            )}
          >
            {milestone.category}
          </span>
        </div>

        {/* Top-right: Period pill */}
        <div className="absolute top-3 right-3 z-10 flex items-center rounded-full border border-white/15 bg-black/50 px-2.5 py-1 backdrop-blur-md">
          <span className="font-mono text-[11px] md:text-xs font-medium tracking-wider text-zinc-300">
            {milestone.period}
          </span>
        </div>

        {/* Bottom-left: Status chip */}
        <div className="absolute bottom-3 left-3 z-10">
          {milestone.tone === "amber" ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-black/60 px-2.5 py-1 text-xs font-medium text-amber-400 backdrop-blur-md shadow-sm">
              <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>{milestone.statusLabel}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-black/60 px-2.5 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md shadow-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] shrink-0"
                aria-hidden="true"
              />
              <span>{milestone.statusLabel}</span>
            </div>
          )}
        </div>
      </button>

      {/* Body: Title, Description, Facts, and Footer */}
      <div className="flex flex-1 flex-col p-5 md:p-6 gap-3">
        <h3
          title={milestone.title}
          className="text-xl font-semibold text-white leading-snug line-clamp-1 transition-colors group-hover/card:text-white"
        >
          {milestone.title}
        </h3>

        <p className="milestone-description text-[15px] text-zinc-300 leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {milestone.description}
        </p>

        {/* Facts Chips */}
        <div className="mt-1 flex flex-wrap gap-2">
          {milestone.facts.map((fact, fIndex) => (
            <span
              key={fact}
              className={cn(
                "inline-flex h-7 items-center rounded-full border border-white/10 bg-white/5 px-2.5 text-xs select-none",
                fIndex === 0 ? config.firstChipText : "text-zinc-200"
              )}
            >
              {fact}
            </span>
          ))}
        </div>

        {/* Footer pinned to bottom */}
        {showFooter && (
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
            {hasValidCert ? (
              <a
                href="#certifications"
                onClick={handleCertificateClick}
                className="group/cert inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm py-0.5"
              >
                <span>View certificate</span>
                <ArrowUpRight
                  className="h-4 w-4 text-cyan-400 transition-transform group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </a>
            ) : milestone.link ? (
              <a
                href={milestone.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm py-0.5"
              >
                <span>{milestone.link.label}</span>
                <ArrowUpRight
                  className="h-4 w-4 text-cyan-400 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </a>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
