"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { ProjectDetailCard } from "./ProjectDetailCard";
import { cn } from "@/lib/utils";

type ProjectsExplorerProps = {
  projects: Project[];
};

function ProjectsExplorerInner({ projects }: ProjectsExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const currentCategory = searchParams.get("category") || "All";
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver sentinel to detect when sticky bar is stuck
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is not intersecting, the bar has scrolled past top-[72px]
        setIsStuck(!entry.isIntersecting);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Compute categories and counts (only AI & ML and Full-Stack)
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const categories = ["All", "AI & ML", "Full-Stack"].filter(
      (cat) => (counts[cat] || 0) > 0
    );

    return categories.map((cat) => ({
      name: cat,
      count: counts[cat] || 0,
    }));
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (currentCategory === "All") return projects;
    return projects.filter((p) => p.category === currentCategory);
  }, [projects, currentCategory]);

  const selectCategory = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category === "All") {
        params.delete("category");
      } else {
        params.set("category", category);
      }
      const query = params.toString();
      const newUrl = query ? `?${query}` : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    },
    [router, searchParams]
  );

  // Deep links: hash check, auto-switch to All if hidden, scroll, and 1.6s highlight ring
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const targetProject = projects.find((p) => p.slug === hash);
      if (!targetProject) return;

      // If hidden under current filter, switch to All
      if (currentCategory !== "All" && targetProject.category !== currentCategory) {
        selectCategory("All");
      }

      // Small delay to allow DOM render / layout
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "start",
          });
          el.focus({ preventScroll: true });
          setHighlightedSlug(hash);
          const timer = setTimeout(() => {
            setHighlightedSlug(null);
          }, 1600);
          return () => clearTimeout(timer);
        }
      }, 100);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [projects, currentCategory, shouldReduceMotion, selectCategory]);

  return (
    <>
      {/* Sentinel for sticky detection */}
      <div ref={sentinelRef} className="h-px -mt-px pointer-events-none" aria-hidden="true" />

      {/* Sticky Filter Bar */}
      <div
        className={cn(
          "sticky top-[72px] z-30 transition-all duration-200",
          isStuck
            ? "border-b border-white/5 bg-black/60 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container className="py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Filter buttons row */}
            <div
              className="flex items-center gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="toolbar"
              aria-label="Filter projects by category"
            >
              {categoriesWithCounts.map(({ name, count }) => {
                const isActive =
                  name === currentCategory || (name === "All" && currentCategory === "All");
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectCategory(name)}
                    className={cn(
                      "inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                      isActive
                        ? "bg-white text-zinc-950 shadow-sm"
                        : "border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    <span>{name}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-mono",
                        isActive
                          ? "bg-zinc-200 text-zinc-950 font-semibold"
                          : "bg-white/10 text-zinc-400"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Project count on the right of same row */}
            <span className="hidden font-mono text-sm text-zinc-400 sm:inline-block shrink-0">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
            </span>
          </div>
        </Container>
      </div>

      {/* Stacked Projects List Container */}
      <Container className="py-10 md:py-14">
        <motion.div
          layout={!shouldReduceMotion}
          className="flex flex-col gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : idx * 0.05,
                  ease: "easeOut",
                }}
              >
                <ProjectDetailCard
                  project={project}
                  isPriority={idx === 0}
                  isHighlighted={highlightedSlug === project.slug}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </>
  );
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  return (
    <Suspense
      fallback={
        <Container className="py-12">
          <div className="h-12 w-full animate-pulse rounded-xl bg-white/5" />
        </Container>
      }
    >
      <ProjectsExplorerInner projects={projects} />
    </Suspense>
  );
}
