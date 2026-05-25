"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  href?: string;
  download?: boolean;
}

export function GlowingButton({ children, onClick, className, variant = "primary", href, download }: GlowingButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium rounded-full group transition-all duration-300";
  const primaryStyles = "text-white bg-[rgba(0,255,255,0.05)] border border-[var(--color-neon-cyan)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]";
  const secondaryStyles = "text-white bg-[var(--color-dark-card)] border border-[rgba(255,255,255,0.1)] hover:border-[var(--color-neon-purple)] hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] backdrop-blur-md";

  const Content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variant === "primary" ? primaryStyles : secondaryStyles, className)}
      onClick={onClick}
    >
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-[var(--color-neon-cyan)] group-hover:opacity-50 transition-opacity"></span>
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return <a href={href} download={download} className="inline-block">{Content}</a>;
  }

  return <button className="inline-block" onClick={onClick}>{Content}</button>;
}
