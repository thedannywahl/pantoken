/**
 * `@pantoken/cli` — `pantoken generate <target>`.
 *
 * Emits native and other non-npm design-token source into a consumer repo — the targets that don't
 * fit the npm-package model. Supported now: `swift` (with an SPM `Package.swift` manifest stub, so
 * registry publishing is later a config flip), `android`, `compose`, `flutter`, `wordpress`,
 * `vanilla`, `drupal`, `swatches`, `rust`, `icon-font`, `pendo`, `jekyll`, `hugo`, and `mintlify`.
 *
 * @module
 * @beta
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { generateAndroid } from "@pantoken/android";
import { generateCompose } from "@pantoken/compose";
import { generateFlutter } from "@pantoken/flutter";
import { buildIconFont } from "@pantoken/icon-font";
import { buildPendoCss } from "@pantoken/pendo";
import { toDrupalTheme } from "@pantoken/drupal";
import { toHugoAssets } from "@pantoken/hugo";
import { toJekyllAssets } from "@pantoken/jekyll";
import { toMintlifyConfig } from "@pantoken/mintlify";
import { generateRust } from "@pantoken/rust";
import { toAse, toGpl, toSketchPalette, toSvg, toSwatches } from "@pantoken/swatches";
import { generateSwift } from "@pantoken/swift";
import { byTheme } from "@pantoken/tokens";
import { toVanillaVariables } from "@pantoken/vanilla";
import { toThemeJson } from "@pantoken/wordpress";
import type { Theme } from "@pantoken/model";

/** The parsed CLI invocation. */
export interface CliArgs {
  command: string;
  target: string;
  out: string;
  theme: Theme;
  className: string;
  /** Icon names to emit as native assets (from `--icons a,b,c`). */
  icons?: string[];
  /** Output format, for targets that support several (e.g. `swatches --format ase`). */
  format?: string;
  /** Pendo: skip `@scope` wrapping (`--no-scope`). */
  noScope?: boolean;
  /** Pendo: skip `!important` (`--no-important`). */
  noImportant?: boolean;
  /** Pendo: skip token pruning (`--no-prune`). */
  noPrune?: boolean;
}

const SUPPORTED = new Set([
  "swift",
  "android",
  "compose",
  "flutter",
  "wordpress",
  "vanilla",
  "drupal",
  "swatches",
  "rust",
  "icon-font",
  "pendo",
  "jekyll",
  "hugo",
  "mintlify",
]);
const PLANNED = new Set<string>();
const VALID_THEMES = new Set(["rebrand", "canvas", "canvasHighContrast"]);
const KNOWN_FLAGS = new Set([
  "out",
  "theme",
  "class",
  "icons",
  "format",
  "no-scope",
  "no-important",
  "no-prune",
]);
const VALID_CLASS_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const RUST_FORMATS = new Set(["egui", "iced"]);

/** Write an array of path+content assets into `outDir`, creating intermediate directories. */
function writeAssets(
  outDir: string,
  assets: ReadonlyArray<{ path: string; content: string | Buffer | Uint8Array }>,
): void {
  for (const asset of assets) {
    const file = join(outDir, asset.path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, asset.content);
    console.log(`✓ pantoken: wrote ${file}`);
  }
}

/** Parse argv into positionals and a validated flags record; throw on unknown flags. */
function parseFlags(argv: readonly string[]): {
  positionals: string[];
  flags: Record<string, string>;
} {
  const positionals: string[] = [];
  const flags: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (!KNOWN_FLAGS.has(key))
        throw new Error(`Unknown flag "--${key}". Run pantoken generate --help for usage.`);
      if (next === undefined || next.startsWith("--")) flags[key] = "true";
      else flags[key] = argv[++i];
    } else {
      positionals.push(arg);
    }
  }
  return { positionals, flags };
}

/**
 * Parse `generate <target> [--out dir] [--theme t] [--class Name]`.
 *
 * @example Positional target plus value flags
 * ```ts
 * import { parseArgs } from "@pantoken/cli";
 *
 * parseArgs(["generate", "swift", "--out", "./ios", "--theme", "canvas"]);
 * // → { command: "generate", target: "swift", out: "./ios", theme: "canvas",
 * //     className: "PanTokens", … }
 * ```
 *
 * @example Boolean flags and a comma-separated --icons list
 * ```ts
 * import { parseArgs } from "@pantoken/cli";
 *
 * const args = parseArgs(["generate", "pendo", "--no-scope", "--icons", "arrow-left,check-mark"]);
 * args.noScope; // → true
 * args.icons;   // → ["arrow-left", "check-mark"]
 * ```
 */
