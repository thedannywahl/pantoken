<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import ThemeSelector from "./components/ThemeSelector.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <!--
      Top-level ThemeSelector: visible at ≥1280px between the lang switcher and social links.
      Flexbox ordering (see <style>) repositions it right after .translations (order 1). Hidden at
      768–1280 px where VPNavBarExtra (kebab) takes over. The appearance toggle now lives inside
      ThemeSelector's ThemeColorPicker instead of its own nav-bar slot.
    -->
    <template #nav-bar-content-after>
      <div class="VPNavBarThemeSelector">
        <ThemeSelector />
      </div>
    </template>
  </Layout>
</template>

<style>
/*
 * Reorder the top nav bar so the order reads:
 *   lang switcher | theme selector | social links
 *
 * VPNavBar .content-body is a flex container. Items with the same order render in DOM
 * order; items with a higher order number appear later. We give explicit orders to the
 * elements we want to reposition while leaving search/menu at the default (0). The appearance
 * toggle is hidden globally (see pantoken.css) in favor of the one inside ThemeColorPicker.
 *
 *   order 0  – .search, .menu  (DOM-first, stay first)
 *   order 1  – .translations   (lang switcher)
 *   order 2  – .VPNavBarThemeSelector  (our top-level slot wrapper)
 *   order 3+ – .social-links, .extra, .hamburger  (already hidden at ≥1280 px or stay last)
 */
.VPNavBarThemeSelector {
  /* Mirror VPNavBarTranslations / VPNavBarAppearance: hidden until ≥1280 px. */
  display: none;
}

@media (min-width: 1280px) {
  .VPNavBarThemeSelector {
    display: flex;
    align-items: center;
    order: 2;
  }

  /* Divider to the left of the theme selector (inside its flex wrapper). */
  .VPNavBarThemeSelector::before {
    margin-right: 8px;
    margin-left: 8px;
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
    content: "";
  }

  /* Push translations and the items that follow to their explicit slots. */
  .VPNavBar .content-body .translations {
    order: 1;
  }

  .VPNavBar .content-body .social-links {
    order: 3;
  }

  .VPNavBar .content-body .extra {
    order: 4;
  }

  .VPNavBar .content-body .hamburger {
    order: 5;
  }
}
</style>
