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

/** Alternate platform names accepted alongside the canonical preset key (e.g. the pre-Bingo `html`). */
const PLATFORM_ALIASES: Record<string, ScaffoldPlatform> = {
  html: "components",
};

/** Whether `platform` is a known {@link ScaffoldPlatform} or one of its aliases (e.g. `html`). */
export function isScaffoldPlatform(platform: string): boolean {
  return SCAFFOLD_PLATFORM_SET.has(platform) || platform in PLATFORM_ALIASES;
}

function resolveScaffoldPlatform(platform: string): ScaffoldPlatform {
  const resolved = PLATFORM_ALIASES[platform] ?? platform;
  if (SCAFFOLD_PLATFORM_SET.has(resolved)) return resolved as ScaffoldPlatform;
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
  const resolvedPlatform = resolveScaffoldPlatform(platform);
  const projectName = dir === "." ? "pantoken-app" : (dir.split("/").pop() ?? "pantoken-app");
  const written: string[] = [];

  // Get the preset for this platform
  const preset = PRESET_LEDGER[resolvedPlatform];

  // Use Bingo stratum to render the preset with options
  try {
    const creation = producePreset(preset, {
      offline: true,
      options: { name: projectName },
    });

    // Write the files created by the preset
    for (const [file, rawContent] of Object.entries(creation.files ?? {})) {
      const path = join(dir, file);
      mkdirSync(dirname(path), { recursive: true });
      // Handle both string and Buffer/ArrayBuffer content types
      const content =
        rawContent instanceof ArrayBuffer ? Buffer.from(rawContent) : (rawContent as string);
      writeFileSync(path, content);
      written.push(path);
    }
  } catch {
    // Preset threw — fall through to the legacy template system below.
  }

  // Presets with no blocks yet (or a failed render) produce no files — fall back to the legacy
  // scaffold template system so every platform still scaffolds something.
  if (written.length === 0) {
    const templates = SCAFFOLDS[resolvedPlatform as keyof typeof SCAFFOLDS];
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
