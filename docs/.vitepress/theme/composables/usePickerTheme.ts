import { computed, ref, watch } from "vue";
import { readHashParam, writeHashParam } from "./useHashParams";
import { getStoredTheme, type PantokenTheme } from "../theme";

/** Picker mode for rebrand token URLs. */
export type PickerMode = "adaptive" | "light";

/** Shared hash-backed theme/mode state for CDN picker tabs. */
export function usePickerTheme() {
  const initialTheme = readHashParam("p_theme");
  const themeKey = ref<PantokenTheme>(
    initialTheme === "rebrand" || initialTheme === "canvas" || initialTheme === "canvasHighContrast"
      ? initialTheme
      : getStoredTheme(),
  );
  const mode = ref<PickerMode>(readHashParam("p_mode") === "light" ? "light" : "adaptive");
  const showMode = computed(() => themeKey.value === "rebrand");

  watch(themeKey, (v) => writeHashParam("p_theme", v, "rebrand"));
  watch(mode, (v) => writeHashParam("p_mode", v, "adaptive"));
  watch(themeKey, (v) => {
    if (v !== "rebrand") mode.value = "adaptive";
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
