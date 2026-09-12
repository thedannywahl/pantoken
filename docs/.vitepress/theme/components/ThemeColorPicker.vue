<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useData } from "vitepress";
import VPSwitchAppearance from "vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue";
import {
  applyColor,
  applyTheme,
  COLORS,
  getStoredColor,
  getStoredTheme,
  THEME_SELECTOR_DEFAULTS,
  THEMES,
  type PantokenColor,
  type PantokenTheme,
  type ThemeSelectorStrings,
} from "../theme";

const currentTheme = ref<PantokenTheme>("rebrand");
const currentColor = ref<PantokenColor>("navy");

const emit = defineEmits<{ "theme-change": [theme: PantokenTheme] }>();

// Localized selector strings from the active locale's `themeConfig.themeSelector`, falling back to
// the English defaults so a missing block never renders blank.
const { site, theme } = useData();
const strings = computed<ThemeSelectorStrings>(() => ({
  ...THEME_SELECTOR_DEFAULTS,
  ...(theme.value as { themeSelector?: Partial<ThemeSelectorStrings> }).themeSelector,
}));

// Only the rebrand theme ships light/dark values, and the site config can force a single scheme.
const showAppearance = computed(
  () =>
    currentTheme.value === "rebrand" &&
    Boolean(site.value.appearance) &&
    site.value.appearance !== "force-dark" &&
    site.value.appearance !== "force-auto",
);
const appearanceLabel = computed(() => theme.value.darkModeSwitchLabel || "Appearance");

const PRESERVED_SWATCH_COLORS = {
  navy: {
    rebrand: "light-dark(#7097C7, #3E6895)",
    canvas: "#7097C7",
    canvasHighContrast: "#4C79AA",
  },
  blue: {
    rebrand: "light-dark(#4798E3, #2369A4)",
    canvas: "#4798E3",
    canvasHighContrast: "#2B7ABC",
  },
} satisfies Partial<Record<PantokenColor, Record<PantokenTheme, string>>>;

function selectTheme(t: PantokenTheme): void {
  currentTheme.value = t;
  applyTheme(t);
  emit("theme-change", t);
}

function selectColor(c: PantokenColor): void {
  currentColor.value = c;
  applyColor(c);
}

function swatchColor(key: PantokenColor): string {
  const preserved = PRESERVED_SWATCH_COLORS[key as keyof typeof PRESERVED_SWATCH_COLORS];
  if (preserved) return preserved[currentTheme.value];

  const scale = key;
  if (currentTheme.value === "canvasHighContrast") {
    return `var(--instui-primitive-color-${scale}-${scale}100)`;
  }
  if (currentTheme.value === "canvas") {
    return `var(--instui-primitive-color-${scale}-${scale}70)`;
  }
  return `light-dark(var(--instui-primitive-color-${scale}-${scale}70), var(--instui-primitive-color-${scale}-${scale}120))`;
}

onMounted(() => {
  currentTheme.value = getStoredTheme();
  currentColor.value = getStoredColor();
});
</script>

<template>
  <div class="theme-picker__group">
    <button
      v-for="t in THEMES"
      :key="t.key"
      class="theme-picker__item"
      type="button"
      role="menuitemradio"
      :aria-checked="currentTheme === t.key"
      @click="selectTheme(t.key)"
    >
      {{ strings[t.key] }}
    </button>
  </div>
  <div class="theme-picker__divider" />
  <div class="theme-picker__header">{{ strings.colorLabel }}</div>
  <div class="theme-picker__colors" role="group" :aria-label="strings.colorLabel">
    <button
      v-for="c in COLORS"
      :key="c.key"
      class="theme-picker__color-item"
      type="button"
      role="menuitemradio"
      :aria-checked="currentColor === c.key"
      :aria-label="strings[c.key] || c.label"
      :title="strings[c.key] || c.label"
      @click="selectColor(c.key)"
    >
      <span class="theme-picker__swatch" :style="{ backgroundColor: swatchColor(c.key) }" />
    </button>
  </div>
  <template v-if="showAppearance">
    <div class="theme-picker__divider" />
    <div class="theme-picker__appearance">
      <span class="theme-picker__appearance-label">{{ appearanceLabel }}</span>
      <VPSwitchAppearance />
    </div>
  </template>
</template>

<style scoped>
.theme-picker__item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-align: left;
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}
.theme-picker__item:not([aria-checked="true"]):hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-default-soft);
}
.theme-picker__item[aria-checked="true"] {
  font-weight: 700;
  cursor: default;
}
.theme-picker__divider {
  border-top: 1px solid var(--vp-c-divider);
  margin: 8px 0;
}
.theme-picker__header {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  letter-spacing: 0.5px;
  padding: 0 8px 6px;
}
.theme-picker__colors {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 0 4px;
}
.theme-picker__color-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s;
}
.theme-picker__color-item:hover {
  background-color: var(--vp-c-default-soft);
}
.theme-picker__color-item[aria-checked="true"] {
  border-color: var(--vp-c-brand-1);
}
.theme-picker__swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: block;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
}
.theme-picker__appearance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}
.theme-picker__appearance-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
</style>
