"use client";

import { useEffect, useRef } from "react";
import { Award, CheckCircle2, Clock, Hash } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { categoryAccents, formatCertMeta } from "@/data/certifications";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface CertificateListProps {
  certifications: Certification[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export function CertificateList({
  certifications,
  activeIndex,
  onSelectIndex,
}: CertificateListProps) {
  const shouldReduceMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  // Keep active row/chip visible on mobile horizontal scrolling
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    const list = listRef.current;
    if (!list) return;

    const activeEl = list.querySelector<HTMLElement>('[aria-current="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex, shouldReduceMotion]);

  const handleRowClick = (index: number) => {
    onSelectIndex(index);

    // On mobile (< lg), scroll viewer into view only if off-screen
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const viewer = document.querySelector('[role="region"][aria-roledescription="carousel"]');
      if (viewer) {
        const rect = viewer.getBoundingClientRect();
        if (rect.top < 60 || rect.bottom > window.innerHeight) {
          viewer.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "start",
          });
        }
      }
    }
  };

  return (
    <ul
      ref={listRef}
      className={cn(
        "scrollbar-hidden flex w-full",
        // Below lg: horizontally scrollable chip row to keep section compact on mobile
        "flex-row gap-2.5 overflow-x-auto snap-x snap-mandatory overscroll-x-contain py-1 -mx-1 px-1",
        // lg+: vertical stack of compact rows fitting all 8 entries without scrolling
        "lg:flex-col lg:overflow-visible lg:gap-2 lg:mx-0 lg:px-0 lg:h-full lg:justify-between"
      )}
      role="list"
      aria-label="Certifications list"
    >
      {certifications.map((cert, index) => {
        const isActive = index === activeIndex;
        const accent = categoryAccents[cert.category];
        const metaLine = formatCertMeta(cert.issuer, cert.year);

        return (
          <motion.li
            key={cert.id}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: shouldReduceMotion ? 0 : index * 0.04,
              ease: "easeOut",
            }}
            className="w-[260px] sm:w-[300px] shrink-0 snap-start lg:w-full lg:shrink"
          >
            <button
              type="button"
              onClick={() => handleRowClick(index)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative flex h-14 md:h-[60px] w-full items-center justify-between rounded-xl px-3 md:px-4 text-left transition-all duration-200 outline-none select-none",
                "focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                isActive
                  ? cn("border shadow-md", accent.activeBorder, accent.activeBg)
                  : "border border-white/10 bg-zinc-950/40 hover:border-white/20 hover:bg-white/5"
              )}
            >
              {/* Left 2px accent bar on active row */}
              {isActive && (
                <span
                  className={cn("absolute left-0 top-2 bottom-2 w-0.5 rounded-r", accent.bar)}
                  aria-hidden="true"
                />
              )}

              {/* Left Column: Icon Tile (36px) + Title + Subtitle */}
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                    accent.bg,
                    accent.border,
                    accent.text
                  )}
                  aria-hidden="true"
                >
                  <Award size={18} />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="line-clamp-1 text-sm font-medium text-white group-hover:text-cyan-50">
                    {cert.title}
                  </span>
                  {metaLine && (
                    <span className="line-clamp-1 text-xs text-zinc-400">
                      {metaLine}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Side Indicator */}
              <div className="shrink-0 flex items-center pl-2">
                {cert.verifyUrl ? (
                  <span
                    className="flex items-center text-emerald-400"
                    title="Verified credential link"
                    aria-label="Verified link"
                  >
                    <CheckCircle2 size={16} aria-hidden="true" />
                  </span>
                ) : cert.status === "pending" ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                    <Clock size={11} aria-hidden="true" />
                    <span>Pending</span>
                  </span>
                ) : cert.credentialId ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[11px] font-mono text-amber-300"
                    title={`Credential ID: ${cert.credentialId}`}
                  >
                    <Hash size={11} aria-hidden="true" />
                    <span>ID</span>
                  </span>
                ) : null}
              </div>
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
