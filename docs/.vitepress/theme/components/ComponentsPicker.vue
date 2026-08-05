<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData } from "vitepress";
import type { PantokenTheme } from "../theme";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import { toggleStringInSet, useHashParamRef } from "../composables/usePickerHelpers";
import { tokenLeanSheet, type PickerMode } from "../composables/usePickerTheme";
import { COMPONENTS, getAllDependencies } from "./componentMetadata";
import PickerOutput from "./PickerOutput.vue";

const props = defineProps<{
  themeKey: PantokenTheme;
  mode: PickerMode;
}>();

const components = [...COMPONENTS].sort((a, b) => a.name.localeCompare(b.name));

const { theme } = useData();
const t = computed(() => {
  const base = {
    label: "Components",
    searchPlaceholder: "Filter components…",
    allComponents: "All components",
    formatLabel: "CSS Output",
    formatLink: "<link>",
    formatImport: "@import",
    jsFormatLabel: "JS Output",
    jsFormatEsm: "ESM",
    jsFormatModuleScript: "<script>",
    copy: "Copy",
    copied: "Copied",
    empty: "Select one or more components to build a snippet.",
    noteBase: "CSS components are included with their interactions applied on page load.",
  };
  return { ...base, ...((theme.value as Record<string, unknown>).componentsPicker as object) };
});

// Deep-linking state management
function initialSelection(): Set<string> {
  const raw = readHashParam("comp_sel");
  if (raw === "all") return new Set(components.map((c) => c.name));
  if (!raw) return new Set();
  const names = new Set(components.map((c) => c.name));
  return new Set(raw.split(",").filter((n) => names.has(n)));
}

const requested = ref<Set<string>>(initialSelection());
const cssFormat = useHashParamRef("comp_css_fmt", "import");
const jsFormat = useHashParamRef("comp_js_fmt", "module");
const search = useHashParamRef("comp_q", "");

// Derived state: apply dependencies to JS components
const selected = computed(() => {
  const set = new Set(requested.value);
  // Expand JS component dependencies
  for (const name of set) {
    const comp = components.find((c) => c.name === name);
    if (comp && (comp.type === "both" || comp.type === "js-only")) {
      const deps = getAllDependencies(name);
      for (const dep of deps) set.add(dep);
    }
  }
  return set;
});

// Locked dependencies that cannot be unchecked
const lockedDeps = computed(() => {
  const locked = new Set<string>();
  for (const name of requested.value) {
    const comp = components.find((c) => c.name === name);
    if (comp && (comp.type === "both" || comp.type === "js-only")) {
      const deps = getAllDependencies(name);
      for (const dep of deps) locked.add(dep);
    }
  }
  return locked;
});

function toggle(name: string): void {
  if (selected.value.has(name)) {
    if (lockedDeps.value.has(name)) return;
    requested.value = toggleStringInSet(requested.value, name);
    return;
  }
  requested.value = toggleStringInSet(requested.value, name);
}

// Tri-state checkbox
const allSelected = computed(
  () => components.length > 0 && selected.value.size === components.length,
);
const someSelected = computed(() => selected.value.size > 0 && !allSelected.value);
const allCheckboxEl = useIndeterminateCheckbox(someSelected);
watch(requested, (s) => {
  writeHashParam("comp_sel", s.size === components.length ? "all" : [...s].sort().join(","), "");
});

function toggleAll(checked: boolean): void {
  requested.value = checked ? new Set(components.map((c) => c.name)) : new Set();
}

const filteredComponents = computed(() => {
  const q = search.value.trim().toLowerCase();
  return q ? components.filter((c) => c.name.includes(q)) : components;
});

const selectedMetadata = computed(() => components.filter((c) => selected.value.has(c.name)));

const hasCss = computed(() =>
  selectedMetadata.value.some((c) => c.type === "css-only" || c.type === "both"),
);

const hasJs = computed(() =>
  selectedMetadata.value.some((c) => c.type === "js-only" || c.type === "both"),
);

const needsIconSheet = computed(() => selectedMetadata.value.some((c) => c.needsIcons));

const tokenSheet = computed(() => tokenLeanSheet(props.themeKey, props.mode));

// ── CSS Generation ──────────────────────────────────────────────────────────────

const allCssComponents = computed(() =>
  selectedMetadata.value
    .filter((c) => c.type === "css-only" || c.type === "both")
    .map((c) => c.name),
);

