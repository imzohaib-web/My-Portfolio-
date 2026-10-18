"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";

const links = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

const sectionIds = ["hero", "projects", "experience", "skills", "certifications", "contact"];

function NavLink({
  href,
  name,
  isActive,
  className,
  onClick,
}: {
  href: string;
  name: string;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative py-1 text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm",
        isActive && "text-white",
        className
      )}
    >
      {name}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px bg-white/70 transition-all duration-200",
          isActive ? "w-full" : "w-0 group-hover:w-full"
        )}
        aria-hidden="true"
      />
    </a>
  );
}

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const isProjectsPage = pathname === "/projects" || pathname?.startsWith("/projects");

  const resolveHref = (href: string) => {
    if (isHomePage) return href;
    return `/${href}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeMenu]);

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-20 transition-colors duration-300",
          scrolled || isOpen
            ? "border-b border-white/5 bg-black/50 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <Container className="grid h-full grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            className="justify-self-start flex items-center gap-2.5 rounded-lg p-1 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            onClick={closeMenu}
            aria-label="Zohaib Umer — home"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              <span className="select-none text-base font-extrabold text-white">Z</span>
            </div>
            <span className="hidden text-base font-semibold tracking-tight sm:inline">Zohaib Umer</span>
          </Link>

          <nav
            className="hidden items-center justify-center gap-7 md:flex lg:gap-8"
            aria-label="Main navigation"
          >
            {links.map((link) => {
              const isActive = isProjectsPage
                ? link.name === "Projects"
                : isHomePage && activeSection === link.href.substring(1);

              return (
                <NavLink
                  key={link.name}
                  name={link.name}
                  href={resolveHref(link.href)}
                  isActive={Boolean(isActive)}
                />
              );
            })}
          </nav>

          <div className="justify-self-end flex items-center gap-3">
            <div
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 select-none"
              role="status"
            >
              <span className="relative flex h-2 w-2">
                {!shouldReduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for new opportunities</span>
            </div>

            <button
              type="button"
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-md hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              onClick={() => setIsOpen((o) => !o)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
            aria-hidden={!isOpen}
          >
            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 flex h-full w-[80vw] max-w-sm flex-col justify-between border-l border-white/10 bg-[var(--bg)] py-12 px-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-8">
                <nav className="flex flex-col gap-5">
                  {links.map((link) => {
                    const isActive = isProjectsPage
                      ? link.name === "Projects"
                      : isHomePage && activeSection === link.href.substring(1);

                    return (
                      <NavLink
                        key={link.name}
                        name={link.name}
                        href={resolveHref(link.href)}
                        isActive={Boolean(isActive)}
                        className="text-lg"
                        onClick={closeMenu}
                      />
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-white/10 pt-6">
                <a
                  href="/resume/Zohaib_Umer_CV.pdf"
                  download="Zohaib_Umer_CV.pdf"
                  type="application/pdf"
                  rel="noopener"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  onClick={closeMenu}
                >
                  <span>Resume</span>
                  <Download size={16} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
