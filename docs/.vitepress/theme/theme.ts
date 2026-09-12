/**
 * Shared state for the site-wide pantoken theme (rebrand / canvas / canvas high contrast). The palette
 * selector in the nav and the theme bootstrap in `index.ts` both go through {@link applyTheme}, so the
 * `<html data-pantoken-theme>` attribute, the `pantoken-theme` localStorage key, the light/dark gating,
 * and the demo-iframe broadcast stay in sync.
 *
 * `site-themes.css` scopes each theme's tokens to `:root[data-pantoken-theme="…"]`; toggling the
 * attribute re-themes the whole site (VitePress chrome via the `@pantoken/vitepress` bridge, the live
 * `@example` blocks, and — over postMessage — the embedded demos).
 */
export type PantokenTheme = "rebrand" | "canvas" | "canvasHighContrast";

/** One selectable color choice for site-wide brand token remapping. */
export type PantokenColor =
  | "navy"
  | "blue"
  | "green"
  | "red"
  | "orange"
  | "grey"
  | "plum"
  | "violet"
  | "stone"
  | "sky"
  | "honey"
  | "sea"
  | "aurora";

/** One palette choice in the theme selector: its {@link PantokenTheme} key and display label. */
export interface ThemeOption {
  key: PantokenTheme;
  label: string;
}

/** One color choice in the theme selector: its {@link PantokenColor} key and display label. */
export interface ColorOption {
  key: PantokenColor;
  label: string;
}

/**
 * Localized palette-selector strings, supplied per locale via `themeConfig.themeSelector`
 * (see `.vitepress/i18n.ts`) and read at runtime by {@link ThemeSelector}. `label` is the trigger
 * button's accessible name; the per-key labels name each palette. The English values here double as
 * the fallback when a locale omits the block.
 */
export interface ThemeSelectorStrings {
  label: string;
  rebrand: string;
  canvas: string;
  canvasHighContrast: string;
  colorLabel: string;
  navy: string;
  blue: string;
  green: string;
  red: string;
  orange: string;
  grey: string;
  plum: string;
  violet: string;
  stone: string;
  sky: string;
  honey: string;
  sea: string;
  aurora: string;
}

/** English defaults, also the fallback when a locale doesn't localize the selector. */
export const THEME_SELECTOR_DEFAULTS: ThemeSelectorStrings = {
  label: "Theme",
  rebrand: "Rebrand",
  canvas: "Canvas",
  canvasHighContrast: "Canvas high contrast",
  colorLabel: "Color scheme",
  navy: "Navy",
  blue: "Blue",
  green: "Green",
  red: "Red",
  orange: "Orange",
  grey: "Grey",
  plum: "Plum",
  violet: "Violet",
  stone: "Stone",
  sky: "Sky",
  honey: "Honey",
  sea: "Sea",
  aurora: "Aurora",
};

/** The selectable themes, in menu order. Labels are localized at render time (see {@link ThemeSelectorStrings}). */
export const THEMES: readonly ThemeOption[] = [
  { key: "rebrand", label: "Rebrand" },
  { key: "canvas", label: "Canvas" },
  { key: "canvasHighContrast", label: "Canvas high contrast" },
];

/** The selectable color schemes, in menu order. */
export const COLORS: readonly ColorOption[] = [
  { key: "navy", label: "Navy" },
  { key: "blue", label: "Blue" },
  { key: "green", label: "Green" },
  { key: "red", label: "Red" },
  { key: "orange", label: "Orange" },
  { key: "grey", label: "Grey" },
  { key: "plum", label: "Plum" },
  { key: "violet", label: "Violet" },
  { key: "stone", label: "Stone" },
  { key: "sky", label: "Sky" },
  { key: "honey", label: "Honey" },
  { key: "sea", label: "Sea" },
  { key: "aurora", label: "Aurora" },
];

/** Only rebrand ships light/dark values; the others are single-scheme. */
export const supportsScheme = (theme: PantokenTheme): boolean => theme === "rebrand";

const STORAGE_KEY = "pantoken-theme";
const STORAGE_COLOR_KEY = "pantoken-color";

