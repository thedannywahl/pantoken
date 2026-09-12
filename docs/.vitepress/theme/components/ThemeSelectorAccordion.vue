<script setup lang="ts">
import { computed, ref, useId } from "vue";
import { useData } from "vitepress";
import { THEME_SELECTOR_DEFAULTS, type ThemeSelectorStrings } from "../theme";
import ThemeColorPicker from "./ThemeColorPicker.vue";

const { theme } = useData();
const strings = computed<ThemeSelectorStrings>(() => ({
  ...THEME_SELECTOR_DEFAULTS,
  ...(theme.value as { themeSelector?: Partial<ThemeSelectorStrings> }).themeSelector,
}));

// Closed by default, matching the language accordion it sits next to.
const isOpen = ref(false);
const bodyId = useId();

function toggle(): void {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="VPNavScreenThemeSelector" :class="{ open: isOpen }">
    <button
      type="button"
      class="title"
      :aria-expanded="isOpen"
      :aria-controls="bodyId"
      @click="toggle"
    >
      <span class="icon theme" aria-hidden="true" />
      {{ strings.label }}
      <span class="icon chevron" aria-hidden="true" />
    </button>

    <div v-show="isOpen" :id="bodyId" class="body">
      <ThemeColorPicker />
    </div>
  </div>
</template>

<style scoped>
.VPNavScreenThemeSelector .title {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-align: left;
}

.VPNavScreenThemeSelector .icon {
  font-size: 1rem;
}

.VPNavScreenThemeSelector .icon.theme {
  width: 1rem;
  aspect-ratio: 1 / 1;
  background: currentColor;
  -webkit-mask: var(--instui-icon-palette) no-repeat center / contain;
  mask: var(--instui-icon-palette) no-repeat center / contain;
  margin-right: 0.5rem;
}

.VPNavScreenThemeSelector .icon.chevron {
  width: 1rem;
  aspect-ratio: 1 / 1;
  background: currentColor;
  -webkit-mask: var(--instui-icon-chevron-down) no-repeat center / contain;
  mask: var(--instui-icon-chevron-down) no-repeat center / contain;
  margin-left: 0.25rem;
  transition: transform 0.25s;
}

.VPNavScreenThemeSelector.open .icon.chevron {
  /* Our chevron glyph is already down-oriented (unlike VitePress's own rotated-right-chevron
     trick), so +90deg (not +180) lands on "left" to match the language accordion beside it. */
  transform: rotate(90deg);
}

.VPNavScreenThemeSelector .body {
  padding: 0.5rem 0 0 1.5rem;
}
</style>
