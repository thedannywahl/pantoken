<script setup lang="ts">
import { computed, ref, shallowRef, watch } from "vue";
import { useData } from "vitepress";
import catalogData from "../generated/registry.json";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import { useHashParamRef } from "../composables/usePickerHelpers";
import { REGISTRY_BROWSER_DEFAULTS, type RegistryBrowserStrings } from "../registry";
import type { RegistryItem } from "./registry-types";

type TabKey = "all" | "ui" | "theme";

type DocsThemeWithRegistryBrowser = {
  registryBrowser?: RegistryBrowserStrings;
};

const { theme } = useData<DocsThemeWithRegistryBrowser>();
const t = computed<RegistryBrowserStrings>(
  () => theme.value.registryBrowser ?? REGISTRY_BROWSER_DEFAULTS,
);

const catalog = shallowRef(catalogData);
const items = computed<RegistryItem[]>(() => catalog.value.items as RegistryItem[]);

const search = useHashParamRef("r_q", "");
const pm = useHashParamRef("r_pm", "npx");

const initialTab = readHashParam("r_tab");
const activeTab = ref<TabKey>(
  initialTab === "ui" || initialTab === "theme" ? (initialTab as TabKey) : "all",
);
watch(activeTab, (tab) => writeHashParam("r_tab", tab, "all"));

const copiedItem = ref<string | null>(null);

const counts = computed(() => {
  const all = items.value.length;
  const ui = items.value.filter((i) => i.type === "registry:style").length;
  const theme = items.value.filter(
    (i) => i.type === "registry:theme" || i.type === "registry:base",
  ).length;
  return { all, ui, theme };
});

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase();
  return items.value.filter((item) => {
    // Tab filter
    if (activeTab.value === "ui" && item.type !== "registry:style") return false;
    if (
      activeTab.value === "theme" &&
      item.type !== "registry:theme" &&
      item.type !== "registry:base"
    )
      return false;
    // Search query filter
    if (!query) return true;
    const matchName = item.name.toLowerCase().includes(query);
    const matchTitle = (item.title ?? "").toLowerCase().includes(query);
    const matchDesc = (item.description ?? "").toLowerCase().includes(query);
    const matchDeps = (item.dependencies ?? []).some((d) => d.toLowerCase().includes(query));
    return matchName || matchTitle || matchDesc || matchDeps;
  });
});

