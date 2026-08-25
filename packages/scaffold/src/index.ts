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
import { producePreset } from "bingo-stratum";
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
) as readonly ScaffoldPlatform[];

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

  // Get the preset for this platform
  const preset = PRESET_LEDGER[platform];

  // Use Bingo stratum to render the preset with options
  try {
    const creation = producePreset(preset, {
      offline: true,
      options: { name: projectName },
    });

    // Write the files created by the preset
    if (creation.files) {
      for (const [file, rawContent] of Object.entries(creation.files)) {
        const path = join(dir, file);
        mkdirSync(dirname(path), { recursive: true });
        // Handle both string and Buffer/ArrayBuffer content types
        const content =
          rawContent instanceof ArrayBuffer ? Buffer.from(rawContent) : String(rawContent);
        writeFileSync(path, content);
        written.push(path);
      }
    }
  } catch {
    // Fallback to scaffold template system if Bingo rendering fails
    // This allows incremental adoption of Bingo templates
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
  }

  return written;
}
