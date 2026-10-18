"use client";

import { useEffect } from "react";

const VALID_SECTION_IDS = new Set([
  "hero",
  "projects",
  "experience",
  "skills",
  "certifications",
  "milestones",
  "contact",
]);

export function ScrollToTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const previousRestoration = history.scrollRestoration;

    const rawHash = window.location.hash;
    const hash = rawHash ? rawHash.replace(/^#/, "") : "";

    if (!hash) {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    } else {
      const isValid =
        VALID_SECTION_IDS.has(hash) || Boolean(document.getElementById(hash));

      if (!isValid) {
        // Unknown hash: strip it and scroll to top
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
        if ("scrollRestoration" in history) {
          history.scrollRestoration = "manual";
        }
        window.scrollTo(0, 0);
      }
    }

    // Handle back/forward cache restore (pageshow)
    const handlePageShow = (event: PageTransitionEvent) => {
      const currentHash = window.location.hash
        ? window.location.hash.replace(/^#/, "")
        : "";
      if (event.persisted && !currentHash) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = previousRestoration || "auto";
      }
    };
  }, []);

  return null;
}