const cssCombineUrl = computed(() => {
  const c = "npm/@pantoken/components/dist";
  const files = [tokenSheet.value];
  files.push(`${c}/base.css`);
  if (needsIconSheet.value) files.push(`${c}/component-icons.css`);

  // If all CSS components are selected, use the barrel
  if (
    allCssComponents.value.length ===
    components.filter((comp) => comp.type === "css-only" || comp.type === "both").length
  ) {
    files.push(`${c}/components.css`);
  } else {
    // Otherwise, include individually selected CSS components
    for (const name of allCssComponents.value) {
      files.push(`${c}/${name}.css`);
    }
  }
  files.push(`${c}/utilities.css`);
  return `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
});

const cssLinkOutput = computed(() => `<link rel="stylesheet" href="${cssCombineUrl.value}">`);

const cssImportOutput = computed(() => `@import url("${cssCombineUrl.value}");`);

const cssOutput = computed(() =>
  cssFormat.value === "link" ? cssLinkOutput.value : cssImportOutput.value,
);

// ── JS Generation ──────────────────────────────────────────────────────────────

const jsComponents = computed(() =>
  selectedMetadata.value
    .filter((c) => c.type === "js-only" || c.type === "both")
    .map((c) => c.name),
);

const jsEsmSnippet = computed(() => {
  if (jsComponents.value.length === 0) return "";
  const imports = jsComponents.value.map((name) => {
    const camel = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return `import init${camel.charAt(0).toUpperCase() + camel.slice(1)} from "https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/${name}.iife.js";`;
  });
  return imports.join("\n");
});

const jsModuleScriptSnippet = computed(() => {
  if (jsComponents.value.length === 0) return "";
  return ['<script type="module">', `  ${jsEsmSnippet.value}`, "</" + "script>"].join("\n");
});

const jsOutput = computed(() => {
  if (jsComponents.value.length === 0) return "";
  if (jsFormat.value === "module") return jsModuleScriptSnippet.value;
  return jsEsmSnippet.value;
});
</script>

<template>
  <div class="components-picker instui-view">
    <fieldset class="instui-form-field-group components-picker__group">
      <span class="instui-screen-reader-content"
        ><legend>{{ t.label }}</legend></span
      >
      <span class="instui-input-group components-picker__search">
        <span class="before"
          ><span class="instui-icon -icon-search" aria-hidden="true"></span
        ></span>
        <input
          v-model="search"
          type="search"
          :placeholder="t.searchPlaceholder"
          aria-label="Filter components"
        />
      </span>
      <div style="overflow: hidden" class="instui-view -border-radius-medium -border-width-small">
        <div class="components-picker__components instui-view -border-radius-medium instui-p-sm">
          <label class="instui-checkbox">
            <input
              ref="allCheckboxEl"
              type="checkbox"
              :checked="allSelected"
              @change="toggleAll(($event.target as HTMLInputElement).checked)"
            />
            <span>{{ t.allComponents }}</span>
          </label>
          <label v-for="comp in filteredComponents" :key="comp.name" class="instui-checkbox">
            <input
              type="checkbox"
              :checked="selected.has(comp.name)"
              :disabled="lockedDeps.has(comp.name) && !requested.has(comp.name)"
              @change="toggle(comp.name)"
            />
            <span>
              {{ comp.name }}
              <span
                v-if="comp.type !== 'css-only'"
                class="instui-icon"
                :style="{
                  '--pantoken-glyph': `url('https://cdn.jsdelivr.net/npm/simple-icons/icons/javascript.svg')`,
                }"
                aria-hidden="true"
              />
            </span>
          </label>
        </div>
      </div>
    </fieldset>

    <!-- CSS Output -->
    <PickerOutput
      v-if="hasCss"
      v-model="cssFormat"
      :formats="[
        { value: 'import', label: t.formatImport, lang: 'css' },
        { value: 'link', label: t.formatLink, lang: 'html' },
      ]"
      :output="cssOutput"
      :has-selection="hasCss"
      :empty-text="t.empty"
      :format-label="t.formatLabel"
      :copy-text="t.copy"
      :copied-text="t.copied"
    >
      <p class="instui-text -size-x-small -color-secondary components-picker__note">
        {{ t.noteBase }}
      </p>
    </PickerOutput>

    <!-- JS Output -->
    <PickerOutput
      v-if="hasJs"
      v-model="jsFormat"
      :formats="[
        { value: 'module', label: t.jsFormatModuleScript, lang: 'html' },
        { value: 'esm', label: t.jsFormatEsm, lang: 'js' },
      ]"
      :output="jsOutput"
      :has-selection="hasJs"
      :empty-text="t.empty"
      :format-label="t.jsFormatLabel"
      :copy-text="t.copy"
      :copied-text="t.copied"
    />
  </div>
</template>

<style scoped>
.components-picker {
  margin: 1.5rem 0;
}
.components-picker__search {
  width: 100%;
  margin-bottom: 0.5rem;
}
.components-picker__components {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.25rem 0.75rem;
  max-height: 24rem;
  overflow-y: auto;
}
.components-picker__note {
  display: block;
  margin: 0.5rem 0 0;
}
.components-picker__badge {
  display: inline-block;
  margin-left: 0.25rem;
  padding: 0.125rem 0.375rem;
  font-size: 0.75em;
  font-weight: 600;
  border-radius: 0.25rem;
  background: var(--instui-bg-info-secondary, #e8f2fa);
  color: var(--instui-color-info, #0074d9);
}
</style>
