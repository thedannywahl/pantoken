<template>
  <div ref="diagramRef" class="mermaid">{{ graphText }}</div>
</template>

<script setup lang="ts">
import { useData } from "vitepress";
import { computed, nextTick, ref, watch } from "vue";
import mermaid from "mermaid";

const props = defineProps<{ graph: string }>();

const { isDark, site } = useData();
const diagramRef = ref<HTMLElement | null>(null);
// Mermaid compiles a `classDef` into an inline `!important` style on each shape, which no stylesheet
// (not even our `themeCSS`) can override. So strip the colours from cssdoc's `classDef cssdoc-*` lines
// — keeping the class assignment — and let `themeCSS` (VitePress vars, light/dark-aware) do the paint.
const graphText = computed(() =>
  decodeURIComponent(props.graph).replace(
    /(classDef\s+cssdoc-[\w-]+\s+)[^\n;]*/gu,
    "$1stroke-width:1px",
  ),
);

// The cssdoc `@structure` node classes (@cssdoc/core `toMermaid`) → VitePress accent colours, layered
// over mermaid's own theme via `themeCSS`. Live `var()` so light/dark tracks the site without a
// recompute. Match the shape as a descendant (`:is(rect,polygon,path,circle)`) — not a direct child:
// a clickable (sibling-component) node nests its shape under an `<a>` wrapper. cssdoc's `classDef`
// colours are stripped from the source (see `graphText`), so nothing competes here.
const SHAPE = ":is(rect, polygon, path, circle)";
const CSSDOC_THEME_CSS = `
  .node.cssdoc-root ${SHAPE} { fill: var(--vp-c-brand-soft) !important; stroke: var(--vp-c-brand-1) !important; }
  .node.cssdoc-component ${SHAPE} { fill: var(--vp-c-purple-soft) !important; stroke: var(--vp-c-purple-1) !important; }
  .node.cssdoc-slot ${SHAPE} { fill: var(--vp-c-green-soft) !important; stroke: var(--vp-c-green-1) !important; }
  .node.cssdoc-part ${SHAPE} { fill: var(--vp-c-bg-soft) !important; stroke: var(--vp-c-divider) !important; }
  .node[class*="cssdoc-"] .nodeLabel, .node[class*="cssdoc-"] .nodeLabel * { fill: var(--vp-c-text-1) !important; color: var(--vp-c-text-1) !important; }
`;

/**
 * Rewrite a cssdoc sibling-component `click` link (`/api/css/<name>.md`) into a working in-site URL:
 * prepend the deploy base and drop the `.md` (VitePress serves clean/`.html` routes, not `.md`).
 */
const fixLink = (href: string): string => {
  if (!href.startsWith("/") || !/\.md(?=$|[?#])/.test(href)) return href;
  return site.value.base.replace(/\/$/u, "") + href.replace(/\.md(?=$|[?#])/u, "");
};

const renderDiagram = async (): Promise<void> => {
  // Wait for the template ref to bind before reading it — the watcher runs `immediate`, i.e. during
  // setup before mount, so reading `diagramRef.value` first would always be null and bail.
  await nextTick();

  const el = diagramRef.value;
  if (!el) {
    return;
  }

  // Mermaid's own light/dark theme (renders + adapts out of the box); the cssdoc node classes are
  // recoloured on top via `themeCSS`. Re-initialising on the `isDark` watcher flips the base theme.
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: isDark.value ? "dark" : "default",
    themeCSS: CSSDOC_THEME_CSS,
  });

  el.removeAttribute("data-processed");
  el.textContent = graphText.value;

  try {
    await mermaid.run({ nodes: [el], suppressErrors: false });
    // Fix sibling-component links mermaid emitted from the `click` directives (base + drop `.md`).
    for (const a of el.querySelectorAll<SVGAElement>("a")) {
      for (const attr of ["href", "xlink:href"]) {
        const v = a.getAttribute(attr);
        if (v) a.setAttribute(attr, fixLink(v));
      }
    }
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
