import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BADGE_CLASS_BY_LABEL } from "./api-badge-classes.ts";
import { walkFiles } from "./lib/files.ts";

const docsRoot = join(import.meta.dirname, "..");
const apiRoot = join(docsRoot, "api");

const BADGE_LABELS = Object.keys(BADGE_CLASS_BY_LABEL) as (keyof typeof BADGE_CLASS_BY_LABEL)[];

/** Recursively collect every `.md` file under `dir` (returns `[]` when `dir` doesn't exist). */
export const walkMarkdownFiles = (dir: string): string[] => {
  return walkFiles(dir).filter((path) => path.endsWith(".md"));
};

/**
 * Rewrite each standalone stability-badge marker (a line that is exactly `**` + backtick-wrapped label
 * + `**`) into the `<span class="…">` its badge renders with. Non-marker content is left untouched.
 */
export const styleBadges = (markdown: string): string => {
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
