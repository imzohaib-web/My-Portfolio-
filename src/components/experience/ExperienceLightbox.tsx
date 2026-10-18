"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ExperienceLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  company: string;
  label?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function ExperienceLightbox({
  isOpen,
  onClose,
  image,
  company,
  label,
  triggerRef,
}: ExperienceLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Manage body scroll lock and focus restore
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const triggerElement = triggerRef?.current;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      triggerElement?.focus();
    };
  }, [isOpen, triggerRef]);

  // Focus trap & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (!dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

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
  }, [isOpen, onClose]);

  const altText = `Internship certificate, ${company}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={label || altText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-zinc-900/80 text-zinc-300 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:top-6 md:right-6"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {/* Modal Content */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="relative flex flex-col items-center justify-center max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[80vh] max-w-[90vw] overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">
              <Image
                src={image}
                alt={altText}
                width={1200}
                height={850}
                className="max-h-[80vh] max-w-[90vw] w-auto h-auto object-contain"
                loading="lazy"
                priority={false}
              />
            </div>
            <p className="mt-3 text-center text-xs text-zinc-400 md:text-sm">
              {label || altText}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
