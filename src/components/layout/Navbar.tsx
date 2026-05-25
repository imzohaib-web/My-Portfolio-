"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isOpen ? "glass py-4 shadow-[0_4px_30px_rgba(0,255,255,0.05)] border-b border-[rgba(255,255,255,0.05)]" : "py-4 md:py-6 bg-gradient-to-b from-black/60 to-transparent md:bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <motion.a 
            href="#"
            className="text-2xl font-bold tracking-tighter text-white relative z-10 flex items-center gap-2"
            whileHover={{ scale: 1.05, textShadow: "0px 0px 8px rgba(0,255,255,0.8)" }}
            onClick={closeMenu}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <span className="text-white font-extrabold text-lg">Z</span>
            </div>
            <span className="tracking-widest">U</span>
          </motion.a>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center transition-all active:scale-95 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} className="text-[var(--color-neon-purple)]" /> : <Menu size={22} className="text-[var(--color-neon-cyan)]" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[75vw] max-w-sm h-full glass border-l border-[rgba(255,255,255,0.05)] shadow-2xl flex flex-col justify-center px-10"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
            >
              <nav className="flex flex-col gap-8">
                {links.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="text-2xl font-medium text-gray-300 hover:text-white transition-all hover:pl-4 relative group"
                    onClick={closeMenu}
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-2 w-0 h-[2px] bg-[var(--color-neon-cyan)] transition-all duration-300 group-hover:w-1/2" />
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
