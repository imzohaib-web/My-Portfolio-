"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { CarouselControls } from "./CarouselControls";
import { cn } from "@/lib/utils";

type ProjectsCarouselProps = {
  projects: Project[];
  renderHeader?: (controls: ReactNode) => ReactNode;
};

const CAROUSEL_PAD = "max(1.5rem, calc((100vw - 1280px) / 2 + 2.5rem))";

export function ProjectsCarousel({ projects, renderHeader }: ProjectsCarouselProps) {
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
    const base = projects.map((p, i) => ({
      project: p,
      key: p.slug,
      duplicate: false,
      index: i,
    }));
    if (!needsDuplicate || shouldReduceMotion) return base;
    return [
      ...base,
      ...projects.map((p, i) => ({
        project: p,
        key: `${p.slug}-dup`,
        duplicate: true,
        index: i,
      })),
    ];
  }, [projects, needsDuplicate, shouldReduceMotion]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

  useEffect(() => {
    if (!emblaApi) return;
    const checkWidth = () => {
      const slideNodes = emblaApi.slideNodes();
      const totalWidth = slideNodes.reduce(
        (sum, node) => sum + node.getBoundingClientRect().width,
        0
      );
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

  useEffect(() => {
    if (!emblaApi || enableAutoplay) return;
    emblaApi.plugins()?.autoScroll?.stop();
  }, [emblaApi, enableAutoplay]);

  useEffect(() => {
    const onVisibility = () => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;
      if (document.hidden) autoScroll.stop();
      else if (enableAutoplay && isPlaying) autoScroll.play();
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

  const controls = (
    <CarouselControls
      onPrev={scrollPrev}
      onNext={scrollNext}
      onTogglePlay={togglePlay}
      isPlaying={isPlaying}
      showPause={Boolean(enableAutoplay)}
    />
  );

  return (
    <>
      {renderHeader?.(controls)}

      {isMobile && !shouldReduceMotion && (
        <div className="mb-4 flex justify-end px-6 md:px-10">
          <button
            type="button"
            onClick={() => setMobileAutoplay((v) => !v)}
            className="text-xs font-mono text-zinc-400 underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432]"
          >
            {mobileAutoplay ? "Disable autoplay" : "Enable autoplay"}
          </button>
        </div>
      )}

      <div
        className={cn(shouldReduceMotion && "overflow-x-auto pb-2 [scrollbar-width:thin]")}
      >
        <div
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={cn(
            "cursor-grab overflow-hidden active:cursor-grabbing touch-pan-y",
            shouldReduceMotion && "snap-x snap-mandatory overflow-x-auto"
          )}
        >
          <div className="flex" style={{ paddingLeft: CAROUSEL_PAD, paddingRight: CAROUSEL_PAD }}>
            {slides.map(({ project, key, duplicate, index }) => (
              <div
                key={key}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${projects.length}`}
                aria-hidden={duplicate || undefined}
                className="mr-5 flex h-auto w-[300px] flex-[0_0_auto] snap-start sm:w-[360px] lg:w-[400px]"
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
    </>
  );
}
