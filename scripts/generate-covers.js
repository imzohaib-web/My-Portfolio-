/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const diagrams = [
  {
    slug: 'langgraph-research-agent',
    title: 'LangGraph Research Agent',
    badge: 'Dockerized',
    header: 'LangGraph · FastAPI · ChromaDB · Docker',
    footer: 'autonomous research agent · multi-step reasoning pipeline',
    accent: '#22d3ee',
    accentBg: 'rgba(34, 211, 238, 0.1)',
    accentBorder: 'rgba(34, 211, 238, 0.3)',
    nodes: [
      { id: '1', title: 'INPUT', sub: 'query', x: 80, y: 155, w: 120, h: 64, color: '#3b82f6' },
      { id: '2', title: 'PLANNER', sub: 'LangGraph', x: 260, y: 155, w: 130, h: 64, color: '#6366f1' },
      { id: '3a', title: 'SEARCH', sub: 'web tool', x: 450, y: 105, w: 130, h: 60, color: '#10b981' },
      { id: '3b', title: 'RETRIEVE', sub: 'ChromaDB', x: 450, y: 195, w: 130, h: 60, color: '#059669' },
      { id: '4', title: 'SYNTHESIZE', sub: 'LLM Reasoning', x: 640, y: 155, w: 140, h: 64, color: '#8b5cf6' },
      { id: '5', title: 'OUTPUT', sub: 'SSE stream', x: 840, y: 155, w: 130, h: 64, color: '#06b6d4' },
    ],
    arrows: [
      { from: [200, 187], to: [260, 187] },
      { from: [390, 175], to: [450, 135] },
      { from: [390, 195], to: [450, 225] },
      { from: [580, 135], to: [640, 175] },
      { from: [580, 225], to: [640, 195] },
      { from: [780, 187], to: [840, 187] },
    ]
  },
  {
    slug: 'fbise-adaptive-learning-platform',
    title: 'FBISE Adaptive Learning Platform',
    badge: 'Final Year Project',
    header: 'FBISE Curriculum · RAG Tutor · Adaptive Quizzes · FastAPI',
    footer: 'textbook-grounded RAG · past-paper weightage · sequential mastery',
    accent: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.1)',
    accentBorder: 'rgba(168, 85, 247, 0.3)',
    nodes: [
      { id: '1', title: 'CURRICULUM', sub: 'FBISE Textbooks', x: 70, y: 155, w: 140, h: 64, color: '#8b5cf6' },
      { id: '2', title: 'RAG ENGINE', sub: 'Vector DB Tutor', x: 270, y: 155, w: 140, h: 64, color: '#ec4899' },
      { id: '3a', title: 'ADAPTIVE QUIZ', sub: 'Dynamic Questions', x: 470, y: 105, w: 150, h: 60, color: '#3b82f6' },
      { id: '3b', title: 'MASTERY SCORE', sub: 'Past Paper Weight', x: 470, y: 195, w: 150, h: 60, color: '#10b981' },
      { id: '4', title: 'EVALUATION', sub: 'Gap Analysis', x: 680, y: 155, w: 130, h: 64, color: '#f59e0b' },
      { id: '5', title: 'STUDENT UI', sub: 'Next.js Interface', x: 860, y: 155, w: 130, h: 64, color: '#a855f7' },
    ],
    arrows: [
      { from: [210, 187], to: [270, 187] },
      { from: [410, 175], to: [470, 135] },
      { from: [410, 195], to: [470, 225] },
      { from: [620, 135], to: [680, 175] },
      { from: [620, 225], to: [680, 195] },
      { from: [810, 187], to: [860, 187] },
    ]
  },
  {
    slug: 'rag-knowledge-assistant',
    title: 'RAG Knowledge Assistant',
    badge: 'RAG Pipeline',
    header: 'LangChain · Vector DB · LLMs · Python',
    footer: 'grounded retrieval · semantic document search · citations',
    accent: '#34d399',
    accentBg: 'rgba(52, 211, 153, 0.1)',
    accentBorder: 'rgba(52, 211, 153, 0.3)',
    nodes: [
      { id: '1', title: 'DOCUMENTS', sub: 'PDF / Text / MD', x: 80, y: 155, w: 130, h: 64, color: '#10b981' },
      { id: '2', title: 'CHUNKING', sub: 'Embeddings Gen', x: 270, y: 155, w: 140, h: 64, color: '#06b6d4' },
      { id: '3', title: 'VECTOR STORE', sub: 'Chroma / Qdrant', x: 470, y: 155, w: 140, h: 64, color: '#3b82f6' },
      { id: '4', title: 'RETRIEVER', sub: 'Similarity Search', x: 670, y: 155, w: 140, h: 64, color: '#6366f1' },
      { id: '5', title: 'LLM SYNTHESIS', sub: 'Grounded Answer', x: 860, y: 155, w: 140, h: 64, color: '#10b981' },
    ],
    arrows: [
      { from: [210, 187], to: [270, 187] },
      { from: [410, 187], to: [470, 187] },
      { from: [610, 187], to: [670, 187] },
      { from: [810, 187], to: [860, 187] },
    ]
  },
  {
    slug: 'hybrid-movie-recommender',
    title: 'AI-Powered Hybrid Movie Recommendation System',
    badge: 'Hybrid Model',
    header: 'Collaborative + Content-Based · Python · FastAPI',
    footer: 'matrix factorization · content cosine similarity · real-time inference',
    accent: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.1)',
    accentBorder: 'rgba(245, 158, 11, 0.3)',
    nodes: [
      { id: '1', title: 'USER RATINGS', sub: 'Interaction History', x: 70, y: 155, w: 140, h: 64, color: '#f59e0b' },
      { id: '2a', title: 'COLLAB SVD', sub: 'Latent Factor Model', x: 280, y: 105, w: 150, h: 60, color: '#ef4444' },
      { id: '2b', title: 'CONTENT TF-IDF', sub: 'Genre & Metadata', x: 280, y: 195, w: 150, h: 60, color: '#ec4899' },
      { id: '3', title: 'ENSEMBLE', sub: 'Hybrid Ranker', x: 490, y: 155, w: 140, h: 64, color: '#8b5cf6' },
      { id: '4', title: 'FASTAPI', sub: 'Async Inference', x: 690, y: 155, w: 130, h: 64, color: '#3b82f6' },
      { id: '5', title: 'TOP PICKS', sub: 'Personalized List', x: 870, y: 155, w: 130, h: 64, color: '#f59e0b' },
    ],
    arrows: [
      { from: [210, 175], to: [280, 135] },
      { from: [210, 195], to: [280, 225] },
      { from: [430, 135], to: [490, 175] },
      { from: [430, 225], to: [490, 195] },
      { from: [630, 187], to: [690, 187] },
      { from: [820, 187], to: [870, 187] },
    ]
  },
  {
    slug: 'ai-job-hunting-agents',
    title: 'AI Job Hunting Agents',
    badge: 'Multi-Agent',
    header: 'AI Agents · Automation · Prompt Engineering',
    footer: 'autonomous job crawler · skills matcher · resume optimizer',
    accent: '#22d3ee',
    accentBg: 'rgba(34, 211, 238, 0.1)',
    accentBorder: 'rgba(34, 211, 238, 0.3)',
    nodes: [
      { id: '1', title: 'JOB CRAWLER', sub: 'Scrape Listings', x: 70, y: 155, w: 130, h: 64, color: '#06b6d4' },
      { id: '2', title: 'FIT ANALYZER', sub: 'Skill Gap Check', x: 260, y: 155, w: 140, h: 64, color: '#3b82f6' },
      { id: '3a', title: 'RESUME AGENT', sub: 'Tailored Bullets', x: 460, y: 105, w: 140, h: 60, color: '#10b981' },
      { id: '3b', title: 'LETTER AGENT', sub: 'Cover Generator', x: 460, y: 195, w: 140, h: 60, color: '#8b5cf6' },
      { id: '4', title: 'DISPATCHER', sub: 'Submission Queue', x: 660, y: 155, w: 140, h: 64, color: '#ec4899' },
      { id: '5', title: 'TRACKER', sub: 'Status Dashboard', x: 860, y: 155, w: 130, h: 64, color: '#06b6d4' },
    ],
    arrows: [
      { from: [200, 187], to: [260, 187] },
      { from: [400, 175], to: [460, 135] },
      { from: [400, 195], to: [460, 225] },
      { from: [600, 135], to: [660, 175] },
      { from: [600, 225], to: [660, 195] },
      { from: [800, 187], to: [860, 187] },
    ]
  },
  {
    slug: 'ai-chatbot',
    title: 'AI-Powered Chatbot',
    badge: 'Conversational',
    header: 'React · LLM APIs · Contextual Memory',
    footer: 'conversational UI · buffer memory · streaming completions',
    accent: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.1)',
    accentBorder: 'rgba(168, 85, 247, 0.3)',
    nodes: [
      { id: '1', title: 'CLIENT UI', sub: 'React Chat Window', x: 80, y: 155, w: 140, h: 64, color: '#8b5cf6' },
      { id: '2', title: 'STREAM CLIENT', sub: 'SSE EventSource', x: 280, y: 155, w: 140, h: 64, color: '#06b6d4' },
      { id: '3', title: 'API ROUTER', sub: 'FastAPI / Next API', x: 480, y: 155, w: 140, h: 64, color: '#3b82f6' },
      { id: '4', title: 'MEMORY BUFFER', sub: 'Context Window', x: 680, y: 155, w: 140, h: 64, color: '#ec4899' },
      { id: '5', title: 'LLM ENGINE', sub: 'Token Streaming', x: 870, y: 155, w: 130, h: 64, color: '#10b981' },
    ],
    arrows: [
      { from: [220, 187], to: [280, 187] },
      { from: [420, 187], to: [480, 187] },
      { from: [620, 187], to: [680, 187] },
      { from: [820, 187], to: [870, 187] },
    ]
  }
];

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function generateSvg(d) {
  const nodeElements = d.nodes.map(n => {
    return `
      <g transform="translate(${n.x}, ${n.y})">
        <rect width="${n.w}" height="${n.h}" rx="10" fill="#090d16" stroke="${n.color}" stroke-opacity="0.45" stroke-width="1.5" />
        <rect width="${n.w}" height="${n.h}" rx="10" fill="${n.color}" fill-opacity="0.08" />
        <text x="${n.w / 2}" y="26" text-anchor="middle" fill="#ffffff" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="12" letter-spacing="0.05em">${escapeXml(n.title)}</text>
        <text x="${n.w / 2}" y="45" text-anchor="middle" fill="#94a3b8" font-family="Consolas, ui-monospace, monospace" font-size="11">${escapeXml(n.sub)}</text>
      </g>
    `;
  }).join('');

  const arrowElements = d.arrows.map(a => {
    const [x1, y1] = a.from;
    const [x2, y2] = a.to;
    return `
      <g>
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#475569" stroke-width="2" stroke-dasharray="3,3" />
        <circle cx="${x2 - 2}" cy="${y2}" r="3" fill="#64748b" />
      </g>
    `;
  }).join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 340" width="1080" height="340">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05070e" />
      <stop offset="50%" stop-color="#0a0f1d" />
      <stop offset="100%" stop-color="#04060b" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${d.accent}" stop-opacity="0.6" />
      <stop offset="40%" stop-color="#64748b" stop-opacity="0.2" />
      <stop offset="100%" stop-color="${d.accent}" stop-opacity="0.4" />
    </linearGradient>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Card background -->
  <rect x="8" y="8" width="1064" height="324" rx="20" fill="url(#bgGrad)" stroke="url(#borderGrad)" stroke-width="1.5" />
  <rect x="8" y="8" width="1064" height="324" rx="20" fill="url(#grid)" />

  <!-- Subtle glow spot -->
  <circle cx="540" cy="170" r="180" fill="${d.accent}" fill-opacity="0.04" />

  <!-- Header text -->
  <text x="40" y="52" fill="#94a3b8" font-family="Consolas, ui-monospace, monospace" font-size="13" letter-spacing="0.08em">${escapeXml(d.header)}</text>

  <!-- Badge top right -->
  <g transform="translate(910, 32)">
    <rect width="130" height="28" rx="14" fill="${d.accentBg}" stroke="${d.accentBorder}" stroke-width="1" />
    <text x="65" y="18" text-anchor="middle" fill="${d.accent}" font-family="Consolas, ui-monospace, monospace" font-size="11" font-weight="600">${escapeXml(d.badge)}</text>
  </g>

  <!-- Header divider -->
  <line x1="40" y1="74" x2="1040" y2="74" stroke="rgba(255, 255, 255, 0.07)" stroke-width="1" />

  <!-- Arrows -->
  ${arrowElements}

  <!-- Nodes -->
  ${nodeElements}

  <!-- Footer text -->
  <text x="540" y="302" text-anchor="middle" fill="#64748b" font-family="Consolas, ui-monospace, monospace" font-size="12" letter-spacing="0.1em">${escapeXml(d.footer)}</text>
</svg>
  `;
}

async function run() {
  for (const d of diagrams) {
    const dir = path.join(__dirname, '..', 'public', 'projects', d.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const svg = generateSvg(d);
    const coverPath = path.join(dir, 'cover.png');
    await sharp(Buffer.from(svg)).png().toFile(coverPath);
    console.log(`Generated: ${coverPath}`);
  }

  const galleryItems = [
    { dir: 'langgraph-research-agent', name: 'architecture.png', title: 'LANGGRAPH MULTI-AGENT STATE GRAPH', color: '#22d3ee' },
    { dir: 'langgraph-research-agent', name: 'pipeline-stream.png', title: 'SSE STREAMING CLIENT RUNTIME', color: '#818cf8' },
    { dir: 'fbise-adaptive-learning-platform', name: 'curriculum-flow.png', title: 'FBISE TEXTBOOK VECTOR RETRIEVAL', color: '#a855f7' },
    { dir: 'fbise-adaptive-learning-platform', name: 'quiz-adaptive.png', title: 'DYNAMIC ADAPTIVE QUIZ & MASTERY', color: '#34d399' }
  ];

  for (const item of galleryItems) {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 472" width="1080" height="472">
  <rect width="1080" height="472" rx="16" fill="#080c16" stroke="${item.color}" stroke-opacity="0.35" stroke-width="1.5"/>
  <text x="540" y="220" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-size="22" font-weight="bold" letter-spacing="0.08em">${escapeXml(item.title)}</text>
  <text x="540" y="260" text-anchor="middle" fill="#94a3b8" font-family="Consolas, monospace" font-size="14">Technical Blueprint &amp; System Architecture</text>
</svg>`;
    const out = path.join(__dirname, '..', 'public', 'projects', item.dir, item.name);
    await sharp(Buffer.from(svg)).png().toFile(out);
    console.log(`Generated gallery: ${out}`);
  }
}

run().catch(console.error);
