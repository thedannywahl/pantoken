<template>
  <div ref="diagramRef" class="mermaid">{{ graphText }}</div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { computed, nextTick, ref, watch } from "vue";
import mermaid from "mermaid";

const props = defineProps<{ graph: string }>();

const { isDark } = useData();
const diagramRef = ref<HTMLElement | null>(null);
const graphText = computed(() => decodeURIComponent(props.graph));

/** Read a VitePress CSS custom property off `:root` (client-only; used to seed mermaid's base theme). */
const readVar = (name: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// The four cssdoc `@structure` node classes (@cssdoc/core `toMermaid`) → VitePress accent colours, via
// live `var()` so light/dark tracks the theme without recomputation: root = brand, sibling component =
// purple, slot = green, plain part = neutral surface. `:first-child` is the node's shape element
// (rect / stadium / parallelogram), regardless of tag.
const CSSDOC_THEME_CSS = `
  .node.cssdoc-root > :first-child { fill: var(--vp-c-brand-soft) !important; stroke: var(--vp-c-brand-1) !important; }
  .node.cssdoc-component > :first-child { fill: var(--vp-c-purple-soft) !important; stroke: var(--vp-c-purple-1) !important; }
  .node.cssdoc-slot > :first-child { fill: var(--vp-c-green-soft) !important; stroke: var(--vp-c-green-1) !important; }
  .node.cssdoc-part > :first-child { fill: var(--vp-c-bg-soft) !important; stroke: var(--vp-c-divider) !important; }
  .node .nodeLabel, .node .nodeLabel * { color: var(--vp-c-text-1) !important; fill: var(--vp-c-text-1) !important; }
  .edgeLabel, .edgeLabel * { color: var(--vp-c-text-2) !important; }
  .edgeLabel { background: var(--vp-c-bg) !important; }
`;

const renderDiagram = async (): Promise<void> => {
  // Wait for the template ref to bind before reading it — the watcher runs `immediate`, i.e. during
  // setup before mount, so reading `diagramRef.value` first would always be null and bail.
  await nextTick();

  const el = diagramRef.value;
  if (!el) {
    return;
  }

  // Base theme seeded from the live VitePress palette (recomputed here, so the `isDark` watcher re-reads
  // the toggled values), plus `themeCSS` for the cssdoc node classes. Re-reading `isDark.value` keeps it
  // a reactive dependency of the watcher.
  void isDark.value;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    themeVariables: {
      fontFamily: readVar("--vp-font-family-base"),
      background: readVar("--vp-c-bg"),
      mainBkg: readVar("--vp-c-bg-soft"),
      nodeBorder: readVar("--vp-c-divider"),
      lineColor: readVar("--vp-c-text-3"),
      textColor: readVar("--vp-c-text-1"),
      edgeLabelBackground: readVar("--vp-c-bg"),
    },
    themeCSS: CSSDOC_THEME_CSS,
  });

  el.removeAttribute("data-processed");
  el.textContent = graphText.value;

  try {
    await mermaid.run({
      nodes: [el],
      suppressErrors: false,
    });
  } catch (error) {
    console.error("Mermaid rendering error:", error);
  }
};

watch(
  [() => props.graph, () => isDark.value],
  () => {
    void renderDiagram();
  },
  { immediate: true },
);
</script>

<style scoped>
.mermaid {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}
</style>
