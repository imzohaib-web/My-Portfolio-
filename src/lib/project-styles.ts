import type { ProjectAccent } from "@/data/projects";

export const projectAccentStyles: Record<
  ProjectAccent,
  {
    text: string;
    badge: string;
    chipHover: string;
    cardHover: string;
    link: string;
    ring: string;
  }
> = {
  cyan: {
    text: "text-white",
    badge: "text-[#ededed] bg-white/[0.04] border-white/[0.08]",
    chipHover: "group-hover/chip:border-white/25 group-hover/chip:text-white",
    cardHover: "hover:border-white/20",
    link: "text-[#c6f432]",
    ring: "ring-[#c6f432]",
  },
  violet: {
    text: "text-white",
    badge: "text-[#ededed] bg-white/[0.04] border-white/[0.08]",
    chipHover: "group-hover/chip:border-white/25 group-hover/chip:text-white",
    cardHover: "hover:border-white/20",
    link: "text-[#c6f432]",
    ring: "ring-[#c6f432]",
  },
  emerald: {
    text: "text-white",
    badge: "text-[#ededed] bg-white/[0.04] border-white/[0.08]",
    chipHover: "group-hover/chip:border-white/25 group-hover/chip:text-white",
    cardHover: "hover:border-white/20",
    link: "text-[#c6f432]",
    ring: "ring-[#c6f432]",
  },
  amber: {
    text: "text-white",
    badge: "text-[#ededed] bg-white/[0.04] border-white/[0.08]",
    chipHover: "group-hover/chip:border-white/25 group-hover/chip:text-white",
    cardHover: "hover:border-white/20",
    link: "text-[#c6f432]",
    ring: "ring-[#c6f432]",
  },
};

export function projectInitials(title: string): string {
  const words = title.replace(/[()]/g, "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "P";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