/** The persisted theme (default `rebrand`). */
export function getStoredTheme(): PantokenTheme {
  if (typeof localStorage === "undefined") return "rebrand";
  const value = localStorage.getItem(STORAGE_KEY);
  return THEMES.some((t) => t.key === value) ? (value as PantokenTheme) : "rebrand";
}

/** The persisted color scheme (default `navy`). */
export function getStoredColor(): PantokenColor {
  if (typeof localStorage === "undefined") return "navy";
  const value = localStorage.getItem(STORAGE_COLOR_KEY);
  return COLORS.some((c) => c.key === value) ? (value as PantokenColor) : "navy";
}

// The reader's light/dark choice while on rebrand, remembered across a detour through a single-scheme
// theme so we can restore it when they switch back.
let rememberedDark: boolean | null = null;

/**
 * The postMessage target origin for a demo frame: a srcdoc-only frame (no `src`, e.g. an inline
 * `.css-example` preview) is sandboxed without `allow-same-origin`, so it has an opaque origin — no
 * concrete origin string can ever match it, only "*". A frame with a real `src` (the `/play` runner)
 * gets that origin-scoped target instead, so the theme post is delivered only to that runner and
 * never leaks to a frame at a different origin.
 */
function themeTargetOrigin(frame: HTMLIFrameElement): string {
  if (!frame.hasAttribute("src")) return "*";
  try {
    return new URL(frame.src, window.location.href).origin;
  } catch {
    // Malformed src — fall back to our own origin (same-origin runner is the common case).
    return window.location.origin;
  }
}

/** Post the active theme to every embedded demo runner so it re-themes its rendered result. */
export function broadcastTheme(
  theme: PantokenTheme,
  color: PantokenColor = getStoredColor(),
): void {
  if (typeof document === "undefined") return;
  for (const frame of document.querySelectorAll<HTMLIFrameElement>(".pantoken-demo__frame")) {
    // deepcode ignore TooPermissiveCorsPostMessage: "*" only targets opaque-origin sandboxed frames (no concrete origin can match); a real-src frame gets its own origin, and the payload is a non-sensitive theme name.
    frame.contentWindow?.postMessage(
      { type: "pantoken-demo-theme", theme, color },
      themeTargetOrigin(frame),
    );
  }
}

/** Post the active color scheme to every embedded demo runner. */
export function broadcastColor(color: PantokenColor): void {
  if (typeof document === "undefined") return;
  for (const frame of document.querySelectorAll<HTMLIFrameElement>(".pantoken-demo__frame")) {
    frame.contentWindow?.postMessage(
      { type: "pantoken-demo-color", color },
      themeTargetOrigin(frame),
    );
  }
}

/** Persist the selected theme when storage is available. */
function persistTheme(theme: PantokenTheme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode / storage disabled — the attribute still applies for this session.
  }
}

/** Persist the selected color scheme when storage is available. */
function persistColor(color: PantokenColor): void {
  try {
    localStorage.setItem(STORAGE_COLOR_KEY, color);
  } catch {
    // Private mode / storage disabled — the attribute still applies for this session.
  }
}

/** Keep the dark-class state coherent when switching between rebrand and single-scheme themes. */
function syncSchemeClass(html: HTMLElement, theme: PantokenTheme): void {
  if (supportsScheme(theme)) {
    // Restore the light/dark choice we stashed when leaving rebrand.
    if (rememberedDark !== null) {
      html.classList.toggle("dark", rememberedDark);
      rememberedDark = null;
    }
    return;
  }
  if (rememberedDark === null) rememberedDark = html.classList.contains("dark");
  html.classList.remove("dark");
}

/**
 * Apply a theme: set the root attribute, persist it, gate light/dark (single-scheme themes force
 * light and hide the appearance toggle via CSS), and broadcast to the demos.
 */
export function applyTheme(theme: PantokenTheme): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.dataset.pantokenTheme = theme;
  persistTheme(theme);
  syncSchemeClass(html, theme);
  broadcastTheme(theme, getStoredColor());
}

/**
 * Apply a color scheme: set the root attribute, persist it, and broadcast to the demos.
 */
export function applyColor(color: PantokenColor): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.dataset.pantokenColor = color;
  persistColor(color);
  broadcastColor(color);
}
