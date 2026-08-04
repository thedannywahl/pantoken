<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from "vue";
import { useData } from "vitepress";

// ── Types ──────────────────────────────────────────────────────────────────────
interface InstUiEntry {
  name: string;
  source: "custom" | "lucide";
}
interface SimpleIconEntry {
  slug: string;
  title: string;
}

// ── i18n ───────────────────────────────────────────────────────────────────────
const { theme } = useData();
const t = computed(() => {
  const base = {
    sectionInstui: "InstUI icons",
    sectionSimple: "Simple Icons",
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

// ── Manifests (both load up front — the two sources render together, not behind tabs) ────────────
const instuiIcons = shallowRef<InstUiEntry[] | null>(null);
const simpleIcons = shallowRef<SimpleIconEntry[] | null>(null);
const loadingInstui = ref(false);
const loadingSimple = ref(false);
const loadErrorInstui = ref(false);
const loadErrorSimple = ref(false);

async function loadInstui(): Promise<void> {
  if (instuiIcons.value || loadingInstui.value) return;
  loadingInstui.value = true;
  loadErrorInstui.value = false;
  try {
    const data = (await import("../generated/cdn-icon-manifest-instui.json")) as InstUiEntry[];
    instuiIcons.value = Array.isArray(data) ? data : (data as { default: InstUiEntry[] }).default;
  } catch {
    loadErrorInstui.value = true;
  } finally {
    loadingInstui.value = false;
  }
}

async function loadSimple(): Promise<void> {
  if (simpleIcons.value || loadingSimple.value) return;
  loadingSimple.value = true;
  loadErrorSimple.value = false;
  try {
    const data = (await import("../generated/cdn-icon-manifest-simple.json")) as SimpleIconEntry[];
    simpleIcons.value = Array.isArray(data)
      ? data
      : (data as { default: SimpleIconEntry[] }).default;
  } catch {
    loadErrorSimple.value = true;
  } finally {
    loadingSimple.value = false;
  }
}

onMounted(() => {
  void loadInstui();
  void loadSimple();
});

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

const hasSelection = computed(
  () => allInstui.value || selectedInstui.value.size > 0 || selectedSimple.value.size > 0,
);

// ── URL builder — merges both sources into one combine URL / ESM snippet ─────────────────────────
const c = "npm/@pantoken/components/dist";
const si = "npm/@pantoken/plugin-simple-icons/dist";

const combineUrl = computed(() => {
  const files: string[] = [];
  if (allInstui.value) {
    // Full instui icon set is already in the full token sheet; for lean, icons.css has all glyphs.
    if (tokenSheet.value === "lean") files.push(`${c}/icons.css`);
  } else {
    for (const name of selectedInstui.value) files.push(`${c}/icons/${name}.css`);
  }
  for (const slug of selectedSimple.value) files.push(`${si}/icons/${slug}.css`);
  return files.length === 0 ? null : `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
});

const esmSnippet = computed(() => {
  const lines: string[] = [];
  if (allInstui.value) {
    lines.push(`import "https://esm.sh/@pantoken/components/icons.css";`);
  } else {
    for (const name of selectedInstui.value) {
      lines.push(`import "https://esm.sh/@pantoken/components/icons/${name}.css";`);
    }
  }
  for (const slug of selectedSimple.value) {
    lines.push(`import "https://esm.sh/@pantoken/plugin-simple-icons/icons/${slug}.css";`);
  }
  return lines.length === 0 ? null : lines.join("\n");
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
    class="icon-picker instui-view -background-primary -border-radius-large -shadow-resting instui-p-md"
  >
    <span class="instui-input-group icon-picker__search">
      <span class="before"><span class="instui-icon -icon-search" aria-hidden="true"></span></span>
      <input
        v-model="search"
        type="search"
        :placeholder="t.searchPlaceholder"
        aria-label="Filter icons"
      />
    </span>

    <!-- InstUI icons -->
    <fieldset class="instui-form-field-group icon-picker__group">
      <legend class="instui-heading -level-h3 -variant-label">{{ t.sectionInstui }}</legend>
      <p
        v-if="loadingInstui"
        class="instui-text -color-secondary -style-italic icon-picker__status"
      >
        {{ t.loadingNote }}
      </p>
      <template v-else-if="instuiIcons">
        <label class="instui-checkbox icon-picker__all">
          <input type="checkbox" v-model="allInstui" />
          <span>{{ t.allIcons }} (icons.css)</span>
        </label>
        <div
          class="icon-picker__grid instui-view -background-secondary -border-radius-medium -border-width-small instui-p-sm"
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
            <span
              class="instui-icon icon-picker__glyph"
              :class="`-icon-${icon.name}`"
              aria-hidden="true"
            ></span>
            <span class="icon-picker__label">{{ icon.name }}</span>
          </label>
        </div>
      </template>
    </fieldset>

    <h2
      id="icon-picker-simple-heading"
      class="instui-heading -level-h3 -variant-label -border-top icon-picker__divider instui-mt-lg"
    >
      {{ t.sectionSimple }}
    </h2>

    <!-- Simple Icons -->
    <fieldset
      class="instui-form-field-group icon-picker__group"
      aria-labelledby="icon-picker-simple-heading"
    >
      <p
        v-if="loadingSimple"
        class="instui-text -color-secondary -style-italic icon-picker__status"
      >
        {{ t.loadingNote }}
      </p>
      <template v-else-if="simpleIcons">
        <div
          class="icon-picker__grid instui-view -background-secondary -border-radius-medium -border-width-small instui-p-sm"
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
      </template>
    </fieldset>

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
            class="instui-button -size-small -color-secondary -icon-copy icon-picker__copy"
            type="button"
            @click="copy"
          >
            {{ copied ? t.copied : t.copy }}
          </button>
          <pre><code>{{ output }}</code></pre>
        </div>
      </template>
      <p v-else class="instui-text -color-secondary -style-italic icon-picker__empty">
        {{ t.empty }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.icon-picker {
  margin: 1.5rem 0;
}
.icon-picker__search {
  width: 100%;
  margin-bottom: 1rem;
}
.icon-picker__group {
  margin: 0 0 0.5rem;
}
.icon-picker__all {
  margin-bottom: 0.5rem;
}
.icon-picker__divider {
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
.icon-picker__glyph {
  flex-shrink: 0;
  font-size: 1rem;
}
.icon-picker__img {
  flex-shrink: 0;
  width: 1em;
  height: 1em;
  object-fit: contain;
}
html.dark .icon-picker__img {
  filter: invert(1);
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
