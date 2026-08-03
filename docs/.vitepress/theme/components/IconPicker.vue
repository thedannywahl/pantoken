<script setup lang="ts">
import { computed, defineAsyncComponent, ref, shallowRef, watch } from "vue";
import { useData } from "vitepress";

// ── Types ──────────────────────────────────────────────────────────────────────
interface InstUiEntry {
  name: string;
  source: "custom" | "lucide";
  path: string;
  viewBox: string;
}
interface SimpleIconEntry {
  slug: string;
  title: string;
}

// ── i18n ───────────────────────────────────────────────────────────────────────
const { theme } = useData();
const t = computed(() => {
  const base = {
    tabInstui: "InstUI icons",
    tabSimple: "Simple Icons",
    searchPlaceholder: "Filter icons…",
    allIcons: "All icons",
    tokenSheetLabel: "Token sheet",
    tokenLean: "Lean (no icons, ~23 KB gzip)",
    tokenFull: "Full (all icons, ~140 KB gzip)",
    formatLabel: "Output",
    formatLink: "<link>",
    formatImport: "@import",
    formatEsm: "ESM snippet",
    copy: "Copy",
    copied: "Copied",
    empty: "Select one or more icons to build a URL.",
    loadingNote: "Loading icon list…",
  };
  return { ...base, ...(theme.value as Record<string, unknown>).iconPicker };
});

// ── Manifest (lazy, split by tab) ─────────────────────────────────────────────
const activeTab = ref<"instui" | "simple">("instui");
const instuiIcons = shallowRef<InstUiEntry[] | null>(null);
const simpleIcons = shallowRef<SimpleIconEntry[] | null>(null);
const loading = ref(false);
const loadError = ref(false);

async function loadInstui(): Promise<void> {
  if (instuiIcons.value || loading.value) return;
  loading.value = true;
  loadError.value = false;
  try {
    const data = (await import("../generated/cdn-icon-manifest-instui.json")) as InstUiEntry[];
    instuiIcons.value = Array.isArray(data) ? data : (data as { default: InstUiEntry[] }).default;
  } catch {
    loadError.value = true;
  } finally {
    loading.value = false;
  }
}

async function loadSimple(): Promise<void> {
  if (simpleIcons.value || loading.value) return;
  loading.value = true;
  loadError.value = false;
  try {
    const data = (await import("../generated/cdn-icon-manifest-simple.json")) as SimpleIconEntry[];
    simpleIcons.value = Array.isArray(data)
      ? data
      : (data as { default: SimpleIconEntry[] }).default;
  } catch {
    loadError.value = true;
  } finally {
    loading.value = false;
  }
}

watch(
  activeTab,
  (tab) => {
    if (tab === "instui") void loadInstui();
    else void loadSimple();
  },
  { immediate: true },
);

// ── Selection ─────────────────────────────────────────────────────────────────
const selectedInstui = ref<Set<string>>(new Set());
const selectedSimple = ref<Set<string>>(new Set());
const allInstui = ref(false);
const tokenSheet = ref<"lean" | "full">("lean");
const format = ref<"link" | "import" | "esm">("link");
const copied = ref(false);
const search = ref("");

function toggleInstui(name: string): void {
  const next = new Set(selectedInstui.value);
  if (next.has(name)) next.delete(name);
  else next.add(name);
  selectedInstui.value = next;
  copied.value = false;
}
function toggleSimple(slug: string): void {
  const next = new Set(selectedSimple.value);
  if (next.has(slug)) next.delete(slug);
  else next.add(slug);
  selectedSimple.value = next;
  copied.value = false;
}

const filteredInstui = computed(() => {
  const all = instuiIcons.value ?? [];
  const q = search.value.trim().toLowerCase();
  return q ? all.filter((i) => i.name.includes(q)) : all;
});
const filteredSimple = computed(() => {
  const all = simpleIcons.value ?? [];
  const q = search.value.trim().toLowerCase();
  return q ? all.filter((i) => i.slug.includes(q) || i.title.toLowerCase().includes(q)) : all;
});

const hasSelection = computed(() =>
  activeTab.value === "instui"
    ? allInstui.value || selectedInstui.value.size > 0
    : selectedSimple.value.size > 0,
);

