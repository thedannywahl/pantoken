<script setup lang="ts">
import { computed, ref } from "vue";
import { useData } from "vitepress";
import CdnPicker from "./CdnPicker.vue";
import IconPicker from "./IconPicker.vue";

const { theme } = useData();
const t = computed(() => {
  const base = { title: "CDN Picker", tabComponents: "Components", tabIcons: "Icons" };
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
    <h1 class="instui-heading -level-h1 -variant-title-page">{{ t.title }}</h1>

    <div class="instui-tabs">
      <div class="list" role="tablist">
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'components'"
          @click="activeTab = 'components'"
        >
          {{ t.tabComponents }}
        </button>
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'icons'"
          @click="activeTab = 'icons'"
        >
          {{ t.tabIcons }}
        </button>
      </div>
      <div class="panel" role="tabpanel">
        <CdnPicker v-if="activeTab === 'components'" />
        <IconPicker v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cdn-picker-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>
