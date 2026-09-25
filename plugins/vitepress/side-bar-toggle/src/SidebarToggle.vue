<script setup lang="ts">
import { useData } from "vitepress";
import { useLayout } from "vitepress/theme";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import { configuredSidebarToggleOptions } from "./inline-script.ts";
import { useSidebarVisibility } from "./useSidebarVisibility.ts";

/** The theme-config surface this component reads — mirrors VitePress core's own `*Label` fields. */
interface ThemeConfig {
  sidebarToggleLabel?: string;
}

interface ResolvedSidebarToggleOptions {
  storageKey?: string;
  hiddenClass?: string;
  placement: "start" | "end";
  icons: { show: string; hide: string };
}

// Inlined (not imported from ./inline-script.ts) — @vue/compiler-sfc's `defineProps<T>()` macro
// resolves T's shape at compile time via its own limited cross-file type resolver, which can't
// follow this SFC's sibling imports once shipped as raw source inside a consumer's node_modules.
const props = defineProps<{
  storageKey?: string;
  hiddenClass?: string;
  placement?: "start" | "end";
  icons?: { show?: string; hide?: string };
}>();

const configured = configuredSidebarToggleOptions();
const options: ResolvedSidebarToggleOptions = {
  storageKey: props.storageKey ?? configured.storageKey,
  hiddenClass: props.hiddenClass ?? configured.hiddenClass,
  placement: props.placement ?? configured.placement ?? "end",
  icons: {
    show: props.icons?.show ?? configured.icons?.show ?? "vpi-chevron-right",
    hide: props.icons?.hide ?? configured.icons?.hide ?? "vpi-chevron-left",
  },
};
const { theme } = useData<ThemeConfig>();
const { hasSidebar } = useLayout();
const { isHidden, show, toggle } = useSidebarVisibility(options);
const iconClass = computed(() => (isHidden.value ? options.icons.show : options.icons.hide));
const toggleButton = ref<HTMLButtonElement | null>(null);

function handleLocalNavMenuClick(event: MouseEvent): void {
  if (event.target instanceof Element && event.target.closest(".VPLocalNav .menu")) show();
}

onMounted(() => {
  if (!hasSidebar.value) return;
  const anchor = document.querySelector(
    options.placement === "start" ? ".VPNavBar .search" : ".VPNavBar .hamburger",
  );
  if (anchor && toggleButton.value) anchor.before(toggleButton.value);
  document.addEventListener("click", handleLocalNavMenuClick);
});
onBeforeUnmount(() => document.removeEventListener("click", handleLocalNavMenuClick));
</script>

<template>
  <button
    v-if="hasSidebar"
    ref="toggleButton"
    type="button"
    class="vitepress-sidebar-toggle"
    :class="{ 'is-start': options.placement === 'start' }"
    :aria-label="theme.sidebarToggleLabel || 'Toggle sidebar'"
    :aria-expanded="!isHidden"
    aria-controls="VPSidebarNav"
    data-allow-mismatch="class"
    @click="toggle"
  >
    <span
      class="vitepress-sidebar-toggle-icon"
      :class="iconClass"
      aria-hidden="true"
      data-allow-mismatch="class"
    />
  </button>
</template>

<style scoped>
.vitepress-sidebar-toggle {
  display: none;
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

.vitepress-sidebar-toggle.is-start {
  order: -1;
}

.vitepress-sidebar-toggle-icon {
  width: 1rem;
  height: 1rem;
}

.vitepress-sidebar-toggle-icon:dir(rtl) {
  transform: scaleX(-1);
}

@media (min-width: 60rem) {
  .vitepress-sidebar-toggle {
    display: flex;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .vitepress-sidebar-toggle-icon {
    transition: transform 0.25s;
  }
}
</style>
