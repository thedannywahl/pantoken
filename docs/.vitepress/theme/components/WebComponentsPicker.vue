<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData } from "vitepress";
import { buildFileUrl, buildFileUrls, toScriptTagLines, type CdnFile } from "@pantoken/cdn";
import type { PantokenTheme } from "../theme";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import { toggleStringInSet, useHashParamRef } from "../composables/usePickerHelpers";
import { type PickerMode } from "../composables/pickerMode";
import { tokenSheetFile } from "../composables/tokenSheetPaths";
import PickerOutput from "./PickerOutput.vue";

const props = defineProps<{
  themeKey: PantokenTheme;
  mode: PickerMode;
  provider: string;
}>();

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
// `calendar`) — mirrors the now-exported `NESTED_DEPS` in the source module (still copied rather than
// imported, for the same reason as `ELEMENTS` above).
const NESTED_DEPS: Record<string, readonly string[]> = {
  "date-input": ["calendar"],
  "date-time-input": ["date-input"],
};
function withNestedDeps(names: Iterable<string>): string[] {
  const wanted = new Set<string>();
  const queue = [...names];
  while (queue.length > 0) {
    const name = queue.shift();
    if (!name || wanted.has(name)) continue;
    wanted.add(name);
    for (const dep of NESTED_DEPS[name] ?? []) queue.push(dep);
  }
  return [...wanted].sort();
}

// Mirrors `ICON_ELEMENTS` in the source module — the elements that call the real icon resolver at
// runtime, as opposed to the separate, CSS-only `-icon-<name>` glyph painting most components use.
const iconElementNames: readonly string[] = [
  "icon",
  "calendar",
  "date-input",
  "drilldown",
  "rating",
];

// jsDelivr's `/combine/` concatenates files in the order listed, and each per-element bundle is a
// self-invoking script that registers on load — so a dependency must be listed (and thus defined)
// before whatever nests it. The dependency graph is two shallow chains (calendar → date-input →
// date-time-input), so a fixed priority list is simpler than a general topological sort.
const DEPENDENCY_ORDER = ["calendar", "date-input", "date-time-input"];
function orderForCombine(names: Iterable<string>): string[] {
  const set = new Set(names);
  const prioritized = DEPENDENCY_ORDER.filter((n) => set.has(n));
  const rest = [...set].filter((n) => !DEPENDENCY_ORDER.includes(n)).sort();
  return [...prioritized, ...rest];
}

// Localized labels from the active locale's themeConfig.webComponentsPicker, falling back to English.
const { theme } = useData();
const t = computed(() => {
  const base = {
    label: "Web components",
    searchPlaceholder: "Filter elements…",
    allElements: "All elements",
    formatLabel: "Output",
    formatEsm: "ESM",
    formatIife: "<script>",
    copy: "Copy",
    copied: "Copied",
    empty: "Select one or more elements to build a snippet.",
    tokenNote:
      "Also load a token sheet (the lean @pantoken/css/dist/style.lean.css, or its icon-inclusive combine if the selection needs a glyph) so these elements can resolve their tokens.",
    iifeNote:
      "This snippet loads its own token sheet and always registers every element, regardless of selection.",
    themeLabel: "Theme",
    themeRebrand: "Rebrand",
    themeCanvas: "Canvas",
    themeCanvasHighContrast: "Canvas high contrast",
    modeLabel: "Rebrand mode",
    modeAdaptive: "Light + dark",
    modeLightOnly: "Light only",
  };
  return { ...base, ...((theme.value as Record<string, unknown>).webComponentsPicker as object) };
});

// Deep-linking: restore state from the URL hash on setup, then keep it in sync as the user picks.
function initialSelection(): Set<string> {
  const raw = readHashParam("w_sel");
  if (raw === "all") return new Set(elements);
  if (!raw) return new Set();
  const names = new Set(elements);
  return new Set(raw.split(",").filter((n) => names.has(n)));
}

const requested = ref<Set<string>>(initialSelection());
const format = useHashParamRef("w_fmt", "esm");
const search = useHashParamRef("w_q", "");

const selected = computed(() => new Set(withNestedDeps(requested.value)));

