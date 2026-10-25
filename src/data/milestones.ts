export type MilestoneCategory = "Hackathon" | "Leadership" | "Scholarship";

export type MilestoneTone = "amber" | "emerald";

export type Milestone = {
  id: string;
  title: string;
  period: string;
  category: MilestoneCategory;
  statusLabel: string; // e.g. "Selected for the finale"
  tone: MilestoneTone;
  description: string; // max ~160 chars, shown on 3 lines
  facts: string[]; // 2-3 short chips
  image?: string; // /milestones/<id>.webp
  imageAlt?: string;
  imagePosition?: string; // e.g. 'center 30%'
  certificateId?: string; // id in data/certifications.ts
  link?: { label: string; href: string };
};

export const milestones: Milestone[] = [
  {
    id: "alibaba-hackathon",
    title: "Alibaba Cloud AI Hackathon",
    period: "2026",
    category: "Hackathon",
    statusLabel: "Selected for the finale",
    tone: "amber",
    description:
      "Presented CareerPilot AI, a deployed 6-module AI career mentor, at the regional round and was selected for the finale.",
    facts: ["6 AI modules", "Deployed", "Team of 2"],
    image: "/milestones/alibaba-hackathon.webp",
    imageAlt: "Alibaba Cloud AI Hackathon presentation of CareerPilot AI",
    imagePosition: "center 35%",
    certificateId: "alibaba-cloud-ai-hackathon-2026",
  },
  {
    id: "aspire-leaders",
    title: "Aspire Leaders Program",
    period: "2025",
    category: "Leadership",
    statusLabel: "Completed",
    tone: "emerald",
    description:
      "Free online leadership development program from the Aspire Institute, founded at Harvard University.",
    facts: ["Harvard-founded", "Free online"],
    image: "/milestones/aspire-leaders.webp", // TODO: I will add this file (certificate or program screenshot).
    imageAlt: "Aspire Leaders Program leadership development founded at Harvard University",
    link: { label: "Aspire Leaders", href: "https://www.aspireleaders.org/" },
  },
  {
    id: "english-access",
    title: "English Access Scholarship",
    period: "2024-25",
    category: "Scholarship",
    statusLabel: "Completed",
    tone: "emerald",
    description:
      "Completed a 400-hour English language program over 18 months through a scholarship.",
    facts: ["400 hrs", "18 months"],
    image: "/milestones/english-access.webp",
    imageAlt: "English Access Scholarship Program graduation ceremony",
    certificateId: "english-access-scholarship-program",
  },
];