export function parseArgs(argv: readonly string[]): CliArgs {
  const { positionals, flags } = parseFlags(argv);
  const theme = flags.theme ?? "rebrand";
  if (!VALID_THEMES.has(theme))
    throw new Error(`Unknown theme "${theme}". Valid themes: ${[...VALID_THEMES].join(", ")}.`);
  const className = flags.class ?? "PanTokens";
  if (!VALID_CLASS_RE.test(className))
    throw new Error(`Invalid class name "${className}". Must be a valid identifier.`);
  return {
    command: positionals[0] ?? "",
    target: positionals[1] ?? "",
    out: flags.out ?? "./pantoken-out",
    theme: theme as Theme,
    className,
    icons: flags.icons ? flags.icons.split(",").filter(Boolean) : undefined,
    format: flags.format,
    noScope: "no-scope" in flags,
    noImportant: "no-important" in flags,
    noPrune: "no-prune" in flags,
  };
}

const SWIFT_PACKAGE_MANIFEST = (name: string) =>
  `// swift-tools-version:5.9
// Generated by @pantoken/cli — publish to SwiftPM by pushing this package.
import PackageDescription

let package = Package(
    name: "${name}",
    platforms: [.iOS(.v15), .macOS(.v12)],
    products: [.library(name: "${name}", targets: ["${name}"])],
    targets: [.target(name: "${name}", path: "Sources/${name}")]
)
`;

/** Validate the invocation is a runnable `generate <target>`; throw a usage error otherwise. */
function assertGenerateTarget(args: CliArgs): void {
  if (args.command !== "generate") {
    throw new Error(
      `Unknown command "${args.command}". Usage: pantoken generate <target> [--out dir] [--theme t]`,
    );
  }
  if (PLANNED.has(args.target)) {
    throw new Error(
      `Target "${args.target}" is planned but not implemented yet. Available now: ${[...SUPPORTED].join(", ")}.`,
    );
  }
  if (!SUPPORTED.has(args.target)) {
    throw new Error(`Unknown target "${args.target}". Available: ${[...SUPPORTED].join(", ")}.`);
  }
}

/** Generate Swift token source plus an SPM `Package.swift` manifest stub. */
async function runSwift(args: CliArgs): Promise<void> {
  // Emit into Sources/<className> so the SPM manifest stub finds it.
  const sourcesDir = join(args.out, "Sources", args.className);
  const file = await generateSwift({
    outDir: sourcesDir,
    theme: args.theme,
    className: args.className,
    icons: args.icons,
  });
  const manifestPath = join(args.out, "Package.swift");
  mkdirSync(dirname(manifestPath), { recursive: true });
  writeFileSync(manifestPath, SWIFT_PACKAGE_MANIFEST(args.className));
  console.log(`✓ pantoken: wrote ${file}`);
  console.log(`✓ pantoken: wrote ${manifestPath} (SwiftPM manifest stub)`);
}

/** Generate the Android token resources. */
async function runAndroid(args: CliArgs): Promise<void> {
  const files = await generateAndroid({ outDir: args.out, theme: args.theme, icons: args.icons });
  for (const file of files) console.log(`✓ pantoken: wrote ${file}`);
}

/** Generate the Jetpack Compose token source. */
async function runCompose(args: CliArgs): Promise<void> {
  const file = await generateCompose({
    outDir: args.out,
    theme: args.theme,
    className: args.className,
  });
  console.log(`✓ pantoken: wrote ${file}`);
}

/** Generate the Flutter token source. */
async function runFlutter(args: CliArgs): Promise<void> {
  const file = await generateFlutter({
    outDir: args.out,
    theme: args.theme,
    className: args.className,
    icons: args.icons,
  });
  console.log(`✓ pantoken: wrote ${file}`);
}

/** Write the WordPress `theme.json`. */
function runWordpress(args: CliArgs): void {
  mkdirSync(args.out, { recursive: true });
  const file = join(args.out, "theme.json");
  writeFileSync(file, `${JSON.stringify(toThemeJson(byTheme(args.theme)), null, 2)}\n`);
  console.log(`✓ pantoken: wrote ${file}`);
}

/** Write the vanilla `variables.json`. */
function runVanilla(args: CliArgs): void {
  mkdirSync(args.out, { recursive: true });
  const file = join(args.out, "variables.json");
  writeFileSync(file, `${JSON.stringify(toVanillaVariables(byTheme(args.theme)), null, 2)}\n`);
  console.log(`✓ pantoken: wrote ${file}`);
}

/** Write the Mintlify `docs.json`. */
function runMintlify(args: CliArgs): void {
  mkdirSync(args.out, { recursive: true });
  const file = join(args.out, "docs.json");
  writeFileSync(file, `${JSON.stringify(toMintlifyConfig(byTheme(args.theme)), null, 2)}\n`);
  console.log(`✓ pantoken: wrote ${file}`);
}

/** Write the Drupal theme assets. */
function runDrupal(args: CliArgs): void {
  writeAssets(args.out, toDrupalTheme());
}

