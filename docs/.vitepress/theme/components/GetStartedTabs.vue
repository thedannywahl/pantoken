<script setup lang="ts">
import { computed, ref } from "vue";
import { useData } from "vitepress";
import { useShikiHighlight } from "../composables/useShikiHighlight";
import { GET_STARTED_TABS_DEFAULTS, type GetStartedTabsStrings } from "../get-started";

// Localized strings from the active locale's `themeConfig.getStartedTabs`, falling back to English.
const { theme } = useData();
const t = computed<GetStartedTabsStrings>(() => ({
  ...GET_STARTED_TABS_DEFAULTS,
  ...(theme.value as { getStartedTabs?: Partial<GetStartedTabsStrings> }).getStartedTabs,
}));

const scaffoldOptions = computed(
  () =>
    [
      {
        id: "ai",
        label: "AI",
        iconClass: "-icon-claude",
        command: t.value.aiCommand,
      },
      {
        id: "html",
        label: "HTML",
        iconClass: "-icon-html5",
        command: "npx @pantoken/scaffold html",
      },
      {
        id: "web-components",
        label: "Web Components",
        iconClass: "-icon-webcomponentsdotorg",
        command: "npx @pantoken/scaffold web-components",
      },
      {
        id: "react",
        label: "React",
        iconClass: "-icon-react",
        command: "npx @pantoken/scaffold react",
      },
      {
        id: "next",
        label: "Next",
        iconClass: "-icon-nextdotjs",
        command: "npx @pantoken/scaffold next",
      },
      {
        id: "angular",
        label: "Angular",
        iconClass: "-icon-angular",
        command: "npx @pantoken/scaffold angular",
      },
    ] as const,
);

type ScaffoldTarget = (typeof scaffoldOptions.value)[number]["id"];

const activeTarget = ref<ScaffoldTarget>("ai");

const activeCommand = computed(
  () => scaffoldOptions.value.find((option) => option.id === activeTarget.value)?.command ?? "",
);

const commandLang = computed(() => (activeTarget.value === "ai" ? "text" : "bash"));
const highlightedCommand = useShikiHighlight(activeCommand, commandLang);
</script>

<template>
  <div class="instui-card --p-lg --mt-2xl --mx-none" style="min-height: 0; box-shadow: none">
    <div class="--display-flex --gap-sm --mb-md" role="tablist" aria-label="Scaffold targets">
      <button
        v-for="option in scaffoldOptions"
        :key="option.id"
        type="button"
        class="instui-pill"
        :class="[option.iconClass, activeTarget === option.id ? '-color-info' : '']"
        :aria-pressed="activeTarget === option.id"
        @click="activeTarget = option.id"
      >
        {{ option.label }}
      </button>
    </div>

    <div
      v-if="activeTarget === 'ai'"
      class="instui-agent-shell get-started-tabs__agent-shell"
      style="min-height: 0; overflow: hidden; border-radius: 8px"
    >
      <div :class="`language-${commandLang}`" style="margin: 0">
        <button class="copy" type="button" title="Copy"></button>
        <span class="lang">{{ commandLang === "bash" ? "sh" : commandLang }}</span>
        <div v-if="highlightedCommand" v-html="highlightedCommand" />
        <pre v-else><code>{{ activeCommand }}</code></pre>
      </div>
    </div>

    <div v-else :class="`language-${commandLang}`" style="margin: 0">
      <button class="copy" type="button" title="Copy"></button>
      <span class="lang">{{ commandLang === "bash" ? "sh" : commandLang }}</span>
      <div v-if="highlightedCommand" v-html="highlightedCommand" />
      <pre v-else><code>{{ activeCommand }}</code></pre>
    </div>
  </div>
</template>

<style>
@import "@pantoken/plugin-simple-icons/icons/html5.css";
@import "@pantoken/plugin-simple-icons/icons/react.css";
@import "@pantoken/plugin-simple-icons/icons/nextdotjs.css";
@import "@pantoken/plugin-simple-icons/icons/angular.css";
@import "@pantoken/plugin-simple-icons/icons/webcomponentsdotorg.css";
@import "@pantoken/plugin-simple-icons/icons/claude.css";
</style>

<style scoped>
/* Promote Shiki's dark vars outside .vp-doc, same pattern used by PickerOutput. */
:global(.dark) :deep(.shiki) {
  background-color: var(--shiki-dark-bg) !important;
  color: var(--shiki-dark) !important;
}

:global(.dark) :deep(.shiki span) {
  color: var(--shiki-dark) !important;
}

.get-started-tabs__agent-shell :deep(pre),
.get-started-tabs__agent-shell :deep(.shiki) {
  margin: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
}

.get-started-tabs__agent-shell :deep(code) {
  border: 0 !important;
  background: transparent !important;
}
</style>
