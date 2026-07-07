/**
 * `@pantoken/swift` — emit Instructure design tokens as Swift via Style Dictionary.
 *
 * This is pantoken's native proof: it flattens the IR to concrete, single-mode values
 * (`@pantoken/core`'s `toStyleDictionary`), keeps the natively-typed tokens (colours, dimensions,
 * numbers), and hands them to `@pantoken/sd-config`. Swapping `platform` to `flutter`/`compose`
 * reuses the same path.
 *
 * @module
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getIconSvgs, toStyleDictionary, toXcodeImageset } from "@pantoken/core";
import { buildPlatform } from "@pantoken/sd-config";
import { byTheme } from "@pantoken/tokens";
import type { Mode } from "@pantoken/core";
import type { Theme, Token } from "@pantoken/model";

/** Token types that map cleanly to Swift constants. Icons (`asset`) and `other` are skipped. */
const NATIVE_TYPES = new Set(["color", "dimension", "number"]);

/** Options for {@link generateSwift} / {@link toSwift}. */
export interface GenerateSwiftOptions {
  /** The output directory. */
  outDir: string;
  /** The theme to emit (default: `"rebrand"`). */
  theme?: Theme;
  /** Which `light-dark()` mode to resolve (default: `"light"`). */
  mode?: Mode;
  /** The generated Swift class name (default: `PanTokens`). */
  className?: string;
  /** Icon names to also emit into `Icons.xcassets` as vector-preserving imagesets. */
  icons?: string[];
}

/** Write the requested icons into an `Icons.xcassets` asset catalog under `outDir`. */
function writeXcassets(tokens: readonly Token[], names: string[], outDir: string): void {
  const svgs = getIconSvgs(tokens);
  const root = join(outDir, "Icons.xcassets");
  mkdirSync(root, { recursive: true });
  writeFileSync(
    join(root, "Contents.json"),
    `${JSON.stringify({ info: { author: "pantoken", version: 1 } }, null, 2)}\n`,
  );
  for (const name of names) {
    const svg = svgs.get(name);
    if (!svg) continue;
    for (const file of toXcodeImageset(name, svg)) {
      const path = join(root, file.path);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, file.content);
    }
  }
}

/**
 * Emit Swift for an explicit token IR.
 *
 * @returns The path of the written Swift file.
 *
 * @example Emit a specific theme's IR
 * ```ts
 * import { toSwift } from "@pantoken/swift";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const file = await toSwift(byTheme("canvas"), { outDir: "./Sources/Tokens" });
 * // writes Tokens.swift (class PanTokens { … })
 * ```
 *
 * @example Dark mode with a custom class name and an asset catalog
 * ```ts
 * import { toSwift } from "@pantoken/swift";
 * import { byTheme } from "@pantoken/tokens";
 *
 * await toSwift(byTheme("rebrand"), {
 *   outDir: "./Sources/Tokens",
 *   mode: "dark",
 *   className: "InstUITokens",
 *   icons: ["add", "check"], // also emits Icons.xcassets
 * });
 * ```
 */
export async function toSwift(
  tokens: readonly Token[],
  options: GenerateSwiftOptions,
): Promise<string> {
  const dictionary = toStyleDictionary(tokens, options.mode ?? "light");
  const native = Object.fromEntries(
    Object.entries(dictionary).filter(([, leaf]) => NATIVE_TYPES.has(leaf.type)),
  );
  const file = await buildPlatform({
    dictionary: native,
    platform: "swift",
    outDir: options.outDir,
    className: options.className ?? "PanTokens",
  });
  if (options.icons?.length) writeXcassets(tokens, options.icons, options.outDir);
  return file;
}

/**
 * Emit Swift for a named theme (using the vendored `@pantoken/tokens` IR).
 *
 * @returns The path of the written Swift file.
 *
 * @example
 * ```ts
 * import { generateSwift } from "@pantoken/swift";
 *
 * const file = await generateSwift({
 *   outDir: "./Sources/Tokens",
 *   theme: "rebrand",
 *   className: "PanTokens",
 *   icons: ["add", "check"], // optional: also emit an Icons.xcassets catalog
 * });
 * ```
 */
export async function generateSwift(options: GenerateSwiftOptions): Promise<string> {
  return toSwift(byTheme(options.theme ?? "rebrand"), options);
}

export default generateSwift;
