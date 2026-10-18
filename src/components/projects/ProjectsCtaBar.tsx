"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ProjectsCtaBarProps = {
  totalProjects: number;
};

export function ProjectsCtaBar({ totalProjects }: ProjectsCtaBarProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.24, ease: "easeOut" }}
      className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/[0.08] via-purple-500/[0.08] to-violet-500/[0.08] px-5 py-4 backdrop-blur-sm md:px-6"
    >
      {/* Left text */}
      <div className="flex flex-wrap items-baseline gap-2 text-center sm:text-left">
        <span className="font-medium text-white">All {totalProjects} projects</span>
        <span className="hidden text-sm text-zinc-400 sm:inline">
          · Agents, RAG, ML and full-stack builds
        </span>
      </div>

      {/* Right button with 1px animated gradient border (no stuck focus ring) */}
      <div className="animated-gradient-border w-full sm:w-auto inline-flex rounded-full">
        <Link
          href="/projects"
          className="group/btn inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-zinc-950 transition-colors hover:bg-zinc-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span>View all projects</span>
          <ArrowRight
            size={17}
            aria-hidden="true"
            className="transition-transform group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}
