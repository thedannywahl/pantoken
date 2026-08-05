<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from "vue";
import { useData } from "vitepress";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import PickerOutput from "./PickerOutput.vue";

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
    formatLabel: "Output",
    formatLink: "<link>",
    formatImport: "@import",
    formatEsm: "ESM snippet",
    copy: "Copy",
    copied: "Copied",
    empty: "Select one or more icons to build a URL.",
    loadingNote: "Loading icon list…",
  };
  return { ...base, ...((theme.value as Record<string, unknown>).iconPicker as object) };
});

// ── Manifests (both load up front — the two sources render together, not behind tabs) ────────────
const instuiIcons = shallowRef<InstUiEntry[] | null>(null);
const simpleIcons = shallowRef<SimpleIconEntry[] | null>(null);
const loadingInstui = ref(false);
const loadingSimple = ref(false);
const loadErrorInstui = ref(false);
const loadErrorSimple = ref(false);

// Deep-linking: the manifests load asynchronously, so a restored "all"/name-list selection from the
// URL hash can only be validated (and applied) once the matching manifest has actually arrived.
const pendingInstuiSel = readHashParam("i_instui");
const pendingSimpleSel = readHashParam("i_simple");

function restoreSelection(raw: string | null, allNames: string[]): Set<string> {
  if (raw === "all") return new Set(allNames);
  if (!raw) return new Set();
  const valid = new Set(allNames);
  return new Set(raw.split(",").filter((n) => valid.has(n)));
}

