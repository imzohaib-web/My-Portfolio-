"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isHomePage = pathname === "/";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="Zohaib Umer, home"
      className={`group justify-self-start inline-flex items-center gap-2.5 rounded-lg p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c] select-none ${
        className || ""
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#131315] border border-white/[0.08] transition-colors group-hover:border-[#c6f432]/50">
        <span className="font-serif italic text-[20px] font-bold leading-none text-[#c6f432]">
          Z
        </span>
      </div>

      <span className="hidden min-[380px]:inline-flex items-center gap-1.5 text-[16px] tracking-tight">
        <span className="font-medium text-white">Zohaib</span>
        <span className="font-normal text-[#8f8f94]">Umer</span>
      </span>
    </Link>
  );
}
