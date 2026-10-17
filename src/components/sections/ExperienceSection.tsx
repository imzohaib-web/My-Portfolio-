"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "../ui/SectionHeading";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-12 md:py-16 relative z-10">
      <Container>
        <SectionHeading title="Experience" />
        
        <div className="relative border-l-2 border-[rgba(255,255,255,0.1)] ml-4 md:ml-6 pb-4 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative pl-8 md:pl-12"
          >
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--color-neon-cyan)] shadow-[0_0_10px_var(--color-neon-cyan)]" />
            
            <span className="text-sm text-[var(--color-neon-purple)] font-mono font-semibold tracking-wider uppercase mb-2 block">
              Jun 2026 – Sep 2026
            </span>
            <h3 className="text-2xl font-bold text-white">MERN Stack Developer Intern</h3>
            <h4 className="text-lg text-gray-400 mb-4">Eziline</h4>
            
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-[var(--color-neon-cyan)] mr-3 mt-1">▹</span>
                Developed and maintained features across two production MERN-stack platforms, Fabric Hub and Enterprise LMS
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-neon-cyan)] mr-3 mt-1">▹</span>
                Built REST APIs and UI components using MongoDB, Express, React, and Node.js
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-neon-cyan)] mr-3 mt-1">▹</span>
                Collaborated within a development team using Git/GitHub workflows
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--color-neon-purple)] shadow-[0_0_10px_var(--color-neon-purple)]" />
            
            <span className="text-sm text-[var(--color-neon-purple)] font-mono font-semibold tracking-wider uppercase mb-2 block">
              Internship
            </span>
            <h3 className="text-2xl font-bold text-white">Front-End Developer Intern</h3>
            <h4 className="text-lg text-gray-400 mb-4">Erudite Coaching Center</h4>
            
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-[var(--color-neon-cyan)] mr-3 mt-1">▹</span>
                Developed responsive and dynamic React interfaces.
              </li>
              <li className="flex items-start">
                <span className="text-[var(--color-neon-cyan)] mr-3 mt-1">▹</span>
                Improved overall UI/UX performance and user engagement.
              </li>
             
              <li className="flex items-start">
                <span className="text-[var(--color-neon-cyan)] mr-3 mt-1">▹</span>
                Optimized modern web applications for speed and accessibility.
              </li>
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
