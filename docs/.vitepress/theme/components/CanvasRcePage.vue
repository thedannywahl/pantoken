<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { CANVAS_RCE_DEFAULTS } from "../canvas-rce";

const { theme } = useData();
const t = computed(() => ({
  ...CANVAS_RCE_DEFAULTS,
  ...((theme.value as Record<string, unknown>).canvasRce as object),
}));

const iframeSrc = computed(() => withBase("/tools/canvas-rce/"));
</script>

<template>
  <div class="canvas-rce-page">
    <h1 class="instui-heading -level-h1 -variant-title-page" style="margin: 0 0 0.5rem">
      {{ t.title }}
    </h1>
    <p class="canvas-rce-page__description">{{ t.description }}</p>
    <p class="canvas-rce-page__links">
      <a :href="iframeSrc" target="_blank" rel="noopener">{{ t.openInNewTab }}</a>
      <span class="canvas-rce-page__run-locally">{{ t.runLocally }}</span>
    </p>
    <iframe
      class="canvas-rce-page__frame"
      :src="iframeSrc"
      title="Canvas RCE"
      loading="lazy"
    ></iframe>
  </div>
</template>

<style scoped>
.canvas-rce-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.canvas-rce-page__description {
  max-width: 60ch;
}

.canvas-rce-page__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  align-items: baseline;
  margin-bottom: 1rem;
}

.canvas-rce-page__run-locally {
  font-family: var(--instui-font-family-mono, monospace);
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.canvas-rce-page__frame {
  width: 100%;
  height: 80vh;
  min-height: 40rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
</style>
