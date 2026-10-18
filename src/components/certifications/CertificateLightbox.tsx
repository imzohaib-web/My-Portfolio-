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

  // Lock body scroll while open and restore on close
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const triggerElement = triggerRef?.current;
    document.body.style.overflow = "hidden";

    // Focus close button on mount
    const timeout = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timeout);
      // Return focus to trigger element
      triggerElement?.focus();
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

  // Keyboard navigation & focus trap
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
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Content */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="relative z-10 flex max-h-[95vh] w-full max-w-5xl flex-col items-center justify-center"
        >
          {/* Top Bar: Title & Close Button */}
          <div className="mb-3 flex w-full items-center justify-between px-2">
            <div className="flex flex-col pr-4">
              <h3 className="line-clamp-1 text-base sm:text-lg font-semibold text-white">
                {cert.title}
              </h3>
              {metaLine && (
                <p className="text-xs sm:text-sm text-zinc-400">
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
                  className="hidden sm:inline-flex h-11 items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 text-xs font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={`Verify ${cert.title} credential`}
                >
                  <span>Verify</span>
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              )}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Close certificate lightbox"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Main Stage */}
          <div className="relative flex h-[60vh] sm:h-[70vh] md:h-[75vh] w-full max-w-[90vw] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-2 sm:p-4">
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
                <p className="text-base text-zinc-300">No preview image available for this entry</p>
                {cert.credentialId && (
                  <p className="mt-2 font-mono text-sm text-amber-400">
                    ID: {cert.credentialId}
                  </p>
                )}
              </div>
            )}

            {/* Left / Right Nav Arrows inside lightbox (44px round buttons) */}
            {currentIndex > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white backdrop-blur-sm transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Previous certificate"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
            )}

            {currentIndex < certifications.length - 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white backdrop-blur-sm transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Next certificate"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Bottom Counter */}
          <div className="mt-3 font-mono text-xs text-zinc-400">
            {currentIndex + 1} / {certifications.length}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
