import type { ComponentType } from "react";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiPython,
  SiLangchain,
  SiGithub,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  FolderSearch,
  Languages,
  Cpu,
  BotMessageSquare,
  Sliders,
  Boxes,
  Sparkles,
} from "lucide-react";

export type SkillAccent = "cyan" | "violet" | "emerald" | "amber";

export type SkillIconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;

export type Skill = {
  name: string;
  icon: SkillIconComponent;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  accent: SkillAccent;
  skills: Skill[];
};

/** Generic fallback when no brand icon is mapped */
export const DefaultSkillIcon: SkillIconComponent = Sparkles;

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that feel fast and polished",
    accent: "cyan",
    skills: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, auth and data layers",
    accent: "violet",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Laravel", icon: SiLaravel },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    id: "generative-ai",
    title: "Generative AI & LLMs",
    description: "RAG, agents and LLM apps",
    accent: "emerald",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "LangChain", icon: SiLangchain },
      { name: "LLM APIs", icon: Cpu },
      { name: "RAG Systems", icon: FolderSearch },
      { name: "NLP", icon: Languages },
      { name: "Chatbot Development", icon: BotMessageSquare },
      { name: "Recommendation Systems", icon: Sliders },
    ],
  },
  {
    id: "tools",
    title: "Tools & Deployment",
    description: "Ship, host and collaborate",
    accent: "amber",
    skills: [
      { name: "Git / GitHub", icon: SiGithub },
      { name: "Docker & AWS", icon: VscCode },
      { name: "Google Stitch", icon: Boxes },
      { name: "Vercel", icon: SiVercel },
      { name: "Render", icon: SiRender },
    ],
  },
];
