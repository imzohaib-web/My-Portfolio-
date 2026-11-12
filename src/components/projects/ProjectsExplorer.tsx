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

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const targetProject = projects.find((p) => p.slug === hash);
      if (!targetProject) return;

      if (currentCategory !== "All" && targetProject.category !== currentCategory) {
        selectCategory("All");
      }

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
      <div ref={sentinelRef} className="h-px -mt-px pointer-events-none" aria-hidden="true" />

      <div
        className={cn(
          "sticky top-[72px] z-30 transition-colors duration-200",
          isStuck
            ? "border-b border-white/[0.08] bg-[#0b0b0c]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container className="py-3">
          <div className="flex items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                      "inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-lg px-4 text-xs md:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c]",
                      isActive
                        ? "bg-[#c6f432] text-[#0b0b0c] font-semibold"
                        : "border border-white/[0.08] bg-[#131315] text-[#8f8f94] hover:border-white/20 hover:text-white"
                    )}
                  >
                    <span>{name}</span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-xs font-mono",
                        isActive
                          ? "bg-[#0b0b0c]/15 text-[#0b0b0c]"
                          : "bg-white/[0.06] text-[#8f8f94]"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="hidden font-mono text-xs text-[#8f8f94] sm:inline-block shrink-0">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
            </span>
          </div>
        </Container>
      </div>

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
          <div className="h-12 w-full animate-pulse rounded-xl bg-white/[0.04]" />
        </Container>
      }
    >
      <ProjectsExplorerInner projects={projects} />
    </Suspense>
  );
}
