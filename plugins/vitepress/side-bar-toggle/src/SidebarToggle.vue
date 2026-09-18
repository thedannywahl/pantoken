<script setup lang="ts">
import { useData } from "vitepress";

import { useSidebarVisibility } from "./useSidebarVisibility.ts";

/** The theme-config surface this component reads — mirrors VitePress core's own `*Label` fields. */
interface ThemeConfig {
  sidebarToggleLabel?: string;
}

// Inlined (not imported from ./inline-script.ts) — @vue/compiler-sfc's `defineProps<T>()` macro
// resolves T's shape at compile time via its own limited cross-file type resolver, which can't
// follow this SFC's sibling imports once shipped as raw source inside a consumer's node_modules.
const props = defineProps<{
  storageKey?: string;
  hiddenClass?: string;
}>();

const { theme } = useData<ThemeConfig>();
const { isHidden, toggle } = useSidebarVisibility(props);
</script>

<template>
  <button
    type="button"
    class="vitepress-sidebar-toggle"
    :aria-label="theme.sidebarToggleLabel || 'Toggle sidebar'"
    :aria-expanded="!isHidden"
    aria-controls="VPSidebarNav"
    @click="toggle"
  >
    <span
      class="vitepress-sidebar-toggle-icon"
      :class="isHidden ? 'vpi-chevron-right' : 'vpi-chevron-left'"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped>
.vitepress-sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: var(--vp-nav-height);
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.vitepress-sidebar-toggle:hover {
  color: var(--vp-c-text-2);
}

.vitepress-sidebar-toggle-icon {
  width: 1rem;
  height: 1rem;
}

@media (prefers-reduced-motion: no-preference) {
  .vitepress-sidebar-toggle-icon {
    transition: transform 0.25s;
  }
}
</style>