/** Write the Rust token source for the egui or iced format. */
function runRust(args: CliArgs): void {
  const format = args.format ?? "egui";
  if (!RUST_FORMATS.has(format))
    throw new Error(`Unknown Rust format "${format}". Use egui or iced.`);
  const file = args.out.includes(".") ? args.out : join(args.out, "tokens.rs");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, generateRust({ format: format as "egui" | "iced", theme: args.theme }));
  console.log(`✓ pantoken: wrote ${file}`);
}

/** Write a swatch palette in the requested format (ase, gpl, sketch, or svg). */
function runSwatches(args: CliArgs): void {
  const format = args.format ?? "ase";
  const swatches = toSwatches(byTheme(args.theme));
  const ext = format === "sketch" ? "sketchpalette" : format;
  const file = args.out.includes(".") ? args.out : join(args.out, `instructure.${ext}`);
  mkdirSync(dirname(file), { recursive: true });
  if (format === "ase") writeFileSync(file, toAse(swatches));
  else if (format === "gpl") writeFileSync(file, toGpl(swatches));
  else if (format === "sketch")
    writeFileSync(file, `${JSON.stringify(toSketchPalette(swatches), null, 2)}\n`);
  else if (format === "svg") writeFileSync(file, toSvg(swatches));
  else throw new Error(`Unknown swatch format "${format}". Use ase, gpl, sketch, or svg.`);
  console.log(`✓ pantoken: wrote ${file}`);
}

/** Build and write the icon font (TTF, WOFF2, CSS, and codepoints). */
async function runIconFont(args: CliArgs): Promise<void> {
  const font = await buildIconFont({
    theme: args.theme,
    icons: args.icons,
    fontName: args.className,
  });
  mkdirSync(args.out, { recursive: true });
  const ttf = join(args.out, `${args.className}.ttf`);
  const woff2 = join(args.out, `${args.className}.woff2`);
  const cssFile = join(args.out, "icons.css");
  const codepoints = join(args.out, "codepoints.json");
  writeFileSync(ttf, font.ttf);
  writeFileSync(woff2, font.woff2);
  writeFileSync(cssFile, font.css);
  writeFileSync(codepoints, `${JSON.stringify(font.codepoints, null, 2)}\n`);
  for (const file of [ttf, woff2, cssFile, codepoints]) {
    console.log(`✓ pantoken: wrote ${file}`);
  }
}

/** Write the Jekyll or Hugo static-site assets (same asset shape, different source). */
function runStaticSite(args: CliArgs): void {
  writeAssets(args.out, args.target === "jekyll" ? toJekyllAssets() : toHugoAssets());
}

/** Write the Pendo `global.css`, honouring the `--no-scope`/`--no-important`/`--no-prune` flags. */
function runPendo(args: CliArgs): void {
  mkdirSync(args.out, { recursive: true });
  const file = join(args.out, "global.css");
  writeFileSync(
    file,
    buildPendoCss({
      theme: args.theme,
      scope: !args.noScope,
      important: !args.noImportant,
      prune: !args.noPrune,
    }),
  );
  console.log(`✓ pantoken: wrote ${file}`);
}

/** Warn when the resolved output path escapes cwd — guards against accidental ../traversal. */
function warnIfUnsafePath(out: string): void {
  const rel = relative(process.cwd(), resolve(out));
  if (rel.startsWith(".."))
    console.warn(`⚠️ pantoken: output path "${out}" escapes the current directory.`);
}

/**
 * Run the CLI.
 *
 * @example Generate Swift tokens into a consumer repo
 * ```ts
 * import { run } from "@pantoken/cli";
 *
 * // Writes Sources/PanTokens/Tokens.swift + Package.swift under ./ios/DesignTokens.
 * await run(["generate", "swift", "--out", "./ios/DesignTokens"]);
 * ```
 *
 * @example Generate a themed swatch palette in a specific format
 * ```ts
 * import { run } from "@pantoken/cli";
 *
 * await run(["generate", "swatches", "--format", "gpl", "--theme", "canvas", "--out", "./out"]);
 * ```
 */
export async function run(argv: readonly string[]): Promise<void> {
  const args = parseArgs(argv);
  assertGenerateTarget(args);
  warnIfUnsafePath(args.out);

  if (args.target === "swift") return runSwift(args);
  if (args.target === "android") return runAndroid(args);
  if (args.target === "compose") return runCompose(args);
  if (args.target === "flutter") return runFlutter(args);
  if (args.target === "wordpress") {
    runWordpress(args);
    return;
  }
  if (args.target === "vanilla") {
    runVanilla(args);
    return;
  }
  if (args.target === "mintlify") {
    runMintlify(args);
    return;
  }
  if (args.target === "drupal") {
    runDrupal(args);
    return;
  }
  if (args.target === "rust") {
    runRust(args);
    return;
  }
  if (args.target === "swatches") {
    runSwatches(args);
    return;
  }
  if (args.target === "icon-font") return runIconFont(args);
  if (args.target === "jekyll" || args.target === "hugo") {
    runStaticSite(args);
    return;
  }
  if (args.target === "pendo") {
    runPendo(args);
    return;
  }
}
