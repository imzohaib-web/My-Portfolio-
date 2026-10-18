/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const projects = [
  {
    slug: 'careerpilot-ai',
    accent: '#22d3ee',
    cardNodes: ['Resume', 'Analyzer', 'Skill Gap', 'Roadmap'],
    coverNodes: [
      { title: 'Resume', sub: 'PDF / Text' },
      { title: 'Analyzer', sub: 'Skill Mapping' },
      { title: 'Skill Gap', sub: 'Target Match' },
      { title: 'Roadmap', sub: 'Adaptive Plan' },
      { title: 'Mentor', sub: 'RAG Advisor' },
      { title: 'Interview', sub: 'AI Coach' },
    ],
  },
  {
    slug: 'fbise-adaptive-learning-platform',
    accent: '#a855f7',
    cardNodes: ['Textbooks', 'RAG Tutor', 'Quiz', 'Mastery'],
    coverNodes: [
      { title: 'Textbooks', sub: 'FBISE Curriculum' },
      { title: 'RAG Tutor', sub: 'Vector DB Grounding' },
      { title: 'Quiz Flow', sub: 'Dynamic Questions' },
      { title: 'Mastery', sub: 'Past-Paper Weight' },
      { title: 'Student UI', sub: 'Next.js Platform' },
    ],
  },
  {
    slug: 'enterprise-lms',
    accent: '#34d399',
    cardNodes: ['Auth', 'Courses', 'Assessments', 'Certificates'],
    coverNodes: [
      { title: 'React UI', sub: 'Student / Admin' },
      { title: 'Express API', sub: 'MERN Backend' },
      { title: 'Assessments', sub: 'Grading Engine' },
      { title: 'Certificates', sub: 'Dynamic Render' },
      { title: 'MongoDB', sub: 'Data Store' },
    ],
  },
  {
    slug: 'fabric-hub',
    accent: '#f59e0b',
    cardNodes: ['Client', 'API', 'MongoDB'],
    coverNodes: [
      { title: 'React Client', sub: 'Cart & Wishlist' },
      { title: 'Express API', sub: 'REST Controllers' },
      { title: 'httpOnly JWT', sub: 'Secure Auth' },
      { title: '6 Collections', sub: 'Mongoose Schemas' },
      { title: 'MongoDB', sub: 'Orders & Users' },
    ],
  },
  {
    slug: 'synthex-ai',
    accent: '#22d3ee',
    cardNodes: ['Chat UI', 'API', 'Gemini'],
    coverNodes: [
      { title: 'React 19 UI', sub: 'Vite Client' },
      { title: 'Express API', sub: 'JWT Auth Layer' },
      { title: 'MongoDB', sub: 'Chat History' },
      { title: 'Gemini API', sub: 'Token Streaming' },
    ],
  },
  {
    slug: 'hybrid-movie-recommender',
    accent: '#f59e0b',
    cardNodes: ['Cosine', 'Sentiment', '60/40 Blend', 'Picks'],
    coverNodes: [
      { title: 'User History', sub: 'Rating Vectors' },
      { title: 'Cosine Sim', sub: 'TF-IDF Metadata' },
      { title: 'Sentiment', sub: 'Review Mining' },
      { title: '60/40 Blend', sub: 'Ensemble Model' },
      { title: 'Flask API', sub: 'Top Picks Query' },
    ],
  },
  {
    slug: 'ai-job-hunting-agents',
    accent: '#a855f7',
    cardNodes: ['Resume', 'Fit Analyzer', 'Letter', 'Dispatch'],
    coverNodes: [
      { title: 'Job Crawler', sub: 'Multi-Board Scrape' },
      { title: 'Fit Analyzer', sub: 'Pinecone Vector' },
      { title: 'Resume Agent', sub: 'LangGraph Flow' },
      { title: 'Letter Agent', sub: 'Custom Cover' },
      { title: 'Dispatch', sub: 'Status Dashboard' },
    ],
  },
  {
    slug: 'rag-knowledge-assistant',
    accent: '#34d399',
    cardNodes: ['Documents', 'Chunking', 'Vector Store', 'Synthesis'],
    coverNodes: [
      { title: 'Documents', sub: 'PDF & Markdown' },
      { title: 'Chunking', sub: 'Dense Embeddings' },
      { title: 'Vector Store', sub: 'Chroma Similarity' },
      { title: 'Retriever', sub: 'Semantic Context' },
      { title: 'Synthesis', sub: 'Grounded Output' },
    ],
  },
];

