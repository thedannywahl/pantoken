<script setup lang="ts">
import { computed, onMounted, ref, shallowRef, watch } from "vue";
import { useData } from "vitepress";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import pluginManifest from "../generated/cdn-plugin-manifest.json";
import PickerOutput from "./PickerOutput.vue";
import PickerSection from "./PickerSection.vue";
import PickerToggleGroup from "./PickerToggleGroup.vue";

// ── Types ──────────────────────────────────────────────────────────────────────
interface InstUiEntry {
  name: string;
  source: "custom" | "lucide";
}
interface SimpleIconEntry {
  slug: string;
  title: string;
}
interface LogoGroup {
  product: string;
  label: string;
  items: { name: string }[];
}
interface CustomIconEntry {
  name: string;
}

const logoGroups = pluginManifest.logos as LogoGroup[];
const customIcons = pluginManifest.customIcons as CustomIconEntry[];

// ── i18n ───────────────────────────────────────────────────────────────────────
const { theme } = useData();
const t = computed(() => {
  const base = {
    sectionInstui: "InstUI icons",
    sectionSimple: "Simple Icons",
    sectionCustomIcons: "Custom icons",
    sectionLogos: "Logos",
    searchPlaceholder: "Filter icons…",
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
const allCustomIconNames = customIcons.map((i) => i.name);
const selectedCustomIcons = ref<Set<string>>(
  restoreSelection(readHashParam("i_custom"), allCustomIconNames),
);
const allLogoNames = logoGroups.flatMap((g) => g.items.map((i) => i.name));
const selectedLogos = ref<Set<string>>(restoreSelection(readHashParam("i_logos"), allLogoNames));
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
function toggleCustomIcon(name: string): void {
  const next = new Set(selectedCustomIcons.value);
  if (next.has(name)) next.delete(name);
  else next.add(name);
  selectedCustomIcons.value = next;
}
function toggleLogo(name: string): void {
  const next = new Set(selectedLogos.value);
  if (next.has(name)) next.delete(name);
  else next.add(name);
  selectedLogos.value = next;
}
function toggleLogoGroup(key: string, checked: boolean): void {
  const group = logoGroups.find((g) => g.product === key);
  if (!group) return;
  const next = new Set(selectedLogos.value);
  for (const item of group.items) {
    if (checked) next.add(item.name);
    else next.delete(item.name);
  }
  selectedLogos.value = next;
}
function toggleAllLogos(checked: boolean): void {
  selectedLogos.value = checked ? new Set(allLogoNames) : new Set();
}

// Each section's tri-state is scoped to its own source — no combined master checkbox.
const allInstuiSelected = computed(
  () =>
    (instuiIcons.value?.length ?? 0) > 0 && selectedInstui.value.size === instuiIcons.value?.length,
);
const someInstuiSelected = computed(
  () => !allInstuiSelected.value && selectedInstui.value.size > 0,
);
const allSimpleSelected = computed(
  () =>
    (simpleIcons.value?.length ?? 0) > 0 && selectedSimple.value.size === simpleIcons.value?.length,
);
const someSimpleSelected = computed(
  () => !allSimpleSelected.value && selectedSimple.value.size > 0,
);
const allCustomIconsSelected = computed(
  () =>
    allCustomIconNames.length > 0 && selectedCustomIcons.value.size === allCustomIconNames.length,
);
const someCustomIconsSelected = computed(
  () => !allCustomIconsSelected.value && selectedCustomIcons.value.size > 0,
);
const allLogosSelected = computed(
  () => allLogoNames.length > 0 && selectedLogos.value.size === allLogoNames.length,
);

watch(selectedInstui, (s) => {
  writeHashParam("i_instui", allInstuiSelected.value ? "all" : [...s].join(","), "");
});
watch(selectedSimple, (s) => {
  writeHashParam("i_simple", allSimpleSelected.value ? "all" : [...s].join(","), "");
});
watch(selectedCustomIcons, (s) => {
  writeHashParam("i_custom", allCustomIconsSelected.value ? "all" : [...s].join(","), "");
});
watch(selectedLogos, (s) => {
  writeHashParam("i_logos", allLogosSelected.value ? "all" : [...s].join(","), "");
});

function toggleAllInstui(checked: boolean): void {
  selectedInstui.value = checked
    ? new Set((instuiIcons.value ?? []).map((i) => i.name))
    : new Set();
}
function toggleAllSimple(checked: boolean): void {
  selectedSimple.value = checked
    ? new Set((simpleIcons.value ?? []).map((i) => i.slug))
    : new Set();
}
function toggleAllCustomIcons(checked: boolean): void {
  selectedCustomIcons.value = checked ? new Set(allCustomIconNames) : new Set();
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
  () =>
    selectedInstui.value.size > 0 ||
    selectedSimple.value.size > 0 ||
    selectedCustomIcons.value.size > 0 ||
    selectedLogos.value.size > 0,
);

// ── URL builder — merges every source into one combine URL / ESM snippet ────────────────────────
// The InstUI icon sheet is pushed last: :root custom properties resolve last-wins, so on a name
// collision with a vendored custom icon (or, in principle, a brand glyph), the built-in wins.
const c = "npm/@pantoken/components/dist";
const si = "npm/@pantoken/plugin-simple-icons/dist";
const ci = "npm/@pantoken/plugin-custom-icons/dist";
const li = "npm/@pantoken/plugin-logos/dist";

// 3-tier collapse: a fully-selected product folds into its own barrel, and every product selected
// folds into the full logos.css barrel — mirrors the Components tab's collapse-to-barrel pattern.
function logoFiles(prefix: string): string[] {
  if (allLogosSelected.value) return [`${prefix}/logos.css`];
  const files: string[] = [];
  for (const group of logoGroups) {
    const names = group.items.map((i) => i.name);
    if (names.length > 0 && names.every((n) => selectedLogos.value.has(n))) {
      files.push(`${prefix}/${group.product}.css`);
    } else {
      for (const name of names) {
        if (selectedLogos.value.has(name)) files.push(`${prefix}/${name}.css`);
      }
    }
  }
  return files;
}

const combineUrl = computed(() => {
  const files: string[] = [];
  if (allSimpleSelected.value) {
    files.push(`${si}/simple-icons.css`);
  } else {
    for (const slug of selectedSimple.value) files.push(`${si}/icons/${slug}.css`);
  }
  if (allCustomIconsSelected.value) {
    files.push(`${ci}/custom-icons.css`);
  } else {
    for (const name of selectedCustomIcons.value) files.push(`${ci}/icons/${name}.css`);
  }
  files.push(...logoFiles(li));
  if (allInstuiSelected.value) {
    files.push(`${c}/icons.css`);
  } else {
    for (const name of selectedInstui.value) files.push(`${c}/icons/${name}.css`);
  }
  return files.length === 0 ? null : `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
});

const esmSnippet = computed(() => {
  const lines: string[] = [];
  if (allSimpleSelected.value) {
    lines.push(`import "https://esm.sh/@pantoken/plugin-simple-icons/simple-icons.css";`);
  } else {
    for (const slug of selectedSimple.value) {
      lines.push(`import "https://esm.sh/@pantoken/plugin-simple-icons/icons/${slug}.css";`);
    }
  }
  if (allCustomIconsSelected.value) {
    lines.push(`import "https://esm.sh/@pantoken/plugin-custom-icons/custom-icons.css";`);
  } else {
    for (const name of selectedCustomIcons.value) {
      lines.push(`import "https://esm.sh/@pantoken/plugin-custom-icons/icons/${name}.css";`);
    }
  }
  for (const file of logoFiles("@pantoken/plugin-logos")) {
    lines.push(`import "https://esm.sh/${file}";`);
  }
  if (allInstuiSelected.value) {
    lines.push(`import "https://esm.sh/@pantoken/components/icons.css";`);
  } else {
    for (const name of selectedInstui.value) {
      lines.push(`import "https://esm.sh/@pantoken/components/icons/${name}.css";`);
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

      <div style="overflow: hidden" class="instui-view -border-radius-medium -border-width-small">
        <div class="icon-picker__sections instui-view -border-radius-medium instui-p-sm">
          <p
            v-if="loadingInstui"
            class="instui-text -color-secondary -style-italic icon-picker__status"
          >
            {{ t.loadingNote }}
          </p>
          <PickerSection
            v-else-if="instuiIcons"
            :label="t.sectionInstui"
            :all-selected="allInstuiSelected"
            :some-selected="someInstuiSelected"
            @toggle-all="toggleAllInstui"
          >
            <div class="icon-picker__grid">
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
            </div>
          </PickerSection>

          <p
            v-if="loadingSimple"
            class="instui-text -color-secondary -style-italic icon-picker__status"
          >
            {{ t.loadingNote }}
          </p>
          <PickerSection
            v-else-if="simpleIcons"
            :label="t.sectionSimple"
            :all-selected="allSimpleSelected"
            :some-selected="someSimpleSelected"
            @toggle-all="toggleAllSimple"
          >
            <div class="icon-picker__grid">
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
                  loading="lazy"
                  aria-hidden="true"
                />
                <span class="icon-picker__label">{{ icon.title }}</span>
              </label>
            </div>
          </PickerSection>

          <PickerSection
            v-if="customIcons.length > 0"
            :label="t.sectionCustomIcons"
            :all-selected="allCustomIconsSelected"
            :some-selected="someCustomIconsSelected"
            @toggle-all="toggleAllCustomIcons"
          >
            <div class="icon-picker__grid">
              <label
                v-for="icon in customIcons"
                :key="icon.name"
                class="instui-checkbox icon-picker__item"
              >
                <input
                  type="checkbox"
                  :checked="selectedCustomIcons.has(icon.name)"
                  @change="toggleCustomIcon(icon.name)"
                />
                <span
                  class="instui-icon icon-picker__glyph"
                  :class="`-icon-${icon.name}`"
                  aria-hidden="true"
                ></span>
                <span class="icon-picker__label">{{ icon.name }}</span>
              </label>
            </div>
          </PickerSection>

          <PickerToggleGroup
            v-if="logoGroups.length > 0"
            :label="t.sectionLogos"
            :groups="logoGroups.map((g) => ({ key: g.product, label: g.label, items: g.items }))"
            :selected="selectedLogos"
            @toggle-all="toggleAllLogos"
            @toggle-group="toggleLogoGroup"
            @toggle-item="toggleLogo"
          />
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
.icon-picker__sections {
  max-height: 28rem;
  overflow-y: auto;
}
.icon-picker__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: 0.25rem 0.5rem;
}
.icon-picker__status {
  margin: 0 0 0.5rem;
}
.icon-picker__item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.icon-picker__glyph,
.icon-picker__img {
  flex-shrink: 0;
  font-size: 1rem;
  width: 1em;
  height: 1em;
}
.icon-picker__img {
  /* Override VitePress's default `.vp-doc img { margin: ... }` so the image sits flush like the
     InstUI glyph span next to it, instead of gaining extra vertical space. */
  margin: 0;
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
</style>