// ── URL builder ───────────────────────────────────────────────────────────────
const c = "npm/@pantoken/components/dist";
const si = "npm/@pantoken/plugin-simple-icons/dist";

const combineUrl = computed(() => {
  if (activeTab.value === "instui") {
    if (allInstui.value) {
      // Full instui icon set is already in the full token sheet; for lean, icons.css has all glyphs.
      return tokenSheet.value === "lean" ? `https://cdn.jsdelivr.net/combine/${c}/icons.css` : null;
    }
    const names = [...selectedInstui.value];
    if (names.length === 0) return null;
    const files = names.map((n) => `${c}/icons/${n}.css`);
    return `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
  } else {
    const slugs = [...selectedSimple.value];
    if (slugs.length === 0) return null;
    const files = slugs.map((s) => `${si}/icons/${s}.css`);
    return `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
  }
});

const esmSnippet = computed(() => {
  if (activeTab.value === "instui") {
    if (allInstui.value) {
      return `import "https://esm.sh/@pantoken/components/icons.css";`;
    }
    const names = [...selectedInstui.value];
    if (names.length === 0) return null;
    return names
      .map((n) => `import "https://esm.sh/@pantoken/components/icons/${n}.css";`)
      .join("\n");
  } else {
    const slugs = [...selectedSimple.value];
    if (slugs.length === 0) return null;
    return slugs
      .map((s) => `import "https://esm.sh/@pantoken/plugin-simple-icons/icons/${s}.css";`)
      .join("\n");
  }
});

const output = computed(() => {
  if (format.value === "esm") return esmSnippet.value ?? "";
  const url = combineUrl.value;
  if (!url) return "";
  return format.value === "link"
    ? `<link rel="stylesheet" href="${url}">`
    : `@import url("${url}");`;
});

async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    // Clipboard blocked — the code stays selectable.
  }
}
</script>

