#!/usr/bin/env node
// Parse the awesome-list README.md and emit structured JSON for the site.
// Single source of truth: ../README.md. Re-run on every build.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const READMEpath = resolve(__dirname, "../../README.md");
const OUT_PATH = resolve(__dirname, "../src/data/projects.json");

const SKIP_SECTIONS = new Set([
  "Contents",
  "Hardware Guide",
  "Communities",
  "Newsletters, Blogs & Podcasts",
  "Tutorials & Learning",
  "Contributing",
]);

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const readme = readFileSync(READMEpath, "utf-8");
const lines = readme.split("\n");

const projects = [];
const categoriesMap = new Map();

let currentSection = null;
let currentSubsection = null;

for (const line of lines) {
  const sectionMatch = line.match(/^## (?!#)(.+?)$/);
  const subsectionMatch = line.match(/^### (.+?)$/);
  const entryMatch = line.match(/^- \[(.+?)\]\((.+?)\) - (.+?)$/);

  if (sectionMatch) {
    currentSection = sectionMatch[1].trim();
    currentSubsection = null;
    continue;
  }
  if (subsectionMatch) {
    currentSubsection = subsectionMatch[1].trim();
    continue;
  }
  if (entryMatch && currentSection && !SKIP_SECTIONS.has(currentSection)) {
    const [, rawName, url, description] = entryMatch;
    const name = rawName.trim();
    const categorySlug = slugify(currentSection);
    if (!categoriesMap.has(categorySlug)) {
      categoriesMap.set(categorySlug, {
        slug: categorySlug,
        name: currentSection,
        order: categoriesMap.size,
      });
    }
    projects.push({
      slug: `${categorySlug}-${slugify(name)}`,
      name,
      url: url.trim(),
      description: description.trim().replace(/\s+/g, " "),
      category: categorySlug,
      subcategory: currentSubsection ? slugify(currentSubsection) : null,
    });
  }
}

const out = {
  generatedAt: new Date().toISOString(),
  categories: Array.from(categoriesMap.values()),
  projects,
};

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));

const counts = projects.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});
console.log(`Parsed ${projects.length} projects across ${categoriesMap.size} categories:`);
for (const [slug, n] of Object.entries(counts)) {
  console.log(`  ${n.toString().padStart(3)} ${slug}`);
}
console.log(`Wrote ${OUT_PATH}`);
