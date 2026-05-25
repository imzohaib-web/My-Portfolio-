"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-4 shadow-[0_4px_30px_rgba(0,255,255,0.05)] border-b border-[rgba(255,255,255,0.05)]" : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <motion.a 
          href="#"
          className="text-2xl font-bold tracking-tighter text-white relative z-10"
          whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(0,255,255,0.8)" }}
        >
          Z<span className="text-[var(--color-neon-cyan)]">U</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-sm text-gray-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-neon-cyan)] transition-all group-hover:w-full" />
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
