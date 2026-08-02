/**
 * Workspace auto-discovery for packages that contribute i18n strings.
 *
 * Any package in the monorepo whose `src/i18n.json` exists is automatically
 * included as a string source. The workspace globs are read from
 * `pnpm-workspace.yaml` so new top-level dirs are picked up without touching
 * this file. `discover-sources` is the only script that knows about the
 * workspace layout; everything else goes through `keys.ts`.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** A discovered package that contributes i18n strings via `src/i18n.json`. */
export interface StringSource {
  /** The npm package name read from the package's `package.json`. */
  package: string;
  /** Absolute path to the `src/i18n.json` file. */
  absolutePath: string;
}

/** Extract the `packages:` glob list from a `pnpm-workspace.yaml` string. */
export function parseWorkspaceGlobs(yaml: string): string[] {
  const globs: string[] = [];
  let inPackages = false;
  for (const line of yaml.split("\n")) {
    if (line.startsWith("packages:")) {
      inPackages = true;
      continue;
    }
    if (!inPackages) continue;
    // Stop at the next top-level key (not indented with spaces).
    if (line.length > 0 && line[0] !== " ") break;
    const match = /^\s+-\s+(.+)/.exec(line);
    if (match) globs.push(match[1].trim());
  }
  return globs;
}

/** Resolve a workspace glob to a list of package directories. */
function expandGlob(monoRoot: string, glob: string): string[] {
  if (!glob.endsWith("/*")) {
    // Direct path (e.g. "docs").
    const p = join(monoRoot, glob);
    return existsSync(p) ? [p] : [];
  }
  const parentDir = join(monoRoot, glob.slice(0, -2));
  if (!existsSync(parentDir)) return [];
  return readdirSync(parentDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => join(parentDir, e.name));
}

/**
 * Walk the monorepo and return all packages that ship a `src/i18n.json`.
 * Results are sorted by package name for deterministic key ordering.
 */
export function discoverStringSources(monoRoot: string): StringSource[] {
  const yaml = readFileSync(join(monoRoot, "pnpm-workspace.yaml"), "utf8");
  const globs = parseWorkspaceGlobs(yaml);
  const sources: StringSource[] = [];

  for (const glob of globs) {
    for (const pkgDir of expandGlob(monoRoot, glob)) {
      const i18nPath = join(pkgDir, "src", "i18n.json");
      if (!existsSync(i18nPath)) continue;
      const pkgJsonPath = join(pkgDir, "package.json");
      if (!existsSync(pkgJsonPath)) continue;
      const name = (JSON.parse(readFileSync(pkgJsonPath, "utf8")) as { name?: string }).name;
      if (name) sources.push({ package: name, absolutePath: i18nPath });
    }
  }

  return sources.sort((a, b) => a.package.localeCompare(b.package));
}
