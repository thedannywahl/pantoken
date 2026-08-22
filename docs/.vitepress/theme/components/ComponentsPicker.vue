<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData } from "vitepress";
import type { PantokenTheme } from "../theme";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import { toggleStringInSet, useHashParamRef } from "../composables/usePickerHelpers";
import { tokenLeanSheet, type PickerMode } from "../composables/usePickerTheme";
import { COMPONENTS, getAllDependencies } from "./componentMetadata";
import pluginManifest from "../generated/cdn-plugin-manifest.json";
import PickerOutput from "./PickerOutput.vue";
import PickerSection from "./PickerSection.vue";

const props = defineProps<{
  themeKey: PantokenTheme;
  mode: PickerMode;
}>();

const components = [...COMPONENTS].sort((a, b) => a.name.localeCompare(b.name));

type CustomComponent = { name: string };
type OtherPlugin = { key: string; pkg: string; file: string; label: string };
const customComponents = pluginManifest.customComponents as CustomComponent[];
const otherPlugins = pluginManifest.otherPlugins as OtherPlugin[];

const { theme } = useData();
const t = computed(() => {
  const base = {
    label: "Components",
    searchPlaceholder: "Filter components…",
    sectionCore: "Core",
    sectionComponents: "Components",
    sectionCustomComponents: "Custom components",
    sectionOtherPlugins: "Other plugins",
    formatLabel: "CSS",
    formatLink: "<link>",
    formatImport: "@import",
    jsFormatLabel: "JavaScript",
    jsFormatEsm: "ESM",
    jsFormatModuleScript: "<script>",
    copy: "Copy",
    copied: "Copied",
    empty: "Select one or more components to build a snippet.",
    noteBase: "CSS components are included with their interactions applied on page load.",
    includeBase: "Base",
    baseInfoLabel: "About the base reset",
    baseInfo:
      "The opt-in global reset: box-sizing, the page surface, base text colour and font, color-scheme, and link defaults.",
    includeUtilities: "Utilities",
    utilitiesInfoLabel: "About the utility classes",
    utilitiesInfo:
      "An opt-in layer of cross-cutting classes: a View primitive, spacing on the token scale, and semantic color overrides.",
    enhancement: "enhancement",
    requirement: "requirement",
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
function initialNamedSelection(param: string, all: string[]): Set<string> {
  const raw = readHashParam(param);
  if (raw === "all") return new Set(all);
  if (!raw) return new Set();
  const names = new Set(all);
  return new Set(raw.split(",").filter((n) => names.has(n)));
}

const requested = ref<Set<string>>(initialSelection());
const includeBase = ref(readHashParam("comp_base") === "1");
const includeUtilities = ref(readHashParam("comp_util") === "1");
const customSelected = ref<Set<string>>(
  initialNamedSelection(
    "comp_custom",
    customComponents.map((c) => c.name),
  ),
);
const otherPluginsSelected = ref<Set<string>>(
  initialNamedSelection(
    "comp_plugins",
    otherPlugins.map((p) => p.key),
  ),
);
const cssFormat = useHashParamRef("comp_css_fmt", "import");
const jsFormat = useHashParamRef("comp_js_fmt", "module");
const search = useHashParamRef("comp_q", "");

watch(includeBase, (v) => writeHashParam("comp_base", v ? "1" : "0", "0"));
watch(includeUtilities, (v) => writeHashParam("comp_util", v ? "1" : "0", "0"));
watch(customSelected, (s) => {
  writeHashParam(
    "comp_custom",
    s.size === customComponents.length ? "all" : [...s].sort().join(","),
    "",
  );
});
watch(otherPluginsSelected, (s) => {
  writeHashParam(
    "comp_plugins",
    s.size === otherPlugins.length ? "all" : [...s].sort().join(","),
    "",
  );
});

function toggleCustom(name: string): void {
  customSelected.value = toggleStringInSet(customSelected.value, name);
}
function toggleOtherPlugin(key: string): void {
  otherPluginsSelected.value = toggleStringInSet(otherPluginsSelected.value, key);
}
function toggleAllCustom(checked: boolean): void {
  customSelected.value = checked ? new Set(customComponents.map((c) => c.name)) : new Set();
}
function toggleAllOtherPlugins(checked: boolean): void {
  otherPluginsSelected.value = checked ? new Set(otherPlugins.map((p) => p.key)) : new Set();
}

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

// Section tri-states — each section's header checkbox is scoped to that section only.
const allComponentsSelected = computed(
  () => components.length > 0 && selected.value.size === components.length,
);
const someComponentsSelected = computed(
  () => !allComponentsSelected.value && selected.value.size > 0,
);
watch(requested, (s) => {
  writeHashParam("comp_sel", s.size === components.length ? "all" : [...s].sort().join(","), "");
});

function toggleAllComponents(checked: boolean): void {
  requested.value = checked ? new Set(components.map((c) => c.name)) : new Set();
}

const filteredComponents = computed(() => {
  const q = search.value.trim().toLowerCase();
  return q ? components.filter((c) => c.name.includes(q)) : components;
});

const selectedMetadata = computed(() => components.filter((c) => selected.value.has(c.name)));

// Whether any main-list component needs CSS — forces Base/Utilities on, same as before. Custom
// components and other plugins are separate CSS sources and don't touch this.
const hasCss = computed(() =>
  selectedMetadata.value.some((c) => c.type === "css-only" || c.type === "both"),
);

const hasJs = computed(() =>
  selectedMetadata.value.some((c) => c.type === "js-only" || c.type === "both"),
);

// Core section (Base/Utilities): tri-state reflects the effective (possibly forced-on) values.
const coreAllSelected = computed(
  () => (includeBase.value || hasCss.value) && (includeUtilities.value || hasCss.value),
);
const coreSomeSelected = computed(
  () => !coreAllSelected.value && (includeBase.value || includeUtilities.value || hasCss.value),
);
function toggleAllCore(checked: boolean): void {
  includeBase.value = checked;
  includeUtilities.value = checked;
}

const allCustomSelected = computed(
  () => customComponents.length > 0 && customSelected.value.size === customComponents.length,
);
const someCustomSelected = computed(
  () => !allCustomSelected.value && customSelected.value.size > 0,
);

const allOtherPluginsSelected = computed(
  () => otherPlugins.length > 0 && otherPluginsSelected.value.size === otherPlugins.length,
);
const someOtherPluginsSelected = computed(
  () => !allOtherPluginsSelected.value && otherPluginsSelected.value.size > 0,
);

const needsIconSheet = computed(() => selectedMetadata.value.some((c) => c.needsIcons));

const tokenSheet = computed(() => tokenLeanSheet(props.themeKey, props.mode));

// ── CSS Generation ──────────────────────────────────────────────────────────────

const allCssComponents = computed(() =>
  selectedMetadata.value
    .filter((c) => c.type === "css-only" || c.type === "both")
    .map((c) => c.name),
);

const hasAnyCss = computed(
  () => hasCss.value || customSelected.value.size > 0 || otherPluginsSelected.value.size > 0,
);

const cssCombineUrl = computed(() => {
  const c = "npm/@pantoken/components/dist";
  const cc = "npm/@pantoken/plugin-custom-components/dist";
  const files = [tokenSheet.value];
  // base and utilities: forced on when any CSS component is selected, otherwise honour the checkbox
  if (hasCss.value || includeBase.value) files.push(`${c}/base.css`);
  if (needsIconSheet.value) files.push(`${c}/component-icons.css`);

  // If all CSS components are selected, use the barrel
  if (
    allCssComponents.value.length ===
    components.filter((comp) => comp.type === "css-only" || comp.type === "both").length
  ) {
    files.push(`${c}/components.css`);
  } else {
    for (const name of allCssComponents.value) {
      files.push(`${c}/${name}.css`);
    }
  }
  if (hasCss.value || includeUtilities.value) files.push(`${c}/utilities.css`);

  if (customSelected.value.size > 0) {
    if (allCustomSelected.value) files.push(`${cc}/custom-components.css`);
    else for (const name of customSelected.value) files.push(`${cc}/${name}.css`);
  }
  for (const plugin of otherPlugins) {
    if (otherPluginsSelected.value.has(plugin.key))
      files.push(`npm/${plugin.pkg}/dist/${plugin.file}`);
  }

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

// Every JS-capable component in the whole manifest — not just the selected/expanded set.
const allJsCapableComponents = computed(() =>
  components.filter((c) => c.type === "js-only" || c.type === "both"),
);
const allJsCapableSelected = computed(
  () =>
    allJsCapableComponents.value.length > 0 &&
    jsComponents.value.length === allJsCapableComponents.value.length,
);

// Dependencies must load before their dependents
const jsComponentsOrdered = computed(() => {
  const prioritized: string[] = [];
  const seen = new Set<string>();
  function addWithDeps(name: string) {
    if (seen.has(name)) return;
    seen.add(name);
    const comp = components.find((c) => c.name === name);
    if (comp) for (const dep of comp.dependencies) addWithDeps(dep);
    prioritized.push(name);
  }
  for (const name of [...jsComponents.value].sort()) addWithDeps(name);
  return prioritized;
});

const jsIifeSnippet = computed(() => {
  if (jsComponents.value.length === 0) return "";
  // Every JS-capable component selected collapses to the full interactions bundle, mirroring how
  // the CSS side collapses to components.css, instead of combining every per-component file.
  const src = allJsCapableSelected.value
    ? "https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/interactions.iife.js"
    : (() => {
        const files = jsComponentsOrdered.value.map(
          (name) => `npm/@pantoken/interactions/dist/${name}.iife.js`,
        );
        return files.length === 1
          ? `https://cdn.jsdelivr.net/${files[0]}`
          : `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
      })();
  // DOM calls avoid writing a literal closing-script-tag inside the SFC script block
  return `(function () {
  var script = document.createElement("script");
  script.src = "${src}";
  document.head.appendChild(script);
})();`;
});

const jsEsmSnippet = computed(() => {
  if (jsComponents.value.length === 0) return "";
  if (allJsCapableSelected.value) {
    return `import "https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/interactions.iife.js";`;
  }
  const imports = jsComponentsOrdered.value.map(
    (name) => `import "https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/${name}.iife.js";`,
  );
  return imports.join("\n");
});

const jsOutput = computed(() => {
  if (jsComponents.value.length === 0) return "";
  if (jsFormat.value === "module") return jsIifeSnippet.value;
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
        <div class="components-picker__sections instui-view -border-radius-medium --p-sm">
          <PickerSection
            :label="t.sectionComponents"
            :all-selected="allComponentsSelected"
            :some-selected="someComponentsSelected"
            @toggle-all="toggleAllComponents"
            open
          >
            <div class="components-picker__components">
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
                    :class="[
                      'instui-badge',
                      '-standalone',
                      comp.type === 'js-only' ? '-color-danger' : '',
                    ]"
                    aria-hidden="true"
                    :style="{ minWidth: 'unset', width: '0.5rem', height: '0.5rem' }"
                  />
                </span>
              </label>
            </div>
          </PickerSection>

          <PickerSection
            v-if="customComponents.length > 0"
            :label="t.sectionCustomComponents"
            :all-selected="allCustomSelected"
            :some-selected="someCustomSelected"
            @toggle-all="toggleAllCustom"
          >
            <div class="components-picker__components">
              <label v-for="comp in customComponents" :key="comp.name" class="instui-checkbox">
                <input
                  type="checkbox"
                  :checked="customSelected.has(comp.name)"
                  @change="toggleCustom(comp.name)"
                />
                <span>{{ comp.name }}</span>
              </label>
            </div>
          </PickerSection>
          <PickerSection
            :label="t.sectionCore"
            :all-selected="coreAllSelected"
            :some-selected="coreSomeSelected"
            :disabled="hasCss"
            @toggle-all="toggleAllCore"
          >
            <div class="components-picker__components">
              <div class="components-picker__labeled-item">
                <label class="instui-checkbox">
                  <input
                    type="checkbox"
                    :checked="hasCss || includeBase"
                    :disabled="hasCss"
                    @change="includeBase = ($event.target as HTMLInputElement).checked"
                  />
                  <span>{{ t.includeBase }}</span>
                </label>
                <button
                  type="button"
                  class="instui-button -size-small -shape-circle -icon-info -without-background -without-border components-picker__info"
                  style="anchor-name: --comp-picker-base-anchor; padding: 0; min-height: 1.5rem"
                  popovertarget="comp-picker-base-popover"
                  :aria-label="t.baseInfoLabel"
                ></button>
                <div
                  id="comp-picker-base-popover"
                  popover
                  class="instui-context-view -placement-bottom components-picker__popover"
                  style="position-anchor: --comp-picker-base-anchor"
                >
                  {{ t.baseInfo }}
                </div>
              </div>
              <div class="components-picker__labeled-item">
                <label class="instui-checkbox">
                  <input
                    type="checkbox"
                    :checked="hasCss || includeUtilities"
                    :disabled="hasCss"
                    @change="includeUtilities = ($event.target as HTMLInputElement).checked"
                  />
                  <span>{{ t.includeUtilities }}</span>
                </label>
                <button
                  type="button"
                  class="instui-button -size-small -shape-circle -icon-info -without-background -without-border components-picker__info"
                  style="anchor-name: --comp-picker-util-anchor; padding: 0; min-height: 1.5rem"
                  popovertarget="comp-picker-util-popover"
                  :aria-label="t.utilitiesInfoLabel"
                ></button>
                <div
                  id="comp-picker-util-popover"
                  popover
                  class="instui-context-view -placement-bottom components-picker__popover"
                  style="position-anchor: --comp-picker-util-anchor"
                >
                  {{ t.utilitiesInfo }}
                </div>
              </div>
            </div>
          </PickerSection>
          <PickerSection
            v-if="otherPlugins.length > 0"
            :label="t.sectionOtherPlugins"
            :all-selected="allOtherPluginsSelected"
            :some-selected="someOtherPluginsSelected"
            @toggle-all="toggleAllOtherPlugins"
            open
          >
            <div class="components-picker__components">
              <label v-for="plugin in otherPlugins" :key="plugin.key" class="instui-checkbox">
                <input
                  type="checkbox"
                  :checked="otherPluginsSelected.has(plugin.key)"
                  @change="toggleOtherPlugin(plugin.key)"
                />
                <span>{{ plugin.label }}</span>
              </label>
            </div>
          </PickerSection>
        </div>
      </div>
    </fieldset>
    <div class="instui-view --mt-sm">
      <div
        class="instui-icon -icon-javascript --ms-sm"
        style="color: var(--instui-color-text-info)"
      ></div>
      {{ t.enhancement }}
      <div
        class="instui-icon -icon-javascript --ms-sm"
        style="color: var(--instui-color-text-error)"
      ></div>
      {{ t.requirement }}
    </div>

    <!-- CSS Output -->
    <PickerOutput
      v-if="hasAnyCss"
      v-model="cssFormat"
      :formats="[
        { value: 'import', label: t.formatImport, lang: 'css' },
        { value: 'link', label: t.formatLink, lang: 'html' },
      ]"
      :output="cssOutput"
      :has-selection="hasAnyCss"
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
        { value: 'module', label: t.jsFormatModuleScript, lang: 'js' },
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

<style>
@import "@pantoken/plugin-simple-icons/icons/javascript.css";
</style>

<style scoped>
.components-picker {
  margin: 1.5rem 0;
}
.components-picker__search {
  width: 100%;
  margin-bottom: 0.5rem;
}
.components-picker__sections {
  max-height: 28rem;
  overflow-y: auto;
}
.components-picker__components {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.25rem 0.75rem;
}
.components-picker__labeled-item {
  display: inline-flex;
  align-items: center;
  gap: var(--instui-component-checkbox-gap);
}
.components-picker__popover {
  max-width: 16rem;
}
.components-picker__note {
  display: block;
  margin: 0.5rem 0 0;
}
</style>
