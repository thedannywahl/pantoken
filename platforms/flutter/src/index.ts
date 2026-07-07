/**
 * `@pantoken/flutter` — emit Instructure design tokens as Flutter (Dart), via Style Dictionary. It
 * flattens the IR to concrete, single-mode values and keeps the natively-typed tokens.
 *
 * @module
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { flutterIconManifest, getIconSvgs, toStyleDictionary } from "@pantoken/core";
import { buildPlatform } from "@pantoken/sd-config";
import { byTheme } from "@pantoken/tokens";
import type { Mode } from "@pantoken/core";
import type { Theme, Token } from "@pantoken/model";

const NATIVE_TYPES = new Set(["color", "dimension", "number"]);
const ICON_ASSET_DIR = "assets/pantoken/icons";

/** Options for {@link generateFlutter} / {@link toFlutter}. */
export interface GenerateFlutterOptions {
  outDir: string;
  theme?: Theme;
  mode?: Mode;
  /** The generated Dart class name (default `PanTokens`). */
  className?: string;
  /** Icon names to also copy as SVG assets + a `PanTokensIcons` Dart manifest (for `flutter_svg`). */
  icons?: string[];
}

/** Copy the requested icon SVGs under `assets/pantoken/icons` and write a Dart manifest. */
function writeFlutterIcons(tokens: readonly Token[], names: string[], outDir: string): void {
  const svgs = getIconSvgs(tokens);
  const dir = join(outDir, ICON_ASSET_DIR);
  mkdirSync(dir, { recursive: true });
  const written: string[] = [];
  for (const name of names) {
    const svg = svgs.get(name);
    if (!svg) continue;
    writeFileSync(join(dir, `${name}.svg`), svg);
    written.push(name);
  }
  writeFileSync(join(outDir, "pantoken_icons.dart"), flutterIconManifest(written, ICON_ASSET_DIR));
}

/**
 * Emit Flutter Dart for an explicit token IR. Returns the written file path.
 *
 * @example Emit a specific theme's IR
 * ```ts
 * import { toFlutter } from "@pantoken/flutter";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const file = await toFlutter(byTheme("canvas"), { outDir: "./lib/tokens" });
 * // writes ./lib/tokens/pantokens.dart (class PanTokens { … })
 * ```
 *
 * @example Dark mode with SVG icon assets and manifest
 * ```ts
 * import { toFlutter } from "@pantoken/flutter";
 * import { byTheme } from "@pantoken/tokens";
 *
 * await toFlutter(byTheme("rebrand"), {
 *   outDir: "./lib/tokens",
 *   mode: "dark",
 *   className: "InstUITokens",
 *   icons: ["add", "check"], // copies SVGs + writes pantoken_icons.dart
 * });
 * ```
 */
export async function toFlutter(
  tokens: readonly Token[],
  options: GenerateFlutterOptions,
): Promise<string> {
  const dictionary = toStyleDictionary(tokens, options.mode ?? "light");
  const native = Object.fromEntries(
    Object.entries(dictionary).filter(([, leaf]) => NATIVE_TYPES.has(leaf.type)),
  );
  const className = options.className ?? "PanTokens";
  const file = await buildPlatform({
    dictionary: native,
    platform: "flutter",
    outDir: options.outDir,
    className,
    fileName: className.toLowerCase(),
  });
  if (options.icons?.length) writeFlutterIcons(tokens, options.icons, options.outDir);
  return file;
}

/**
 * Emit Flutter Dart for a named theme. Returns the written file path.
 *
 * @example
 * ```ts
 * import { generateFlutter } from "@pantoken/flutter";
 *
 * const file = await generateFlutter({ outDir: "./lib/tokens", theme: "rebrand" });
 * ```
 */
export async function generateFlutter(options: GenerateFlutterOptions): Promise<string> {
  return toFlutter(byTheme(options.theme ?? "rebrand"), options);
}

export default generateFlutter;
