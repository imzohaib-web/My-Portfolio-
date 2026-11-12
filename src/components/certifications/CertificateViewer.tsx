"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Award,
  Check,
  Copy,
} from "lucide-react";
import type { Certification } from "@/data/certifications";
import { formatCertMeta } from "@/data/certifications";
import { useReducedMotion } from "framer-motion";

interface CertificateViewerProps {
  certifications: Certification[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenLightbox: (index: number) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

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
  const didMount = useRef(false);

  const currentCert = certifications[activeIndex] ?? certifications[0];
  const currentHasValidImage = Boolean(currentCert.image && !imageErrors[currentCert.id]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

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
      className="relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#131315] p-4 md:p-5"
    >
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`relative h-[260px] sm:h-[340px] lg:h-[400px] w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#0b0b0c] ${focusRing}`}
        aria-label="Certificate carousel stage. Use Left and Right arrow keys to navigate."
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="scrollbar-hidden flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        >
          {certifications.map((cert, index) => {
            const isSlideActive = index === activeIndex;
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
                    className={`group relative h-full w-full cursor-zoom-in rounded-lg ${focusRing}`}
                    aria-label={`Zoom ${cert.title}`}
                  >
                    <Image
                      src={cert.image}
                      alt={`${cert.title}, ${cert.issuer}`}
                      fill
                      sizes="(min-width: 1024px) 560px, 92vw"
                      priority={index === 0}
                      className="object-contain p-1"
                      onError={() => handleImageError(cert.id)}
                    />
                  </button>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-white/[0.08] bg-[#0b0b0c] p-6 text-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#c6f432]"
                      aria-hidden="true"
                    >
                      <Award size={24} />
                    </div>

                    <h3 className="mt-4 line-clamp-2 max-w-sm text-base font-medium text-white">
                      {cert.title}
                    </h3>

                    {metaLine && (
                      <p className="mt-1 text-xs text-[#8f8f94]">
                        {metaLine}
                      </p>
                    )}

                    {cert.credentialId && (
                      <div className="mt-4 flex flex-col items-center gap-1.5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8f8f94]">
                          Credential ID
                        </span>
                        <div className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-[#131315] px-3 py-1 font-mono text-xs text-[#ededed]">
                          <span className="select-all">{cert.credentialId}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(cert.credentialId!)}
                            className={`rounded p-1 text-[#8f8f94] hover:text-white ${focusRing}`}
                            aria-label={`Copy credential ID for ${cert.title}`}
                          >
                            {copiedId === cert.credentialId ? (
                              <Check size={13} className="text-[#34d399]" aria-hidden="true" />
                            ) : (
                              <Copy size={13} aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {cert.status === "pending" && (
                      <div className="mt-4 flex flex-col items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-[#8f8f94]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" aria-hidden="true" />
                          <span>Certificate pending</span>
                        </span>
                        {cert.note && (
                          <p className="max-w-xs text-xs text-[#8f8f94] leading-relaxed">
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

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0b0b0c] text-[#ededed] hover:bg-white/[0.04] disabled:opacity-30 disabled:pointer-events-none ${focusRing}`}
          aria-label="Previous certificate"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <span className="font-mono text-xs tracking-wider text-[#8f8f94] select-none">
          {activeIndex + 1} / {certifications.length}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === certifications.length - 1}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0b0b0c] text-[#ededed] hover:bg-white/[0.04] disabled:opacity-30 disabled:pointer-events-none ${focusRing}`}
          aria-label="Next certificate"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 flex min-h-[84px] flex-col justify-between border-t border-white/[0.08] pt-3">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="line-clamp-2 text-base font-medium text-white">
              {currentCert.title}
            </h3>

            {currentCert.verifyUrl ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[#ededed]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
                <span>Verified link</span>
              </span>
            ) : currentCert.status === "pending" ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[#ededed]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                <span>Pending</span>
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-[#8f8f94]">
                <span>Earned credential</span>
              </span>
            )}
          </div>

          {formatCertMeta(currentCert.issuer, currentCert.year) && (
            <p className="mt-1 text-xs text-[#8f8f94]">
              {formatCertMeta(currentCert.issuer, currentCert.year)}
            </p>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {currentCert.verifyUrl && (
            <a
              href={currentCert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify ${currentCert.title} credential`}
              className={`inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0b0b0c] px-3 text-xs text-[#ededed] hover:bg-white/[0.04] ${focusRing}`}
            >
              <span>Verify credential</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}

          {currentHasValidImage && (
            <button
              type="button"
              onClick={() => onOpenLightbox(activeIndex)}
              aria-label={`Zoom into ${currentCert.title}`}
              className={`inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0b0b0c] px-3 text-xs text-[#8f8f94] hover:text-white hover:bg-white/[0.04] ${focusRing}`}
            >
              <Maximize2 size={12} aria-hidden="true" />
              <span>Zoom</span>
            </button>
          )}
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        Certificate {activeIndex + 1} of {certifications.length}: {currentCert.title}
      </div>
    </div>
  );
}
