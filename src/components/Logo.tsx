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
      className={`group justify-self-start inline-flex items-center gap-2.5 rounded-lg p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black select-none motion-reduce:transition-none ${
        className || ""
      }`}
    >
      {/* 36px Dark Tile with 1px Masked Gradient Border and Inner Glow */}
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-zinc-950 transition-shadow duration-200 group-hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] group-focus-visible:shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)] shadow-[inset_0_0_12px_rgba(34,211,238,0.06)] motion-reduce:transition-none">
        {/* 1px Gradient Border (cyan to violet, ~60% opacity default, 100% on hover/focus) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px] p-[1px] opacity-60 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none [background:linear-gradient(to_bottom_right,var(--accent-primary),var(--accent-secondary))] [-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude]"
        />

        {/* 'Z' in font-extrabold with cyan-to-violet gradient matching hero 'AI' */}
        <span className="relative z-10 text-[18px] font-extrabold leading-none bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
          Z
        </span>
      </div>

      {/* Wordmark (hidden below 380px viewport width) */}
      <span className="hidden min-[380px]:inline-flex items-center gap-1.5 text-[17px] tracking-tight">
        <span className="font-semibold text-white">Zohaib</span>
        <span className="font-medium text-zinc-400">Umer</span>
      </span>
    </Link>
  );
}
