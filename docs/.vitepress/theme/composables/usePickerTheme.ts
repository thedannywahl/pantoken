import { computed, ref, watch } from "vue";
import type { CdnFile } from "@pantoken/cdn";
import { readHashParam, writeHashParam } from "./useHashParams";
import { getStoredTheme, type PantokenTheme } from "../theme";

/** Picker mode for rebrand token URLs. */
export type PickerMode = "adaptive" | "light";

const VALID_THEMES = new Set<PantokenTheme>(["rebrand", "canvas", "canvasHighContrast"]);

function resolvedThemeFromHash(): PantokenTheme {
  const fromHash = readHashParam("p_theme");
  return fromHash && VALID_THEMES.has(fromHash as PantokenTheme)
    ? (fromHash as PantokenTheme)
    : getStoredTheme();
}

function normalizeMode(theme: PantokenTheme, mode: PickerMode): PickerMode {
  return theme === "rebrand" ? mode : "adaptive";
}

/** Shared hash-backed theme/mode state for CDN picker tabs. */
export function usePickerTheme() {
  const themeKey = ref<PantokenTheme>(resolvedThemeFromHash());
  const mode = ref<PickerMode>(readHashParam("p_mode") === "light" ? "light" : "adaptive");
  const showMode = computed(() => themeKey.value === "rebrand");

  watch(themeKey, (v) => writeHashParam("p_theme", v, "rebrand"));
  watch(mode, (v) => writeHashParam("p_mode", v, "adaptive"));
  watch(themeKey, (v) => {
    mode.value = normalizeMode(v, mode.value);
  });

  return { themeKey, mode, showMode };
}

/** Resolve the lean token-sheet path for a selected theme/mode pair. */
export function tokenLeanSheet(theme: PantokenTheme, mode: PickerMode): string {
  const root = "npm/@pantoken/css/dist";
  if (theme === "canvas") return `${root}/style.canvas.lean.css`;
  if (theme === "canvasHighContrast") return `${root}/style.canvas-high-contrast.lean.css`;
  return mode === "light" ? `${root}/style.rebrand.light.lean.css` : `${root}/style.lean.css`;
}

/** Provider-agnostic equivalent of {@link tokenLeanSheet}, for pickers built on `@pantoken/cdn`. */
export function tokenSheetFile(theme: PantokenTheme, mode: PickerMode): CdnFile {
  const file =
    theme === "canvas"
      ? "style.canvas.lean.css"
      : theme === "canvasHighContrast"
        ? "style.canvas-high-contrast.lean.css"
        : mode === "light"
          ? "style.rebrand.light.lean.css"
          : "style.lean.css";
  return { package: "@pantoken/css", path: `dist/${file}` };
}
