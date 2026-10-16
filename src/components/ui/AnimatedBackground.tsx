"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
      {/* ONE soft cyan radial glow top-right (opacity <= 0.15) */}
      <div
        aria-hidden="true"
        className="absolute -top-[15%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-[#0ff] opacity-[0.10] blur-[140px] pointer-events-none"
      />

      {/* ONE faint purple glow bottom-left (opacity <= 0.15) */}
      <div
        aria-hidden="true"
        className="absolute -bottom-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-[#b026ff] opacity-[0.09] blur-[150px] pointer-events-none"
      />

      {/* Subtle grid overlay masked with a radial fade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_15%,transparent_100%)] pointer-events-none"
      >
        {!shouldReduceMotion && (
          <motion.div
            animate={{
              y: [0, 64],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "linear",
            }}
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]"
          />
        )}
      </div>

      {/* Low-intensity noise texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.012] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
