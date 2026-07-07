/**
 * `@pantoken/android` — emit Instructure design tokens as Android resource XML.
 *
 * It flattens the IR to concrete, single-mode values (`@pantoken/core`'s `toStyleDictionary`), then
 * emits `res/values/colors.xml` (colour tokens) and `res/values/dimens.xml` (dimension tokens) via
 * `@pantoken/sd-config`. Style Dictionary applies the Android transforms (`#aarrggbb`, `dp`/`sp`).
 *
 * @module
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getIconSvgs, toStyleDictionary, toVectorDrawable } from "@pantoken/core";
import { buildPlatform } from "@pantoken/sd-config";
import { byTheme } from "@pantoken/tokens";
import type { Mode } from "@pantoken/core";
import type { Theme, Token } from "@pantoken/model";

/** Options for {@link generateAndroid} / {@link toAndroid}. */
export interface GenerateAndroidOptions {
  /** The output directory; files are written under `<outDir>/res/values`. */
  outDir: string;
  /** The theme to emit (default: `"rebrand"`). */
  theme?: Theme;
  /** Which `light-dark()` mode to resolve (default: `"light"`). */
  mode?: Mode;
  /** Icon names to also emit as VectorDrawables under `res/drawable` (default: none). */
  icons?: string[];
}

/** Emit the requested icons as `res/drawable/ic_<name>.xml` VectorDrawables. */
function writeIconDrawables(
  tokens: readonly Token[],
  names: string[],
  valuesDir: string,
): string[] {
  const svgs = getIconSvgs(tokens);
  const drawableDir = join(valuesDir, "..", "drawable");
  mkdirSync(drawableDir, { recursive: true });
  const out: string[] = [];
  for (const name of names) {
    const svg = svgs.get(name);
    if (!svg) continue;
    const file = join(drawableDir, `ic_${name.replace(/-/g, "_")}.xml`);
    writeFileSync(file, toVectorDrawable(svg));
    out.push(file);
  }
  return out;
}

function filterByType(
  dictionary: Record<string, { value: string; type: string }>,
  type: string,
): Record<string, { value: string; type: string }> {
  return Object.fromEntries(Object.entries(dictionary).filter(([, leaf]) => leaf.type === type));
}

/**
 * Emit Android resource XML for an explicit token IR.
 *
 * @returns The paths of the written `colors.xml` and `dimens.xml`.
 *
 * @example Emit a specific theme's IR
 * ```ts
 * import { toAndroid } from "@pantoken/android";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const [colors, dimens] = await toAndroid(byTheme("canvas"), { outDir: "./app/src/main" });
 * // writes ./app/src/main/res/values/colors.xml and dimens.xml
 * ```
 *
 * @example Dark mode with icon VectorDrawables
 * ```ts
 * import { toAndroid } from "@pantoken/android";
 * import { byTheme } from "@pantoken/tokens";
 *
 * await toAndroid(byTheme("rebrand"), {
 *   outDir: "./app/src/main",
 *   mode: "dark",
 *   icons: ["add", "check"], // also emits res/drawable/ic_add.xml, ic_check.xml
 * });
 * ```
 */
export async function toAndroid(
  tokens: readonly Token[],
  options: GenerateAndroidOptions,
): Promise<string[]> {
  const dictionary = toStyleDictionary(tokens, options.mode ?? "light");
  const valuesDir = join(options.outDir, "res", "values");
  const colors = await buildPlatform({
    dictionary: filterByType(dictionary, "color"),
    platform: "android-colors",
    outDir: valuesDir,
    fileName: "colors",
  });
  const dimens = await buildPlatform({
    dictionary: filterByType(dictionary, "dimension"),
    platform: "android-dimens",
    outDir: valuesDir,
    fileName: "dimens",
  });
  const drawables = options.icons?.length
    ? writeIconDrawables(tokens, options.icons, valuesDir)
    : [];
  return [colors, dimens, ...drawables];
}

/**
 * Emit Android resource XML for a named theme (using the vendored `@pantoken/tokens` IR).
 *
 * @returns The paths of the written `colors.xml` and `dimens.xml`.
 *
 * @example
 * ```ts
 * import { generateAndroid } from "@pantoken/android";
 *
 * const files = await generateAndroid({ outDir: "./app/src/main", theme: "rebrand" });
 * // ["./app/src/main/res/values/colors.xml", ".../dimens.xml"]
 * ```
 */
export async function generateAndroid(options: GenerateAndroidOptions): Promise<string[]> {
  return toAndroid(byTheme(options.theme ?? "rebrand"), options);
}

export default generateAndroid;
