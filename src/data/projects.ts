export type ProjectAccent = "cyan" | "violet" | "emerald" | "amber";

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
  title: string;
  subtitle: string;
  category: string;
  accent: ProjectAccent;
  status: "Shipped" | "In progress";
  badge?: string;
  year?: string;
  role?: string;
  summary: string; // 1-2 lines for the card
  description: string; // full paragraph for the detail page
  tech: string[];
  stats: ProjectStat[]; // exactly 3, shown on detail page
  image: string; // /projects/<slug>/cover.png (architecture diagram or screenshot)
  gallery?: string[];
  sections?: ProjectSection[]; // Problem, Solution, Architecture, Challenges, etc.
  links?: ProjectLinks;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "langgraph-research-agent",
    title: "LangGraph Research Agent",
    subtitle: "GenAI · LLM · Autonomous Agents · FastAPI",
    category: "Autonomous AI",
    accent: "cyan",
    status: "Shipped",
    year: "2025",
    role: "Full-Stack & AI Engineering",
    summary:
      "Autonomous research agent built with LangGraph, FastAPI, and ChromaDB—streaming findings via SSE in a Dockerized pipeline.",
    description:
      "An autonomous research agent built with LangGraph, FastAPI, and ChromaDB. Features real-time SSE streaming, Docker containerization, and a multi-step reasoning pipeline that searches, synthesizes, and presents research findings.",
    tech: ["LangGraph", "FastAPI", "ChromaDB", "Docker", "SSE Streaming", "Python"],
    stats: [
      { value: "Autonomous", label: "agent pipeline" },
      { value: "Real-time", label: "SSE streaming" },
      { value: "Dockerized", label: "deployment" },
    ],
    image: "/projects/langgraph-research-agent/cover.png",
    gallery: [
      "/projects/langgraph-research-agent/cover.png",
      "/projects/langgraph-research-agent/architecture.png",
      "/projects/langgraph-research-agent/pipeline-stream.png",
    ],
    sections: [
      {
        heading: "Problem",
        body: "Deep research demands hours of iterative search, cross-source synthesis, fact verification, and report composition that traditional single-turn LLMs cannot autonomously execute without losing context.",
      },
      {
        heading: "Solution",
        body: "An autonomous agentic pipeline where LangGraph manages stateful execution across planning, targeted web search, ChromaDB document retrieval, synthesis, and streaming output generation.",
      },
      // TODO: confirm architecture diagram details and expand narrative
      {
        heading: "Architecture",
        body: "FastAPI backend serving SSE event streams; ChromaDB for persistent vector retrieval; LangGraph for deterministic cyclic graphs with tool execution; packaged in Docker for portable production deployment.",
      },
      {
        heading: "Challenges and learnings",
        body: "Handling unbounded agent loops and intermittent tool errors required robust fallback nodes in LangGraph and structured output validation before presenting final syntheses.",
      },
    ],
    links: {
      // TODO: confirm repository URL
      github: "https://github.com/imzohaib-web",
    },
    featured: true,
  },
  {
    slug: "fbise-adaptive-learning-platform",
    title: "AI-Powered Adaptive Learning Platform (FBISE Curriculum)",
    subtitle: "RAG · Adaptive Learning · LLMs · FastAPI",
    category: "EdTech · RAG",
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
    image: "/projects/fbise-adaptive-learning-platform/cover.png",
    gallery: [
      "/projects/fbise-adaptive-learning-platform/cover.png",
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
      // TODO: confirm backend service endpoint
      {
        heading: "Architecture",
        body: "Vector search over textbook content powers the book-grounded Q&A tutor; per-topic mastery scores combine accuracy, timing, and past-paper topic weight; mock exams simulate historical paper distributions.",
      },
      {
        heading: "Challenges and learnings",
        body: "Balancing strict curriculum fidelity with helpful generative explanations required careful text chunking, citation-style grounding, and quiz gating before next-topic progression.",
      },
    ],
    links: {
      // TODO: confirm demo or repo when available
      github: "https://github.com/imzohaib-web",
    },
    featured: true,
  },
  {
    slug: "rag-knowledge-assistant",
    title: "RAG Knowledge Assistant",
    subtitle: "LangChain · Vector DB · LLMs · Python",
    category: "RAG · LLM Apps",
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
    image: "/projects/rag-knowledge-assistant/cover.png",
    sections: [
      {
        heading: "Problem",
        body: "Generic LLMs frequently hallucinate when asked questions about specialized internal knowledge bases, private documents, or technical documentation.",
      },
      {
        heading: "Solution",
        body: "A robust RAG architecture that chunks documents, creates vector embeddings, and retrieves relevant context windows before prompting the LLM for grounded answers.",
      },
      // TODO: expand deployment architecture details
      {
        heading: "Architecture",
        body: "LangChain orchestrates the retrieval-augmented workflow, embedding text chunks into a vector database for cosine similarity search and synthesizing verified answers.",
      },
    ],
    links: {
      // TODO: confirm repository URL
      github: "https://github.com/imzohaib-web",
    },
    featured: false,
  },
  {
    slug: "hybrid-movie-recommender",
    title: "AI-Powered Hybrid Movie Recommendation System",
    subtitle: "Collaborative + content-based filtering",
    category: "Machine Learning",
    accent: "amber",
    status: "Shipped",
    year: "2024",
    role: "ML & Backend Engineering",
    summary:
      "Intelligent recommendation engine combining collaborative and content-based filtering with AI-enhanced personalization.",
    description:
      "Intelligent recommendation engine combining collaborative and content-based filtering with AI-enhanced personalization. Delivers sub-50ms recommendation queries by ensembling matrix factorization and semantic metadata representations.",
    tech: ["Machine Learning", "Python", "FastAPI"],
    stats: [
      { value: "Hybrid", label: "filtering model" },
      { value: "Personalized", label: "ranking matrix" },
      { value: "API-first", label: "FastAPI serving" },
    ],
    image: "/projects/hybrid-movie-recommender/cover.png",
    sections: [
      {
        heading: "Problem",
        body: "Pure collaborative filtering suffers from cold-start problems, while pure content-based approaches lack serendipity and cross-genre personalization.",
      },
      {
        heading: "Solution",
        body: "An ensembled hybrid recommendation model that combines SVD matrix factorization on user ratings with TF-IDF cosine similarity on rich movie metadata.",
      },
      // TODO: confirm model metrics and dataset source
      {
        heading: "Architecture",
        body: "Python-based machine learning pipeline with offline model training, serialized weights, and a high-performance FastAPI service for real-time recommendation inference.",
      },
    ],
    links: {
      // TODO: confirm repository URL
      github: "https://github.com/imzohaib-web",
    },
    featured: false,
  },
  {
    slug: "ai-job-hunting-agents",
    title: "AI Job Hunting Agents",
    subtitle: "Automation · Agents · Prompt Engineering",
    category: "AI Agents",
    accent: "cyan",
    status: "Shipped",
    year: "2024",
    role: "Automation & Agent Engineering",
    summary:
      "Autonomous AI agents that search jobs, analyze skills, optimize resumes, and automate job hunting workflows.",
    description:
      "Autonomous AI agents that search jobs, analyze skills, optimize resumes, and automate job hunting workflows. Uses multi-agent orchestration to parse listings, match skill vectors against candidate profiles, and generate tailored application materials.",
    tech: ["AI Agents", "Automation", "Prompt Engineering"],
    stats: [
      { value: "Multi-agent", label: "autonomous fleet" },
      { value: "Tailored", label: "resume optimization" },
      { value: "Automated", label: "job search tasks" },
    ],
    image: "/projects/ai-job-hunting-agents/cover.png",
    sections: [
      {
        heading: "Problem",
        body: "Job hunting is fragmented and time-intensive, requiring candidates to manually scan dozens of boards and tailor materials for each role individually.",
      },
      {
        heading: "Solution",
        body: "A crew of specialized autonomous agents that discover listings, extract requirements, evaluate candidate fit, and draft custom cover letters and resume bullets.",
      },
      // TODO: confirm workflow scheduler specifications
      {
        heading: "Architecture",
        body: "Multi-agent execution pipeline orchestrating prompt workflows, automated job scraping, vector similarity comparison, and an application tracking queue.",
      },
    ],
    links: {
      // TODO: confirm repository URL
      github: "https://github.com/imzohaib-web",
    },
    featured: false,
  },
  {
    slug: "ai-chatbot",
    title: "AI-Powered Chatbot",
    subtitle: "React · LLM APIs · Contextual Memory",
    category: "Conversational AI",
    accent: "violet",
    status: "Shipped",
    year: "2024",
    role: "Frontend & Full-Stack",
    summary:
      "Modern conversational chatbot integrating LLM APIs with contextual memory and real-time intelligent responses.",
    description:
      "Modern conversational chatbot integrating LLM APIs with contextual memory and real-time intelligent responses. Features sliding-window memory, markdown and syntax highlighting, and responsive conversation state management.",
    tech: ["React", "LLM APIs", "Contextual Memory"],
    stats: [
      { value: "Contextual", label: "buffer memory" },
      { value: "Real-time", label: "LLM responses" },
      { value: "React", label: "chat interface" },
    ],
    image: "/projects/ai-chatbot/cover.png",
    sections: [
      {
        heading: "Problem",
        body: "Standard web chat UIs often suffer from high token latency, context degradation over lengthy conversations, and poor rendering of code and markdown structures.",
      },
      {
        heading: "Solution",
        body: "A responsive React chat client connected to streaming LLM endpoints with optimized sliding-window context management and formatted markdown responses.",
      },
      // TODO: confirm live demo host URL
      {
        heading: "Architecture",
        body: "FastAPI / Next.js backend with SSE streaming, persistent session memory management, and a clean React frontend with automatic scroll and syntax highlighting.",
      },
    ],
    links: {
      // TODO: confirm repository URL
      github: "https://github.com/imzohaib-web",
    },
    featured: false,
  },
];

export function getProjectsForDisplay(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const ordered = getProjectsForDisplay();
  const index = ordered.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}
