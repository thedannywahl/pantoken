<script setup lang="ts">
import { CDN_PROVIDERS } from "@pantoken/cdn";
import type { PantokenTheme } from "../theme";
import type { PickerMode } from "../composables/pickerMode";

interface ThemeControlStrings {
  themeLabel: string;
  themeRebrand: string;
  themeCanvas: string;
  themeCanvasHighContrast: string;
  includeDarkMode: string;
  providerLabel?: string;
}

const props = defineProps<{
  idPrefix: string;
  themeKey: PantokenTheme;
  mode: PickerMode;
  showMode: boolean;
  strings: ThemeControlStrings;
  provider?: string;
}>();

const emit = defineEmits<{
  (event: "update:themeKey", value: PantokenTheme): void;
  (event: "update:mode", value: PickerMode): void;
  (event: "update:provider", value: string): void;
}>();

const providers = Object.values(CDN_PROVIDERS);

function updateTheme(event: Event): void {
  emit("update:themeKey", (event.target as HTMLSelectElement).value as PantokenTheme);
}

function updateIncludeDarkMode(event: Event): void {
  emit("update:mode", (event.target as HTMLInputElement).checked ? "adaptive" : "light");
}

function updateProvider(event: Event): void {
  emit("update:provider", (event.target as HTMLSelectElement).value);
}
</script>

<template>
  <div class="instui-card --bg-secondary">
    <div class="picker-theme-controls__row">
      <label class="instui-text" :for="`${props.idPrefix}-theme`">
        {{ props.strings.themeLabel }}
      </label>
      <select
        :id="`${props.idPrefix}-theme`"
        :value="props.themeKey"
        class="instui-simple-select picker-theme-controls__select"
        @change="updateTheme"
      >
        <option value="rebrand">{{ props.strings.themeRebrand }}</option>
        <option value="canvas">{{ props.strings.themeCanvas }}</option>
        <option value="canvasHighContrast">{{ props.strings.themeCanvasHighContrast }}</option>
      </select>
    </div>
    <div v-if="props.showMode" class="picker-theme-controls__row">
      <span class="instui-text -size-small">&nbsp;</span>
      <label class="instui-checkbox -variant-toggle picker-theme-controls__toggle">
        <input
          :id="`${props.idPrefix}-include-dark-mode`"
          type="checkbox"
          :checked="props.mode === 'adaptive'"
          @change="updateIncludeDarkMode"
        />
        {{ props.strings.includeDarkMode }}
      </label>
    </div>
    <div v-if="props.provider !== undefined" class="picker-theme-controls__row">
      <label class="instui-text" :for="`${props.idPrefix}-cdn-provider`">
        {{ props.strings.providerLabel }}
      </label>
      <select
        :id="`${props.idPrefix}-cdn-provider`"
        :value="props.provider"
        class="instui-simple-select picker-theme-controls__select"
        @change="updateProvider"
      >
        <option v-for="p in providers" :key="p.id" :value="p.id">{{ p.label }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.picker-theme-controls__row {
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.picker-theme-controls__select {
  width: 100%;
}

.picker-theme-controls__toggle {
  justify-self: start;
}
</style>
