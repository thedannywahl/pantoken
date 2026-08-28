/**
 * Token theme selection for scaffolded projects — a global `--theme`/`--theme-mode` flag applied
 * across every platform, not just `canvas-theme-editor`. Mirrors
 * `@pantoken/canvas-theme-editor`'s `src/build-theme.ts` token-sheet mapping (kept independent:
 * this resolves an npm subpath import for a scaffolded app, not a CDN URL).
 *
 * @module
 * @alpha
 */
import { InvalidArgumentError } from "commander";

/** A pantoken token theme variant. */
export type ThemeVariant = "rebrand" | "canvas" | "canvasHighContrast";
/** Rebrand token mode — ignored for the `canvas`/`canvasHighContrast` variants. */
export type ThemeMode = "adaptive" | "light";

const THEME_VARIANTS: readonly ThemeVariant[] = ["rebrand", "canvas", "canvasHighContrast"];
const THEME_MODES: readonly ThemeMode[] = ["adaptive", "light"];

/** The `@pantoken/css` lean stylesheet subpath import for a theme/mode pair. */
export function themeStylesheetImport(
  theme: ThemeVariant = "rebrand",
  mode: ThemeMode = "light",
): string {
  const file =
    theme === "canvas"
      ? "style.canvas.lean.css"
      : theme === "canvasHighContrast"
        ? "style.canvas-high-contrast.lean.css"
        : mode === "light"
          ? "style.rebrand.light.lean.css"
          : "style.lean.css";
  return `import "@pantoken/css/${file}";`;
}

/**
 * Commander Argument validator for `--theme`.
 *
 * @throws InvalidArgumentError if the value isn't a known theme variant
 */
export function validateThemeVariant(value: string): ThemeVariant {
  if ((THEME_VARIANTS as readonly string[]).includes(value)) return value as ThemeVariant;
  throw new InvalidArgumentError(
    `Theme "${value}" is not valid. Expected one of: ${THEME_VARIANTS.join(", ")}.`,
  );
}

/**
 * Commander Argument validator for `--theme-mode`.
 *
 * @throws InvalidArgumentError if the value isn't a known mode
 */
export function validateThemeMode(value: string): ThemeMode {
  if ((THEME_MODES as readonly string[]).includes(value)) return value as ThemeMode;
  throw new InvalidArgumentError(
    `Theme mode "${value}" is not valid. Expected one of: ${THEME_MODES.join(", ")}.`,
  );
}
