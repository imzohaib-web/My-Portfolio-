import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsDir = path.join(__dirname, '..', 'public', 'projects');

const projectSlugs = [
  'careerpilot-ai',
  'fbise-adaptive-learning-platform',
  'enterprise-lms',
  'fabric-hub',
  'synthex-ai',
  'hybrid-movie-recommender',
  'ai-job-hunting-agents',
  'rag-knowledge-assistant',
];

let totalErrors = 0;

for (const slug of projectSlugs) {
  const dir = path.join(projectsDir, slug);
  if (!fs.existsSync(dir)) {
    console.error(`[ERROR] Directory not found: ${dir}`);
    totalErrors++;
    continue;
  }

  // Check cardImage (cover-card.svg)
  const cardPath = path.join(dir, 'cover-card.svg');
  if (!fs.existsSync(cardPath)) {
    console.error(`[ERROR] Missing card SVG: ${cardPath}`);
    totalErrors++;
  } else {
    const cardContent = fs.readFileSync(cardPath, 'utf8');
    // viewBox 1200x480
    if (!cardContent.includes('viewBox="0 0 1200 480"')) {
      console.error(`[ERROR] ${cardPath} has invalid viewBox, expected '0 0 1200 480'`);
      totalErrors++;
    }

    // Extract all rect nodes and texts
    const rectMatches = [...cardContent.matchAll(/<rect\s+x="([\d.]+)"\s+y="([\d.]+)"\s+width="([\d.]+)"\s+height="([\d.]+)"/g)];
    // Exclude full background rects
    const nodeRects = rectMatches.filter(m => parseFloat(m[3]) < 1200);

    const textMatches = [...cardContent.matchAll(/<text[^>]*font-size="(\d+)"[^>]*>([^<]+)<\/text>/g)];

    if (nodeRects.length !== textMatches.length) {
      console.error(`[ERROR] ${cardPath} has ${nodeRects.length} nodes but ${textMatches.length} text elements`);
      totalErrors++;
    }

    for (let i = 0; i < textMatches.length; i++) {
      const fontSize = parseFloat(textMatches[i][1]);
      const label = textMatches[i][2];
      const rect = nodeRects[i];
      if (!rect) continue;
      const x = parseFloat(rect[1]);
      const y = parseFloat(rect[2]);
      const w = parseFloat(rect[3]);
      const h = parseFloat(rect[4]);

      // Check characters count <= 12
      if (label.length > 12) {
        console.error(`[ERROR] ${cardPath}: label "${label}" exceeds 12 chars (${label.length})`);
        totalErrors++;
      }

      // Check font size >= 34
      if (fontSize < 34) {
        console.error(`[ERROR] ${cardPath}: label "${label}" font-size ${fontSize} < 34`);
        totalErrors++;
      }

      // Check fit rule: characters * fontSize * 0.62 <= nodeWidth - 24
      const estWidth = label.length * fontSize * 0.62;
      if (estWidth > w - 24) {
        console.error(`[ERROR] ${cardPath}: text "${label}" estWidth ${estWidth} > ${w - 24}`);
        totalErrors++;
      }

      // Check viewBox boundaries (safe margin 48px)
      if (x < 40 || x + w > 1160 || y < 40 || y + h > 440) {
        console.error(`[ERROR] ${cardPath}: node "${label}" [${x}, ${y}, ${w}, ${h}] touches or exceeds safe margin`);
        totalErrors++;
      }
    }
  }

  // Check cover (cover.svg)
  const coverPath = path.join(dir, 'cover.svg');
  if (!fs.existsSync(coverPath)) {
    console.error(`[ERROR] Missing cover SVG: ${coverPath}`);
    totalErrors++;
  } else {
    const coverContent = fs.readFileSync(coverPath, 'utf8');
    if (!coverContent.includes('viewBox="0 0 1600 640"')) {
      console.error(`[ERROR] ${coverPath} has invalid viewBox, expected '0 0 1600 640'`);
      totalErrors++;
    }

    const rectMatches = [...coverContent.matchAll(/<rect\s+x="([\d.]+)"\s+y="([\d.]+)"\s+width="([\d.]+)"\s+height="([\d.]+)"/g)];
    const nodeRects = rectMatches.filter(m => parseFloat(m[3]) < 1600);

    const titleMatches = [...coverContent.matchAll(/<text[^>]*font-size="(\d+)"[^>]*>([^<]+)<\/text>/g)];
    // Cover has title + sublabel per node, so titleMatches will have 2x entries
    for (let i = 0; i < nodeRects.length; i++) {
      const rect = nodeRects[i];
      const x = parseFloat(rect[1]);
      const y = parseFloat(rect[2]);
      const w = parseFloat(rect[3]);
      const h = parseFloat(rect[4]);

      const titleEntry = titleMatches[i * 2];
      const subEntry = titleMatches[i * 2 + 1];

      if (titleEntry) {
        const fontSize = parseFloat(titleEntry[1]);
        const label = titleEntry[2];
        const estWidth = label.length * fontSize * 0.62;
        if (estWidth > w - 20) {
          console.error(`[ERROR] ${coverPath}: title "${label}" estWidth ${estWidth} > ${w - 20}`);
          totalErrors++;
        }
      }

      if (subEntry) {
        const fontSize = parseFloat(subEntry[1]);
        const subLabel = subEntry[2];
        const estWidth = subLabel.length * fontSize * 0.62;
        if (estWidth > w - 16) {
          console.error(`[ERROR] ${coverPath}: sublabel "${subLabel}" estWidth ${estWidth} > ${w - 16}`);
          totalErrors++;
        }
      }

      // Check bounds
      if (x < 40 || x + w > 1560 || y < 40 || y + h > 600) {
        console.error(`[ERROR] ${coverPath}: node [${x}, ${y}, ${w}, ${h}] touches or exceeds safe bounds`);
        totalErrors++;
      }
    }
  }
}

// Ensure only the valid project directories exist in public/projects
const subdirs = fs.readdirSync(projectsDir).filter(f => fs.statSync(path.join(projectsDir, f)).isDirectory());
for (const dirName of subdirs) {
  if (!projectSlugs.includes(dirName)) {
    console.error(`[ERROR] Obsolete or unrecognized project directory found: ${dirName}`);
    totalErrors++;
  }
}

if (totalErrors > 0) {
  console.error(`\nValidation FAILED with ${totalErrors} error(s).`);
  process.exit(1);
} else {
  console.log(`\nAll SVG labels, node widths, aspects (5:2), and viewBox boundaries passed validation!`);
  process.exit(0);
}
