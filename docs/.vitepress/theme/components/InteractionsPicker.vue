<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData } from "vitepress";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import { toggleStringInSet, useHashParamRef } from "../composables/usePickerHelpers";
import { tokenLeanSheet } from "../composables/usePickerTheme";
import PickerOutput from "./PickerOutput.vue";

const ELEMENTS = [
  "icon",
  "button",
  "alert",
  "badge",
  "pill",
  "tag",
  "avatar",
  "spinner",
  "progress",
  "metric",
  "rating",
  "progress-circle",
  "icon-button",
  "toggle-button",
  "truncate",
  "img",
  "side-nav-bar",
  "tree-browser",
  "calendar",
  "tooltip",
  "modal",
  "context-view",
  "popover",
  "tray",
  "in-place-edit",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
] as const;

const COMMAND_COMPONENTS = new Set<string>([
  "button",
  "icon-button",
  "toggle-button",
  "calendar",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
]);

const RECOMMENDED_COMPONENTS = ["button", "icon-button", "toggle-button"] as const;
const RECOMMENDED_SELECTION = [...RECOMMENDED_COMPONENTS].sort().join(",");

const elements = [...ELEMENTS].sort((a, b) => a.localeCompare(b));

const { theme } = useData();
const t = computed(() => {
  const base = {
    label: "Interactions",
    searchPlaceholder: "Filter components…",
    allComponents: "All components",
    formatLabel: "Output",
    formatEsm: "ESM",
    formatModuleScript: "<script>",
    formatIife: "<script>",
    copy: "Copy",
    copied: "Copied",
    empty: "Select one or more components to build an interactions snippet.",
    noteBase:
      "This import stays minimal: spacing behavior maps to applySpacing and command-driven components add only Invoker helpers.",
    noteHeavy:
      "Calendar/drilldown/date interactions add command routing helpers (makeOnCommand + syncInvoker), which were notably larger than spacing-only imports in our size analysis.",
    iifeNote:
      "This snippet loads its own token sheet and exposes PantokenInteractions globally, so dropping it in is enough — no separate link/script tags to write by hand.",
  };
  return { ...base, ...((theme.value as Record<string, unknown>).interactionsPicker as object) };
});

function initialSelection(): Set<string> {
  const raw = readHashParam("j_sel");
  if (raw === "all") return new Set(elements);
  if (!raw) return new Set(RECOMMENDED_COMPONENTS);
  const names = new Set<string>(elements);
  return new Set(raw.split(",").filter((n) => names.has(n)));
}

const selected = ref<Set<string>>(initialSelection());
const format = useHashParamRef("j_fmt", "esm");
const search = useHashParamRef("j_q", "");

function toggle(name: string): void {
  selected.value = toggleStringInSet(selected.value, name);
}

const allSelected = computed(() => elements.length > 0 && selected.value.size === elements.length);
const someSelected = computed(() => selected.value.size > 0 && !allSelected.value);
const allCheckboxEl = useIndeterminateCheckbox(someSelected);
watch(selected, (s) => {
  writeHashParam(
    "j_sel",
    allSelected.value ? "all" : [...s].sort().join(","),
    RECOMMENDED_SELECTION,
  );
});

function toggleAll(checked: boolean): void {
  selected.value = checked ? new Set(elements) : new Set();
}

const filteredElements = computed(() => {
  const q = search.value.trim().toLowerCase();
  return q ? elements.filter((name) => name.includes(q)) : elements;
});

const hasSelection = computed(() => selected.value.size > 0);

const needsCommandHelpers = computed(() =>
  [...selected.value].some((name) => COMMAND_COMPONENTS.has(name)),
);

const imports = computed(() => {
  if (!hasSelection.value) return [] as string[];
  const baseImports = ["applySpacing"];
  if (needsCommandHelpers.value) baseImports.push("makeOnCommand", "syncInvoker");
  return baseImports;
});

const esmSnippet = computed(() => {
  if (!hasSelection.value) return "";
  return `import { ${imports.value.join(", ")} } from "https://esm.sh/@pantoken/interactions";`;
});

const moduleSnippet = computed(() => {
  if (!hasSelection.value) return "";
  return ['<script type="module">', `  ${esmSnippet.value}`, "</" + "script>"].join("\n");
});

// Token sheet URL for the IIFE bootstrap (uses rebrand adaptive as default).
const tokenLink = computed(() => {
  const tokenSheet = tokenLeanSheet("rebrand", "adaptive");
  return `https://cdn.jsdelivr.net/${tokenSheet}`;
});

// A self-contained bootstrapper: it injects the token stylesheet, then loads interactions as an ESM
// module and exposes the functions globally on PantokenInteractions. Built from DOM calls rather than
// literal tag text, which sidesteps writing a literal closing-script-tag substring.
const iifeSnippet = computed(() => {
  if (!hasSelection.value) return "";
  return `(function () {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "${tokenLink.value}";
  document.head.appendChild(link);

  var script = document.createElement("script");
  script.type = "module";
  script.textContent = 'import * as interactions from "https://esm.sh/@pantoken/interactions"; window.PantokenInteractions = interactions;';
  document.head.appendChild(script);
})();`;
});

const output = computed(() => {
  if (format.value === "iife") return iifeSnippet.value;
  if (format.value === "module") return moduleSnippet.value;
  return esmSnippet.value;
});

const note = computed(() => {
  if (format.value === "iife") return t.value.iifeNote;
  return needsCommandHelpers.value ? t.value.noteHeavy : t.value.noteBase;
});
</script>

<template>
  <div class="interactions-picker instui-view">
    <fieldset class="instui-form-field-group interactions-picker__group">
      <span class="instui-screen-reader-content"
        ><legend>{{ t.label }}</legend></span
      >
      <span class="instui-input-group interactions-picker__search">
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
        <div class="interactions-picker__components instui-view -border-radius-medium --p-sm">
          <label class="instui-checkbox">
            <input
              ref="allCheckboxEl"
              type="checkbox"
              :checked="allSelected"
              @change="toggleAll(($event.target as HTMLInputElement).checked)"
            />
            <span>{{ t.allComponents }}</span>
          </label>
          <label v-for="name in filteredElements" :key="name" class="instui-checkbox">
            <input type="checkbox" :checked="selected.has(name)" @change="toggle(name)" />
            <span>{{ name }}</span>
          </label>
        </div>
      </div>
    </fieldset>

    <PickerOutput
      v-model="format"
      :formats="[
        { value: 'esm', label: t.formatEsm, lang: 'js' },
        { value: 'module', label: t.formatModuleScript, lang: 'html' },
        { value: 'iife', label: t.formatIife, lang: 'js' },
      ]"
      :output="output"
      :has-selection="hasSelection"
      :empty-text="t.empty"
      :format-label="t.formatLabel"
      :copy-text="t.copy"
      :copied-text="t.copied"
    >
      <p class="instui-text -size-x-small -color-secondary interactions-picker__note">
        {{ note }}
      </p>
    </PickerOutput>
  </div>
</template>

<style scoped>
.interactions-picker {
  margin: 1.5rem 0;
}
.interactions-picker__search {
  width: 100%;
  margin-bottom: 0.5rem;
}
.interactions-picker__components {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.25rem 0.75rem;
  max-height: 24rem;
  overflow-y: auto;
}
.interactions-picker__note {
  display: block;
  margin: 0.5rem 0 0;
}
</style>
