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
import { buildTheme } from "@pantoken/canvas-theme-editor";
import { SCAFFOLDS } from "../generated/scaffolds.ts";
import { SCAFFOLD_OVERLAYS } from "../generated/scaffold-overlays.ts";
import { PRESET_LEDGER } from "../generated/preset-ledger.ts";
import { localeDirection } from "./locale.ts";
import { themeStylesheetImport, type ThemeMode, type ThemeVariant } from "./theme.ts";

/** Package managers whose commands can be reflected in scaffolded project files. */
export type ScaffoldPackageManager = "npm" | "pnpm" | "yarn" | "bun" | "deno" | "vp";

interface ScaffoldProjectOptions {
  theme?: ThemeVariant;
  mode?: ThemeMode;
  cdn?: string;
  locale?: string;
  packageManager?: ScaffoldPackageManager;
}

const SCAFFOLD_PM_COMMANDS: Record<ScaffoldPackageManager, { install: string; dev: string }> = {
  npm: { install: "npm install", dev: "npm run dev" },
  pnpm: { install: "pnpm install", dev: "pnpm run dev" },
  yarn: { install: "yarn install", dev: "yarn run dev" },
  bun: { install: "bun install", dev: "bun run dev" },
  deno: { install: "deno install", dev: "deno task dev" },
  vp: { install: "vp install", dev: "vp run dev" },
};

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

/** Writes `content` to `path`, creating parent directories as needed. */
function writeScaffoldFile(path: string, content: string | Buffer): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function shouldWriteScaffoldFile(
  file: string,
  packageManager: ScaffoldPackageManager | undefined,
): boolean {
  return (
    file !== "pnpm-workspace.yaml" ||
    !packageManager ||
    packageManager === "pnpm" ||
    packageManager === "vp"
  );
}

function applyPackageManagerCommands(
  file: string,
  content: string | Buffer,
  packageManager: ScaffoldPackageManager | undefined,
): string | Buffer {
  if (!packageManager || file !== "README.md" || typeof content !== "string") return content;
  const commands = SCAFFOLD_PM_COMMANDS[packageManager];
  return content
    .replaceAll("npm install", commands.install)
    .replaceAll("npm run dev", commands.dev);
}

/** Renders `resolvedPlatform`'s Bingo preset (if any) into `dir`; `[]` if there's no preset or it throws. */
function writePresetFiles(
  resolvedPlatform: string,
  dir: string,
  projectName: string,
  packageManager: ScaffoldPackageManager | undefined,
): string[] {
  const preset = PRESET_LEDGER[resolvedPlatform as keyof typeof PRESET_LEDGER];
  if (!preset) return [];

  try {
    const creation = producePreset(preset, { offline: true, options: { name: projectName } });
    return Object.entries(creation.files ?? {}).flatMap(([file, rawContent]) => {
      if (!shouldWriteScaffoldFile(file, packageManager)) return [];
      const path = join(dir, file);
      const baseContent = rawContent instanceof ArrayBuffer ? Buffer.from(rawContent) : rawContent;
      const content = applyPackageManagerCommands(
        file,
        baseContent as string | Buffer,
        packageManager,
      );
      writeScaffoldFile(path, content as string | Buffer);
      return [path];
    });
  } catch {
    return []; // Preset threw — the caller falls back to the legacy template system.
  }
}

/** Writes `resolvedPlatform`'s legacy `SCAFFOLDS` templates (for platforms with no preset yet). */
function writeLegacyTemplateFiles(
  resolvedPlatform: string,
  dir: string,
  locale: string,
  substitutions: Readonly<Record<string, string>>,
  packageManager: ScaffoldPackageManager | undefined,
): string[] {
  const templates = SCAFFOLDS[resolvedPlatform as keyof typeof SCAFFOLDS];
  if (!templates) return [];
  const localized = { ...templates, ...SCAFFOLD_OVERLAYS[locale]?.[resolvedPlatform] };

  return Object.entries(localized).flatMap(([file, content]) => {
    if (!shouldWriteScaffoldFile(file, packageManager)) return [];
    const substituted = Object.entries(substitutions).reduce(
      (text, [token, value]) => text.replaceAll(`{{${token}}}`, value),
      content,
    );
    const resolved = applyPackageManagerCommands(file, substituted, packageManager) as string;
    const path = join(dir, file);
    writeScaffoldFile(path, resolved);
    return [path];
  });
}

/**
 * Builds canvas-theme-editor's `theme.css`/`theme.js` for the chosen CDN provider/theme/mode at
 * scaffold time (rather than shipping a pre-baked jsDelivr/rebrand default); `[]` for every other
 * platform.
 */
function writeCanvasThemeEditorAssets(
  resolvedPlatform: string,
  dir: string,
  options: { theme?: ThemeVariant; mode?: ThemeMode; cdn?: string } | undefined,
): string[] {
  if (resolvedPlatform !== "canvas-theme-editor") return [];

  const { css, js } = buildTheme({
    provider: options?.cdn,
    theme: options?.theme,
    mode: options?.mode,
  });
  return (["theme.css", "theme.js"] as const).map((file, i) => {
    const path = join(dir, file);
    writeScaffoldFile(path, i === 0 ? css : js);
    return path;
  });
}

/**
 * Scaffold a starter project for a platform, with pantoken already installed and wired in.
 *
 * @param platform - A {@link ScaffoldPlatform}.
 * @param dir - The target directory (default `"."`). Its basename (or `"pantoken-app"` for `"."`)
 *   is substituted for `{{projectName}}` in the template files.
 * @param options - `theme`/`mode` select which `@pantoken/css` token sheet scaffolded files
 *   import (default `"rebrand"`/`"light"`), applied across every platform. `cdn` selects the CDN
 *   provider `canvas-theme-editor`'s `theme.css`/`theme.js` are built for (default jsDelivr);
 *   ignored by every other platform. `locale` (default `"en"`) sets the generated markup's
 *   `lang`/`dir` attributes.
 * @returns The paths written.
 *
 * @example Scaffold a React starter
 * ```ts
 * import { scaffoldProject } from "@pantoken/scaffold";
 *
 * scaffoldProject("react", "./my-app");
 * scaffoldProject("vue", "./my-vue-app", { theme: "canvas", locale: "hu" });
 * ```
 */
export async function scaffoldProject(
  platform: string,
  dir = ".",
  options?: ScaffoldProjectOptions,
): Promise<string[]> {
  const resolvedPlatform = resolveScaffoldPlatform(platform);
  const projectName = dir === "." ? "pantoken-app" : (dir.split("/").pop() ?? "pantoken-app");
  const locale = options?.locale ?? "en";
  const substitutions = {
    projectName,
    pantokenCssImport: themeStylesheetImport(options?.theme, options?.mode),
    locale,
    dir: localeDirection(locale),
  };

  // Bingo presets with no blocks yet (or a failed render) produce no files — fall back to the
  // legacy scaffold template system so every platform still scaffolds something.
  const written = writePresetFiles(resolvedPlatform, dir, projectName, options?.packageManager);
  if (written.length === 0) {
    written.push(
      ...writeLegacyTemplateFiles(
        resolvedPlatform,
        dir,
        locale,
        substitutions,
        options?.packageManager,
      ),
    );
  }
  written.push(...writeCanvasThemeEditorAssets(resolvedPlatform, dir, options));

  return written;
}
