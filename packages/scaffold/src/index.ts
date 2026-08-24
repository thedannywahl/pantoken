/**
 * `@pantoken/scaffold` — scaffold a starter project for a platform, with pantoken already
 * installed and wired in. Standalone; usable via `npx @pantoken/scaffold <platform>` without
 * `@pantoken/ai`.
 *
 * @module
 * @alpha
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { SCAFFOLDS } from "../generated/scaffolds.ts";

/** A platform pantoken can scaffold a starter project for. */
export type ScaffoldPlatform = keyof typeof SCAFFOLDS;

/**
 * Every scaffoldable platform key.
 *
 * @example List available platforms
 * ```ts
 * import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";
 *
 * console.log(SCAFFOLD_PLATFORMS); // → ["html", "react", "next", "angular", "web-components"]
 * ```
 */
export const SCAFFOLD_PLATFORMS: readonly ScaffoldPlatform[] = Object.keys(
  SCAFFOLDS,
) as ScaffoldPlatform[];

const SCAFFOLD_PLATFORM_SET = new Set<string>(SCAFFOLD_PLATFORMS);

function ensureScaffoldPlatform(platform: string): asserts platform is ScaffoldPlatform {
  if (SCAFFOLD_PLATFORM_SET.has(platform)) return;
  throw new Error(
    `Unknown platform "${platform}". Expected one of: ${SCAFFOLD_PLATFORMS.join(", ")}.`,
  );
}

/**
 * Scaffold a starter project for a platform, with pantoken already installed and wired in.
 *
 * @param platform - A {@link ScaffoldPlatform}.
 * @param dir - The target directory (default `"."`). Its basename (or `"pantoken-app"` for `"."`)
 *   is substituted for `{{projectName}}` in the template files.
 * @returns The paths written.
 *
 * @example Scaffold a React starter
 * ```ts
 * import { scaffoldProject } from "@pantoken/scaffold";
 *
 * scaffoldProject("react", "./my-app");
 * ```
 */
export function scaffoldProject(platform: string, dir = "."): string[] {
  ensureScaffoldPlatform(platform);
  const projectName = dir === "." ? "pantoken-app" : (dir.split("/").pop() ?? "pantoken-app");
  const written: string[] = [];
  for (const [file, content] of Object.entries(SCAFFOLDS[platform])) {
    const path = join(dir, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content.split("{{projectName}}").join(projectName));
    written.push(path);
  }
  return written;
}
