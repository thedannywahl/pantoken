/**
 * Shared state for the site-wide pantoken theme (rebrand / canvas / canvas high contrast). The palette
 * selector in the nav and the theme bootstrap in `index.ts` both go through {@link applyTheme}, so the
 * scope attributes, the namespaced storage keys, the light/dark gating, and the demo-iframe broadcast
 * stay in sync.
 *
 * The state lives in a named `@pantoken/scope` instance (`docs`) rather than in bare
 * `document.documentElement` writes and unnamespaced storage keys. That is what lets an embedded
 * preview — the canvas-theme-editor scaffold, say — run its own theme and color scheme on the same
 * page without the two clobbering each other.
 *
 * `site-themes.css` keys each theme's tokens to `[data-pantoken-theme="…"]` on *any* element, so the
 * scope element re-themes its own subtree; here that element is `<html>`, which re-themes the whole
 * site (VitePress chrome via the `@pantoken/vitepress` bridge, the live `@example` blocks, and — over
 * postMessage — the embedded demos).
 */
import { createScope, type PantokenScope } from "@pantoken/scope";

/** One selectable site-wide palette. */
export type PantokenTheme = "rebrand" | "canvas" | "canvasHighContrast";

/** The active VitePress appearance mode used by the embedded Canvas RCE. */
export type PantokenScheme = "light" | "dark";

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
  rebrand: "Next gen",
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
  { key: "rebrand", label: "Next gen" },
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

/** The instance this site owns. An embedded preview must use a different one. */
export const DOCS_INSTANCE = "docs";

const STORAGE_KEY = `pantoken:${DOCS_INSTANCE}:theme`;
const STORAGE_COLOR_KEY = `pantoken:${DOCS_INSTANCE}:color`;

let scope: PantokenScope | null = null;

/**
 * The docs' own scope, created on first use.
 *
 * Rooted at `<html>` so it themes the whole site, but named — anything that declares its own scope
 * further down the tree (a preview pane, an embedded editor) overrides it for its own subtree and
 * keeps its own persisted state.
 */
export function docsScope(): PantokenScope | null {
  if (typeof document === "undefined") return null;
  scope ??= createScope(document.documentElement, {
    instanceId: DOCS_INSTANCE,
    theme: getStoredTheme(),
    color: getStoredColor(),
  });
  return scope;
}

/** Reads the active VitePress appearance class. */
export function getActiveScheme(): PantokenScheme {
  return typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

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

/**
 * The demo frames this instance owns: those inside its scope element, minus any sitting inside a
 * *different* instance's scope. Without that second filter an embedded preview's own frames would be
 * re-themed by the docs chrome, which is the collision this whole mechanism exists to stop.
 */
function ownedFrames(): HTMLIFrameElement[] {
  const root = docsScope()?.element ?? document.documentElement;
  return [
    ...root.querySelectorAll<HTMLIFrameElement>(".pantoken-demo__frame, .canvas-rce-page__frame"),
  ].filter((frame) => {
    const owner = frame.closest("[data-pantoken-instance]");
    return !owner || owner.getAttribute("data-pantoken-instance") === DOCS_INSTANCE;
  });
}

/** Post the active theme to every embedded demo runner so it re-themes its rendered result. */
export function broadcastTheme(
  theme: PantokenTheme,
  color: PantokenColor = getStoredColor(),
): void {
  if (typeof document === "undefined") return;
  for (const frame of ownedFrames()) {
    // deepcode ignore TooPermissiveCorsPostMessage: "*" only targets opaque-origin sandboxed frames (no concrete origin can match); a real-src frame gets its own origin, and the payload is a non-sensitive theme name.
    frame.contentWindow?.postMessage(
      {
        type: "pantoken-demo-theme",
        instanceId: DOCS_INSTANCE,
        theme,
        color,
        mode: getActiveScheme(),
      },
      themeTargetOrigin(frame),
    );
  }
}

/** Post the active color scheme to every embedded demo runner. */
export function broadcastColor(color: PantokenColor): void {
  if (typeof document === "undefined") return;
  for (const frame of ownedFrames()) {
    frame.contentWindow?.postMessage(
      { type: "pantoken-demo-color", instanceId: DOCS_INSTANCE, color },
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
 * Apply a theme: update the scope, persist it, gate light/dark (single-scheme themes force light and
 * hide the appearance toggle via CSS), and broadcast to the demos.
 */
export function applyTheme(theme: PantokenTheme): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  syncSchemeClass(html, theme);
  // Pin the scheme rather than leaving it to the OS: VitePress's `.dark` class is this instance's
  // scheme input, and pinning is what lets a nested scope choose the opposite one.
  docsScope()?.set({ theme, scheme: supportsScheme(theme) ? getActiveScheme() : "light" });
  persistTheme(theme);
  broadcastTheme(theme, getStoredColor());
}

/**
 * Apply a color scheme: update the scope, persist it, and broadcast to the demos.
 */
export function applyColor(color: PantokenColor): void {
  if (typeof document === "undefined") return;
  docsScope()?.set({ color });
  persistColor(color);
  broadcastColor(color);
}
