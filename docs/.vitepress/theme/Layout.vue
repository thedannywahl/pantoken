<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import ThemeSelector from "./components/ThemeSelector.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <!--
      Top-level ThemeSelector: visible at ≥1280px between the lang switcher and appearance toggle.
      Flexbox ordering (see <style>) repositions it between .translations (order 1) and
      .appearance (order 3). Hidden at 768–1280 px where VPNavBarExtra (kebab) takes over.
    -->
    <template #nav-bar-content-after>
      <div class="VPNavBarThemeSelector">
        <ThemeSelector />
      </div>
    </template>
    <template #nav-screen-content-after>
      <ThemeSelector />
    </template>
  </Layout>
</template>

<style>
/*
 * Reorder the top nav bar so the order reads:
 *   lang switcher | theme selector | appearance toggle
 *
 * VPNavBar .content-body is a flex container. Items with the same order render in DOM
 * order; items with a higher order number appear later. We give explicit orders to the
 * elements we want to reposition while leaving search/menu at the default (0).
 *
 *   order 0  – .search, .menu  (DOM-first, stay first)
 *   order 1  – .translations   (lang switcher)
 *   order 2  – .VPNavBarThemeSelector  (our top-level slot wrapper)
 *   order 3  – .appearance     (dark-mode toggle)
 *   order 4+ – .social-links, .extra, .hamburger  (already hidden at ≥1280 px or stay last)
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

  /* Push translations, appearance, and the items that follow to their explicit slots. */
  .VPNavBar .content-body .translations {
    order: 1;
  }

  .VPNavBar .content-body .appearance {
    order: 3;
  }

  .VPNavBar .content-body .social-links {
    order: 4;
  }

  .VPNavBar .content-body .extra {
    order: 5;
  }

  .VPNavBar .content-body .hamburger {
    order: 6;
  }
}
</style>
