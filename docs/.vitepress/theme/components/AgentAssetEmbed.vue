<script setup lang="ts">
import { ref, toRef } from "vue";
import { useShikiHighlight } from "../composables/useShikiHighlight";

const props = defineProps<{
  content: string;
}>();

const markdownLang = ref("markdown");
const highlighted = useShikiHighlight(toRef(props, "content"), markdownLang);
</script>

<template>
  <div v-if="highlighted" class="agent-asset-embed" v-html="highlighted" />
  <pre v-else class="agent-asset-embed agent-asset-embed--fallback"><code>{{ content }}</code></pre>
</template>

<style scoped>
.agent-asset-embed {
  max-height: 28rem;
  overflow: auto;
  border-block-start: 1px solid var(--instui-color-stroke-subtle, var(--vp-c-divider));
  background: var(--vp-code-block-bg);
}

.agent-asset-embed :deep(pre),
.agent-asset-embed--fallback {
  margin: 0;
  padding: 1rem !important;
  overflow: visible;
  font-size: 0.8125rem;
  line-height: 1.55;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  background: transparent !important;
}

.agent-asset-embed :deep(code),
.agent-asset-embed--fallback code {
  white-space: inherit;
}
</style>
