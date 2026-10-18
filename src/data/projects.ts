export type ProjectAccent = "cyan" | "violet" | "emerald" | "amber";

export type ProjectCategory = "AI & ML" | "Full-Stack";

export type ProjectStat = {
  value: string;
  label: string;
};

export type ProjectSection = {
  heading: string;
  body: string;
};

export type ProjectLinks = {
  github?: string;
  live?: string;
  demo?: string;
};

export type Project = {
  slug: string;
  title: string; // SHORT, max ~28 chars, used on cards
  fullTitle?: string; // used on /projects
  tagline: string; // one sentence, max ~90 chars, used on home cards
  subtitle: string;
  category: ProjectCategory;
  accent: ProjectAccent;
  status: "Shipped" | "In progress";
  badge?: string;
  year?: string;
  role?: string;
  summary: string; // 1-2 lines
  description: string; // full paragraph for detail view
  tech: string[];
  stats: ProjectStat[];
  cardImage: string; // compact diagram SVG
  cover: string; // detailed diagram SVG
  image: string; // alias to cover for backwards compatibility
  cardAlt?: string;
  coverAlt?: string;
  gallery?: string[];
  sections?: ProjectSection[]; // Problem, Solution, Architecture, Challenges, etc.
  links?: ProjectLinks;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "careerpilot-ai",
    title: "CareerPilot AI",
    tagline: "AI career mentor that analyzes resumes, finds skill gaps and coaches interviews.",
    subtitle: "AI Career Mentor · Interview Coach · RAG · FastAPI",
    category: "AI & ML",
    accent: "cyan",
    status: "Shipped",
    badge: "Hackathon Project",
    year: "2026",
    role: "Full-stack: Auth, Resume Analyzer, Dashboard, Career Mentor",
    summary:
      "AI career mentor and interview coach built for the Alibaba Cloud AI Hackathon Pakistan 2026, featuring six AI modules and RAG-based advising.",
    description:
      "AI career mentor and interview coach built for the Alibaba Cloud AI Hackathon Pakistan 2026 (\"AI for Pakistan's Future\"). Six AI-driven modules (Resume Analyzer, Skill Gap Analysis, Personalized Roadmap, AI Career Mentor, AI Mock Interview, Progress Dashboard) plus a RAG-based advisor. Built as a two-person team with a 50/50 module split.",
    tech: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Python",
      "FastAPI",
      "MongoDB",
      "Qwen",
      "Vercel",
      "Render",
    ],
    stats: [
      { value: "6", label: "AI modules" },
      { value: "27", label: "API endpoints" },
      { value: "162", label: "automated tests" },
    ],
    cardImage: "/projects/careerpilot-ai/cover-card.svg",
    cover: "/projects/careerpilot-ai/cover.svg",
    image: "/projects/careerpilot-ai/cover.svg",
    cardAlt: "CareerPilot AI pipeline diagram: Resume, Analyzer, Skill Gap, Roadmap",
    coverAlt:
      "CareerPilot AI architecture: Resume parsing, Analyzer, Skill Gap, Roadmap, Mentor, Mock Interview, Dashboard, RAG Advisor",
    sections: [
      {
        heading: "Problem",
        body: "Graduates and tech job seekers face generic career advice, lack structured interview prep, and struggle to identify concrete skill gaps matching Pakistani and global tech job markets.",
      },
      {
        heading: "Solution",
        body: "A unified AI career platform combining automated resume parsing, targeted skill gap analysis, personalized milestone roadmaps, dynamic mock interview coaching, and a RAG advisor.",
      },
      {
        heading: "Architecture",
        body: "React/Vite frontend on Vercel connecting to a Python FastAPI backend on Render, orchestrating Alibaba Cloud Model Studio (Qwen LLM) and MongoDB for state and user analytics.",
      },
      {
        heading: "Challenges",
        body: "Coordinating multi-turn interview interactions with real-time feedback and structuring reliable JSON schemas from prompt completions required robust validation and test suites.",
      },
    ],
    links: {
      // TODO: confirm repo or live URL
    },
    featured: true,
  },
  {
    slug: "fbise-adaptive-learning-platform",
    title: "FBISE Adaptive Learning Path",
    fullTitle: "AI-Powered Adaptive Learning Platform (FBISE Curriculum)",
    tagline: "Textbook-grounded RAG model with adaptive assessments and past-paper mastery tracking.",
    subtitle: "RAG · Adaptive Learning · LLMs · FastAPI",
    category: "AI & ML",
    accent: "violet",
    status: "In progress",
    badge: "Final Year Project",
    year: "2025–2026",
    role: "Lead Developer · Final Year Project",
    summary:
      "Self-paced platform around the FBISE Math and Science curriculum, textbook-grounded RAG tutor, AI-generated adaptive quizzes, mastery tracking driven by past-paper weightage.",
    description:
      "A self-paced learning platform built around the FBISE Math and Science curriculum, combining a textbook-grounded RAG tutor, AI-generated adaptive quizzes, and mastery tracking driven by real past-paper weightage. Students progress through chapters and topics with book-aligned notes, video recommendations, and mastery scores that reflect FBISE exam importance.",
    tech: ["RAG", "Adaptive Learning", "LLMs", "Vector DB", "FastAPI", "Next.js"],
    stats: [
      { value: "Textbook-grounded", label: "RAG tutor" },
      { value: "Adaptive", label: "quiz flow" },
      { value: "Past-paper", label: "mastery model" },
    ],
    cardImage: "/projects/fbise-adaptive-learning-platform/cover-card.svg",
    cover: "/projects/fbise-adaptive-learning-platform/cover.svg",
    image: "/projects/fbise-adaptive-learning-platform/cover.svg",
    cardAlt: "FBISE learning pipeline diagram: Textbooks, RAG Tutor, Quiz, Mastery",
    coverAlt:
      "FBISE learning pipeline: Textbooks, RAG Tutor, Adaptive Quiz, Mastery Score, and Student UI",
    gallery: [
      "/projects/fbise-adaptive-learning-platform/cover.svg",
      "/projects/fbise-adaptive-learning-platform/curriculum-flow.png",
      "/projects/fbise-adaptive-learning-platform/quiz-adaptive.png",
    ],
    sections: [
      {
        heading: "Problem",
        body: "FBISE students need structured, curriculum-faithful support beyond generic chatbots—aligned to official textbook language, sequential topic mastery, and real exam weightage.",
      },
      {
        heading: "Solution",
        body: "Students progress through chapters that unlock sequentially, broken into topics with set deadlines. Each topic surfaces matched explanatory videos alongside AI-generated notes from a RAG model trained specifically on the textbook, followed by adaptive quiz checks.",
      },
      {
        heading: "Architecture",
        body: "Vector search over textbook content powers the book-grounded Q&A tutor; per-topic mastery scores combine accuracy, timing, and past-paper topic weight; mock exams simulate historical paper distributions.",
      },
      {
        heading: "Challenges",
        body: "Balancing strict curriculum fidelity with helpful generative explanations required careful text chunking, citation-style grounding, and quiz gating before next-topic progression.",
      },
    ],
    links: {
      github: "https://github.com/imzohaib-web",
    },
    featured: true,
  },
  {
    slug: "enterprise-lms",
    title: "Enterprise LMS",
    tagline: "Enterprise learning platform with courses, assessments and certificates.",
    subtitle: "MERN · Agile · Team of 3",
    category: "Full-Stack",
    accent: "emerald",
    status: "Shipped",
    badge: "Internship Team Project",
    year: "2026",
    role: "Full-Stack Intern · Feature Lead",
    summary:
      "Enterprise Learning Management System built in an Agile team of three during my EziTech internship, delivering assessments, certificates, and student tracking.",
    description:
      "Enterprise Learning Management System built in an Agile team of three during my EziTech internship (weekly sprints, existing codebase, GitHub branching workflow). My ownership: assessments, student progress, certificates, instructor dashboard, discussions and notifications, plus integration, debugging and testing.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "Git/GitHub"],
    stats: [
      { value: "3", label: "team members" },
      { value: "5 weeks", label: "Agile sprints" },
      { value: "MERN", label: "full-stack" },
    ],
    cardImage: "/projects/enterprise-lms/cover-card.svg",
    cover: "/projects/enterprise-lms/cover.svg",
    image: "/projects/enterprise-lms/cover.svg",
    cardAlt: "Enterprise LMS pipeline diagram: Auth, Courses, Assessments, Certificates",
    coverAlt: "Enterprise LMS architecture: React client, Express API, MongoDB with module boxes",
    sections: [
      {
        heading: "Problem",
        body: "The existing internal platform required automated grading, structured certification validation upon course completion, and a dedicated instructor dashboard.",
      },
      {
        heading: "Solution",
        body: "Implemented modular quiz and assessment engines, automated PDF certificate generation, student progression state managers, and collaborative discussion threads.",
      },
      {
        heading: "Architecture",
        body: "Built on the MERN stack with Express REST endpoints, Mongoose schema validation, JWT auth, and a responsive React client utilizing reusable UI modules.",
      },
      {
        heading: "Challenges",
        body: "Collaborating across feature branches in an active codebase required strict Git branching hygiene, thorough manual and unit testing, and resolving complex merge points.",
      },
    ],
    links: {
      // TODO: confirm repo or demo URL
    },
    featured: true,
  },
  {
    slug: "fabric-hub",
    title: "Fabric Hub",
    tagline: "MERN fabric store with auth, orders, reviews and wishlist.",
    subtitle: "MERN · E-commerce · JWT Auth",
    category: "Full-Stack",
    accent: "amber",
    status: "Shipped",
    year: "2026",
    role: "Solo Full-Stack Developer",
    summary:
      "E-commerce fabric store featuring six MongoDB collections with full Mongoose schemas and secure JWT auth in httpOnly cookies.",
    description:
      "E-commerce fabric store and my first backend-integrated full-stack app, built solo in the first three weeks of my internship. Clean client/server separation, six MongoDB collections (Users, Categories, Products, Orders, Reviews, Wishlist) with full Mongoose schemas, and JWT auth stored in httpOnly cookies.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Mongoose", "JWT"],
    stats: [
      { value: "6", label: "MongoDB collections" },
      { value: "JWT", label: "httpOnly cookie auth" },
      { value: "Solo", label: "3-week build" },
    ],
    cardImage: "/projects/fabric-hub/cover-card.svg",
    cover: "/projects/fabric-hub/cover.svg",
    image: "/projects/fabric-hub/cover.svg",
    cardAlt: "Fabric Hub pipeline diagram: Client, API, MongoDB",
    coverAlt: "Fabric Hub architecture: Client, API, and 6 MongoDB Collections",
    sections: [
      {
        heading: "Problem",
        body: "Creating a reliable e-commerce flow requires dependable data modeling for diverse product attributes, secure authenticated checkout, and persistent user interactions.",
      },
      {
        heading: "Solution",
        body: "Constructed six dedicated Mongoose collections with relational references, integrated JWT authentication via httpOnly cookies, and implemented full order lifecycle management.",
      },
      {
        heading: "Architecture",
        body: "Express and Node backend serving structured JSON APIs to a decoupled React frontend with protected route guards and client state synchronization.",
      },
      {
        heading: "Challenges",
        body: "Enforcing cookie security flags across local development and production environments, along with handling transactional order updates across product inventories.",
      },
    ],
    links: {
      // TODO: confirm repository URL
    },
    featured: false,
  },
  {
    slug: "synthex-ai",
    title: "Synthex AI",
    tagline: "Full-stack AI chat workspace with auth and Gemini responses.",
    subtitle: "React 19 · Node · MongoDB · Gemini",
    category: "Full-Stack",
    accent: "cyan",
    status: "Shipped",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "AI chat workspace with React 19 + Vite frontend, Node/Express + MongoDB + JWT backend and Gemini integration.",
    description:
      "AI chat workspace with React 19 + Vite frontend, Node/Express + MongoDB + JWT backend and Gemini integration; frontend on Vercel, backend on Render.",
    tech: ["React 19", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Google Gemini", "Vercel", "Render"],
    stats: [
      { value: "Full-Stack", label: "AI workspace" },
      { value: "Gemini", label: "LLM integration" },
      { value: "JWT", label: "secure auth" },
    ],
    cardImage: "/projects/synthex-ai/cover-card.svg",
    cover: "/projects/synthex-ai/cover.svg",
    image: "/projects/synthex-ai/cover.svg",
    cardAlt: "Synthex AI pipeline diagram: Chat UI, API, Gemini",
    coverAlt: "Synthex AI architecture: React 19 Chat UI, Express API, MongoDB, and Gemini LLM",
    sections: [
      {
        heading: "Problem",
        body: "Direct client LLM integrations expose API secrets, lack session-bound conversation history, and often struggle with streaming state management.",
      },
      {
        heading: "Solution",
        body: "Developed a full-stack architecture where a Node/Express backend securely proxies requests to Google Gemini, persisting authenticated user sessions and chat history in MongoDB.",
      },
      {
        heading: "Architecture",
        body: "React 19 frontend hosted on Vercel communicating with an Express/Node backend on Render, with JWT authentication and MongoDB Atlas database storage.",
      },
      {
        heading: "Challenges",
        body: "Handling real-time token streaming and code markdown formatting in React 19 without blocking UI transitions.",
      },
    ],
    links: {
      github: "https://github.com/imzohaib-web/Chatbot-using-React",
    },
    featured: false,
  },
  {
    slug: "hybrid-movie-recommender",
    title: "Hybrid Movie Recommender",
    fullTitle: "AI-Powered Hybrid Movie Recommendation System",
    tagline: "Hybrid recommender: content similarity plus sentiment, blended 60/40.",
    subtitle: "Collaborative + content-based filtering",
    category: "AI & ML",
    accent: "amber",
    status: "Shipped",
    year: "2024",
    role: "ML & Backend Engineering",
    summary:
      "Content-based cosine similarity plus sentiment analysis with 60/40 scoring, built for my machine learning course.",
    description:
      "Content-based cosine similarity plus sentiment analysis with 60/40 scoring, built for my machine learning course.",
    tech: ["Machine Learning", "Python", "Flask", "React", "Tailwind CSS"],
    stats: [
      { value: "60/40", label: "similarity blend" },
      { value: "Cosine", label: "content matching" },
      { value: "Flask", label: "API backend" },
    ],
    cardImage: "/projects/hybrid-movie-recommender/cover-card.svg",
    cover: "/projects/hybrid-movie-recommender/cover.svg",
    image: "/projects/hybrid-movie-recommender/cover.svg",
    cardAlt: "Movie Recommender diagram: Cosine, Sentiment, 60/40 Blend, Picks",
    coverAlt:
      "Recommendation pipeline: User ratings, Cosine Similarity, Review Sentiment, 60/40 Blend, Flask API, and Top Picks",
    sections: [
      {
        heading: "Problem",
        body: "Pure plot metadata matching misses qualitative audience reception and emotional consensus across genres.",
      },
      {
        heading: "Solution",
        body: "Combined TF-IDF cosine similarity on movie plot keywords with NLP sentiment analysis on reviews, ensembled into a weighted 60/40 recommendation score.",
      },
      {
        heading: "Architecture",
        body: "Python machine learning pipeline with offline feature extraction and a Flask REST microservice delivering sub-50ms inference to a React frontend.",
      },
      {
        heading: "Challenges",
        body: "Efficiently vectorizing high-dimensional text data and fine-tuning sentiment weighting parameters to avoid skew from polarized reviews.",
      },
    ],
    links: {
      github: "https://github.com/imzohaib-web",
    },
    featured: false,
  },
  {
    slug: "ai-job-hunting-agents",
    title: "AI Job Hunting Agents",
    tagline: "Multi-agent pipeline that matches jobs and tailors applications.",
    subtitle: "Multi-Agent System · Prompt Engineering",
    category: "AI & ML",
    accent: "violet",
    status: "Shipped",
    year: "2024",
    role: "Automation & Agent Engineering",
    summary:
      "Autonomous AI agent pipeline that parses job listings, matches candidate profiles, and generates tailored application materials.",
    description:
      "Autonomous AI agent pipeline that parses job listings, matches candidate profiles, and generates tailored application materials.",
    tech: ["LangGraph", "Groq / LLaMA", "Pinecone", "AI Agents", "Python"],
    stats: [
      { value: "Multi-agent", label: "pipeline" },
      { value: "Groq / LLaMA", label: "fast inference" },
      { value: "Pinecone", label: "vector store" },
    ],
    cardImage: "/projects/ai-job-hunting-agents/cover-card.svg",
    cover: "/projects/ai-job-hunting-agents/cover.svg",
    image: "/projects/ai-job-hunting-agents/cover.svg",
    cardAlt: "Job Agents diagram: Resume, Fit Analyzer, Letter, Dispatch",
    coverAlt:
      "Job hunting pipeline: Resume parsing, Skill Fit Analyzer, Cover Letter Agent, and Submission Dispatcher",
    sections: [
      {
        heading: "Problem",
        body: "Job hunting is fragmented and time-intensive, requiring candidates to manually scan dozens of boards and tailor materials for each role individually.",
      },
      {
        heading: "Solution",
        body: "A crew of specialized autonomous agents that discover listings, extract requirements, evaluate candidate fit with Pinecone vector similarity, and draft custom cover letters.",
      },
      {
        heading: "Architecture",
        body: "LangGraph-coordinated execution pipeline utilizing Groq-accelerated LLaMA models for low-latency reasoning, with an automated application tracking queue.",
      },
      {
        heading: "Challenges",
        body: "Handling multi-step state consistency across agent nodes and formatting structured outputs without hallucinating candidate qualifications.",
      },
    ],
    links: {
      github: "https://github.com/imzohaib-web",
    },
    featured: false,
  },
  {
    // TODO: confirm this project is mine, delete if not
    slug: "rag-knowledge-assistant",
    title: "RAG Knowledge Assistant",
    tagline: "Retrieval-augmented Q&A assistant generating grounded answers with source citations.",
    subtitle: "LangChain · Vector DB · LLMs · Python",
    category: "AI & ML",
    accent: "emerald",
    status: "Shipped",
    year: "2024",
    role: "AI Engineering",
    summary:
      "AI-Powered Retrieval-Augmented Generation assistant using vector databases and LLMs for intelligent document-based Q&A.",
    description:
      "AI-Powered Retrieval-Augmented Generation assistant using vector databases and LLMs for intelligent document-based Q&A. Supports parsing complex documents, generating dense embeddings, and producing grounded answers with precise source citations.",
    tech: ["LangChain", "Vector DB", "LLMs", "Python"],
    stats: [
      { value: "Grounded", label: "retrieval pipeline" },
      { value: "Semantic", label: "vector similarity" },
      { value: "Zero-hallucination", label: "citation engine" },
    ],
    cardImage: "/projects/rag-knowledge-assistant/cover-card.svg",
    cover: "/projects/rag-knowledge-assistant/cover.svg",
    image: "/projects/rag-knowledge-assistant/cover.svg",
    cardAlt: "RAG Assistant diagram: Documents, Chunking, Vector Store, Synthesis",
    coverAlt:
      "RAG Knowledge Assistant pipeline: Documents, Dense Chunking, Vector Store, Similarity Retrieval, and LLM Synthesis",
    sections: [
      {
        heading: "Problem",
        body: "Generic LLMs frequently hallucinate when asked questions about specialized internal knowledge bases, private documents, or technical documentation.",
      },
      {
        heading: "Solution",
        body: "A robust RAG architecture that chunks documents, creates vector embeddings, and retrieves relevant context windows before prompting the LLM for grounded answers.",
      },
      {
        heading: "Architecture",
        body: "LangChain orchestrates the retrieval-augmented workflow, embedding text chunks into a vector database for cosine similarity search and synthesizing verified answers.",
      },
    ],
    links: {
      github: "https://github.com/imzohaib-web",
    },
    featured: false,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectsForDisplay(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const ordered = projects;
  const index = ordered.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
