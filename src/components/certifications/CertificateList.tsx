"use client";

import { useEffect, useRef } from "react";
import { Award, CheckCircle2, Clock, Hash } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { formatCertMeta } from "@/data/certifications";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface CertificateListProps {
  certifications: Certification[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

export function CertificateList({
  certifications,
  activeIndex,
  onSelectIndex,
}: CertificateListProps) {
  const shouldReduceMotion = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    const list = listRef.current;
    if (!list) return;

    const activeEl = list.querySelector<HTMLElement>('[aria-current="true"]');
    if (activeEl) {
      const listRect = list.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      const currentScroll = list.scrollLeft;
      const targetScroll =
        currentScroll +
        (activeRect.left - listRect.left) -
        (listRect.width / 2 - activeRect.width / 2);

      list.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  }, [activeIndex, shouldReduceMotion]);

  const handleRowClick = (index: number) => {
    onSelectIndex(index);

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
        "flex-row gap-2 overflow-x-auto snap-x snap-mandatory overscroll-x-contain py-1 -mx-1 px-1",
        "lg:flex-col lg:overflow-visible lg:gap-2 lg:mx-0 lg:px-0 lg:h-full lg:justify-between"
      )}
      role="list"
      aria-label="Certifications list"
    >
      {certifications.map((cert, index) => {
        const isActive = index === activeIndex;
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
                "relative flex h-14 md:h-[58px] w-full items-center justify-between rounded-lg px-3 md:px-4 text-left transition-colors select-none",
                focusRing,
                isActive
                  ? "border border-[#c6f432]/60 bg-[#131315]"
                  : "border border-white/[0.08] bg-[#131315]/50 hover:border-white/20 hover:bg-white/[0.02]"
              )}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-[#c6f432]"
                  aria-hidden="true"
                />
              )}

              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-[#c6f432]"
                  aria-hidden="true"
                >
                  <Award size={16} />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="line-clamp-1 text-sm font-medium text-white">
                    {cert.title}
                  </span>
                  {metaLine && (
                    <span className="line-clamp-1 text-xs text-[#8f8f94]">
                      {metaLine}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 flex items-center pl-2">
                {cert.verifyUrl ? (
                  <span
                    className="flex items-center text-[#34d399]"
                    title="Verified credential link"
                    aria-label="Verified link"
                  >
                    <CheckCircle2 size={15} aria-hidden="true" />
                  </span>
                ) : cert.status === "pending" ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 text-[11px] text-[#8f8f94]">
                    <Clock size={11} className="text-[#f59e0b]" aria-hidden="true" />
                    <span>Pending</span>
                  </span>
                ) : cert.credentialId ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.02] px-1.5 py-0.5 text-[10px] font-mono text-[#8f8f94]"
                    title={`Credential ID: ${cert.credentialId}`}
                  >
                    <Hash size={10} aria-hidden="true" />
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
