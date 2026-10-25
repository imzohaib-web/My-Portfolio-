"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MilestoneCard } from "@/components/ui/MilestoneCard";
import { milestones } from "@/data/milestones";
import { CertificateLightbox } from "@/components/certifications/CertificateLightbox";
import type { Certification, CertificationCategory } from "@/data/certifications";

const milestoneLightboxItems: Certification[] = milestones.map((m) => ({
  id: m.id,
  title: m.title,
  issuer: m.category,
  year: m.period,
  category: (m.category === "Hackathon"
    ? "Hackathon"
    : m.category === "Scholarship"
    ? "Scholarship"
    : "AI") as CertificationCategory,
  image: m.image,
  status: "earned",
  verifyUrl: m.link?.href,
}));

export function MilestonesSection() {
  const shouldReduceMotion = useReducedMotion();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const headerMotion = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  const handleOpenLightbox = (index: number, btnRef: React.RefObject<HTMLButtonElement | null>) => {
    if (btnRef?.current) {
      triggerRef.current = btnRef.current;
    }
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleNavigateLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <Section
      id="milestones"
      aria-labelledby="milestones-heading"
      className="z-10 relative scroll-mt-24"
    >
      {/* Background Ambience & Subtle Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_15%,transparent_100%)] opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[10%] top-[20%] h-[min(400px,50vw)] w-[min(400px,50vw)] rounded-full bg-[#00ffff] opacity-[0.07] blur-[130px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-[35%] h-[min(420px,52vw)] w-[min(420px,52vw)] rounded-full bg-[#b026ff] opacity-[0.08] blur-[130px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />

      <Container className="relative z-10">
        {/* Header: Eyebrow, H2, Subtitle, and 1px gradient divider */}
        <motion.div {...headerMotion} className="max-w-3xl">
          <p className="font-mono text-[13px] tracking-[0.2em] uppercase text-cyan-400">
            {"// 05 · MILESTONES"}
          </p>
          <h2
            id="milestones-heading"
            className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-[-0.02em] text-white"
          >
            Milestones
          </h2>
          <p className="mt-4 max-w-[60ch] text-base text-zinc-300 md:text-lg">
            Competitions and programs beyond the classroom.
          </p>
          <div
            aria-hidden="true"
            className="mt-8 mb-10 h-px w-full bg-gradient-to-r from-cyan-400 via-cyan-400/40 to-transparent"
          />
        </motion.div>

        {/* Responsive Grid: lg+ 3 cols, md horizontal cards in single column, <md stacked */}
        <ul
          role="list"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
        >
          {milestones.map((milestone, index) => (
            <motion.li
              key={milestone.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: "easeOut",
              }}
              className="flex h-full w-full"
            >
              <MilestoneCard
                milestone={milestone}
                index={index}
                onOpenLightbox={handleOpenLightbox}
              />
            </motion.li>
          ))}
        </ul>
      </Container>

      {/* Lightbox Modal (reusing CertificateLightbox) */}
      <CertificateLightbox
        isOpen={isLightboxOpen}
        certifications={milestoneLightboxItems}
        currentIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
        triggerRef={triggerRef}
      />
    </Section>
  );
}
