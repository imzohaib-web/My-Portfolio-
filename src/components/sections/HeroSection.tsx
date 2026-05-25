"use client";

import { motion } from "framer-motion";
import { GlowingButton } from "../ui/GlowingButton";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [text, setText] = useState("");
  const fullText = "Building intelligent AI-powered experiences.";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-block px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md"
        >
          <span className="text-sm text-gray-300 font-medium tracking-wide uppercase">Available for new opportunities</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">Zohaib</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-purple)]">Umer</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-3xl font-medium text-gray-300 mb-6"
        >
          Full Stack Web Developer & Aspiring Software Engineer
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="h-8 mb-10"
        >
          <p className="text-lg md:text-xl text-gray-400 font-mono">
            {text}<span className="animate-pulse">_</span>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <GlowingButton href="#projects" variant="primary">
            View Projects <ArrowRight size={18} />
          </GlowingButton>
        
          <GlowingButton href="#contact" variant="secondary">
            Contact Me <Mail size={18} />
          </GlowingButton>
        </motion.div>
      </div>
    </section>
  );
}
