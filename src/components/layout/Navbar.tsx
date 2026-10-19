"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/Logo";

const links = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Milestones", href: "#milestones" },
  { name: "Contact", href: "#contact" },
];

const sectionIds = [
  "hero",
  "projects",
  "experience",
  "skills",
  "certifications",
  "milestones",
  "contact",
];

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

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpenRef = useRef(false);

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

  // Lock and restore body & documentElement scroll without rubber-banding
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  // Focus management: focus first link when opened, return to toggle button when closed
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => clearTimeout(timer);
    } else if (wasOpenRef.current) {
      menuButtonRef.current?.focus({ preventScroll: true });
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeMenu]);

  // Close on resize to desktop (>= 768px) to prevent stuck states
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] h-20 transition-colors duration-300",
          scrolled && !isOpen
            ? "border-b border-white/5 bg-black/50 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <Container className="flex h-full items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          <Logo onClick={closeMenu} />

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
              className="hidden xl:inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 select-none"
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
              ref={menuButtonRef}
              type="button"
              className="md:hidden relative z-[70] flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-md hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm md:hidden touch-none"
            onClick={closeMenu}
            aria-hidden={!isOpen}
          >
            <motion.div
              id="mobile-nav-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              tabIndex={-1}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="absolute top-0 right-0 flex h-[100dvh] max-h-[100dvh] w-full max-w-[320px] sm:max-w-sm flex-col justify-between overflow-y-auto overscroll-contain border-l border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl pt-[max(5.5rem,calc(5rem+env(safe-area-inset-top,0px)))] pb-[max(1.5rem,calc(1.5rem+env(safe-area-inset-bottom,0px)))] pl-[max(1.5rem,calc(1.5rem+env(safe-area-inset-left,0px)))] pr-[max(1.5rem,calc(1.5rem+env(safe-area-inset-right,0px)))]"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <nav className="flex flex-col gap-2.5">
                  {links.map((link, idx) => {
                    const isActive = isProjectsPage
                      ? link.name === "Projects"
                      : isHomePage && activeSection === link.href.substring(1);

                    return (
                      <a
                        key={link.name}
                        ref={idx === 0 ? firstLinkRef : undefined}
                        href={resolveHref(link.href)}
                        onClick={closeMenu}
                        className={cn(
                          "flex min-h-[44px] items-center px-4 py-3 rounded-xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 select-none",
                          isActive
                            ? "bg-white/10 text-white font-semibold border border-white/10"
                            : "text-zinc-200 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <div
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 select-none"
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
