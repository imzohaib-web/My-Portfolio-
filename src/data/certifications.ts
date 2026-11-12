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

const neutralStyle: CategoryStyle = {
  name: "",
  text: "text-white",
  border: "border-white/[0.08]",
  bg: "bg-white/[0.02]",
  tile: "bg-white/[0.03] border-white/[0.08] text-[#c6f432]",
  activeBg: "bg-[#131315]",
  activeBorder: "border-[#c6f432]/60",
  bar: "bg-[#c6f432]",
  ring: "focus-visible:ring-[#c6f432]",
  chip: "text-[#ededed] bg-white/[0.04] border-white/[0.08]",
};

export const categoryAccents: Record<CertificationCategory, CategoryStyle> = {
  AI: { ...neutralStyle, name: "AI" },
  Programming: { ...neutralStyle, name: "Programming" },
  Data: { ...neutralStyle, name: "Data" },
  Hackathon: { ...neutralStyle, name: "Hackathon" },
  Scholarship: { ...neutralStyle, name: "Scholarship" },
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
    issuer: "U.S. Embassy Islamabad",
    year: "2024-25",
    category: "Scholarship",
    image: "/certificates/certificate1.jpeg",
    status: "earned",
  },
  {
    id: "alibaba-cloud-ai-hackathon-2026",
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

export function formatCertMeta(issuer?: string, year?: string): string {
  return [issuer, year].filter(Boolean).join(" · ");
}
