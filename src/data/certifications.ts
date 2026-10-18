export type CertificationCategory =
  | "AI"
  | "Programming"
  | "Data"
  | "Hackathon"
  | "Scholarship";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  category: CertificationCategory;
  image?: string; // /certificates/<file>
  status: "earned" | "pending";
  verifyUrl?: string; // public verification link
  credentialId?: string; // shown with a copy button when there is no verifyUrl
  note?: string;
};

export type CategoryStyle = {
  name: string;
  text: string;
  border: string;
  bg: string;
  tile: string;
  activeBg: string;
  activeBorder: string;
  bar: string;
  ring: string;
  chip: string;
};

export const categoryAccents: Record<CertificationCategory, CategoryStyle> = {
  AI: {
    name: "AI",
    text: "text-cyan-400",
    border: "border-cyan-400/30",
    bg: "bg-cyan-400/10",
    tile: "bg-cyan-400/10 border-cyan-400/25 text-cyan-400",
    activeBg: "bg-cyan-400/10",
    activeBorder: "border-cyan-400/60",
    bar: "bg-cyan-400",
    ring: "focus-visible:ring-cyan-400",
    chip: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  },
  Programming: {
    name: "Programming",
    text: "text-violet-400",
    border: "border-violet-400/30",
    bg: "bg-violet-400/10",
    tile: "bg-violet-400/10 border-violet-400/25 text-violet-400",
    activeBg: "bg-violet-400/10",
    activeBorder: "border-violet-400/60",
    bar: "bg-violet-400",
    ring: "focus-visible:ring-violet-400",
    chip: "text-violet-400 bg-violet-400/10 border-violet-400/30",
  },
  Data: {
    name: "Data",
    text: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/10",
    tile: "bg-emerald-400/10 border-emerald-400/25 text-emerald-400",
    activeBg: "bg-emerald-400/10",
    activeBorder: "border-emerald-400/60",
    bar: "bg-emerald-400",
    ring: "focus-visible:ring-emerald-400",
    chip: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  },
  Hackathon: {
    name: "Hackathon",
    text: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/10",
    tile: "bg-amber-400/10 border-amber-400/25 text-amber-400",
    activeBg: "bg-amber-400/10",
    activeBorder: "border-amber-400/60",
    bar: "bg-amber-400",
    ring: "focus-visible:ring-amber-400",
    chip: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  Scholarship: {
    name: "Scholarship",
    text: "text-rose-300",
    border: "border-rose-400/30",
    bg: "bg-rose-400/10",
    tile: "bg-rose-400/10 border-rose-400/25 text-rose-300",
    activeBg: "bg-rose-400/10",
    activeBorder: "border-rose-400/60",
    bar: "bg-rose-300",
    ring: "focus-visible:ring-rose-300",
    chip: "text-rose-300 bg-rose-400/10 border-rose-400/30",
  },
};

export const certifications: Certification[] = [
    {
    id: "ai-for-everyone",
    title: "AI For Everyone",
    issuer: "Coursera",
    year: "2025",
    category: "AI",
    image: "/certificates/certificate2.jpeg",
    status: "earned",
    verifyUrl: "https://coursera.org/share/92cbbe3140e4f6d7fc998f2ca9ae0b19",
  },
  {
    id: "career-essentials-in-generative-ai",
    title: "Career Essentials in Generative AI",
    issuer: "LinkedIn & Microsoft",
    year: "2024",
    category: "AI",
    image: "/certificates/certificate3.jpeg",
    status: "earned",
    // TODO: confirm this link opens the certificate.
    verifyUrl:
      "https://www.linkedin.com/learning/certificates/6ac3206473664d20cb1d1c13f90a8ac9cf3f30c7820e42bef6b04eb907a22713b",
  },
  {
    id: "prompt-engineering-for-chatgpt",
    title: "Prompt Engineering for ChatGPT",
    issuer: "Coursera",
    year: "2025",
    category: "AI",
    image: "/certificates/certificate6.jpeg",
    status: "earned",
    verifyUrl: "https://coursera.org/share/fabb97bd2eb503240d7806e87fadd1a2",
  },

  {
    id: "programming-for-everybody-python",
    title: "Programming for Everybody (Python)",
    issuer: "Coursera",
    year: "2025",
    category: "Programming",
    image: "/certificates/certificate4.jpeg",
    status: "earned",
    verifyUrl: "https://coursera.org/share/00880927d4132336a5bc386f1bd7fab2",
  },
  {
    id: "foundations-data-data-everywhere",
    title: "Foundations: Data, Data, Everywhere",
    // TODO: confirm issuer and year
    issuer: "Coursera",
    year: "2025",
    category: "Data",
    image: "/certificates/certificate5.jpeg",
    status: "earned",
    verifyUrl: "https://coursera.org/share/17d19de8af65187aeb66c229ba9234e9",
  },
  {
    id: "english-access-scholarship-program",
    title: "English Access Scholarship Program",
    // TODO: confirm issuer
    issuer: "U.S. Embassy Islamabad",
    year: "2024-25",
    category: "Scholarship",
    image: "/certificates/certificate1.jpeg",
    status: "earned",
  },
  {
    id: "alibaba-cloud-ai-hackathon-2026",
    // TODO: confirm title
    title: "Alibaba Cloud AI Hackathon Pakistan 2026",
    issuer: "Alibaba Cloud",
    year: "2026",
    category: "Hackathon",
    image: "/certificates/certificate7.jpg",
    credentialId: "3W5K-GN8Y-AJ5Z",
    status: "earned",
  },
  {
    id: "generative-ai-chatbot-development-bano-qabil",
    title: "Generative AI & Chatbot Development",
    issuer: "Bano Qabil",
    year: "2026",
    category: "AI",
    status: "pending",
    note: "Course completed. Certificate will be added once issued.",
  },
];

/**
 * Format issuer and year gracefully without trailing/empty separators or undefined
 */
export function formatCertMeta(issuer?: string, year?: string): string {
  return [issuer, year].filter(Boolean).join(" · ");
}
