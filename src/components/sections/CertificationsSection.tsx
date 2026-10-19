"use client";

import { useState, useRef, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { certifications } from "@/data/certifications";
import { CertificateViewer } from "@/components/certifications/CertificateViewer";
import { CertificateList } from "@/components/certifications/CertificateList";
import { CertificateLightbox } from "@/components/certifications/CertificateLightbox";
import { motion, useReducedMotion } from "framer-motion";

export function CertificationsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleSelectCert = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const id = customEvent.detail;
      if (!id) return;
      const index = certifications.findIndex((c) => c.id === id);
      if (index !== -1) {
        setActiveIndex(index);
      }
    };

    window.addEventListener("select-certificate", handleSelectCert);
    return () => window.removeEventListener("select-certificate", handleSelectCert);
  }, []);

  const earnedCount = certifications.filter((c) => c.status === "earned").length;
  const pendingCount = certifications.filter((c) => c.status === "pending").length;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const headerMotion = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.45, ease: "easeOut" as const },
  };

  return (
    <Section id="certifications" className="z-10 relative scroll-mt-24">

      {/* Background Ambience & Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_15%,transparent_100%)] opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[12%] top-[18%] h-[min(360px,50vw)] w-[min(360px,50vw)] rounded-full bg-violet-600 opacity-[0.11] blur-[120px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-[25%] h-[min(380px,52vw)] w-[min(380px,52vw)] rounded-full bg-cyan-400 opacity-[0.11] blur-[120px] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]"
      />

      <Container className="relative z-10">
        {/* Header: Eyebrow, H2, Subtitle, Count on right, 1px gradient-fade divider */}
        <motion.div {...headerMotion}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl">
              <p className="font-mono text-[13px] tracking-[0.22em] uppercase text-[var(--accent-primary)]">
                {"// 04 · CERTIFICATIONS"}
              </p>
              <h2
                id="certifications-heading"
                className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-[-0.02em] text-white"
              >
                Certifications
              </h2>
              <p className="mt-4 max-w-[60ch] text-base text-zinc-300 md:text-lg">
                Continuous learning in AI and software engineering.
              </p>
            </div>

            {/* Muted count on the right (md+) */}
            <div className="hidden md:block font-mono text-xs text-zinc-400 mb-1 shrink-0">
              {earnedCount} verified · {pendingCount} pending
            </div>
          </div>

          {/* 1px gradient-fade divider with mb-10 */}
          <div
            aria-hidden="true"
            className="mt-8 mb-10 h-px w-full bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-primary)]/40 to-transparent"
          />
        </motion.div>

        {/* Layout: lg+ 1.15fr / 1fr grid, below lg stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 items-stretch">
          {/* Left: Viewer Carousel */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full flex flex-col"
          >
            <CertificateViewer
              certifications={certifications}
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
              onOpenLightbox={handleOpenLightbox}
              triggerRef={triggerRef}
            />
          </motion.div>

          {/* Right: Compact Row List */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.08, ease: "easeOut" }}
            className="w-full flex flex-col justify-center"
          >
            <CertificateList
              certifications={certifications}
              activeIndex={activeIndex}
              onSelectIndex={setActiveIndex}
            />
          </motion.div>
        </div>
      </Container>

      {/* Lightbox Modal */}
      <CertificateLightbox
        isOpen={isLightboxOpen}
        certifications={certifications}
        currentIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onNavigate={setLightboxIndex}
        triggerRef={triggerRef}
      />
    </Section>
  );
}
