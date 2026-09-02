<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData } from "vitepress";
import { DEFAULT_CDN_PROVIDER_ID } from "@pantoken/cdn";
import { CDN_PICKER_DEFAULTS } from "../cdn";
import { usePickerTheme } from "../composables/usePickerTheme";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import ComponentsPicker from "./ComponentsPicker.vue";
import IconPicker from "./IconPicker.vue";
import PickerThemeControls from "./PickerThemeControls.vue";
import WebComponentsPicker from "./WebComponentsPicker.vue";

const { theme } = useData();
const t = computed(() => {
  const base = {
    title: "CDN Picker",
    tabComponents: "Components",
    tabIcons: "Icons",
    tabWebComponents: "Web Components",
  };
  const overrides = ((theme.value as Record<string, unknown>).cdnPickerPage ?? {}) as Record<
    string,
    unknown
  >;
  return { ...base, ...overrides };
});

const pickerControlStrings = computed(() => ({
  ...CDN_PICKER_DEFAULTS,
  ...((theme.value as Record<string, unknown>).cdnPicker as object),
}));

const { themeKey, mode, showMode } = usePickerTheme();
const provider = ref(readHashParam("cdn_provider") ?? DEFAULT_CDN_PROVIDER_ID);
watch(provider, (v) => writeHashParam("cdn_provider", v, DEFAULT_CDN_PROVIDER_ID));

type TabKey = "components" | "icons" | "web-components";
const initialTab = readHashParam("tab");
const activeTab = ref<TabKey>(
  initialTab === "icons" || initialTab === "web-components" ? (initialTab as TabKey) : "components",
);
watch(activeTab, (tab) => writeHashParam("tab", tab, "components"));
</script>

<template>
  <div class="cdn-picker-page">
    <h1 class="instui-heading -level-h1 -variant-title-page" style="margin: 0 0 1rem">
      {{ t.title }}
    </h1>

    <div class="cdn-picker-page__theme-controls">
      <PickerThemeControls
        id-prefix="cdn-picker-page"
        :theme-key="themeKey"
        :mode="mode"
        :show-mode="showMode"
        :strings="pickerControlStrings"
        :provider="provider"
        @update:theme-key="themeKey = $event"
        @update:mode="mode = $event"
        @update:provider="provider = $event"
      />
    </div>

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
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'web-components'"
          @click="activeTab = 'web-components'"
        >
          {{ t.tabWebComponents }}
        </button>
      </div>
      <div class="panel" role="tabpanel">
        <ComponentsPicker
          v-if="activeTab === 'components'"
          :theme-key="themeKey"
          :mode="mode"
          :provider="provider"
        />
        <IconPicker v-else-if="activeTab === 'icons'" :provider="provider" />
        <WebComponentsPicker v-else :theme-key="themeKey" :mode="mode" :provider="provider" />
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

.cdn-picker-page__theme-controls {
  margin-bottom: 1rem;
}
</style>