<template>
  <div
    class="icon-picker instui-view -background-secondary -border-radius-large -border-width-small instui-p-md"
  >
    <!-- Source tabs -->
    <div class="instui-tabs icon-picker__tabs" role="tablist">
      <button
        class="instui-button"
        :class="{ '-color-secondary': activeTab !== 'instui' }"
        role="tab"
        :aria-selected="activeTab === 'instui'"
        @click="activeTab = 'instui'"
      >
        {{ t.tabInstui }}
      </button>
      <button
        class="instui-button"
        :class="{ '-color-secondary': activeTab !== 'simple' }"
        role="tab"
        :aria-selected="activeTab === 'simple'"
        @click="activeTab = 'simple'"
      >
        {{ t.tabSimple }}
      </button>
    </div>

    <!-- Loading / error states -->
    <p v-if="loading" class="instui-text -color-secondary -style-italic icon-picker__status">
      {{ t.loadingNote }}
    </p>
    <template
      v-else-if="(activeTab === 'instui' && instuiIcons) || (activeTab === 'simple' && simpleIcons)"
    >
      <!-- InstUI icons -->
      <template v-if="activeTab === 'instui'">
        <fieldset class="instui-form-field-group icon-picker__group">
          <legend class="instui-text -size-small">{{ t.tabInstui }}</legend>
          <label class="instui-checkbox icon-picker__all">
            <input type="checkbox" v-model="allInstui" />
            <span>{{ t.allInstui }} (icons.css)</span>
          </label>
          <input
            v-model="search"
            type="search"
            class="instui-text-input icon-picker__search"
            :placeholder="t.searchPlaceholder"
            :disabled="allInstui"
            aria-label="Filter icons"
          />
          <div
            class="icon-picker__grid instui-view -background-primary -border-radius-medium -border-width-small instui-p-sm"
            :class="{ 'icon-picker__grid--disabled': allInstui }"
          >
            <label
              v-for="icon in filteredInstui"
              :key="icon.name"
              class="instui-checkbox icon-picker__item"
            >
              <input
                type="checkbox"
                :checked="selectedInstui.has(icon.name)"
                :disabled="allInstui"
                @change="toggleInstui(icon.name)"
              />
              <svg
                class="icon-picker__svg"
                :viewBox="icon.viewBox"
                aria-hidden="true"
                focusable="false"
              >
                <path :d="icon.path" />
              </svg>
              <span class="icon-picker__label">{{ icon.name }}</span>
            </label>
          </div>
        </fieldset>
      </template>

      <!-- Simple Icons -->
      <template v-else>
        <fieldset class="instui-form-field-group icon-picker__group">
          <legend class="instui-text -size-small">{{ t.tabSimple }}</legend>
          <input
            v-model="search"
            type="search"
            class="instui-text-input icon-picker__search"
            :placeholder="t.searchPlaceholder"
            aria-label="Filter icons"
          />
          <div
            class="icon-picker__grid instui-view -background-primary -border-radius-medium -border-width-small instui-p-sm"
          >
            <label
              v-for="icon in filteredSimple"
              :key="icon.slug"
              class="instui-checkbox icon-picker__item"
            >
              <input
                type="checkbox"
                :checked="selectedSimple.has(icon.slug)"
                @change="toggleSimple(icon.slug)"
              />
              <img
                class="icon-picker__img"
                :src="`https://cdn.jsdelivr.net/npm/simple-icons/icons/${icon.slug}.svg`"
                :alt="icon.title"
                width="16"
                height="16"
                loading="lazy"
                aria-hidden="true"
              />
              <span class="icon-picker__label">{{ icon.title }}</span>
            </label>
          </div>
        </fieldset>
      </template>
    </template>

    <!-- Output format -->
    <div class="icon-picker__options">
      <fieldset class="instui-radio-input-group">
        <legend>{{ t.formatLabel }}</legend>
        <label class="instui-radio -variant-toggle">
          <input type="radio" name="icon-format" value="link" v-model="format" />
          <span>{{ t.formatLink }}</span>
        </label>
        <label class="instui-radio -variant-toggle">
          <input type="radio" name="icon-format" value="import" v-model="format" />
          <span>{{ t.formatImport }}</span>
        </label>
        <label class="instui-radio -variant-toggle">
          <input type="radio" name="icon-format" value="esm" v-model="format" />
          <span>{{ t.formatEsm }}</span>
        </label>
      </fieldset>
    </div>

    <!-- Output -->
    <div class="icon-picker__output">
      <template v-if="hasSelection && output">
        <div class="icon-picker__code">
          <button
            class="instui-button -size-small -color-secondary icon-picker__copy"
            type="button"
            @click="copy"
          >
            {{ copied ? t.copied : t.copy }}
          </button>
          <pre><code>{{ output }}</code></pre>
        </div>
      </template>
      <p v-else-if="!loading" class="instui-text -color-secondary -style-italic icon-picker__empty">
        {{ t.empty }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.icon-picker {
  margin: 1.5rem 0;
}
.icon-picker__tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.icon-picker__group {
  margin: 0 0 1rem;
}
.icon-picker__all {
  margin-bottom: 0.5rem;
}
.icon-picker__search {
  width: 100%;
  margin-bottom: 0.5rem;
}
.icon-picker__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: 0.25rem 0.5rem;
  max-height: 20rem;
  overflow-y: auto;
}
.icon-picker__grid--disabled {
  opacity: 0.45;
  pointer-events: none;
}
.icon-picker__item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.icon-picker__svg {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
.icon-picker__img {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  object-fit: contain;
  /* Dark mode: simple-icons ship black SVGs; invert keeps them visible. */
  filter: var(--icon-picker-img-filter, none);
}
@media (prefers-color-scheme: dark) {
  .icon-picker__img {
    filter: invert(1);
  }
}
.icon-picker__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
}
.icon-picker__options {
  margin-top: 0.5rem;
}
.icon-picker__status {
  margin: 1rem 0;
}
.icon-picker__output {
  margin-top: 0.5rem;
}
.icon-picker__code {
  position: relative;
}
.icon-picker__code pre {
  overflow-x: auto;
  padding: 1rem;
  padding-right: 5rem;
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  font-size: 0.8125rem;
  line-height: 1.5;
}
.icon-picker__code code {
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--vp-c-text-1);
}
.icon-picker__copy {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}
.icon-picker__empty {
  display: block;
  margin: 0;
}
</style>
