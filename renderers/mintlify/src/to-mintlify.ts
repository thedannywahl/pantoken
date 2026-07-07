/**
 * Map the pantoken IR onto a Mintlify `docs.json` theming fragment. Mintlify is Tailwind-based and
 * reads concrete hex from `docs.json` at build, so — unlike the var()-backed bridges — this resolves
 * tokens to concrete per-mode values (like the MUI renderer). Mintlify drives light/dark itself, so
 * `colors.primary`/`colors.light` carry the light/dark emphasis colours and `background.color` the
 * two page surfaces.
 *
 * @module
 */
import { resolveTokens } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

/** Mintlify `colors` (docs.json): `primary` is required; `light`/`dark` tune emphasis per mode. */
export interface MintlifyColors {
  /** Emphasis colour in light mode. */
  primary: string;
  /** Emphasis colour in dark mode. */
  light: string;
  /** Buttons and hover states across both modes. */
  dark: string;
}

/** Mintlify `background.color` (docs.json): the page surface per mode. */
export interface MintlifyBackground {
  color: { light: string; dark: string };
}

/** The subset of a Mintlify `docs.json` this renderer emits — merge it into your own `docs.json`. */
export interface MintlifyTheme {
  colors: MintlifyColors;
  background: MintlifyBackground;
}

/** The Instructure token behind each Mintlify colour slot. */
const BRAND = "--instui-color-background-brand";
const BUTTON = "--instui-color-background-interactive-action-primary-base";
const PAGE = "--instui-color-background-page";

/**
 * Build the Mintlify `docs.json` theming keys from a token IR.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @returns The `colors` + `background` keys to merge into a Mintlify `docs.json`.
 *
 * @example
 * ```ts
 * import { toMintlifyConfig } from "@pantoken/mintlify";
 * import { tokens } from "@pantoken/tokens";
 *
 * const theme = toMintlifyConfig(tokens);
 * // { colors: { primary: "#1D354F", light: "#EEF4FD", dark: "#1D354F" },
 * //   background: { color: { light: "#F2F4F5", dark: "#10141A" } } }
 * ```
 */
export function toMintlifyConfig(tokens: readonly Token[]): MintlifyTheme {
  const light = resolveTokens(tokens, { mode: "light" });
  const dark = resolveTokens(tokens, { mode: "dark" });
  const get = (map: Map<string, string>, name: string): string => map.get(name) ?? "";
  return {
    colors: {
      primary: get(light, BRAND),
      light: get(dark, BRAND),
      dark: get(light, BUTTON),
    },
    background: {
      color: { light: get(light, PAGE), dark: get(dark, PAGE) },
    },
  };
}
