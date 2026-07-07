/**
 * Validate locale content parity for docs.
 *
 * Ensures HU guide pages mirror root guide routes and required locale API sidebars exist.
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const docsRoot = join(import.meta.dirname, "..");
const rootGuideDir = join(docsRoot, "guide");
const huGuideDir = join(docsRoot, "hu/guide");

const requiredFiles = [
  join(docsRoot, "index.md"),
  join(docsRoot, "hu/index.md"),
  join(docsRoot, "api/typedoc-sidebar.json"),
  join(docsRoot, "hu/api/typedoc-sidebar.json"),
];

const listMarkdownBasenames = (dir: string): Set<string> => {
  const names = readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
  return new Set(names);
};

const missingRequired = requiredFiles.filter((filePath) => !existsSync(filePath));

if (missingRequired.length > 0) {
  console.error("Missing required locale files:");
  for (const filePath of missingRequired) {
    console.error(`- ${filePath}`);
  }
  process.exit(1);
}

const rootPages = listMarkdownBasenames(rootGuideDir);
const huPages = listMarkdownBasenames(huGuideDir);

const missingInHu = [...rootPages].filter((page) => !huPages.has(page));
const extraInHu = [...huPages].filter((page) => !rootPages.has(page));

if (missingInHu.length > 0 || extraInHu.length > 0) {
  console.error("Locale parity check failed for guide pages.");
  if (missingInHu.length > 0) {
    console.error("Missing Hungarian pages:");
    for (const page of missingInHu) {
      console.error(`- hu/guide/${page}.md`);
    }
  }
  if (extraInHu.length > 0) {
    console.error("Hungarian-only pages without root equivalent:");
    for (const page of extraInHu) {
      console.error(`- hu/guide/${page}.md`);
    }
  }
  process.exit(1);
}

console.log(
  `Locale parity OK: ${rootPages.size} guide pages matched and required locale files are present.`,
);
