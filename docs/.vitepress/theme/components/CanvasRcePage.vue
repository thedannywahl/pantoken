<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData, withBase } from "vitepress";
import { CANVAS_RCE_DEFAULTS, CANVAS_RCE_HEIGHT_MESSAGE } from "../canvas-rce";

const { theme } = useData();
const t = computed(() => ({
  ...CANVAS_RCE_DEFAULTS,
  ...((theme.value as Record<string, unknown>).canvasRce as object),
}));

// Explicit `index.html`, not a bare directory URL: VitePress dev's clean-URL page
// routing intercepts extensionless paths and serves the docs SPA shell for them, shadowing the
// static bundle in `public/`. The `.html` extension routes around that middleware in both dev and
// the production build.
//
// Dev-only cache-bust: the workspace orchestrator rebuilds `public/tools/canvas-rce/` on template
// edits and forces a full page reload (see config.ts's `outputWatchPaths`), but that reload only
// guarantees the *top* document is fresh — the iframe's static, non-hashed URL is still eligible
// for the browser's heuristic HTTP cache, so a same-second reload can silently reuse the previous
// build. A per-load timestamp query param gives every reload a fresh cache key; production builds
// don't rebuild on the fly, so they skip it and keep the plain URL.
const iframeSrc = computed(() =>
  withBase(`/tools/canvas-rce/index.html${import.meta.env.DEV ? `?t=${Date.now()}` : ""}`),
);

const frame = ref<HTMLIFrameElement>();
const height = ref<number>();

function onMessage(event: MessageEvent): void {
  if (event.origin !== window.location.origin) return;
  if (event.source !== frame.value?.contentWindow) return;
  const data = event.data as { type?: unknown; height?: unknown };
  if (data?.type !== CANVAS_RCE_HEIGHT_MESSAGE || typeof data.height !== "number") return;
  height.value = data.height;
}

onMounted(() => window.addEventListener("message", onMessage));
onBeforeUnmount(() => window.removeEventListener("message", onMessage));
</script>

<template>
  <iframe
    ref="frame"
    class="canvas-rce-page__frame"
    :src="iframeSrc"
    :style="height ? { height: `${height}px` } : undefined"
    title="Canvas RCE"
    loading="lazy"
    scrolling="no"
  ></iframe>
</template>

<style scoped>
.canvas-rce-page__frame {
  width: 100%;
}
</style>
