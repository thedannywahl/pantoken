/**
 * Map the pantoken IR onto MUI theme options. MUI derives hover/active shades and contrast text from
 * each palette colour with `augmentColor`, which needs a concrete colour it can parse — so unlike the
 * var()-backed bridges, this resolves tokens to concrete single-mode values. Generate one theme per
 * mode (MUI drives light/dark itself via `palette.mode`).
 *
 * The return value is structurally a MUI `ThemeOptions`, so `createTheme(pantokenThemeOptions())`
 * just works — but this package stays dependency-free (MUI is only a peer).
 *
 * @module
 */
import { resolveTokens } from "@pantoken/utils";
import type { Mode } from "@pantoken/utils";
import type { Token } from "@pantoken/model";

export type { Mode } from "@pantoken/utils";

/** A MUI palette colour entry ({@link https://mui.com/material-ui/customization/palette/}). */
export interface MuiPaletteColor {
  main: string;
  contrastText?: string;
}

/** The subset of MUI `ThemeOptions` this package emits (structurally assignable to MUI's type). */
export interface PantokenThemeOptions {
  palette: {
    mode: Mode;
    primary: MuiPaletteColor;
    secondary: MuiPaletteColor;
    error: MuiPaletteColor;
    warning: MuiPaletteColor;
    info: MuiPaletteColor;
    success: MuiPaletteColor;
    background: { default: string; paper: string };
    text: { primary: string; secondary: string; disabled: string };
    divider: string;
  };
  shape: { borderRadius: number };
}

/** MUI palette slot → the Instructure token that fills it (background) and its contrast text. */
const PALETTE: Record<string, { bg: string; text?: string }> = {
  primary: { bg: "--instui-color-background-brand", text: "--instui-color-text-on-color" },
  secondary: {
    bg: "--instui-color-background-accent-violet",
    text: "--instui-color-text-on-color",
  },
  error: { bg: "--instui-color-background-error", text: "--instui-color-text-on-color" },
  warning: { bg: "--instui-color-background-warning", text: "--instui-color-text-on-color" },
  info: { bg: "--instui-color-background-info", text: "--instui-color-text-on-color" },
  success: { bg: "--instui-color-background-success", text: "--instui-color-text-on-color" },
};

const RADIUS_TOKEN = "--instui-spacing-space-sm";

function px(value: string | undefined, fallback: number): number {
  const n = Number.parseFloat(value ?? "");
  if (Number.isNaN(n)) return fallback;
  return value?.trim().endsWith("rem") ? n * 16 : n;
}

/**
 * Build MUI theme options from a token IR.
 *
 * @param tokens - The IR (e.g. from `@pantoken/tokens`).
 * @param mode - Which colour mode to resolve (default `"light"`).
 * @returns Options ready for MUI's `createTheme`.
 *
 * @example Per-brand, per-mode theme
 * ```ts
 * import { createTheme } from "@mui/material/styles";
 * import { toMuiTheme } from "@pantoken/mui";
 * import { byTheme } from "@pantoken/tokens";
 *
 * const darkCanvas = createTheme(toMuiTheme(byTheme("canvas"), "dark"));
 * ```
 */
export function toMuiTheme(tokens: readonly Token[], mode: Mode = "light"): PantokenThemeOptions {
  const r = resolveTokens(tokens, { mode });
  const get = (name: string, fallback = ""): string => r.get(name) ?? fallback;

  const palette = {} as PantokenThemeOptions["palette"];
  palette.mode = mode;
  for (const [slot, { bg, text }] of Object.entries(PALETTE)) {
    (palette as Record<string, unknown>)[slot] = {
      main: get(bg),
      ...(text ? { contrastText: get(text) } : {}),
    } satisfies MuiPaletteColor;
  }
  palette.background = {
    default: get("--instui-color-background-base"),
    paper: get("--instui-color-background-container"),
  };
  palette.text = {
    primary: get("--instui-color-text-base"),
    secondary: get("--instui-color-text-muted"),
    disabled: get("--instui-color-text-interactive-disabled-base"),
  };
  palette.divider = get("--instui-color-stroke-base");

  return { palette, shape: { borderRadius: px(r.get(RADIUS_TOKEN), 4) } };
}
