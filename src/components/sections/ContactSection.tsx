"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Mail, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <Section id="contact" className="z-10 bg-[#0b0b0c]">
      <Container className="max-w-4xl text-center">
        <SectionHeading title="Get In Touch" subtitle="Let's build something thoughtful and production-ready together." className="flex flex-col items-center" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-12 mb-16 flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-[#8f8f94]"
        >
          <a
            href="https://github.com/imzohaib-web"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#c6f432] transition-colors"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/zohaib-umer/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#c6f432] transition-colors"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:umerzohaibumer@gmail.com"
            className="flex items-center gap-2 hover:text-[#c6f432] transition-colors"
          >
            <Mail size={18} />
            <span>umerzohaibumer@gmail.com</span>
          </a>
          <div className="flex items-center gap-2 text-[#8f8f94]">
            <MapPin size={18} />
            <span>Wah Cantt, Pakistan</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <h3 className="font-serif text-2xl md:text-3xl font-normal text-white mb-6">
            Ready to collaborate?
          </h3>
          <Button href="mailto:umerzohaibumer@gmail.com" variant="primary">
            <span>Say Hello</span>
            <Mail size={16} />
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
