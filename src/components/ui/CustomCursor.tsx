"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isOverBlockedElement, setIsOverBlockedElement] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check pointer capabilities
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches || shouldReduceMotion) return;

    const handleTouchStart = () => {
      setIsTouch(true);
      setHasMoved(false);
    };

    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 2500);
    };

    const updateMousePosition = (e: MouseEvent) => {
      if (isTouch) return;
      setMousePosition({ x: e.clientX, y: e.clientY });
      setHasMoved(true);
      resetIdleTimer();

      // Check if cursor is over iframes or lightbox images
      const target = e.target as HTMLElement | null;
      if (target) {
        const isBlocked =
          target.tagName === "IFRAME" ||
          !!target.closest("iframe") ||
          !!target.closest("[data-lightbox]") ||
          (target.tagName === "IMG" && !!target.closest("[data-lightbox]"));

        setIsOverBlockedElement(isBlocked);
      }
    };

    const handleMouseLeave = () => {
      setHasMoved(false);
      setIsIdle(true);
      setMousePosition({ x: -100, y: -100 });
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isBlocked =
        target.tagName === "IFRAME" ||
        !!target.closest("iframe") ||
        !!target.closest("[data-lightbox]");

      setIsOverBlockedElement(isBlocked);

      const interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        !!target.closest("a, button, input, textarea, select, [role='button']");

      setIsHovering(interactive);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("touchstart", handleTouchStart);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [shouldReduceMotion, isTouch]);

  if (
    shouldReduceMotion ||
    !hasMoved ||
    isTouch ||
    isIdle ||
    isOverBlockedElement
  ) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-7 w-7 rounded-full border border-[var(--accent-primary)] mix-blend-difference"
      animate={{
        x: mousePosition.x - 14,
        y: mousePosition.y - 14,
        scale: isHovering ? 1.35 : 1,
        opacity: isHovering ? 0.45 : 0.65,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
    />
  );
}
