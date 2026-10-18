# ⚡ Zohaib Umer — AI Engineer & Full Stack Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A high-performance personal portfolio website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Styled in a futuristic dark cyberpunk aesthetic, the site incorporates fluid spring-physics animations via **Framer Motion**, custom glassmorphism, animated background mesh gradients, an interactive magnetic custom cursor, and dynamic technical project showcases.

---

## 🌟 Overview

This portfolio presents the work, technical skills, and engineering trajectory of **Zohaib Umer**, a final-year Software Engineering student at COMSATS University Islamabad specializing in **Generative AI systems, RAG architectures, and Full-Stack Web Development**.

### Key Highlights:
- **Cyberpunk Dark Glassmorphism**: Tailored neon cyan (`#0ff`) and purple (`#b026ff`) accents, deep-space background (`#050505`), backdrop blurs, and glowing border cards.
- **Spring-Physics Custom Cursor**: Dual-element magnetic mouse follower with cursor hover detection and automatic mobile fallback.
- **Interactive Project Disclosures**: Animated expandable drawers that provide deep technical context for complex engineering projects.
- **Fully Responsive Architecture**: Desktop header navigation paired with a smooth animated mobile slide-in drawer and scroll locking.
- **Direct Asset Integration**: Instant resume download and social connect links.

---

## 🚀 Sections & Features

### 1. Header & Navigation (`Navbar.tsx`)
- **Adaptive Scroll Detection**: Dynamically transitions from transparent to blurred glass with subtle border glow upon scrolling.
- **Brand Avatar**: Custom animated gradient badge with hover text glow.
- **Desktop & Mobile Navigation**: Smooth internal anchor jumps (`#about`, `#skills`, `#projects`, `#experience`, `#contact`) alongside a direct resume download button.
- **Mobile Drawer Menu**: Animated slide-in modal with body scroll-locking and touch-friendly interactions.

### 2. Hero Section (`HeroSection.tsx`)
- **Status Indicator**: "Available for new opportunities" status pill with subtle border glow.
- **Typewriter Tagline**: Dynamic terminal-style typewriter effect (`"Building intelligent AI-powered experiences._"`).
- **High-Impact Typography**: Gradient headline text with neon highlight treatment.
- **Interactive CTAs**: Custom glowing buttons (`GlowingButton.tsx`) for project exploration, direct contact, and CV download.

### 3. About Me (`AboutSection.tsx`)
- **Professional Narrative**: Summarizes academic background at COMSATS University Islamabad and engineering internships.
- **Domain Focus Cards**: Glass cards highlighting key specialties:
  - **Web Development**: Scalable React/Next.js architectures and modern API integrations.
  - **AI Systems**: Retrieval-Augmented Generation (RAG), LangChain orchestration, and multi-agent systems.

### 4. Technical Arsenal (`SkillsSection.tsx`)
- Categorized skill grid with color-coded status pills:
  - **Frontend**: React, JavaScript, HTML5, CSS3, Tailwind CSS
  - **Backend**: Node.js, Express, MongoDB, Laravel, FastAPI, MySQL
  - **AI & ML**: LangChain, LLM APIs, NLP, Chatbot Development, Recommendation Systems
  - **Tools & DevOps**: Git / GitHub, Google Stitch, VS Code, Vercel, Render

### 5. Featured Projects (`ProjectsSection.tsx`)
Interactive cards highlighting production applications and research-oriented AI systems:
- **AI-Powered Adaptive Learning Platform (FBISE Curriculum)** *(Final Year Project)*:
  - Self-paced learning platform aligned with FBISE Math & Science curricula.
  - Textbook-grounded RAG tutor matching syllabus explanations.
  - Topic-level adaptive quizzes with automated remediation loops for weak concepts.
  - Topic mastery scoring weighted against historical FBISE past-paper patterns and mock exam readiness reports.
  - Features an interactive expandable disclosure toggle (`"Read more details"`).
- **RAG Knowledge Assistant**: Vector DB + LLM document Q&A assistant built with LangChain.
- **AI-Powered Hybrid Movie Recommendation System**: Machine learning engine combining collaborative and content-based filtering via FastAPI.
- **AI Job Hunting Agents**: Autonomous multi-agent pipeline for job hunting, resume tailoring, and skill gap analysis.
- **AI-Powered Chatbot**: Conversational interface with contextual memory and real-time streaming LLM responses.

