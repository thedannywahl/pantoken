<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData } from "vitepress";
import VPFlyout from "vitepress/dist/client/theme-default/components/VPFlyout.vue";
import VPMenuLink from "vitepress/dist/client/theme-default/components/VPMenuLink.vue";
import VPSocialLinks from "vitepress/dist/client/theme-default/components/VPSocialLinks.vue";
import VPSwitchAppearance from "vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue";
import { useLangs } from "vitepress/dist/client/theme-default/composables/langs.js";
import {
  applyTheme,
  getStoredTheme,
  THEME_SELECTOR_DEFAULTS,
  THEMES,
  type PantokenTheme,
  type ThemeSelectorStrings,
} from "../theme";

const { site, theme } = useData();
const { localeLinks, currentLang } = useLangs({ correspondingLink: true });

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

function select(t: PantokenTheme): void {
  current.value = t;
  applyTheme(t);
}

onMounted(() => {
  current.value = getStoredTheme();
});
</script>

<template>
  <VPFlyout v-if="hasExtraContent" class="VPNavBarExtra" label="extra navigation">
    <div v-if="localeLinks.length && currentLang.label" class="group translations">
      <p class="trans-title">{{ currentLang.label }}</p>

      <template v-for="locale in localeLinks" :key="locale.link">
        <VPMenuLink
          :item="locale"
          :external="false"
          :lang="locale.lang"
          :hreflang="locale.lang"
          rel="alternate"
          :dir="locale.dir"
        />
      </template>
    </div>

    <div class="group">
      <p class="trans-title">{{ strings.label }}</p>
      <div class="item theme-selector-item" role="radiogroup" :aria-label="strings.label">
        <button
          v-for="t in THEMES"
          :key="t.key"
          class="theme-option"
          type="button"
          role="radio"
          :aria-checked="current === t.key"
          @click="select(t.key)"
        >
          {{ strings[t.key] }}
        </button>
      </div>
    </div>

    <div
      v-if="
        current === 'rebrand' &&
        site.appearance &&
        site.appearance !== 'force-dark' &&
        site.appearance !== 'force-auto'
      "
      class="group"
    >
      <div class="item appearance">
        <p class="label">
          {{ theme.darkModeSwitchLabel || "Appearance" }}
        </p>
        <div class="appearance-action">
          <VPSwitchAppearance />
        </div>
      </div>
    </div>

    <div v-if="theme.socialLinks" class="group">
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

.item.appearance,
.item.social-links {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.item.appearance {
  min-width: 176px;
}

.appearance-action {
  margin-right: -2px;
}

.social-links-list {
  margin: -4px -8px;
}

.theme-option {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  width: 100%;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-align: left;
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}

.theme-option:not([aria-checked="true"]):hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.theme-option[aria-checked="true"] {
  font-weight: 700;
  cursor: default;
}
</style>
