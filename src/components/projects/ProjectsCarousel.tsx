"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { CarouselControls } from "./CarouselControls";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type ProjectsCarouselProps = {
  projects: Project[];
};

const CAROUSEL_PAD = "max(1.5rem, calc((100vw - 1280px) / 2 + 2.5rem))";

export function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileAutoplay, setMobileAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [needsDuplicate, setNeedsDuplicate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enableAutoplay = !shouldReduceMotion && (!isMobile || mobileAutoplay);

  const plugins = useMemo(() => {
    if (!enableAutoplay) return [];
    return [
      AutoScroll({
        speed: 0.7,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    ];
  }, [enableAutoplay]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: !shouldReduceMotion,
      dragFree: !shouldReduceMotion,
      align: "start",
      containScroll: shouldReduceMotion ? "trimSnaps" : false,
    },
    plugins
  );

  const slides = useMemo(() => {
    const base = projects.map((p, i) => ({ project: p, key: p.slug, duplicate: false, index: i }));
    if (!needsDuplicate || shouldReduceMotion) return base;
    const dup = projects.map((p, i) => ({
      project: p,
      key: `${p.slug}-dup`,
      duplicate: true,
      index: i,
    }));
    return [...base, ...dup];
  }, [projects, needsDuplicate, shouldReduceMotion]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const togglePlay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
    if (isPlaying) {
      autoScroll.stop();
      setIsPlaying(false);
    } else {
      autoScroll.play();
      setIsPlaying(true);
    }
  }, [emblaApi, isPlaying]);

  // Check if slides need duplication to cover >= 2x viewport width
  useEffect(() => {
    if (!emblaApi) return;
    const checkWidth = () => {
      const slideNodes = emblaApi.slideNodes();
      const totalWidth = slideNodes.reduce((sum, node) => sum + node.getBoundingClientRect().width, 0);
      const viewportWidth = emblaApi.rootNode().getBoundingClientRect().width;
      setNeedsDuplicate(totalWidth < viewportWidth * 2);
    };
    checkWidth();
    emblaApi.on("reInit", checkWidth);
    window.addEventListener("resize", checkWidth);
    return () => {
      emblaApi.off("reInit", checkWidth);
      window.removeEventListener("resize", checkWidth);
    };
  }, [emblaApi, projects]);

  // Manage visibility change (pause while tab hidden)
  useEffect(() => {
    const onVisibility = () => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;
      if (document.hidden) {
        autoScroll.stop();
      } else if (enableAutoplay && isPlaying) {
        autoScroll.play();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [emblaApi, enableAutoplay, isPlaying]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  const headerMotion = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  return (
    <>
      {/* Section Header inside shared Container */}
      <Container className="relative z-10">
        <motion.div {...headerMotion}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl pt-1">
              <p className="font-mono text-[13px] tracking-[0.22em] uppercase text-cyan-400">
                {"// 03 · PROJECTS"}
              </p>
              <h2
                id="projects-heading"
                className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-tight text-white"
              >
                Featured Projects
              </h2>
              <p className="mt-4 max-w-[60ch] text-base text-zinc-300 md:text-lg">
                AI products, agents and full-stack apps, from prototype to production.
              </p>
            </div>

            {/* Desktop Carousel Controls */}
            <div className="hidden shrink-0 md:block">
              <CarouselControls
                onPrev={scrollPrev}
                onNext={scrollNext}
                onTogglePlay={togglePlay}
                isPlaying={isPlaying}
                showPause={enableAutoplay}
              />
            </div>
          </div>

          {/* 1px gradient-fade divider replacing short underline */}
          <div
            aria-hidden="true"
            className="mt-8 h-px w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary)]/40 to-transparent"
          />
        </motion.div>
      </Container>

      {/* Infinite Horizontal Carousel Track */}
      <div className="relative z-10 mt-10">
        {/* Mobile autoplay toggle */}
        {isMobile && !shouldReduceMotion && (
          <Container className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setMobileAutoplay((v) => !v)}
              className="text-xs font-mono text-zinc-400 underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {mobileAutoplay ? "Disable auto-scroll" : "Enable auto-scroll"}
            </button>
          </Container>
        )}

        <div
          className={cn(shouldReduceMotion && "overflow-x-auto pb-4 [scrollbar-width:thin]")}
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)",
          }}
        >
          <div
            ref={emblaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={cn(
              "cursor-grab overflow-hidden active:cursor-grabbing touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50",
              shouldReduceMotion && "snap-x snap-mandatory overflow-x-auto"
            )}
          >
            <div
              className="flex"
              style={{
                paddingLeft: CAROUSEL_PAD,
                paddingRight: CAROUSEL_PAD,
              }}
            >
              {slides.map(({ project, key, duplicate, index }) => (
                <div
                  key={key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${projects.length}`}
                  aria-hidden={duplicate || undefined}
                  className="mr-5 flex-[0_0_auto] snap-start"
                >
                  <ProjectCard
                    project={project}
                    duplicate={duplicate}
                    priorityImage={index === 0 && !duplicate}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Controls below carousel */}
        <div className="mt-6 flex justify-center md:hidden">
          <CarouselControls
            onPrev={scrollPrev}
            onNext={scrollNext}
            onTogglePlay={togglePlay}
            isPlaying={isPlaying}
            showPause={enableAutoplay}
          />
        </div>
      </div>
    </>
  );
}
