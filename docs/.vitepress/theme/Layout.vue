<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import ThemeSelector from "./components/ThemeSelector.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <!-- The palette theme selector, beside the built-in language + appearance controls. -->
    <template #nav-bar-content-after>
      <ThemeSelector />
    </template>
    <template #nav-screen-content-after>
      <ThemeSelector />
    </template>
  </Layout>
</template>
