<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData } from "vitepress";
import {
  applyTheme,
  getStoredTheme,
  THEME_SELECTOR_DEFAULTS,
  THEMES,
  type PantokenTheme,
  type ThemeSelectorStrings,
} from "../theme";

const open = ref(false);
const current = ref<PantokenTheme>("rebrand");

// Localized selector strings from the active locale's `themeConfig.themeSelector`, falling back to
// the English defaults so a missing block never renders blank.
const { theme } = useData();
const strings = computed<ThemeSelectorStrings>(() => ({
  ...THEME_SELECTOR_DEFAULTS,
  ...(theme.value as { themeSelector?: Partial<ThemeSelectorStrings> }).themeSelector,
}));

function select(theme: PantokenTheme): void {
  current.value = theme;
  applyTheme(theme);
  open.value = false;
}

function onDocumentClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target?.closest?.(".theme-selector")) open.value = false;
}

onMounted(() => {
  current.value = getStoredTheme();
  document.addEventListener("click", onDocumentClick);
});
onBeforeUnmount(() => document.removeEventListener("click", onDocumentClick));
</script>

<template>
  <div class="theme-selector">
    <button
      class="theme-selector__button"
      type="button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="strings.label"
      :title="strings.label"
      @click.stop="open = !open"
    >
      <span class="theme-selector__icon" aria-hidden="true" />
    </button>
    <div v-show="open" class="theme-selector__menu" role="menu">
      <button
        v-for="t in THEMES"
        :key="t.key"
        class="theme-selector__item"
        type="button"
        role="menuitemradio"
        :aria-checked="current === t.key"
        @click="select(t.key)"
      >
        {{ strings[t.key] }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.theme-selector {
  position: relative;
  display: flex;
  align-items: center;
}
.theme-selector__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--vp-c-text-2);
  transition:
    color 0.25s,
    background-color 0.25s;
}
.theme-selector__button:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}
.theme-selector__icon {
  width: 20px;
  height: 20px;
  background: currentColor;
  -webkit-mask: var(--instui-icon-palette) no-repeat center / contain;
  mask: var(--instui-icon-palette) no-repeat center / contain;
}
.theme-selector__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 100;
  min-width: 12rem;
  padding: 8px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
}
.theme-selector__item {
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
}
.theme-selector__item:hover {
  background: var(--vp-c-bg-soft);
}
.theme-selector__item[aria-checked="true"] {
  color: var(--vp-c-brand-1);
}
</style>
