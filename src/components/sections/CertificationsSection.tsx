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
    <Section id="certifications" className="z-10 relative scroll-mt-24 bg-[#0b0b0c]">
      <Container className="relative z-10">
        <motion.div {...headerMotion}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-3xl">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8f8f94]">
                {"// 04 · CERTIFICATIONS"}
              </p>
              <h2
                id="certifications-heading"
                className="mt-3 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-tight tracking-tight text-white"
              >
                Certifications
              </h2>
              <p className="mt-3 max-w-[60ch] text-base text-[#8f8f94] md:text-lg">
                Continuous learning in AI and software engineering.
              </p>
            </div>

            <div className="hidden md:block font-mono text-xs text-[#8f8f94] mb-1 shrink-0">
              {earnedCount} verified · {pendingCount} pending
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-8 mb-10 h-px w-full bg-white/[0.08]"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 items-stretch">
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
