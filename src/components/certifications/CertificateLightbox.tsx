"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { formatCertMeta } from "@/data/certifications";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";

interface CertificateLightboxProps {
  isOpen: boolean;
  certifications: Certification[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

export function CertificateLightbox({
  isOpen,
  certifications,
  currentIndex,
  onClose,
  onNavigate,
  triggerRef,
}: CertificateLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const cert = certifications[currentIndex];
  const hasImage = Boolean(cert?.image);
  const metaLine = cert ? formatCertMeta(cert.issuer, cert.year) : "";

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const triggerElement = triggerRef?.current;
    document.body.style.overflow = "hidden";

    const timeout = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timeout);
      triggerElement?.focus({ preventScroll: true });
    };
  }, [isOpen, triggerRef]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < certifications.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, certifications.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Tab") {
        if (!dialogRef.current) return;
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !cert) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Certificate preview: ${cert.title}`}
        ref={dialogRef}
        data-lightbox="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95"
          aria-hidden="true"
        />

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="relative z-10 flex max-h-[95vh] w-full max-w-5xl flex-col items-center justify-center"
        >
          <div className="mb-3 flex w-full items-center justify-between px-2">
            <div className="flex flex-col pr-4">
              <h3 className="line-clamp-1 text-base sm:text-lg font-medium text-white">
                {cert.title}
              </h3>
              {metaLine && (
                <p className="text-xs sm:text-sm text-[#8f8f94]">
                  {metaLine}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hidden sm:inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#131315] px-3.5 text-xs font-medium text-white transition-colors hover:bg-white/[0.04] ${focusRing}`}
                  aria-label={`Verify ${cert.title} credential`}
                >
                  <span>Verify</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              )}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-[#131315] text-[#8f8f94] transition-colors hover:text-white ${focusRing}`}
                aria-label="Close certificate lightbox"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="relative flex h-[60vh] sm:h-[70vh] md:h-[75vh] w-full max-w-[90vw] items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0b0c] p-2 sm:p-4">
            {hasImage && cert.image ? (
              <div className="relative h-full w-full">
                <Image
                  src={cert.image}
                  alt={`${cert.title}, ${cert.issuer}`}
                  fill
                  sizes="(min-width: 1280px) 1100px, 90vw"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <p className="text-sm text-[#8f8f94]">No preview image available for this entry</p>
                {cert.credentialId && (
                  <p className="mt-2 font-mono text-xs text-[#c6f432]">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
            )}

            {currentIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className={`absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#131315] border border-white/[0.08] text-white transition-colors hover:bg-white/[0.08] ${focusRing}`}
                aria-label="Previous certificate"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            )}

            {currentIndex < certifications.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className={`absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#131315] border border-white/[0.08] text-white transition-colors hover:bg-white/[0.08] ${focusRing}`}
                aria-label="Next certificate"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="mt-3 font-mono text-xs text-[#8f8f94]">
            {currentIndex + 1} / {certifications.length}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
