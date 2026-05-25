"use client";

export function Footer() {
  return (
    <footer className="relative py-12 mt-20 overflow-hidden border-t border-[rgba(255,255,255,0.05)]">
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(176,38,255,0.02)] to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <span className="text-xl font-bold tracking-tighter text-white">
            Zohaib <span className="text-[var(--color-neon-cyan)]">Umer</span>
          </span>
          <p className="text-sm text-gray-400 mt-2">Building intelligent AI-powered experiences.</p>
        </div>
        <div className="text-sm text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Zohaib Umer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
