export type MilestoneCategory =
  | "Hackathon"
  | "Project"
  | "Learning"
  | "Program"
  | "Leadership"
  | "Scholarship";

export type MilestoneStatus = "completed" | "applied" | "ongoing";

export type Milestone = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: MilestoneCategory;
  year: string;
  status: MilestoneStatus;
  linkLabel: string;
  href: string;
  certificateId?: string;
};

export const milestones: Milestone[] = [
  {
    slug: "alibaba-ai-hackathon",
    title: "Alibaba Cloud AI Hackathon Pakistan 2026",
    description:
      "Selected for the build phase and shipped CareerPilot AI, a deployed 6-module AI career mentor.",
    image: "/milestones/alibaba-ai-hackathon.jpg",
    imageAlt: "Alibaba Cloud AI Hackathon Pakistan 2026 CareerPilot AI presentation",
    category: "Hackathon",
    year: "2026",
    status: "completed",
    linkLabel: "View certificate",
    href: "#certifications",
    certificateId: "alibaba-cloud-ai-hackathon-2026",
  },
  {
    slug: "adaptive-learning-platform",
    title: "AI Adaptive Learning Platform (FYP)",
    description:
      "Textbook-grounded RAG tutor for FBISE Math & Science with adaptive quizzes and mastery tracking.",
    image: "/milestones/adaptive-learning-platform.jpg",
    imageAlt: "AI Adaptive Learning Platform FYP user interface",
    category: "Project",
    year: "2026",
    status: "ongoing",
    linkLabel: "View project",
    href: "#projects",
  },
  {
    slug: "genai-chatbot-bano-qabil",
    title: "Generative AI & Chatbot Development",
    description:
      "Built LLM conversational agents, prompt evaluation pipelines, and multi-turn chatbots with Bano Qabil.",
    image: "/milestones/genai-chatbot-bano-qabil.jpg",
    imageAlt: "Generative AI and Chatbot Development coursework by Bano Qabil",
    category: "Learning",
    year: "2026",
    status: "completed",
    linkLabel: "View certificate",
    href: "#certifications",
    certificateId: "generative-ai-chatbot-development-bano-qabil",
  },
  {
    slug: "microsoft-student-ambassadors",
    title: "Microsoft Learn Student Ambassadors",
    description:
      "Applied to grow my tech community work through workshops and student-led events.",
    image: "/milestones/microsoft-student-ambassadors.jpg",
    imageAlt: "Microsoft Learn Student Ambassadors tech community program",
    category: "Program",
    year: "Oct 2026",
    status: "applied",
    linkLabel: "Details",
    href: "https://studentambassadors.microsoft.com/",
  },
  {
    slug: "aspire-leaders",
    title: "Aspire Leaders Program",
    description:
      "Free online leadership program from the Aspire Institute, founded at Harvard University.",
    image: "/milestones/aspire-leaders.jpg",
    imageAlt: "Aspire Leaders Program leadership development Harvard Institute",
    category: "Leadership",
    year: "2025",
    status: "completed",
    linkLabel: "Details",
    href: "https://www.aspireleaders.org/",
  },
  {
    slug: "english-access-scholarship",
    title: "English Access Scholarship Program",
    description:
      "Completed a 400-hour English language program over 18 months through a scholarship.",
    image: "/milestones/english-access-scholarship.jpg",
    imageAlt: "English Access Scholarship Program graduation and diploma",
    category: "Scholarship",
    year: "2024-25",
    status: "completed",
    linkLabel: "View certificate",
    href: "#certifications",
    certificateId: "english-access-scholarship-program",
  },
];
