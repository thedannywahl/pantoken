<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  formats: { value: string; label: string }[];
  modelValue: string;
  output: string;
  hasSelection: boolean;
  emptyText: string;
  formatLabel: string;
  copyText: string;
  copiedText: string;
}>();
defineEmits<{ (e: "update:modelValue", value: string): void }>();

const copied = ref(false);
// A copied snippet goes stale the moment the underlying selection changes — revert the button
// immediately instead of waiting out the confirmation timeout.
watch(
  () => props.output,
  () => (copied.value = false),
);

async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.output);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    // Clipboard blocked — the code stays selectable in the block.
  }
}
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
          <div class="picker-output__code">
            <button
              class="instui-button -size-small -color-secondary -icon-copy picker-output__copy"
              type="button"
              @click="copy"
            >
              {{ copied ? copiedText : copyText }}
            </button>
            <pre><code>{{ output }}</code></pre>
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
/* Float the copy button over the code block; the button's own look comes from .instui-button. */
.picker-output__code {
  position: relative;
}
.picker-output__code pre {
  overflow-x: auto;
  padding: 1rem;
  padding-right: 5rem;
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  font-size: 0.8125rem;
  line-height: 1.5;
}
.picker-output__code code {
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--vp-c-text-1);
}
.picker-output__copy {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}
.picker-output__empty {
  display: block;
  margin: 0;
}
</style>
