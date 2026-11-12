"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]";

type CarouselControlsProps = {
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  isPlaying: boolean;
  showPause: boolean;
};

export function CarouselControls({
  onPrev,
  onNext,
  onTogglePlay,
  isPlaying,
  showPause,
}: CarouselControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous project"
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white",
          focusRing
        )}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next project"
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white",
          focusRing
        )}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
      {showPause && (
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Pause carousel autoplay" : "Play carousel autoplay"}
          aria-pressed={isPlaying}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white",
            focusRing
          )}
        >
          {isPlaying ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
