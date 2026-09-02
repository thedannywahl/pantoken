import { computed, ref, watch } from "vue";
import { readHashParam, writeHashParam } from "./useHashParams";
import { getStoredTheme, type PantokenTheme } from "../theme";
import type { PickerMode } from "./pickerMode";

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
