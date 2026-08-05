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
          <!-- Matches VitePress's own fenced-code output exactly (div.language-*, button.copy,
               span.lang, pre > code) so the default theme's global copy-button click handler and
               `.vp-doc [class*='language-']` styling both pick this up as if it were static markdown,
               with no bespoke copy logic or styling of our own. -->
          <div :class="`language-${lang}`">
            <button class="copy" type="button" :title="copyText" :data-copied="copiedText"></button>
            <span class="lang">{{ lang }}</span>
            <!-- v-html used only for shiki's trusted, server-generated HTML -->
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
</style>
