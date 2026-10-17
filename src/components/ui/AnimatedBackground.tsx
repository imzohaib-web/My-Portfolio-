"use client";

import { useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[var(--bg)]">
      <div
        aria-hidden="true"
        className="absolute -right-[8%] top-[8%] h-[min(420px,45vw)] w-[min(420px,45vw)] rounded-full bg-teal-400 opacity-[0.22] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-[12%] top-[28%] h-[min(380px,42vw)] w-[min(380px,42vw)] rounded-full bg-violet-600 opacity-[0.2] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_45%,#000_20%,transparent_100%)]"
        style={shouldReduceMotion ? undefined : { animation: "grid-pan 24s linear infinite" }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
