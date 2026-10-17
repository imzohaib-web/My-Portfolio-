import type { ProjectAccent } from "@/data/projects";

export const projectAccentStyles: Record<
  ProjectAccent,
  {
    text: string;
    badge: string;
    chipHover: string;
    cardHover: string;
    link: string;
  }
> = {
  cyan: {
    text: "text-cyan-400",
    badge: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
    chipHover: "group-hover/chip:border-cyan-400/35 group-hover/chip:text-cyan-50",
    cardHover: "hover:shadow-[0_16px_48px_-16px_rgba(34,211,238,0.15)] hover:border-cyan-400/30",
    link: "text-cyan-400",
  },
  violet: {
    text: "text-violet-400",
    badge: "text-violet-400 bg-violet-400/10 border-violet-400/30",
    chipHover: "group-hover/chip:border-violet-400/35 group-hover/chip:text-violet-50",
    cardHover: "hover:shadow-[0_16px_48px_-16px_rgba(168,85,247,0.15)] hover:border-violet-400/30",
    link: "text-violet-400",
  },
  emerald: {
    text: "text-emerald-400",
    badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    chipHover: "group-hover/chip:border-emerald-400/35 group-hover/chip:text-emerald-50",
    cardHover: "hover:shadow-[0_16px_48px_-16px_rgba(52,211,153,0.15)] hover:border-emerald-400/30",
    link: "text-emerald-400",
  },
  amber: {
    text: "text-amber-400",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    chipHover: "group-hover/chip:border-amber-400/35 group-hover/chip:text-amber-50",
    cardHover: "hover:shadow-[0_16px_48px_-16px_rgba(251,191,36,0.15)] hover:border-amber-400/30",
    link: "text-amber-400",
  },
};

export function projectInitials(title: string): string {
  const words = title.replace(/[()]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "P";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
