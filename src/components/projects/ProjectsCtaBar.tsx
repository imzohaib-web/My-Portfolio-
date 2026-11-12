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
      className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#131315] px-5 py-4 md:px-6"
    >
      <div className="flex flex-wrap items-baseline gap-2 text-center sm:text-left">
        <span className="font-medium text-white">All {totalProjects} projects</span>
        <span className="hidden text-sm text-[#8f8f94] sm:inline">
          · Agents, RAG, ML and full-stack builds
        </span>
      </div>

      <Link
        href="/projects"
        className="group/btn inline-flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#c6f432] px-5 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#b5e028] outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]"
      >
        <span>View all projects</span>
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform group-hover/btn:translate-x-0.5"
        />
      </Link>
    </motion.div>
  );
}
