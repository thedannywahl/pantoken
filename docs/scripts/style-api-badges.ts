import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BADGE_CLASS_BY_LABEL } from "./api-badge-classes.ts";

const docsRoot = join(import.meta.dirname, "..");
const apiRoot = join(docsRoot, "api");

const BADGE_LABELS = Object.keys(BADGE_CLASS_BY_LABEL) as (keyof typeof BADGE_CLASS_BY_LABEL)[];

const walkMarkdownFiles = (dir: string): string[] => {
  if (!existsSync(dir)) return [];

  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
    } else if (fullPath.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
};

const styleBadges = (markdown: string): string => {
  let next = markdown;

  for (const label of BADGE_LABELS) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const marker = new RegExp(`^\\*\\*\`${escaped}\`\\*\\*$`, "gm");
    next = next.replace(marker, `<span class="${BADGE_CLASS_BY_LABEL[label]}">${label}</span>`);
  }

  return next;
};

const build = (): void => {
  const files = walkMarkdownFiles(apiRoot);
  let changed = 0;

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const output = styleBadges(source);
    if (output !== source) {
      writeFileSync(file, output);
      changed += 1;
    }
  }

  console.log(`✓ API badges: styled ${changed} markdown file(s)`);
};

build();
