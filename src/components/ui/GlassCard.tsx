"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl p-6 glass transition-all duration-300",
        hoverEffect && "hover:glass-glow hover:border-[var(--color-neon-cyan)]",
        className
      )}
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--color-neon-cyan)] rounded-tl-2xl opacity-50 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--color-neon-purple)] rounded-br-2xl opacity-50 transition-opacity group-hover:opacity-100" />
      
      {children}
    </motion.div>
  );
}
