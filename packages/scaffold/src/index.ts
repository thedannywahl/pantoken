/**
 * `@pantoken/scaffold` — scaffold a starter project for a platform, with pantoken already
 * installed and wired in. Standalone; usable via `npx @pantoken/scaffold <platform>` without
 * `@pantoken/ai`.
 *
 * Powered by Bingo presets: each platform exports a preset that defines its scaffold structure.
 *
 * @module
 * @alpha
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { SCAFFOLDS } from "../generated/scaffolds.ts";
import { PRESET_LEDGER } from "../generated/preset-ledger.ts";

/** A platform pantoken can scaffold a starter project for. */
export type ScaffoldPlatform = keyof typeof PRESET_LEDGER;

/**
 * Every scaffoldable platform key (discovered from available presets).
 *
 * @example List available platforms
 * ```ts
 * import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";
 *
 * console.log(SCAFFOLD_PLATFORMS); // → ["components", "react", "vue", "web-components"]
 * ```
 */
export const SCAFFOLD_PLATFORMS: readonly ScaffoldPlatform[] = Object.keys(
  PRESET_LEDGER,
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
export async function scaffoldProject(platform: string, dir = "."): Promise<string[]> {
  ensureScaffoldPlatform(platform);
  const projectName = dir === "." ? "pantoken-app" : (dir.split("/").pop() ?? "pantoken-app");
  const written: string[] = [];

  // Validate platform is available in the preset ledger
  // The preset is exported by each platform package and available in PRESET_LEDGER
  // Future: invoke preset with Bingo to render template
  // For now, fall back to scaffold template system below
  void PRESET_LEDGER[platform]; // Ensure platform has a registered preset

  // Write platform-specific scaffold templates
  const templates = SCAFFOLDS[platform as keyof typeof SCAFFOLDS];
  if (templates) {
    for (const [file, content] of Object.entries(templates)) {
      const substituted = content.replaceAll("{{projectName}}", projectName);
      const path = join(dir, file);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, substituted);
      written.push(path);
    }
  }

  return written;
}
