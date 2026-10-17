"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectGalleryProps = {
  title: string;
  images: string[];
  priority?: boolean;
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function ProjectGalleryLightbox({ title, images, priority = false }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const activeImage = images[activeIndex] || images[0];

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, []);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    },
    [images.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    },
    [images.length]
  );

  // Keyboard navigation & Esc to close & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Tab") {
        // Simple focus trap within lightbox modal
        const focusable = document.querySelectorAll<HTMLElement>(
          "[data-lightbox] button, [data-lightbox] [tabindex='0']"
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose, handlePrev, handleNext]);

  return (
    <div className="space-y-4">
      {/* Hero Media Container */}
      <div className="group relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleOpen}
          aria-label={`Zoom ${title} image ${activeIndex + 1}`}
          className={cn(
            "relative h-full w-full cursor-zoom-in overflow-hidden",
            focusRing
          )}
        >
          <Image
            src={activeImage}
            alt={`${title} technical diagram ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-contain p-2 sm:p-4"
            priority={priority}
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-mono text-zinc-300 backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn size={14} aria-hidden="true" />
            <span>Click to zoom</span>
          </div>
        </button>
      </div>

      {/* Thumbnails below hero if multiple images */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Gallery thumbnails"
          className="flex flex-wrap gap-3 pt-1"
        >
          {images.map((img, idx) => (
            <button
              key={img}
              role="tab"
              type="button"
              aria-selected={idx === activeIndex}
              aria-label={`View image ${idx + 1} of ${images.length}`}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative h-16 w-24 overflow-hidden rounded-lg border bg-zinc-900 transition-all sm:h-20 sm:w-32",
                focusRing,
                idx === activeIndex
                  ? "border-cyan-400 ring-2 ring-cyan-400/30 opacity-100"
                  : "border-white/10 opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="128px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          data-lightbox="true"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image preview`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          {/* Controls bar */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-400">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close lightbox"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20",
                focusRing
              )}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Navigation arrows (if > 1 image) */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className={cn(
                  "absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20",
                  focusRing
                )}
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className={cn(
                  "absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20",
                  focusRing
                )}
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </>
          )}

          {/* Expanded Image */}
          <div
            className="relative h-full max-h-[85vh] w-full max-w-[1100px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt={`${title} full size architecture diagram`}
              fill
              sizes="1100px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
