import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
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
  SiGithub,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { HiOutlineSparkles } from "react-icons/hi2";

export type SkillAccent = "cyan" | "violet" | "emerald" | "amber";

export type Skill = {
  name: string;
  icon: IconType;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  accent: SkillAccent;
  skills: Skill[];
};

/** Generic fallback when no brand icon is mapped */
export const DefaultSkillIcon = HiOutlineSparkles;

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces that feel fast and polished",
    accent: "cyan",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
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
      // TODO: confirm — listed in spec; used across project tags but not in legacy SkillsSection
      { name: "Python", icon: SiPython },
      { name: "LangChain", icon: DefaultSkillIcon },
      { name: "LLM APIs", icon: DefaultSkillIcon },
      { name: "RAG Systems", icon: DefaultSkillIcon },
      { name: "NLP", icon: DefaultSkillIcon },
      { name: "Chatbot Development", icon: DefaultSkillIcon },
      { name: "Recommendation Systems", icon: DefaultSkillIcon },
    ],
  },
  {
    id: "tools",
    title: "Tools & Deployment",
    description: "Ship, host and collaborate",
    accent: "amber",
    skills: [
      { name: "Git / GitHub", icon: SiGithub },
      { name: "VS Code", icon: VscCode },
      // TODO: confirm exact product naming — legacy portfolio listed "Google stitch"
      { name: "Google Stitch", icon: DefaultSkillIcon },
      { name: "Vercel", icon: SiVercel },
      { name: "Render", icon: SiRender },
    ],
  },
];
