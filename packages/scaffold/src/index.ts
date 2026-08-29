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
import { themeStylesheetImport, type ThemeMode, type ThemeVariant } from "./theme.ts";

export {
  themeStylesheetImport,
  validateThemeMode,
  validateThemeVariant,
  type ThemeMode,
  type ThemeVariant,
} from "./theme.ts";

/**
 * A platform pantoken can scaffold a starter project for — either preset-ledger-backed (Bingo)
 * or a legacy template-only entry (e.g. `canvas-theme-editor`) with no preset yet.
 */
export type ScaffoldPlatform = keyof typeof PRESET_LEDGER;

/**
 * Every scaffoldable platform key (discovered from available presets, plus any legacy
 * template-only platforms not yet backed by a preset).
 *
 * @example List available platforms
 * ```ts
 * import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";
 *
 * console.log(SCAFFOLD_PLATFORMS); // → ["components", "react", "vue", "web-components"]
 * ```
 */
export const SCAFFOLD_PLATFORMS: readonly ScaffoldPlatform[] = Array.from(
  new Set([...Object.keys(PRESET_LEDGER), ...Object.keys(SCAFFOLDS)]),
) as readonly ScaffoldPlatform[];

const SCAFFOLD_PLATFORM_SET = new Set<string>(SCAFFOLD_PLATFORMS);

/** Alternate platform names accepted alongside the canonical preset key (e.g. the pre-Bingo `html`). */
const PLATFORM_ALIASES: Record<string, ScaffoldPlatform> = {
  html: "components",
  "theme-editor": "canvas-theme-editor",
};

/** Whether `platform` is a known {@link ScaffoldPlatform} or one of its aliases (e.g. `html`). */
export function isScaffoldPlatform(platform: string): boolean {
  return SCAFFOLD_PLATFORM_SET.has(platform) || platform in PLATFORM_ALIASES;
}

/**
 * Resolves `platform` to its canonical {@link ScaffoldPlatform} key, following aliases (e.g.
 * `"theme-editor"` → `"canvas-theme-editor"`). Exported so callers (e.g. the CLI's next-steps
 * printer) can key off the same canonical platform the scaffolder itself uses.
 *
 * @throws Error when `platform` isn't a known platform or alias
 */
export function resolveScaffoldPlatform(platform: string): ScaffoldPlatform {
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
 * @param options - `theme`/`mode` select which `@pantoken/css` token sheet scaffolded files
 *   import (default `"rebrand"`/`"light"`), applied across every platform.
 * @returns The paths written.
 *
 * @example Scaffold a React starter
 * ```ts
 * import { scaffoldProject } from "@pantoken/scaffold";
 *
 * scaffoldProject("react", "./my-app");
 * scaffoldProject("vue", "./my-vue-app", { theme: "canvas" });
 * ```
 */
export async function scaffoldProject(
  platform: string,
  dir = ".",
  options?: { theme?: ThemeVariant; mode?: ThemeMode },
): Promise<string[]> {
  const resolvedPlatform = resolveScaffoldPlatform(platform);
  const projectName = dir === "." ? "pantoken-app" : (dir.split("/").pop() ?? "pantoken-app");
  const cssImport = themeStylesheetImport(options?.theme, options?.mode);
  const written: string[] = [];

  // Get the preset for this platform (undefined for template-only platforms, e.g. canvas-theme-editor)
  const preset = PRESET_LEDGER[resolvedPlatform as keyof typeof PRESET_LEDGER];

  // Use Bingo stratum to render the preset with options (skipped for template-only platforms)
  try {
    if (!preset) throw new Error(`No preset for platform "${resolvedPlatform}".`);
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
        const substituted = content
          .replaceAll("{{projectName}}", projectName)
          .replaceAll("{{pantokenCssImport}}", cssImport);
        const path = join(dir, file);
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, substituted);
        written.push(path);
      }
    }
  }

  return written;
}
