export type Role = {
  id: string;
  title: string;
  company: string;
  type: "Internship" | "Full-time" | "Part-time";
  location?: string;
  mode?: "Remote" | "On-site" | "Hybrid";
  start: string;
  end?: string; // 'Jun 2026', 'Sep 2026'; omit end when current
  duration?: string; // '2 mos'
  current?: boolean;
  bullets: string[]; // 3 max, one sentence each
  tech?: string[];
  certificate?: { image: string; label?: string };
};

export const experiences: Role[] = [
  {
    id: "eziline",
    title: "MERN Stack Developer Intern",
    company: "EziTech (Eziline Software House)",
    type: "Internship",
    location: "Rawalpindi",
    start: "Jun 2026",
    end: "Sep 2026", // TODO: confirm end date and whether I am continuing (if yes I will add a Current role).
    bullets: [
      "Built Fabric Hub solo in the first three weeks: a MERN fabric store with six MongoDB collections and JWT auth in httpOnly cookies.",
      "Contributed to an Enterprise LMS in a 3-person Agile team (weekly sprints): assessments, student progress, certificates, instructor dashboard, discussions and notifications.",
      "Built REST APIs and React UI components with MongoDB, Express and Node.js, and collaborated through a Git/GitHub branching workflow.",
      // TODO: do NOT say "production" unless I confirm both apps are deployed.
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Git/GitHub"],
  },
  {
    id: "technik-nest",
    title: "Artificial Intelligence & Machine Learning Intern",
    company: "Technik Nest Pvt Ltd",
    type: "Internship",
    mode: "Remote",
    start: "Jul 2026",
    end: "Aug 2026",
    duration: "2 mos",
    bullets: [
      "Worked hands-on with data preprocessing pipelines, turning raw, messy datasets into clean inputs for model training.",
      "Built and experimented with machine learning algorithms to improve baseline model accuracy and performance.",
      "Evaluated model outputs and tuned parameters, gaining practical insight into the end-to-end ML development lifecycle.",
    ],
    tech: [
      "Data Preprocessing",
      "Machine Learning",
      "Model Evaluation",
      "Hyperparameter Tuning",
    ],
    certificate: {
      image: "/experience/technik-nest-certificate.webp", // TODO: I will add this file; if it is missing, hide the "View certificate" button instead of crashing.
      label: "Technik Nest AI & ML Internship Certificate",
    },
  },
  {
    id: "erudite",
    title: "Front-End Developer Intern",
    company: "Erudite Coaching Center",
    type: "Internship",
    start: "", // TODO: add dates
    // TODO: add end date
    // TODO: add location
    bullets: [
      "Developed responsive and dynamic React interfaces.",
      "Improved overall UI/UX performance and user engagement.",
      "Optimized modern web applications for speed and accessibility.",
    ],
    tech: ["React"], // TODO: add the rest
  },
];
