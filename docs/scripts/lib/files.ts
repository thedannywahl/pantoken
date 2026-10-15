import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/** Read a changed-page allowlist, preserving POSIX paths across host platforms. */
export function readPartialPages(
  path = process.env.DOCS_CHANGED_PAGES_FILE,
): Set<string> | undefined {
  if (!path) return undefined;
  const pages = JSON.parse(readFileSync(path, "utf8")) as string[];
  return new Set(pages.map((page) => page.split("\\").join("/")));
}

/** Collect files recursively; an absent source tree contributes no files. */
export function walkFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walkFiles(path) : [path];
  });
}
