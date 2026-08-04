<script setup lang="ts">
import { computed, ref } from "vue";
import { useData } from "vitepress";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";
import PickerOutput from "./PickerOutput.vue";

// The base (unprefixed) element names `@pantoken/web-components` registers — mirrors
// `renderers/web-components/src/index.ts`'s `ELEMENTS` export. Copied rather than imported: the
// source module pulls in raw `.css` files for its bundler to process, and the compiled output isn't
// guaranteed to exist when the docs site builds. Small, stable list — update alongside the source if
// it ever changes.
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
];
const elements = [...ELEMENTS].sort((a, b) => a.localeCompare(b));

// `register()`'s `only` option expands transitively through this map (e.g. `date-input` also pulls in
// `calendar`) — mirrors the same, currently unexported, `NESTED_DEPS` in the source module.
const NESTED_DEPS: Record<string, readonly string[]> = {
  "date-input": ["calendar"],
  "date-time-input": ["date-input"],
};
function withNestedDeps(names: Iterable<string>): string[] {
  const wanted = new Set<string>();
  const add = (name: string): void => {
    if (wanted.has(name)) return;
    wanted.add(name);
    for (const dep of NESTED_DEPS[name] ?? []) add(dep);
  };
  for (const name of names) add(name);
  return [...wanted].sort();
}

// Localized labels from the active locale's themeConfig.webComponentsPicker, falling back to English.
const { theme } = useData();
const t = computed(() => {
  const base = {
    label: "Web components",
    searchPlaceholder: "Filter elements…",
    allElements: "All elements",
    formatLabel: "Output",
    formatEsm: "ES module",
    formatIife: "Classic script tag",
    copy: "Copy",
    copied: "Copied",
    empty: "Select one or more elements to build a snippet.",
    tokenNote:
      "Also load a token sheet (e.g. @pantoken/css/dist/style.css) so these elements can resolve their tokens.",
    iifeNote: "The classic script tag always registers every element, regardless of selection.",
  };
  return { ...base, ...(theme.value as Record<string, unknown>).webComponentsPicker };
});

const selected = ref<Set<string>>(new Set());
const format = ref("esm");
const search = ref("");

function toggle(name: string): void {
  const next = new Set(selected.value);
  if (next.has(name)) next.delete(name);
  else next.add(name);
  selected.value = next;
}

// "All elements" is a tri-state checkbox over the element list: checked when every element is
// selected, indeterminate when some are, unchecked when none are. Clicking it selects/clears
// everything without disabling the individual checkboxes.
const allSelected = computed(() => elements.length > 0 && selected.value.size === elements.length);
const someSelected = computed(() => selected.value.size > 0 && !allSelected.value);
const allCheckboxEl = useIndeterminateCheckbox(someSelected);

function toggleAll(checked: boolean): void {
  selected.value = checked ? new Set(elements) : new Set();
}

const filteredElements = computed(() => {
  const q = search.value.trim().toLowerCase();
  return q ? elements.filter((name) => name.includes(q)) : elements;
});

// The classic script tag always registers everything regardless of selection, so it always has valid
// output; the ES module snippet needs at least one element selected.
const hasSelection = computed(() => format.value === "iife" || selected.value.size > 0);

// Bare URLs/statements, not full <script> snippets — see the token note below the output for the
// separate token sheet these elements still need to resolve their tokens.
const esmSnippet = computed(() => {
  if (allSelected.value) return "https://esm.sh/@pantoken/web-components";
  const only = withNestedDeps(selected.value);
  const onlyList = only.map((name) => `"${name}"`).join(", ");
  return `import { register } from "https://esm.sh/@pantoken/web-components";\nregister(customElements, { only: [${onlyList}] });`;
});

const iifeSnippet =
  "https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js";

const output = computed(() => (format.value === "iife" ? iifeSnippet : esmSnippet.value));
</script>

<template>
  <div
    class="wc-picker instui-view -background-primary -border-radius-large -shadow-resting instui-p-md"
  >
    <fieldset class="instui-form-field-group wc-picker__group">
      <legend>{{ t.label }}</legend>
      <span class="instui-input-group wc-picker__search">
        <span class="before"
          ><span class="instui-icon -icon-search" aria-hidden="true"></span
        ></span>
        <input
          v-model="search"
          type="search"
          :placeholder="t.searchPlaceholder"
          aria-label="Filter elements"
        />
      </span>
      <div
        class="wc-picker__elements instui-view -background-secondary -border-radius-medium -border-width-small instui-p-sm"
      >
        <label class="instui-checkbox">
          <input
            ref="allCheckboxEl"
            type="checkbox"
            :checked="allSelected"
            @change="toggleAll(($event.target as HTMLInputElement).checked)"
          />
          <span>{{ t.allElements }}</span>
        </label>
        <label v-for="name in filteredElements" :key="name" class="instui-checkbox">
          <input type="checkbox" :checked="selected.has(name)" @change="toggle(name)" />
          <span>&lt;instui-{{ name }}&gt;</span>
        </label>
      </div>
    </fieldset>

    <PickerOutput
      v-model="format"
      :formats="[
        { value: 'esm', label: t.formatEsm },
        { value: 'iife', label: t.formatIife },
      ]"
      :output="output"
      :has-selection="hasSelection"
      :empty-text="t.empty"
      :format-label="t.formatLabel"
      :copy-text="t.copy"
      :copied-text="t.copied"
    >
      <p
        v-if="format === 'iife'"
        class="instui-text -size-x-small -color-secondary wc-picker__note"
      >
        {{ t.iifeNote }}
      </p>
      <p class="instui-text -size-x-small -color-secondary wc-picker__note">{{ t.tokenNote }}</p>
    </PickerOutput>
  </div>
</template>

<style scoped>
.wc-picker {
  margin: 1.5rem 0;
}
.wc-picker__search {
  width: 100%;
  margin-bottom: 0.5rem;
}
.wc-picker__elements {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.25rem 0.75rem;
  max-height: 16rem;
  overflow-y: auto;
}
.wc-picker__note {
  display: block;
  margin: 0.5rem 0 0;
}
</style>
