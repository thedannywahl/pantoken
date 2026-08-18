<script setup lang="ts">
import { computed } from "vue";
import { useShikiHighlight } from "../composables/useShikiHighlight";

const props = defineProps<{
  formats: { value: string; label: string; lang: string }[];
  modelValue: string;
  output: string;
  hasSelection: boolean;
  emptyText: string;
  formatLabel: string;
  copyText: string;
  copiedText: string;
}>();
defineEmits<{ (e: "update:modelValue", value: string): void }>();

const lang = computed(
  () => props.formats.find((f) => f.value === props.modelValue)?.lang ?? "text",
);

const outputRef = computed(() => props.output);
const highlighted = useShikiHighlight(outputRef, lang);
</script>

<template>
  <div class="picker-output">
    <template v-if="hasSelection">
      <span class="instui-text -size-small -color-secondary picker-output__format-label">{{
        formatLabel
      }}</span>
      <div class="instui-tabs -variant-secondary">
        <div class="list" role="tablist">
          <button
            v-for="f in formats"
            :key="f.value"
            class="tab"
            role="tab"
            :aria-selected="modelValue === f.value"
            @click="$emit('update:modelValue', f.value)"
          >
            {{ f.label }}
          </button>
        </div>
        <div class="panel" role="tabpanel">
          <div :class="`language-${lang}`">
            <button class="copy" type="button" :title="copyText" :data-copied="copiedText"></button>
            <span class="lang">{{ lang }}</span>
            <div v-if="highlighted" v-html="highlighted" />
            <pre v-else><code>{{ output }}</code></pre>
          </div>
          <slot />
        </div>
      </div>
    </template>
    <p v-else class="instui-text -color-secondary -style-italic picker-output__empty">
      {{ emptyText }}
    </p>
  </div>
</template>

<style scoped>
.picker-output {
  margin-top: 1rem;
}
.picker-output__format-label {
  display: block;
  margin-bottom: 0.25rem;
}
.picker-output__empty {
  display: block;
  margin: 0;
}
/* Shiki's dual-theme output sets `--shiki-dark`/`--shiki-dark-bg` inline alongside the light-theme
   `color`/`background-color` on the <pre> and a `--shiki-dark` alongside `color` on every token
   <span> — VitePress's own dark-mode CSS promotes those in .vp-doc, but this v-html'd output lives
   outside .vp-doc, so it needs the same promotion here (both the container and its token spans). */
:global(.dark) .picker-output :deep(.shiki) {
  background-color: var(--shiki-dark-bg) !important;
  color: var(--shiki-dark) !important;
}
:global(.dark) .picker-output :deep(.shiki span) {
  color: var(--shiki-dark) !important;
}
</style>
