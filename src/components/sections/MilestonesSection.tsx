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
      className="z-10 relative scroll-mt-24 bg-[#0b0b0c]"
    >
      <Container className="relative z-10">
        <motion.div {...headerMotion} className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8f8f94]">
            {"// 05 · MILESTONES"}
          </p>
          <h2
            id="milestones-heading"
            className="mt-3 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-tight tracking-tight text-white"
          >
            Milestones
          </h2>
          <p className="mt-3 max-w-[60ch] text-base text-[#8f8f94] md:text-lg">
            Competitions and programs beyond the classroom.
          </p>
          <div
            aria-hidden="true"
            className="mt-8 mb-10 h-px w-full bg-white/[0.08]"
          />
        </motion.div>

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
