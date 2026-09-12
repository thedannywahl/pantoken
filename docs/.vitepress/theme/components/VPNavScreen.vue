<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide } from "vue";
import {
  navScreenInjectionKey,
  useNav,
} from "vitepress/dist/client/theme-default/composables/nav.js";
import { useBodyScrollLock } from "vitepress/dist/client/theme-default/composables/scroll-lock.js";
import VPNavMenu from "vitepress/dist/client/theme-default/components/VPNavMenu.vue";
import VPNavSocialLinks from "vitepress/dist/client/theme-default/components/VPNavSocialLinks.vue";
import VPNavTranslations from "vitepress/dist/client/theme-default/components/VPNavTranslations.vue";
import ThemeSelectorAccordion from "./ThemeSelectorAccordion.vue";

const props = defineProps<{ open: boolean }>();

const isLocked = useBodyScrollLock();
provide(navScreenInjectionKey, true);
const { closeScreen, screenTriggerEl } = useNav();

// `docs` doesn't depend on @vueuse/core directly (vitepress bundles it internally, not re-exported
// for theme consumers), so handle Escape with a plain listener instead of vueuse's `onKeyStroke`.
function onKeydown(event: KeyboardEvent): void {
  if (event.key !== "Escape" || !props.open) return;
  closeScreen();
  screenTriggerEl.value?.focus();
}

onMounted(() => document.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", onKeydown));
</script>

<template>
  <transition name="fade" @enter="isLocked = true" @after-leave="isLocked = false">
    <div v-if="open" class="VPNavScreen" id="VPNavScreen">
      <div class="container">
        <slot name="nav-screen-content-before" />
        <VPNavMenu screen class="menu" />
        <VPNavTranslations screen class="translations" />
        <!-- Between language and social links; carries the appearance toggle underneath its swatches. -->
        <ThemeSelectorAccordion class="theme-selector-screen" />
        <VPNavSocialLinks screen class="social-links" />
        <slot name="nav-screen-content-after" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.VPNavScreen {
  position: fixed;
  top: 0;
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 1px) 2rem 0;
  width: 100%;
  background-color: var(--vp-nav-screen-bg-color);
  overflow-y: auto;
  overscroll-behavior: contain;
  transition: background-color 0.25s;
  pointer-events: auto;
}

.VPNavScreen.fade-enter-active,
.VPNavScreen.fade-leave-active {
  transition: opacity 0.25s;
}

.VPNavScreen.fade-enter-active .container,
.VPNavScreen.fade-leave-active .container {
  transition: transform 0.25s ease;
}

.VPNavScreen.fade-enter-from,
.VPNavScreen.fade-leave-to {
  opacity: 0;
}

.VPNavScreen.fade-enter-from .container,
.VPNavScreen.fade-leave-to .container {
  transform: translateY(-0.5rem);
}

@media (min-width: 48rem) {
  .VPNavScreen {
    display: none;
  }
}

.container {
  margin: 0 auto;
  padding: 1.5rem 0 6rem;
  max-width: 18rem;
}

.menu + .translations,
.menu + .theme-selector-screen,
.translations + .theme-selector-screen {
  margin-top: 1.5rem;
}

.menu + .social-links,
.theme-selector-screen + .social-links {
  margin-top: 1rem;
}
</style>
