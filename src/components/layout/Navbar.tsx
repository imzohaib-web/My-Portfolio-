"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Milestones", href: "#milestones" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to track active section for underline
  useEffect(() => {
    const sectionIds = ["about", "skills", "milestones", "projects", "experience", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
          scrolled || isOpen
            ? "glass py-3.5 shadow-[0_4px_30px_rgba(0,255,255,0.05)] border-b border-[rgba(255,255,255,0.08)] bg-[#050505]/80 backdrop-blur-md"
            : "py-4 md:py-6 bg-gradient-to-b from-black/70 to-transparent md:bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl flex items-center justify-between">
          {/* Logo: gradient rounded square with "Z" + the wordmark "Zohaib Umer" (hidden < sm) */}
          <a
            href="#"
            className="text-white relative z-10 flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] rounded-lg p-1"
            onClick={closeMenu}
            aria-label="Zohaib Umer Portfolio Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0ff] to-[#b026ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.35)] flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <span className="text-white font-extrabold text-base select-none">Z</span>
            </div>
            <span className="font-semibold tracking-tight text-white hidden sm:inline transition-colors group-hover:text-zinc-200 text-base">
              Zohaib Umer
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8" aria-label="Main navigation">
            {links.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] rounded-sm group",
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#0ff] shadow-[0_0_8px_#0ff]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white/40 transition-all duration-200 group-hover:w-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Side: Available for new opportunities pill */}
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-xs font-medium backdrop-blur-sm select-none shadow-[0_0_12px_rgba(16,185,129,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for new opportunities</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden relative z-50 p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center transition-all active:scale-95 text-gray-300 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X size={20} className="text-[#b026ff]" />
            ) : (
              <Menu size={20} className="text-[#0ff]" />
            )}
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[80vw] max-w-sm h-full bg-[#09090b] border-l border-white/10 shadow-2xl flex flex-col justify-between py-12 px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-8">
                {/* Available status pill in mobile drawer */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Available for work</span>
                </div>

                <nav className="flex flex-col gap-5">
                  {links.map((link, i) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className={cn(
                          "text-xl font-medium transition-all py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff] rounded-md",
                          isActive
                            ? "text-[#0ff] pl-2 font-semibold"
                            : "text-zinc-300 hover:text-white hover:pl-2"
                        )}
                        onClick={closeMenu}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Drawer Resume Button */}
              <div className="pt-6 border-t border-white/10">
                <a
                  href="/resume/Zohaib_Umer_CV.pdf"
                  download="Zohaib_Umer_CV.pdf"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full px-5 py-2.5 rounded-xl border border-[#0ff]/40 bg-[#0ff]/10 text-white hover:bg-[#0ff]/20 font-medium text-sm transition-all shadow-[0_0_15px_rgba(0,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0ff]"
                  onClick={closeMenu}
                >
                  <span>Resume</span>
                  <Download size={16} className="text-[#0ff]" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
