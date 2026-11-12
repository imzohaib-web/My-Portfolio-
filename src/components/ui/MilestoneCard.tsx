"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Trophy, GraduationCap, Users, ArrowUpRight } from "lucide-react";
import type { Milestone, MilestoneCategory } from "@/data/milestones";
import { certifications } from "@/data/certifications";
import { cn } from "@/lib/utils";

const validCertIds = new Set(certifications.map((c) => c.id));

const categoryIcons: Record<
  MilestoneCategory,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
> = {
  Hackathon: Trophy,
  Leadership: Users,
  Scholarship: GraduationCap,
};

export type MilestoneCardProps = {
  milestone: Milestone;
  index?: number;
  priority?: boolean;
  onOpenLightbox?: (index: number, triggerRef: React.RefObject<HTMLButtonElement | null>) => void;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

export function MilestoneCard({
  milestone,
  index = 0,
  priority = false,
  onOpenLightbox,
}: MilestoneCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageButtonRef = useRef<HTMLButtonElement>(null);

  const CategoryIcon = categoryIcons[milestone.category] ?? Trophy;
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
      className="group/card relative flex h-full w-full flex-col md:grid md:grid-cols-[42%_1fr] lg:flex lg:flex-col rounded-xl border border-white/[0.08] bg-[#131315] overflow-hidden transition-colors hover:border-white/20"
    >
      <button
        ref={imageButtonRef}
        type="button"
        onClick={handleImageClick}
        aria-label={`View photo: ${milestone.title}`}
        className={`relative w-full aspect-[16/10] overflow-hidden bg-[#0b0b0c] text-left cursor-pointer block select-none border-b border-white/[0.08] ${focusRing}`}
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
            className="object-cover"
          />
        ) : (
          <div className="relative flex h-full min-h-[180px] w-full flex-col overflow-hidden bg-[#0b0b0c] p-6 select-none">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 right-3 font-mono text-6xl font-normal text-white/[0.04] select-none"
            >
              {milestone.period}
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#c6f432]">
              <CategoryIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 z-10 flex items-center rounded-full border border-white/[0.08] bg-[#0b0b0c]/90 px-2.5 py-0.5">
          <span className="font-mono text-[11px] font-normal uppercase tracking-wider text-[#8f8f94]">
            {milestone.category}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10 flex items-center rounded-full border border-white/[0.08] bg-[#0b0b0c]/90 px-2.5 py-0.5">
          <span className="font-mono text-[11px] font-normal tracking-wider text-[#8f8f94]">
            {milestone.period}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#0b0b0c]/90 px-2.5 py-0.5 text-xs text-[#ededed]">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                milestone.tone === "amber" ? "bg-[#f59e0b]" : "bg-[#34d399]"
              )}
              aria-hidden="true"
            />
            <span>{milestone.statusLabel}</span>
          </div>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5 md:p-6 gap-3">
        <h3
          title={milestone.title}
          className="text-lg font-medium text-white leading-snug line-clamp-1"
        >
          {milestone.title}
        </h3>

        <p className="text-sm text-[#8f8f94] leading-relaxed line-clamp-3 min-h-[4rem]">
          {milestone.description}
        </p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {milestone.facts.map((fact) => (
            <span
              key={fact}
              className="inline-flex h-6 items-center rounded-md border border-white/[0.08] bg-white/[0.02] px-2 text-xs text-[#8f8f94] select-none"
            >
              {fact}
            </span>
          ))}
        </div>

        {showFooter && (
          <div className="mt-auto pt-4 border-t border-white/[0.08] flex items-center justify-between">
            {hasValidCert ? (
              <a
                href="#certifications"
                onClick={handleCertificateClick}
                className={`group/cert inline-flex items-center gap-1.5 text-xs font-medium text-[#c6f432] hover:underline ${focusRing} rounded-sm py-0.5`}
              >
                <span>View certificate</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              </a>
            ) : milestone.link ? (
              <a
                href={milestone.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/link inline-flex items-center gap-1.5 text-xs font-medium text-[#c6f432] hover:underline ${focusRing} rounded-sm py-0.5`}
              >
                <span>{milestone.link.label}</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5"
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
