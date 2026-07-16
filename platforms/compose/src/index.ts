/**
 * `@pantoken/compose` — emit Instructure design tokens as Jetpack Compose (Kotlin), via Style
 * Dictionary. It flattens the IR to concrete, single-mode values and keeps the natively-typed
 * tokens (colours, dimensions, numbers).
 *
 * @module
 * @experimental
 */
import { toStyleDictionary } from "@pantoken/core";
import { buildPlatform } from "@pantoken/sd-config";
import { byTheme } from "@pantoken/tokens";
import type { Mode } from "@pantoken/core";
import type { Theme, Token } from "@pantoken/model";

const NATIVE_TYPES = new Set(["color", "dimension", "number"]);

/** Options for {@link generateCompose} / {@link toCompose}. */
export interface GenerateComposeOptions {
  outDir: string;
  theme?: Theme;
  mode?: Mode;
  /** The generated Kotlin object name (default `PanTokens`). */
  className?: string;
}

/**
 * Emit Compose Kotlin for an explicit token IR. Returns the written file path.
 *
 * @example Emit a specific theme's IR
 * ```ts
 * import { toCompose } from "@pantoken/compose";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const file = await toCompose(byTheme("canvas"), { outDir: "./ui/tokens" });
 * // writes ./ui/tokens/PanTokens.kt (object PanTokens { … })
 * ```
 *
 * @example Dark mode with a custom object name
 * ```ts
 * import { toCompose } from "@pantoken/compose";
 * import { byTheme } from "@pantoken/tokens";
 *
 * await toCompose(byTheme("rebrand"), {
 *   outDir: "./ui/tokens",
 *   mode: "dark",
 *   className: "InstUITokens", // writes InstUITokens.kt
 * });
 * ```
 */
export async function toCompose(
  tokens: readonly Token[],
  options: GenerateComposeOptions,
): Promise<string> {
  const dictionary = toStyleDictionary(tokens, options.mode ?? "light");
  const native = Object.fromEntries(
    Object.entries(dictionary).filter(([, leaf]) => NATIVE_TYPES.has(leaf.type)),
  );
  const className = options.className ?? "PanTokens";
  return buildPlatform({
    dictionary: native,
    platform: "compose",
    outDir: options.outDir,
    className,
    fileName: className,
  });
}

/**
 * Emit Compose Kotlin for a named theme. Returns the written file path.
 *
 * @example
 * ```ts
 * import { generateCompose } from "@pantoken/compose";
 *
 * const file = await generateCompose({ outDir: "./ui/tokens", theme: "rebrand" });
 * ```
 */
export async function generateCompose(options: GenerateComposeOptions): Promise<string> {
  return toCompose(byTheme(options.theme ?? "rebrand"), options);
}

export default generateCompose;
