"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Award,
  Clock,
  Check,
  Copy,
  CheckCircle2,
} from "lucide-react";
import type { Certification } from "@/data/certifications";
import { categoryAccents, formatCertMeta } from "@/data/certifications";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CertificateViewerProps {
  certifications: Certification[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenLightbox: (index: number) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function CertificateViewer({
  certifications,
  activeIndex,
  onSelectIndex,
  onOpenLightbox,
  triggerRef,
}: CertificateViewerProps) {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const isProgrammatic = useRef(false);
  const rafId = useRef<number | null>(null);

  const currentCert = certifications[activeIndex] ?? certifications[0];
  const currentHasValidImage = Boolean(currentCert.image && !imageErrors[currentCert.id]);

  // Sync scroll position when activeIndex changes from parent / list / arrows
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const targetLeft = activeIndex * track.clientWidth;
    if (Math.abs(track.scrollLeft - targetLeft) > 10) {
      isProgrammatic.current = true;
      track.scrollTo({
        left: targetLeft,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
      const timer = setTimeout(() => {
        isProgrammatic.current = false;
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, shouldReduceMotion]);

  // Keep alignment on window resize
  useEffect(() => {
    const handleResize = () => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({
        left: activeIndex * track.clientWidth,
        behavior: "auto",
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  // Handle native swipe/scroll update with rAF
  const handleScroll = useCallback(() => {
    if (isProgrammatic.current) return;
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;

      const newIndex = Math.round(track.scrollLeft / track.clientWidth);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < certifications.length
      ) {
        onSelectIndex(newIndex);
      }
    });
  }, [activeIndex, certifications.length, onSelectIndex]);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Arrow navigation
  const handlePrev = () => {
    if (activeIndex > 0) {
      onSelectIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < certifications.length - 1) {
      onSelectIndex(activeIndex + 1);
    }
  };

  // Keyboard navigation when viewer stage is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  // Copy credential ID helper
  const handleCopy = async (idText: string) => {
    try {
      await navigator.clipboard.writeText(idText);
      setCopiedId(idText);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Graceful fallback
    }
  };

  const handleImageError = (certId: string) => {
    setImageErrors((prev) => ({ ...prev, [certId]: true }));
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Certificates"
      className="cert-card certificate-card relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/60 p-4 md:p-5 shadow-2xl backdrop-blur-xl"
    >
      {/* Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative h-[260px] sm:h-[340px] lg:h-[400px] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="Certificate carousel stage. Use Left and Right arrow keys to navigate."
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="scrollbar-hidden flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {certifications.map((cert, index) => {
            const isSlideActive = index === activeIndex;
            const certAccent = categoryAccents[cert.category];
            const hasValidImage = Boolean(cert.image && !imageErrors[cert.id]);
            const metaLine = formatCertMeta(cert.issuer, cert.year);

            return (
              <div
                key={cert.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${certifications.length}`}
                className="relative flex h-full w-full shrink-0 snap-center items-center justify-center p-3 select-none"
              >
                {hasValidImage && cert.image ? (
                  <button
                    type="button"
                    ref={isSlideActive ? triggerRef : undefined}
                    onClick={() => onOpenLightbox(index)}
                    className="group relative h-full w-full cursor-zoom-in rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    aria-label={`Zoom ${cert.title}`}
                  >
                    <Image
                      src={cert.image}
                      alt={`${cert.title}, ${cert.issuer}`}
                      fill
                      sizes="(min-width: 1024px) 560px, 92vw"
                      priority={index === 0}
                      className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.01]"
                      onError={() => handleImageError(cert.id)}
                    />
                  </button>
                ) : (
                  /* Placeholder slide (no image or failed image) */
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-zinc-950/80 p-6 text-center">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl border",
                        certAccent.bg,
                        certAccent.border,
                        certAccent.text
                      )}
                      aria-hidden="true"
                    >
                      <Award size={30} />
                    </div>

                    <h3 className="mt-4 line-clamp-2 max-w-sm text-base sm:text-lg font-bold text-white">
                      {cert.title}
                    </h3>

                    {metaLine && (
                      <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                        {metaLine}
                      </p>
                    )}

                    {/* Credential ID row with copy button */}
                    {cert.credentialId && (
                      <div className="mt-5 flex flex-col items-center gap-1.5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                          Credential ID
                        </span>
                        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs sm:text-sm text-zinc-200">
                          <span className="select-all">{cert.credentialId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(cert.credentialId!)}
                            className="rounded p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                            aria-label={`Copy credential ID for ${cert.title}`}
                          >
                            {copiedId === cert.credentialId ? (
                              <Check size={14} className="text-emerald-400" aria-hidden="true" />
                            ) : (
                              <Copy size={14} aria-hidden="true" />
                            )}
                          </button>
                        </div>
                        <div aria-live="polite" className="sr-only">
                          {copiedId === cert.credentialId
                            ? `Credential ID ${cert.credentialId} copied to clipboard`
                            : ""}
                        </div>
                        {copiedId === cert.credentialId && (
                          <span className="font-mono text-[11px] text-emerald-400">
                            Copied to clipboard!
                          </span>
                        )}
                      </div>
                    )}

                    {/* Pending pill and note */}
                    {cert.status === "pending" && (
                      <div className="mt-5 flex flex-col items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                          <Clock size={12} aria-hidden="true" />
                          <span>Certificate pending</span>
                        </span>
                        {cert.note && (
                          <p className="max-w-xs text-xs text-zinc-400 leading-relaxed">
                            {cert.note}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls row under stage: Prev, Counter, Next */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Previous certificate"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <span className="font-mono text-sm font-semibold tracking-wider text-zinc-300 select-none">
          {activeIndex + 1} / {certifications.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === certifications.length - 1}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Next certificate"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      {/* Caption block under controls (min-h so card does not jump) */}
      <div className="mt-4 flex min-h-[92px] flex-col justify-between border-t border-white/5 pt-3">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="line-clamp-2 text-base sm:text-lg font-semibold text-white">
              {currentCert.title}
            </h3>

            {/* Status chip */}
            {currentCert.verifyUrl ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                <CheckCircle2 size={12} aria-hidden="true" />
                <span>Verified link</span>
              </span>
            ) : currentCert.status === "pending" ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                <Clock size={12} aria-hidden="true" />
                <span>Pending</span>
              </span>
            ) : currentCert.credentialId ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                <span>Earned credential</span>
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                <span>Earned</span>
              </span>
            )}
          </div>

          {formatCertMeta(currentCert.issuer, currentCert.year) && (
            <p className="mt-1 text-sm text-zinc-400">
              {formatCertMeta(currentCert.issuer, currentCert.year)}
            </p>
          )}
        </div>

        {/* Actions row: Verify credential button + Zoom button */}
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          {currentCert.verifyUrl && (
            <a
              href={currentCert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify ${currentCert.title} credential`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-transparent px-4 text-xs font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>Verify credential</span>
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          )}

          {currentHasValidImage && (
            <button
              type="button"
              onClick={() => onOpenLightbox(activeIndex)}
              aria-label={`Zoom into ${currentCert.title}`}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/20 bg-transparent px-3 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Maximize2 size={13} aria-hidden="true" />
              <span>Zoom</span>
            </button>
          )}
        </div>
      </div>

      {/* Visually hidden aria-live announcement */}
      <div className="sr-only" aria-live="polite">
        Certificate {activeIndex + 1} of {certifications.length}: {currentCert.title}
      </div>
    </div>
  );
}