const lockedDeps = computed(() => {
  const locked = new Set<string>();
  for (const name of requested.value) {
    for (const dep of NESTED_DEPS[name] ?? []) {
      for (const nested of withNestedDeps([dep])) locked.add(nested);
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

// "All elements" is a tri-state checkbox over the element list: checked when every element is
// selected, indeterminate when some are, unchecked when none are. Clicking it selects/clears
// everything without disabling the individual checkboxes.
const allSelected = computed(() => elements.length > 0 && selected.value.size === elements.length);
const someSelected = computed(() => selected.value.size > 0 && !allSelected.value);
const allCheckboxEl = useIndeterminateCheckbox(someSelected);
watch(requested, (s) => {
  writeHashParam("w_sel", s.size === elements.length ? "all" : [...s].sort().join(","), "");
});

function toggleAll(checked: boolean): void {
  requested.value = checked ? new Set(elements) : new Set();
}

const filteredElements = computed(() => {
  const q = search.value.trim().toLowerCase();
  return q ? elements.filter((name) => name.includes(q)) : elements;
});

// The classic script tag always registers everything regardless of selection, so it always has valid
// output; the ES module snippet needs at least one element selected.
const hasSelection = computed(() => format.value === "iife" || selected.value.size > 0);

// Whether the current selection touches any element that calls the real icon resolver — checked
// against the NESTED_DEPS-expanded set, not just the literal checkboxes: selecting `date-time-input`
// alone doesn't check `iconElementNames` directly, but it pulls in `date-input`, which does. "Nothing
// selected" is only ever visible with the classic script tag active (see `hasSelection` above), which
// falls back to the "everything" bundle in that case — so it needs icons too, same as "all selected".
const needsIcons = computed(() => {
  if (selected.value.size === 0 || allSelected.value) return true;
  return [...selected.value].some((name) => iconElementNames.includes(name));
});

// The lean token sheet is enough unless the selection touches an icon-rendering element, mirroring
// CdnPicker.vue's needsIconSheet pattern — never the full style.css regardless of selection.
const tokenFiles = computed<CdnFile[]>(() => {
  const files: CdnFile[] = [tokenSheetFile(props.themeKey, props.mode)];
  if (needsIcons.value)
    files.push({ package: "@pantoken/components", path: "dist/component-icons.css" });
  return files;
});
const tokenUrls = computed(() => buildFileUrls(tokenFiles.value, props.provider));

// The real package entry point — `raw: false` lets esm.sh apply its normal ESM transform instead of
// serving the file verbatim (needed since this is a genuine `import`, not a prebuilt asset).
const wcPackageUrl = computed(() =>
  buildFileUrl({ package: "@pantoken/web-components", raw: false }, props.provider),
);

// A bare URL/statement, not a full script-tag snippet — see the token note below the output for the
// separate token sheet these elements still need to resolve their tokens.
const esmSnippet = computed(() => {
  if (allSelected.value) return `import "${wcPackageUrl.value}";`;
  const only = [...selected.value].sort();
  const onlyList = only.map((name) => `"${name}"`).join(", ");
  return `import { register } from "${wcPackageUrl.value}";\nregister(customElements, { only: [${onlyList}] });`;
});

// No specific subset chosen (nothing selected, or literally everything) — the single "everything"
// bundle is simpler and already exists; only build per-element files for a genuine partial selection.
const wcFiles = computed<CdnFile[]>(() => {
  if (selected.value.size === 0 || allSelected.value) {
    return [{ package: "@pantoken/web-components", path: "dist/web-components.iife.js" }];
  }
  return orderForCombine(selected.value).map((name) => ({
    package: "@pantoken/web-components",
    path: `dist/${name}.iife.js`,
  }));
});
const wcUrls = computed(() => buildFileUrls(wcFiles.value, props.provider));

function toLinkTagLines(urls: string[]): string {
  return urls
    .map(
      (url) =>
        `  var link = document.createElement("link");\n` +
        `  link.rel = "stylesheet";\n` +
        `  link.href = "${url}";\n` +
        `  document.head.appendChild(link);`,
    )
    .join("\n");
}

// A self-contained bootstrapper: it injects both the token stylesheet(s) and the script bundle(s)
// itself, so dropping this one snippet in is enough — no separate link/script tags to write by hand.
// Built from DOM calls rather than literal tag text, which also sidesteps writing a literal
// closing-script-tag substring inside this file's own script block (the SFC parser would misread it
// as this block's end).
const iifeSnippet = computed(
  () => `(function () {
${toLinkTagLines(tokenUrls.value)}

${toScriptTagLines(wcUrls.value)}
})();`,
);

const output = computed(() => (format.value === "iife" ? iifeSnippet.value : esmSnippet.value));
</script>

<template>
  <div class="wc-picker instui-view">
    <fieldset class="instui-form-field-group wc-picker__group">
      <span class="instui-screen-reader-content"
        ><legend>{{ t.label }}</legend></span
      >
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
      <div style="overflow: hidden" class="instui-view -border-radius-medium -border-width-small">
        <div class="wc-picker__elements instui-view -border-radius-medium --p-sm">
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
            <input
              type="checkbox"
              :checked="selected.has(name)"
              :disabled="lockedDeps.has(name)"
              @change="toggle(name)"
            />
            <span>&lt;instui-{{ name }}&gt;</span>
          </label>
        </div>
      </div>
    </fieldset>

    <PickerOutput
      v-model="format"
      :formats="[
        { value: 'esm', label: t.formatEsm, lang: 'js' },
        { value: 'iife', label: t.formatIife, lang: 'js' },
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
      <p v-else class="instui-text -size-x-small -color-secondary wc-picker__note">
        {{ t.tokenNote }}
      </p>
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
  max-height: 24rem;
  overflow-y: auto;
}
.wc-picker__note {
  display: block;
  margin: 0.5rem 0 0;
}
</style>
