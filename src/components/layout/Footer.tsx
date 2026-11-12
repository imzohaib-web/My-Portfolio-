"use client";

import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="relative py-12 mt-20 border-t border-white/[0.08] bg-[#0b0b0c]">
      <Container className="flex flex-col items-center justify-between md:flex-row gap-4">
        <div className="text-center md:text-left">
          <span className="text-lg font-medium text-white">
            Zohaib <span className="text-[#c6f432]">Umer</span>
          </span>
          <p className="text-sm text-[#8f8f94] mt-1">Building intelligent AI-powered systems.</p>
        </div>
        <div className="text-xs text-[#8f8f94] text-center md:text-right">
          © {new Date().getFullYear()} Zohaib Umer. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