function getCommand(name: string): string {
  const item = `@pantoken/${name}`;
  switch (pm.value) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${item}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${item}`;
    case "npx":
    default:
      return `npx shadcn@latest add ${item}`;
  }
}

async function copyCommand(name: string) {
  const text = getCommand(name);
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      copiedItem.value = name;
      setTimeout(() => {
        if (copiedItem.value === name) {
          copiedItem.value = null;
        }
      }, 2000);
    } catch {
      // Ignore clipboard error
    }
  }
}

function typeBadgeLabel(type: RegistryItem["type"]): string {
  switch (type) {
    case "registry:style":
      return "CSS";
    case "registry:ui":
      return "UI";
    case "registry:theme":
      return "Theme";
    case "registry:base":
      return "Base";
    case "registry:hook":
      return "Hook";
    default:
      return type.replace(/^registry:/, "");
  }
}

function badgeColorClass(type: RegistryItem["type"]): string {
  switch (type) {
    case "registry:style":
    case "registry:ui":
      return "-color-brand";
    case "registry:theme":
    case "registry:base":
      return "-color-warning";
    case "registry:hook":
      return "-color-success";
    default:
      return "-color-info";
  }
}
</script>

<template>
  <div class="registry-page instui-view">
    <h1 class="instui-heading -level-h1 -variant-title-page" style="margin: 0 0 1rem">
      {{ t.title }}
    </h1>

    <!-- Overview Hero Card -->
    <div class="instui-card --bg-secondary registry-page__hero">
      <div class="registry-page__hero-header">
        <span class="instui-pill -color-brand -icon-code">registry.json</span>
        <a
          href="/r/registry.json"
          target="_blank"
          rel="noopener noreferrer"
          class="instui-link -color-brand -size-small registry-page__raw-link"
        >
          /r/registry.json
          <span class="instui-icon -icon-arrow-up-right" aria-hidden="true" />
        </a>
      </div>
      <p class="instui-text -color-secondary registry-page__hero-desc">
        {{ t.subtitle }}
      </p>
      <div class="registry-page__hero-tip instui-view -border-radius-medium --p-sm">
        <span class="instui-text -weight-bold -size-small">CLI pattern:</span>
        <code class="registry-page__code">npx shadcn@latest add @pantoken/[item]</code>
      </div>
    </div>

    <!-- Category Tabs -->
    <div class="instui-tabs">
      <div class="list" role="tablist">
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'all'"
          @click="activeTab = 'all'"
        >
          {{ t.tabAll }} ({{ counts.all }})
        </button>
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'ui'"
          @click="activeTab = 'ui'"
        >
          {{ t.tabComponents }} ({{ counts.ui }})
        </button>
        <button
          class="tab"
          role="tab"
          :aria-selected="activeTab === 'theme'"
          @click="activeTab = 'theme'"
        >
          {{ t.tabThemes }} ({{ counts.theme }})
        </button>
      </div>

      <div class="panel" role="tabpanel">
        <!-- Search & PM Selector Controls -->
        <div class="registry-page__controls instui-view --m-sm">
          <span class="instui-input-group registry-page__search">
            <span class="before">
              <span class="instui-icon -icon-search" aria-hidden="true" />
            </span>
            <input
              v-model="search"
              type="search"
              :placeholder="t.searchPlaceholder"
              aria-label="Filter registry items"
            />
          </span>

          <div class="registry-page__pm-group">
            <span class="instui-text -size-small -color-secondary">{{ t.cliLabel }}</span>
            <div class="instui-tabs -variant-secondary registry-page__pm-tabs">
              <div class="list" role="tablist">
                <button class="tab" role="tab" :aria-selected="pm === 'npx'" @click="pm = 'npx'">
                  npx
                </button>
                <button class="tab" role="tab" :aria-selected="pm === 'pnpm'" @click="pm = 'pnpm'">
                  pnpm
                </button>
                <button class="tab" role="tab" :aria-selected="pm === 'bun'" @click="pm = 'bun'">
                  bun
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Registry Items Grid -->
        <div v-if="filteredItems.length > 0" class="registry-page__grid">
          <div
            v-for="item in filteredItems"
            :key="item.name"
            class="instui-card registry-page__card"
          >
            <div class="registry-page__card-header">
              <div class="registry-page__card-title-group">
                <h3 class="instui-heading -level-h3" style="margin: 0">
                  {{ item.title || item.name }}
                </h3>
                <span class="instui-pill" :class="badgeColorClass(item.type)">
                  {{ typeBadgeLabel(item.type) }}
                </span>
              </div>
              <a
                :href="`/r/${item.name}.json`"
                target="_blank"
                rel="noopener noreferrer"
                class="instui-link -color-brand -size-small registry-page__card-json-link"
                :title="t.viewJson"
              >
                {{ t.viewJson }}
                <span class="instui-icon -icon-arrow-up-right" aria-hidden="true" />
              </a>
            </div>

            <p class="instui-text -color-secondary -size-small registry-page__card-desc">
              {{ item.description }}
            </p>

            <!-- Dependencies -->
            <div
              v-if="item.dependencies && item.dependencies.length > 0"
              class="registry-page__card-deps"
            >
              <span class="instui-text -size-x-small -color-secondary">{{ t.depsLabel }}</span>
              <span v-for="dep in item.dependencies" :key="dep" class="instui-tag -size-sm">
                {{ dep }}
              </span>
            </div>

            <!-- Command Bar with Copy Button -->
            <div class="registry-page__command-bar instui-view -border-radius-medium">
              <code class="registry-page__command-text">{{ getCommand(item.name) }}</code>
              <button
                type="button"
                class="instui-button -size-small -color-secondary -icon-copy registry-page__copy-btn"
                :class="{ '-color-primary': copiedItem === item.name }"
                @click="copyCommand(item.name)"
              >
                {{ copiedItem === item.name ? t.copied : t.copy }}
              </button>
            </div>

            <!-- Expandable Details -->
            <details
              v-if="item.files || item.cssVars"
              class="instui-toggle-details -size-sm registry-page__card-details"
            >
              <summary class="instui-text -size-small -color-secondary">
                {{ t.previewDetails }}
              </summary>
              <div class="registry-page__details-panel">
                <!-- Source Code File Preview -->
                <div
                  v-for="file in item.files"
                  :key="file.path"
                  class="registry-page__file-block instui-view -border-radius-medium"
                >
                  <div class="registry-page__file-header">
                    <span class="instui-text -size-x-small">{{ file.target || file.path }}</span>
                    <span class="instui-pill -size-small">{{ file.type }}</span>
                  </div>
                  <pre
                    v-if="file.content"
                    class="registry-page__file-code"
                  ><code>{{ file.content }}</code></pre>
                </div>

                <!-- Theme CSS Variables Preview -->
                <div
                  v-if="item.cssVars?.light"
                  class="registry-page__vars-block instui-view -border-radius-medium --p-sm"
                >
                  <span class="instui-text -size-x-small -weight-bold">{{ t.previewTokens }}</span>
                  <div class="registry-page__vars-grid">
                    <div
                      v-for="(val, key) in item.cssVars.light"
                      :key="key"
                      class="registry-page__var-row"
                    >
                      <span class="registry-page__var-name">--{{ key }}</span>
                      <span class="registry-page__var-val">{{ val }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="registry-page__empty instui-view -border-radius-medium --p-lg">
          <p class="instui-text -color-secondary -style-italic" style="margin: 0 0 1rem">
            {{ t.emptyTitle }}
          </p>
          <button
            type="button"
            class="instui-button -color-secondary -size-small"
            @click="
              search = '';
              activeTab = 'all';
            "
          >
            {{ t.emptyReset }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registry-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.registry-page__hero {
  margin-bottom: 1.5rem;
  padding: 1.25rem;
}

.registry-page__hero-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.registry-page__raw-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.registry-page__hero-desc {
  margin: 0 0 1rem;
  line-height: 1.5;
}

.registry-page__hero-tip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  background: var(--instui-color-background-page, var(--vp-c-bg));
  border: 1px solid var(--instui-color-stroke-subtle, var(--vp-c-divider));
}

.registry-page__code {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8125rem;
  color: var(--instui-color-text-interactive-navigation-primary-base, var(--vp-c-brand-1));
  background: transparent;
  padding: 0;
}

.registry-page__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0 1.5rem;
}

.registry-page__search {
  flex: 1 1 260px;
}

.registry-page__pm-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.registry-page__pm-tabs .tab {
  padding: 0.25rem 0.625rem;
  font-size: 0.8125rem;
}

.registry-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.registry-page__card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
}

.registry-page__card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}

.registry-page__card-title-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.registry-page__card-json-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.registry-page__card-desc {
  margin: 0;
  flex-grow: 1;
  line-height: 1.45;
}

.registry-page__card-deps {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.registry-page__command-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  background: var(--instui-color-background-page, var(--vp-c-bg));
  border: 1px solid var(--instui-color-stroke-subtle, var(--vp-c-divider));
  padding: 0.375rem 0.5rem;
}

.registry-page__command-text {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.75rem;
  color: var(--instui-color-text-base, var(--vp-c-text-1));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: transparent;
  padding: 0;
}

.registry-page__copy-btn {
  flex-shrink: 0;
}

.registry-page__card-details {
  border-top: 1px solid var(--instui-color-stroke-subtle, var(--vp-c-divider));
  padding-top: 0.5rem;
}

.registry-page__details-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.registry-page__file-block {
  background: var(--instui-color-background-page, var(--vp-c-bg));
  border: 1px solid var(--instui-color-stroke-subtle, var(--vp-c-divider));
  overflow: hidden;
}

.registry-page__file-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  background: var(--instui-color-background-muted, var(--vp-c-bg-soft));
  font-family: var(--vp-font-family-mono, monospace);
}

.registry-page__file-code {
  margin: 0;
  padding: 0.5rem;
  max-height: 180px;
  overflow-y: auto;
  font-size: 0.6875rem;
  line-height: 1.4;
  font-family: var(--vp-font-family-mono, monospace);
  background: transparent;
}

.registry-page__vars-block {
  background: var(--instui-color-background-page, var(--vp-c-bg));
  border: 1px solid var(--instui-color-stroke-subtle, var(--vp-c-divider));
}

.registry-page__vars-grid {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.375rem;
  max-height: 150px;
  overflow-y: auto;
}

.registry-page__var-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-family: var(--vp-font-family-mono, monospace);
  gap: 0.5rem;
}

.registry-page__var-name {
  color: var(--instui-color-text-interactive-navigation-primary-base, var(--vp-c-brand-1));
}

.registry-page__var-val {
  color: var(--instui-color-text-muted, var(--vp-c-text-2));
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.registry-page__empty {
  text-align: center;
  border: 1px dashed var(--instui-color-stroke-base, var(--vp-c-divider));
}
</style>
