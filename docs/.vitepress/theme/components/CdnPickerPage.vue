<script setup lang="ts">
import { computed, ref } from "vue";
import { useData } from "vitepress";
import CdnPicker from "./CdnPicker.vue";
import IconPicker from "./IconPicker.vue";

const { theme } = useData();
const t = computed(() => {
  const base = { tabComponents: "Components", tabIcons: "Icons" };
  const overrides = ((theme.value as Record<string, unknown>).cdnPickerPage ?? {}) as Record<
    string,
    unknown
  >;
  return { ...base, ...overrides };
});

const activeTab = ref<"components" | "icons">("components");
</script>

<template>
  <div class="cdn-picker-page">
    <div class="cdn-picker-page__tabs" role="tablist">
      <button
        class="instui-button"
        :class="{ '-color-secondary': activeTab !== 'components' }"
        role="tab"
        :aria-selected="activeTab === 'components'"
        @click="activeTab = 'components'"
      >
        {{ t.tabComponents }}
      </button>
      <button
        class="instui-button"
        :class="{ '-color-secondary': activeTab !== 'icons' }"
        role="tab"
        :aria-selected="activeTab === 'icons'"
        @click="activeTab = 'icons'"
      >
        {{ t.tabIcons }}
      </button>
    </div>

    <CdnPicker v-if="activeTab === 'components'" />
    <IconPicker v-else />
  </div>
</template>

<style scoped>
.cdn-picker-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
.cdn-picker-page__tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
</style>