async function loadInstui(): Promise<void> {
  if (instuiIcons.value || loadingInstui.value) return;
  loadingInstui.value = true;
  loadErrorInstui.value = false;
  try {
    const data = (await import("../generated/cdn-icon-manifest-instui.json")) as InstUiEntry[];
    instuiIcons.value = Array.isArray(data) ? data : (data as { default: InstUiEntry[] }).default;
    selectedInstui.value = restoreSelection(
      pendingInstuiSel,
      instuiIcons.value.map((i) => i.name),
    );
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
    selectedSimple.value = restoreSelection(
      pendingSimpleSel,
      simpleIcons.value.map((i) => i.slug),
    );
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
const format = ref(readHashParam("i_fmt") ?? "link");
const search = ref(readHashParam("i_q") ?? "");

watch(format, (v) => writeHashParam("i_fmt", v, "link"));
watch(search, (v) => writeHashParam("i_q", v, ""));

function toggleInstui(name: string): void {
  const next = new Set(selectedInstui.value);
  if (next.has(name)) next.delete(name);
  else next.add(name);
  selectedInstui.value = next;
}
function toggleSimple(slug: string): void {
  const next = new Set(selectedSimple.value);
  if (next.has(slug)) next.delete(slug);
  else next.add(slug);
  selectedSimple.value = next;
}

// "All icons" is a tri-state checkbox over BOTH sources: checked when every InstUI icon and every
// Simple Icon is selected, indeterminate when some are, unchecked when none are. It selects/clears
// everything without disabling the individual checkboxes.
//
// The combine-URL/ESM builder below has its own, narrower "every InstUI icon selected" check
// (independent of Simple Icons) so it can still collapse to the bundled icons.css.
const allInstuiSelected = computed(
  () =>
    (instuiIcons.value?.length ?? 0) > 0 && selectedInstui.value.size === instuiIcons.value?.length,
);
const allSimpleSelected = computed(
  () =>
    (simpleIcons.value?.length ?? 0) > 0 && selectedSimple.value.size === simpleIcons.value?.length,
);

const allSelected = computed(
  () =>
    (instuiIcons.value?.length ?? 0) + (simpleIcons.value?.length ?? 0) > 0 &&
    allInstuiSelected.value &&
    allSimpleSelected.value,
);
const someSelected = computed(
  () => (selectedInstui.value.size > 0 || selectedSimple.value.size > 0) && !allSelected.value,
);
const allCheckboxEl = useIndeterminateCheckbox(someSelected);
watch(selectedInstui, (s) => {
  writeHashParam("i_instui", allInstuiSelected.value ? "all" : [...s].join(","), "");
});
watch(selectedSimple, (s) => {
  writeHashParam("i_simple", allSimpleSelected.value ? "all" : [...s].join(","), "");
});

function toggleAll(checked: boolean): void {
  selectedInstui.value = checked
    ? new Set((instuiIcons.value ?? []).map((i) => i.name))
    : new Set();
  selectedSimple.value = checked
    ? new Set((simpleIcons.value ?? []).map((i) => i.slug))
    : new Set();
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

const hasSelection = computed(() => selectedInstui.value.size > 0 || selectedSimple.value.size > 0);

// ── URL builder — merges both sources into one combine URL / ESM snippet ─────────────────────────
const c = "npm/@pantoken/components/dist";
const si = "npm/@pantoken/plugin-simple-icons/dist";

const combineUrl = computed(() => {
  const files: string[] = [];
  if (allInstuiSelected.value) {
    files.push(`${c}/icons.css`);
  } else {
    for (const name of selectedInstui.value) files.push(`${c}/icons/${name}.css`);
  }
  if (allSimpleSelected.value) {
    files.push(`${si}/simple-icons.css`);
  } else {
    for (const slug of selectedSimple.value) files.push(`${si}/icons/${slug}.css`);
  }
  return files.length === 0 ? null : `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
});

const esmSnippet = computed(() => {
  const lines: string[] = [];
  if (allInstuiSelected.value) {
    lines.push(`import "https://esm.sh/@pantoken/components/icons.css";`);
  } else {
    for (const name of selectedInstui.value) {
      lines.push(`import "https://esm.sh/@pantoken/components/icons/${name}.css";`);
    }
  }
  if (allSimpleSelected.value) {
    lines.push(`import "https://esm.sh/@pantoken/plugin-simple-icons/simple-icons.css";`);
  } else {
    for (const slug of selectedSimple.value) {
      lines.push(`import "https://esm.sh/@pantoken/plugin-simple-icons/icons/${slug}.css";`);
    }
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
</script>

<template>
  <div class="icon-picker instui-view">
    <span class="instui-input-group icon-picker__search">
      <span class="before"><span class="instui-icon -icon-search" aria-hidden="true"></span></span>
      <input
        v-model="search"
        type="search"
        :placeholder="t.searchPlaceholder"
        aria-label="Filter icons"
      />
    </span>

    <fieldset class="instui-form-field-group icon-picker__group">
      <legend class="instui-screen-reader-content">Icons</legend>

      <!-- One scrollable list for both sources — the section headers are rows inside it, not separate
           lists, so there's a single continuous scroll instead of two boxes. -->
      <div style="overflow: hidden" class="instui-view -border-radius-medium -border-width-small">
        <div class="icon-picker__grid instui-view -border-radius-medium instui-p-sm">
          <label class="instui-checkbox">
            <input
              ref="allCheckboxEl"
              type="checkbox"
              :checked="allSelected"
              :disabled="!instuiIcons || !simpleIcons"
              @change="toggleAll(($event.target as HTMLInputElement).checked)"
            />
            <span>{{ t.allIcons }}</span>
          </label>
          <p
            v-if="loadingInstui"
            class="instui-text -color-secondary -style-italic icon-picker__status"
          >
            {{ t.loadingNote }}
          </p>
          <template v-else-if="instuiIcons">
            <div
              class="icon-picker__header instui-heading -level-h3 -variant-label"
              style="margin: 0.75rem 0 0.5rem"
            >
              {{ t.sectionInstui }}
            </div>
            <label
              v-for="icon in filteredInstui"
              :key="icon.name"
              class="instui-checkbox icon-picker__item"
            >
              <input
                type="checkbox"
                :checked="selectedInstui.has(icon.name)"
                @change="toggleInstui(icon.name)"
              />
              <span
                class="instui-icon icon-picker__glyph"
                :class="`-icon-${icon.name}`"
                aria-hidden="true"
              ></span>
              <span class="icon-picker__label">{{ icon.name }}</span>
            </label>
          </template>

          <p
            v-if="loadingSimple"
            class="instui-text -color-secondary -style-italic icon-picker__status"
          >
            {{ t.loadingNote }}
          </p>
          <template v-else-if="simpleIcons">
            <div
              class="icon-picker__header instui-heading -level-h3 -variant-label -border-top"
              style="margin: 1rem 0 0.5rem"
            >
              {{ t.sectionSimple }}
            </div>
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
              <span
                class="instui-icon icon-picker__glyph"
                :style="{
                  '--pantoken-glyph': `url('https://cdn.jsdelivr.net/npm/simple-icons/icons/${icon.slug}.svg')`,
                }"
                aria-hidden="true"
              />
              <span class="icon-picker__label">{{ icon.title }}</span>
            </label>
          </template>
        </div>
      </div>
    </fieldset>

    <PickerOutput
      v-model="format"
      :formats="[
        { value: 'link', label: t.formatLink, lang: 'html' },
        { value: 'import', label: t.formatImport, lang: 'css' },
        { value: 'esm', label: t.formatEsm, lang: 'js' },
      ]"
      :output="output"
      :has-selection="hasSelection"
      :empty-text="t.empty"
      :format-label="t.formatLabel"
      :copy-text="t.copy"
      :copied-text="t.copied"
    />
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
  margin: 0;
}
.icon-picker__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: 0.25rem 0.5rem;
  max-height: 24rem;
  overflow-y: auto;
}
/* Section headers are rows inside the single scrollable grid, spanning every column. */
.icon-picker__header {
  grid-column: 1 / -1;
  margin: 0 0 0.25rem;
}
.icon-picker__status {
  grid-column: 1 / -1;
  margin: 0;
}
.icon-picker__item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.icon-picker__glyph {
  flex-shrink: 0;
  font-size: 1rem;
  width: 1em;
  height: 1em;
}
.icon-picker__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
}
</style>
