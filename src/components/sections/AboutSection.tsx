"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Code2, BrainCircuit, Rocket } from "lucide-react";

export function AboutSection() {
  const highlights = [
    {
      icon: <Code2 className="text-[var(--color-neon-cyan)] mb-4" size={32} />,
      title: "Web Development",
      desc: "Architecting scalable applications with React, Next.js, and modern backends."
    },
    {
      icon: <BrainCircuit className="text-[var(--color-neon-purple)] mb-4" size={32} />,
      title: "AI Systems",
      desc: "Integrating LLMs, LangChain, and RAG into intelligent software solutions."
    }
  ];

  return (
    <section id="about" className="py-12 md:py-16 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="About Me" 
          subtitle="Bridging the gap between modern web development and artificial intelligence." 
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am a passionate <span className="text-white font-semibold">Software Engineering student</span> at COMSATS University Islamabad, with professional experience as a Front-End Developer Intern at Erudite Coaching Center.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              My focus lies in building <span className="text-white font-semibold">scalable web applications</span> and <span className="text-[var(--color-neon-cyan)] font-semibold">intelligent AI-powered systems</span>. I thrive on combining modern frontend frameworks like React with robust backends (Node.js, Laravel) and cutting-edge AI tools (LangChain, LLM APIs).
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={idx === 2 ? "sm:col-span-2" : ""}
              >
                <GlassCard className="h-full">
                  {item.icon}
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
