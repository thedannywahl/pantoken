/**
 * `@pantoken/figma` — convert the Instructure token IR into a Figma Variables payload.
 *
 * It produces one variable collection with `light`/`dark` modes: colour tokens become `COLOR`
 * variables (RGBA 0–1), dimensions/numbers become `FLOAT`, everything else `STRING`. Icons are
 * excluded (they'd be Figma components, not variables). Feed {@link toFigmaVariables} to a Figma
 * plugin (the Variables plugin API) or the Variables REST API — the README has the plugin glue.
 *
 * @module
 * @experimental
 */
import { parseHexColor, resolveTokens } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

/** A Figma RGBA colour, channels 0–1. */
export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** A Figma variable in the payload. */
export interface FigmaVariable {
  name: string;
  type: "COLOR" | "FLOAT" | "STRING";
  valuesByMode: Record<string, FigmaColor | number | string>;
}

/** The Figma Variables payload: one collection with modes and variables. */
export interface FigmaVariablesPayload {
  collection: string;
  modes: string[];
  variables: FigmaVariable[];
}

/** Options for {@link toFigmaVariables}. */
export interface ToFigmaOptions {
  /** The collection name (default `"Instructure"`). */
  collection?: string;
  /** The mode names, mapped to `light-dark()` sides (default `["light", "dark"]`). */
  modes?: [string, string];
}

const resolveMap = (tokens: readonly Token[], side: "light" | "dark"): Map<string, string> =>
  resolveTokens(tokens, { mode: side });

/**
 * Parse `#rgb`/`#rrggbb`/`#rrggbbaa` to a Figma RGBA (0–1), or `undefined` if not a hex colour.
 *
 * @example
 * ```ts
 * import { toFigmaColor } from "@pantoken/figma";
 *
 * toFigmaColor("#ff0000"); // { r: 1, g: 0, b: 0, a: 1 }
 * toFigmaColor("not-a-color"); // undefined
 * ```
 */
export function toFigmaColor(hex: string): FigmaColor | undefined {
  const c = parseHexColor(hex);
  return c ? { r: c.r / 255, g: c.g / 255, b: c.b / 255, a: c.a } : undefined;
}

function figmaName(tokenName: string): string {
  return tokenName.replace(/^--instui-/, "").replace(/-/g, "/");
}

/**
 * Convert an IR token list into a Figma Variables payload.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param options - {@link ToFigmaOptions}.
 * @returns A {@link FigmaVariablesPayload}.
 *
 * @example Convert the token IR to a Variables payload
 * ```ts
 * import { toFigmaVariables } from "@pantoken/figma";
 * import { tokens } from "@pantoken/tokens";
 *
 * const payload = toFigmaVariables(tokens); // { collection, modes, variables }
 * ```
 *
 * @example Rename the collection and modes
 * ```ts
 * import { toFigmaVariables } from "@pantoken/figma";
 * import { tokens } from "@pantoken/tokens";
 *
 * const payload = toFigmaVariables(tokens, {
 *   collection: "Instructure Rebrand",
 *   modes: ["Light", "Dark"],
 * });
 * ```
 */
export function toFigmaVariables(
  tokens: readonly Token[],
  options: ToFigmaOptions = {},
): FigmaVariablesPayload {
  const modes = options.modes ?? ["light", "dark"];
  const light = resolveMap(tokens, "light");
  const dark = resolveMap(tokens, "dark");

  const variables: FigmaVariable[] = [];
  for (const token of tokens) {
    if (token.meta?.kind === "icon") continue;
    const lightValue = light.get(token.name) ?? token.value;
    const darkValue = dark.get(token.name) ?? token.value;
    const lightColor = toFigmaColor(lightValue);

    let type: FigmaVariable["type"];
    let toValue: (v: string) => FigmaColor | number | string;
    if (lightColor) {
      type = "COLOR";
      toValue = (v) => toFigmaColor(v) ?? lightColor;
    } else if (/^-?\d*\.?\d+(px|rem|em)?$/.test(lightValue.trim())) {
      type = "FLOAT";
      toValue = (v) => Number.parseFloat(v);
    } else {
      type = "STRING";
      toValue = (v) => v;
    }

    variables.push({
      name: figmaName(token.name),
      type,
      valuesByMode: { [modes[0]]: toValue(lightValue), [modes[1]]: toValue(darkValue) },
    });
  }

  return { collection: options.collection ?? "Instructure", modes, variables };
}

export default toFigmaVariables;