function generateCardSvg(project) {
  const vbW = 1200;
  const vbH = 480;
  const safeMargin = 48;
  const fontSize = 34;
  const nodeH = 100;
  const nodeY = (vbH - nodeH) / 2; // 190

  const n = project.cardNodes.length;
  // Compute required width for each label
  const nodeWidths = project.cardNodes.map((label) => {
    const estTextW = Math.ceil(label.length * fontSize * 0.62);
    // At least estTextW + 36, and at least 170
    return Math.max(170, estTextW + 36);
  });

  const totalNodeWidth = nodeWidths.reduce((a, b) => a + b, 0);
  const availableSpace = vbW - safeMargin * 2 - totalNodeWidth;
  const gap = Math.max(56, availableSpace / (n - 1));

  // Compute node X positions
  let currentX = safeMargin;
  const nodes = [];
  for (let i = 0; i < n; i++) {
    const w = nodeWidths[i];
    nodes.push({
      label: project.cardNodes[i],
      x: currentX,
      y: nodeY,
      w,
      h: nodeH,
    });
    currentX += w + gap;
  }

  // Adjust if right edge goes slightly beyond vbW - safeMargin
  const rightEdge = nodes[nodes.length - 1].x + nodes[nodes.length - 1].w;
  const diff = vbW - safeMargin - rightEdge;
  if (Math.abs(diff) > 1) {
    const shift = diff / 2;
    for (const node of nodes) {
      node.x += shift;
    }
  }

  // Build arrows
  const arrows = [];
  for (let i = 0; i < n - 1; i++) {
    const fromX = nodes[i].x + nodes[i].w;
    const toX = nodes[i + 1].x;
    const y = nodeY + nodeH / 2;
    arrows.push({ from: [fromX, y], to: [toX, y] });
  }

  const nodesSvg = nodes
    .map((node) => {
      const cx = node.x + node.w / 2;
      const cy = node.y + node.h / 2 + 11;
      return `
    <g>
      <rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="20" fill="${project.accent}" fill-opacity="0.20" stroke="${project.accent}" stroke-opacity="0.70" stroke-width="2.5" />
      <text x="${cx}" y="${cy}" text-anchor="middle" fill="#f4f4f5" font-family="Inter, -apple-system, system-ui, sans-serif" font-weight="700" font-size="${fontSize}" letter-spacing="0.03em">${node.label}</text>
    </g>`;
    })
    .join('\n');

  const arrowsSvg = arrows
    .map((a) => {
      const [x1, y1] = a.from;
      const [x2, y2] = a.to;
      return `
    <g>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#71717a" stroke-width="3" stroke-dasharray="6,6" />
      <circle cx="${x2 - 4}" cy="${y2}" r="5" fill="${project.accent}" />
    </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480">
  <defs>
    <radialGradient id="cardGlow-${project.slug}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${project.accent}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="${project.accent}" stop-opacity="0" />
    </radialGradient>
    <pattern id="cardGrid-${project.slug}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="480" fill="#07080d" />
  <rect width="1200" height="480" fill="url(#cardGrid-${project.slug})" />
  <circle cx="600" cy="240" r="280" fill="url(#cardGlow-${project.slug})" />

  <!-- Connecting Arrows -->
  ${arrowsSvg}

  <!-- Nodes -->
  ${nodesSvg}
</svg>`;
}

function generateCoverSvg(project) {
  const vbW = 1600;
  const vbH = 640;
  const safeMargin = 52;
  const fontSize = 24;
  const subFontSize = 16;
  const nodeH = 110;
  const nodeY = (vbH - nodeH) / 2; // 265

  const n = project.coverNodes.length;
  // Compute required width for each node
  const nodeWidths = project.coverNodes.map((item) => {
    const estTitleW = Math.ceil(item.title.length * fontSize * 0.62);
    const estSubW = Math.ceil(item.sub.length * subFontSize * 0.62);
    const maxEst = Math.max(estTitleW, estSubW);
    return Math.max(180, maxEst + 40);
  });

  const totalNodeWidth = nodeWidths.reduce((a, b) => a + b, 0);
  const availableSpace = vbW - safeMargin * 2 - totalNodeWidth;
  const gap = Math.max(48, availableSpace / (n - 1));

  let currentX = safeMargin;
  const nodes = [];
  for (let i = 0; i < n; i++) {
    const w = nodeWidths[i];
    nodes.push({
      title: project.coverNodes[i].title,
      sub: project.coverNodes[i].sub,
      x: currentX,
      y: nodeY,
      w,
      h: nodeH,
    });
    currentX += w + gap;
  }

  // Center horizontally if leftover
  const rightEdge = nodes[nodes.length - 1].x + nodes[nodes.length - 1].w;
  const diff = vbW - safeMargin - rightEdge;
  if (Math.abs(diff) > 1) {
    const shift = diff / 2;
    for (const node of nodes) {
      node.x += shift;
    }
  }

  // Build arrows
  const arrows = [];
  for (let i = 0; i < n - 1; i++) {
    const fromX = nodes[i].x + nodes[i].w;
    const toX = nodes[i + 1].x;
    const y = nodeY + nodeH / 2;
    arrows.push({ from: [fromX, y], to: [toX, y] });
  }

  const nodesSvg = nodes
    .map((node) => {
      const cx = node.x + node.w / 2;
      const titleY = node.y + 46;
      const subY = node.y + 78;
      return `
    <g>
      <rect x="${node.x}" y="${node.y}" width="${node.w}" height="${node.h}" rx="18" fill="${project.accent}" fill-opacity="0.20" stroke="${project.accent}" stroke-opacity="0.70" stroke-width="2.5" />
      <text x="${cx}" y="${titleY}" text-anchor="middle" fill="#ffffff" font-family="Inter, -apple-system, system-ui, sans-serif" font-weight="700" font-size="${fontSize}" letter-spacing="0.04em">${node.title}</text>
      <text x="${cx}" y="${subY}" text-anchor="middle" fill="#a1a1aa" font-family="Consolas, ui-monospace, monospace" font-size="${subFontSize}">${node.sub}</text>
    </g>`;
    })
    .join('\n');

  const arrowsSvg = arrows
    .map((a) => {
      const [x1, y1] = a.from;
      const [x2, y2] = a.to;
      return `
    <g>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#52525b" stroke-width="3" stroke-dasharray="6,6" />
      <circle cx="${x2 - 4}" cy="${y2}" r="5" fill="${project.accent}" />
    </g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 640" width="1600" height="640">
  <defs>
    <radialGradient id="coverGlow-${project.slug}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${project.accent}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="${project.accent}" stop-opacity="0" />
    </radialGradient>
    <pattern id="coverGrid-${project.slug}" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1600" height="640" fill="#07080d" />
  <rect width="1600" height="640" fill="url(#coverGrid-${project.slug})" />
  <circle cx="800" cy="320" r="340" fill="url(#coverGlow-${project.slug})" />

  <!-- Connecting Arrows -->
  ${arrowsSvg}

  <!-- Nodes -->
  ${nodesSvg}
</svg>`;
}

function run() {
  for (const project of projects) {
    const dir = path.join(__dirname, '..', 'public', 'projects', project.slug);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const cardSvg = generateCardSvg(project);
    const cardPath = path.join(dir, 'cover-card.svg');
    fs.writeFileSync(cardPath, cardSvg, 'utf8');
    console.log(`Generated: ${cardPath}`);

    const coverSvg = generateCoverSvg(project);
    const coverPath = path.join(dir, 'cover.svg');
    fs.writeFileSync(coverPath, coverSvg, 'utf8');
    console.log(`Generated: ${coverPath}`);
  }
}

run();
