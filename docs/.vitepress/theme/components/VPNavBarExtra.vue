<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData } from "vitepress";
import VPFlyout from "vitepress/dist/client/theme-default/components/VPFlyout.vue";
import VPSocialLinks from "vitepress/dist/client/theme-default/components/VPSocialLinks.vue";
import { useLangs } from "vitepress/dist/client/theme-default/composables/langs.js";
import { useNavOverflow } from "vitepress/dist/client/theme-default/composables/nav-overflow.js";
import ThemeColorPicker from "./ThemeColorPicker.vue";
import {
  getStoredTheme,
  THEME_SELECTOR_DEFAULTS,
  type PantokenTheme,
  type ThemeSelectorStrings,
} from "../theme";

const { site, theme } = useData();
const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
// Shares VitePress's real Priority+ overflow engine (provided once by the actual VPNavBar) so this
// flyout only surfaces a unit once the bar's own inline copy has collapsed out of the way — without
// this, both copies show at once whenever the bar still has room for its own inline copy.
const overflow = useNavOverflow();

const hasExtraContent = computed(
  () =>
    (localeLinks.value.length && currentLang.value.label) ||
    site.value.appearance ||
    theme.value.socialLinks ||
    true,
);

// Theme selector state for the flyout inline list.
const current = ref<PantokenTheme>("rebrand");
const strings = computed<ThemeSelectorStrings>(() => ({
  ...THEME_SELECTOR_DEFAULTS,
  ...(theme.value as { themeSelector?: Partial<ThemeSelectorStrings> }).themeSelector,
}));

// Display conditions lifted out of the template so its markup stays flat (and each stays one small
// expression here rather than a multi-clause `v-if`). Gated on `overflow.state` (not just data
// availability) so a unit only shows here once its inline bar copy has actually collapsed.
const showTranslations = computed(
  () =>
    localeLinks.value.length > 0 &&
    Boolean(currentLang.value.label) &&
    !(overflow?.state.translations ?? true),
);
const showSocialLinks = computed(
  () => Boolean(theme.value.socialLinks) && !(overflow?.state.socialLinks ?? true),
);
// Read by the language `<select>` below: falls back to the VitePress default so an untranslated
// locale (English-passthrough UI strings) still gets a sensible label.
const langMenuLabel = computed(() => theme.value.langMenuLabel || "Change language");

// A `<select>` scales to many locales far better than a flat link list (44+ Canvas locales) and gives
// free type-to-search in every browser. Navigation is a full page load across locale sub-sites, so a
// plain `location.assign` (not the SPA router) is correct here — same as the anchor it replaces.
function onLangChange(event: Event): void {
  const target = (event.target as HTMLSelectElement).value;
  if (target) window.location.assign(target);
}

onMounted(() => {
  current.value = getStoredTheme();
});
</script>

<template>
  <VPFlyout
    v-if="hasExtraContent"
    class="VPNavBarExtra"
    label="extra navigation"
    :ref="(inst: any) => overflow?.setExtraEl(inst?.$el ?? null)"
  >
    <div v-if="showTranslations" class="group translations">
      <label class="trans-title" for="lang-select">{{ langMenuLabel }}</label>

      <div class="item">
        <select
          id="lang-select"
          class="lang-select"
          :value="currentLang.link"
          @change="onLangChange"
        >
          <option :value="currentLang.link">{{ currentLang.label }}</option>
          <option v-for="locale in localeLinks" :key="locale.link" :value="locale.link">
            {{ locale.text }}
          </option>
        </select>
      </div>
    </div>

    <div class="group">
      <p class="trans-title">{{ strings.label }}</p>
      <div class="item theme-selector-item">
        <ThemeColorPicker @theme-change="current = $event" />
      </div>
    </div>

    <div v-if="showSocialLinks" class="group">
      <div class="item social-links">
        <VPSocialLinks class="social-links-list" :links="theme.socialLinks" />
      </div>
    </div>
  </VPFlyout>
</template>

<style scoped>
.VPNavBarExtra {
  display: none;
  margin-right: -12px;
}

@media (min-width: 768px) {
  .VPNavBarExtra {
    display: block;
  }
}

@media (min-width: 1280px) {
  .VPNavBarExtra {
    display: none;
  }
}

.trans-title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.group.translations .item {
  padding: 0 12px;
}

.item.social-links {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.social-links-list {
  margin: -4px -8px;
}

.lang-select {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0 12px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}
</style>
