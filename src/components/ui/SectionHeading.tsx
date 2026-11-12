"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 text-center md:text-left ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.45 }}
        className="font-serif text-3xl md:text-5xl tracking-tight text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-3 text-[#8f8f94] max-w-2xl text-base md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="h-px w-12 bg-[#c6f432] mt-6 mx-auto md:mx-0" />
    </div>
  );
}
