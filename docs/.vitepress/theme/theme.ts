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

export interface ThemeOption {
  key: PantokenTheme;
  label: string;
}

/** The selectable themes, in menu order. */
export const THEMES: readonly ThemeOption[] = [
  { key: "rebrand", label: "Rebrand" },
  { key: "canvas", label: "Canvas" },
  { key: "canvasHighContrast", label: "Canvas high contrast" },
];

/** Only rebrand ships light/dark values; the others are single-scheme. */
export const supportsScheme = (theme: PantokenTheme): boolean => theme === "rebrand";

const STORAGE_KEY = "pantoken-theme";

/** The persisted theme (default `rebrand`). */
export function getStoredTheme(): PantokenTheme {
  if (typeof localStorage === "undefined") return "rebrand";
  const value = localStorage.getItem(STORAGE_KEY);
  return THEMES.some((t) => t.key === value) ? (value as PantokenTheme) : "rebrand";
}

// The reader's light/dark choice while on rebrand, remembered across a detour through a single-scheme
// theme so we can restore it when they switch back.
let rememberedDark: boolean | null = null;

/** Post the active theme to every embedded demo runner so it re-themes its rendered result. */
export function broadcastTheme(theme: PantokenTheme): void {
  if (typeof document === "undefined") return;
  for (const frame of document.querySelectorAll<HTMLIFrameElement>(".pantoken-demo__frame")) {
    frame.contentWindow?.postMessage({ type: "pantoken-demo-theme", theme }, "*");
  }
}

/**
 * Apply a theme: set the root attribute, persist it, gate light/dark (single-scheme themes force
 * light and hide the appearance toggle via CSS), and broadcast to the demos.
 */
export function applyTheme(theme: PantokenTheme): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.dataset.pantokenTheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Private mode / storage disabled — the attribute still applies for this session.
  }
  if (supportsScheme(theme)) {
    // Restore the light/dark choice we stashed when leaving rebrand.
    if (rememberedDark !== null) {
      html.classList.toggle("dark", rememberedDark);
      rememberedDark = null;
    }
  } else {
    if (rememberedDark === null) rememberedDark = html.classList.contains("dark");
    html.classList.remove("dark");
  }
  broadcastTheme(theme);
}