### 6. Experience Timeline (`ExperienceSection.tsx`)
Visual vertical timeline with glowing indicator nodes:
- **MERN Stack Developer Intern @ EziTech (Eziline Software House)** *(Jun 2026 – Sep 2026)*: Built and maintained features for **Fabric Hub** and **Enterprise LMS**, developed REST APIs, and created React components.
- **Front-End Developer Intern @ Erudite Coaching Center**: Crafted responsive React interfaces and improved UI/UX performance and accessibility.

### 7. Certifications & Continuous Learning (`CertificationsSection.tsx`)
- Generative AI & Chatbot Development – Bano Qabil (2026)
- Programming for Everybody (Python) – Coursera (2025)
- AI For Everyone – Coursera (2025)
- Prompt Engineering for ChatGPT – Coursera (2025)
- Career Essentials in Generative AI – LinkedIn & Microsoft (2024)
- English Access Scholarship Program (2024–2025)

### 8. Contact & Social Hub (`ContactSection.tsx` & `Footer.tsx`)
- Direct communication channels:
  - **GitHub**: [github.com/imzohaib-web](https://github.com/imzohaib-web)
  - **LinkedIn**: [linkedin.com/in/zohaib-umer](https://www.linkedin.com/in/zohaib-umer/)
  - **Email**: [umerzohaibumer@gmail.com](mailto:umerzohaibumer@gmail.com)
  - **Location**: Wah Cantt, Pakistan
- Footer copyright note and branding signature.

---

## 🛠️ Tech Stack & Architecture

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Class Utilities** | `clsx`, `tailwind-merge` |
| **Font** | Inter (`next/font/google`) |

---

## 📁 Project Structure

```plaintext
portfolio-web/
├── public/
│   ├── resume/
│   │   └── Zohaib_Umer_CV.pdf     # Downloadable resume asset
│   ├── file.svg
│   ├── globe.svg
│   └── ...
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css            # Tailwind theme, CSS vars, glass styles & keyframes
│   │   ├── layout.tsx             # Root layout with fonts, metadata, cursor & background
│   │   └── page.tsx               # Primary single-page portfolio view
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   └── Navbar.tsx         # Sticky header & mobile drawer
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx   # Bio & focus highlights
│   │   │   ├── CertificationsSection.tsx # Verified credentials
│   │   │   ├── ContactSection.tsx # Contact links & CTA
│   │   │   ├── ExperienceSection.tsx # Career & internship timeline
│   │   │   ├── HeroSection.tsx    # Header banner with typewriter effect
│   │   │   ├── ProjectsSection.tsx # Project portfolio with expandable case studies
│   │   │   └── SkillsSection.tsx  # Categorized skills matrix
│   │   └── ui/
│   │       ├── AnimatedBackground.tsx # Ambient gradient orbs & animated grid mesh
│   │       ├── CustomCursor.tsx   # Dual spring-animated mouse follower
│   │       ├── GlassCard.tsx      # Reusable glassmorphic container with neon accents
│   │       ├── GlowingButton.tsx  # Reusable neon glowing interactive button
│   │       └── SectionHeading.tsx # Reusable section title & subtitle block
│   └── lib/
│       └── utils.ts               # Class merging utility (clsx + tailwind-merge)
├── eslint.config.mjs
├── next.config.ts                 # Next.js configuration (Turbopack root)
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.18.0 or later recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/imzohaib-web/My-Portfolio-.git
   cd My-Portfolio-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts local Next.js development server with Turbopack |
| `npm run build` | Compiles production-ready bundle |
| `npm run start` | Boots the production server |
| `npm run lint` | Runs ESLint checks across the project |

---

## ⚙️ Customization

- **Resume PDF**: Replace `public/resume/Zohaib_Umer_CV.pdf` with your updated curriculum vitae.
- **Color Theme**: Adjust `--color-neon-cyan`, `--color-neon-purple`, and background tokens in [`src/app/globals.css`](src/app/globals.css).
- **Projects & Experience**: Add or update entries directly within [`src/components/sections/ProjectsSection.tsx`](src/components/sections/ProjectsSection.tsx) and [`src/components/sections/ExperienceSection.tsx`](src/components/sections/ExperienceSection.tsx).
- **Skills Matrix**: Update skill sets in [`src/components/sections/SkillsSection.tsx`](src/components/sections/SkillsSection.tsx).

---

## 📄 License

This project is created for personal portfolio demonstration and is maintained by [Zohaib Umer](https://github.com/imzohaib-web).
