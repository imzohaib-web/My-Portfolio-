"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Award } from "lucide-react";

const certs = [
  " Programming for Everybody (Python) – Coursera, 2025",
  "AI For Everyone – Coursera, 2025",
  "Prompt Engineering for ChatGPT – Coursera, 2025",
  "Career Essentials in Generative AI – LinkedIn & Microsoft, 2024",
  "English Access Scholarship Program 2024-25"
];

export function CertificationsSection() {
  return (
    <section className="py-12 md:py-16 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeading title="Certifications" subtitle="Continuous learning in AI and Software Engineering." />
        
        <div className="grid md:grid-cols-2 gap-4">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard className="flex items-center gap-4 p-4 md:p-6" hoverEffect={true}>
                <div className="bg-[rgba(176,38,255,0.1)] p-3 rounded-xl text-[var(--color-neon-purple)]">
                  <Award size={24} />
                </div>
                <h3 className="text-white font-medium">{cert}</h3>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
