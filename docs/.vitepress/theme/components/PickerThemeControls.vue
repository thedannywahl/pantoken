<script setup lang="ts">
import type { PantokenTheme } from "../theme";
import type { PickerMode } from "../composables/usePickerTheme";

interface ThemeControlStrings {
  themeLabel: string;
  themeRebrand: string;
  themeCanvas: string;
  themeCanvasHighContrast: string;
  modeLabel: string;
  modeAdaptive: string;
  modeLightOnly: string;
}

const props = defineProps<{
  idPrefix: string;
  themeKey: PantokenTheme;
  mode: PickerMode;
  showMode: boolean;
  strings: ThemeControlStrings;
}>();

const emit = defineEmits<{
  (event: "update:themeKey", value: PantokenTheme): void;
  (event: "update:mode", value: PickerMode): void;
}>();

function updateTheme(event: Event): void {
  emit("update:themeKey", (event.target as HTMLSelectElement).value as PantokenTheme);
}

function updateMode(event: Event): void {
  emit("update:mode", (event.target as HTMLSelectElement).value as PickerMode);
}
</script>

<template>
  <div class="picker-theme-controls__row">
    <label class="instui-text -size-small" :for="`${props.idPrefix}-theme`">
      {{ props.strings.themeLabel }}
    </label>
    <select
      :id="`${props.idPrefix}-theme`"
      :value="props.themeKey"
      class="picker-theme-controls__select"
      @change="updateTheme"
    >
      <option value="rebrand">{{ props.strings.themeRebrand }}</option>
      <option value="canvas">{{ props.strings.themeCanvas }}</option>
      <option value="canvasHighContrast">{{ props.strings.themeCanvasHighContrast }}</option>
    </select>
  </div>
  <div v-if="props.showMode" class="picker-theme-controls__row">
    <label class="instui-text -size-small" :for="`${props.idPrefix}-mode`">
      {{ props.strings.modeLabel }}
    </label>
    <select
      :id="`${props.idPrefix}-mode`"
      :value="props.mode"
      class="picker-theme-controls__select"
      @change="updateMode"
    >
      <option value="adaptive">{{ props.strings.modeAdaptive }}</option>
      <option value="light">{{ props.strings.modeLightOnly }}</option>
    </select>
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
</style>
