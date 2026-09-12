<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData } from "vitepress";
import { THEME_SELECTOR_DEFAULTS, type ThemeSelectorStrings } from "../theme";
import ThemeColorPicker from "./ThemeColorPicker.vue";

const open = ref(false);

// Localized selector strings from the active locale's `themeConfig.themeSelector`, falling back to
// the English defaults so a missing block never renders blank.
const { theme } = useData();
const strings = computed<ThemeSelectorStrings>(() => ({
  ...THEME_SELECTOR_DEFAULTS,
  ...(theme.value as { themeSelector?: Partial<ThemeSelectorStrings> }).themeSelector,
}));

function onDocumentClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target?.closest?.(".theme-selector")) open.value = false;
}

onMounted(() => document.addEventListener("click", onDocumentClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocumentClick));
</script>

<template>
  <div class="theme-selector" @mouseenter="open = true" @mouseleave="open = false">
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
      <span class="theme-selector__chevron" aria-hidden="true" />
    </button>
    <div class="theme-selector__menu" role="menu">
      <ThemeColorPicker />
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
  color: var(--vp-c-text-1);
  transition:
    color 0.25s,
    background-color 0.25s;
}
.theme-selector__button:hover {
  color: var(--vp-c-text-2);
}
.theme-selector__icon {
  width: 1rem;
  aspect-ratio: 1 / 1;
  background: currentColor;
  -webkit-mask: var(--instui-icon-palette) no-repeat center / contain;
  mask: var(--instui-icon-palette) no-repeat center / contain;
}
.theme-selector__chevron {
  width: 14px;
  aspect-ratio: 1 / 1;
  background: currentColor;
  -webkit-mask: var(--instui-icon-chevron-down) no-repeat center / contain;
  mask: var(--instui-icon-chevron-down) no-repeat center / contain;
  margin-left: 4px;
}
.theme-selector__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 100;
  min-width: 14rem;
  padding: 8px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.25s,
    visibility 0.25s;
}
.theme-selector:hover .theme-selector__menu,
.theme-selector__button[aria-expanded="true"] + .theme-selector__menu {
  opacity: 1;
  visibility: visible;
}
</style>
