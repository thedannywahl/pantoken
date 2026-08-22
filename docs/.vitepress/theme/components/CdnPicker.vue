<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData } from "vitepress";
import type { PantokenTheme } from "../theme";
import { CDN_PICKER_DEFAULTS, type CdnPickerStrings } from "../cdn";
import { useIndeterminateCheckbox } from "../composables/useIndeterminateCheckbox";
import { readHashParam, writeHashParam } from "../composables/useHashParams";
import { toggleStringInSet, useHashParamRef } from "../composables/usePickerHelpers";
import { tokenLeanSheet, type PickerMode } from "../composables/usePickerTheme";
import manifest from "../generated/cdn-manifest.json";
import PickerOutput from "./PickerOutput.vue";

const props = defineProps<{
  themeKey: PantokenTheme;
  mode: PickerMode;
}>();

type ManifestComponent = { name: string; needsIcons: boolean };
// Alphabetical for findability (the manifest is in load order).
const components = [...(manifest.components as ManifestComponent[])].sort((a, b) =>
  a.name.localeCompare(b.name),
);

// Localized labels from the active locale's themeConfig.cdnPicker, falling back to English defaults.
const { theme } = useData();
const t = computed<CdnPickerStrings>(() => ({
  ...CDN_PICKER_DEFAULTS,
  ...(theme.value as { cdnPicker?: Partial<CdnPickerStrings> }).cdnPicker,
}));

// Deep-linking: restore state from the URL hash on setup, then keep it in sync as the user picks.
function initialSelection(): Set<string> {
  const raw = readHashParam("c_sel");
  if (raw === "all") return new Set(components.map((c) => c.name));
  if (!raw) return new Set();
  const names = new Set(components.map((c) => c.name));
  return new Set(raw.split(",").filter((n) => names.has(n)));
}

const selected = ref<Set<string>>(initialSelection());
// Base and utilities are structural includes, not entries in the component manifest — on by default.
const includeBase = ref(readHashParam("c_base") !== "0");
const includeUtilities = ref(readHashParam("c_util") !== "0");
const format = useHashParamRef("c_fmt", "link");
const search = useHashParamRef("c_q", "");

watch(includeBase, (v) => writeHashParam("c_base", v ? "1" : "0", "1"));
watch(includeUtilities, (v) => writeHashParam("c_util", v ? "1" : "0", "1"));

function toggle(name: string): void {
  selected.value = toggleStringInSet(selected.value, name);
}

// "All components" is a tri-state checkbox over the manifest list PLUS Base/Utilities: checked only
// when every component is selected and both are on, indeterminate for any other mix, unchecked when
// nothing is on. Clicking it selects/clears everything (components and Base/Utilities alike) without
// disabling the individual checkboxes.
const allComponentsSelected = computed(
  () => components.length > 0 && selected.value.size === components.length,
);
const allSelected = computed(
  () => allComponentsSelected.value && includeBase.value && includeUtilities.value,
);
const someSelected = computed(
  () =>
    !allSelected.value && (selected.value.size > 0 || includeBase.value || includeUtilities.value),
);
const allCheckboxEl = useIndeterminateCheckbox(someSelected);
watch(selected, (s) => {
  const value = allComponentsSelected.value ? "all" : [...s].join(",");
  writeHashParam("c_sel", value, "");
});

function toggleAll(checked: boolean): void {
  selected.value = checked ? new Set(components.map((c) => c.name)) : new Set();
  includeBase.value = checked;
  includeUtilities.value = checked;
}

const chosen = computed(() => components.filter((c) => selected.value.has(c.name)));
const hasSelection = computed(
  () => chosen.value.length > 0 || includeBase.value || includeUtilities.value,
);
const filteredComponents = computed(() => {
  const q = search.value.trim().toLowerCase();
  return q ? components.filter((c) => c.name.includes(q)) : components;
});
// The token sheet here is always lean (icons live on the Icons tab), so any selected icon-using
// component needs component-icons.css.
const needsIconSheet = computed(() => chosen.value.some((c) => c.needsIcons));

const tokenSheet = computed(() => tokenLeanSheet(props.themeKey, props.mode));

const combineUrl = computed(() => {
  // Track the latest release (no version pin) — pin yourself for production. jsDelivr serves raw file
  // paths (it ignores the package `exports` map), and every sheet ships under `dist/`.
  const c = "npm/@pantoken/components/dist";
  const files = [tokenSheet.value];
  if (includeBase.value) files.push(`${c}/base.css`);
  if (needsIconSheet.value) files.push(`${c}/component-icons.css`);
  // Every component checked collapses to the whole barrel instead of combining every sheet by name —
  // independent of Base/Utilities, which is what `allSelected` (the master checkbox's state) folds in.
  if (allComponentsSelected.value) files.push(`${c}/components.css`);
  else for (const comp of chosen.value) files.push(`${c}/${comp.name}.css`);
  // Utilities are override utilities (`generate.ts`'s own term) — same specificity as a component
  // class, so they only actually override when they're last in the cascade. Load them after the
  // component sheets, not before.
  if (includeUtilities.value) files.push(`${c}/utilities.css`);
  return `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
});

const output = computed(() =>
  format.value === "link"
    ? `<link rel="stylesheet" href="${combineUrl.value}">`
    : `@import url("${combineUrl.value}");`,
);
</script>

<template>
  <div class="cdn-picker instui-view">
    <fieldset class="instui-form-field-group cdn-picker__group">
      <span class="instui-screen-reader-content"
        ><legend>{{ t.componentsLabel }}</legend></span
      >
      <span class="instui-input-group cdn-picker__search">
        <span class="before"
          ><span class="instui-icon -icon-search" aria-hidden="true"></span
        ></span>
        <input
          v-model="search"
          type="search"
          placeholder="Filter components…"
          aria-label="Filter components"
        />
      </span>
      <div style="overflow: hidden" class="instui-view -border-radius-medium -border-width-small">
        <div class="cdn-picker__components instui-view -border-radius-medium --p-sm">
          <label class="instui-checkbox">
            <input
              ref="allCheckboxEl"
              type="checkbox"
              :checked="allSelected"
              @change="toggleAll(($event.target as HTMLInputElement).checked)"
            />
            <span>{{ t.allComponents }}</span>
          </label>
          <span class="cdn-picker__labeled-item">
            <label class="instui-checkbox">
              <input type="checkbox" v-model="includeBase" />
              <span>{{ t.includeBase }}</span>
            </label>
            <button
              type="button"
              class="instui-button -size-small -shape-circle -icon-info -without-background -without-border cdn-picker__info"
              style="anchor-name: --cdn-picker-base-anchor; padding: 0; min-height: 1.5rem"
              popovertarget="cdn-picker-base-popover"
              :aria-label="t.baseInfoLabel"
            ></button>
            <div
              id="cdn-picker-base-popover"
              popover
              class="instui-context-view -placement-bottom cdn-picker__popover"
              style="position-anchor: --cdn-picker-base-anchor"
            >
              {{ t.baseInfo }}
            </div>
          </span>
          <span class="cdn-picker__labeled-item">
            <label class="instui-checkbox">
              <input type="checkbox" v-model="includeUtilities" />
              <span>{{ t.includeUtilities }}</span>
            </label>
            <button
              type="button"
              class="instui-button -size-small -shape-circle -icon-info -without-background -without-border cdn-picker__info"
              style="anchor-name: --cdn-picker-utilities-anchor; padding: 0; min-height: 1.5rem"
              popovertarget="cdn-picker-utilities-popover"
              :aria-label="t.utilitiesInfoLabel"
            ></button>
            <div
              id="cdn-picker-utilities-popover"
              popover
              class="instui-context-view -placement-bottom cdn-picker__popover"
              style="position-anchor: --cdn-picker-utilities-anchor"
            >
              {{ t.utilitiesInfo }}
            </div>
          </span>
          <label v-for="c in filteredComponents" :key="c.name" class="instui-checkbox">
            <input type="checkbox" :checked="selected.has(c.name)" @change="toggle(c.name)" />
            <span>{{ c.name }}</span>
          </label>
        </div>
      </div>
    </fieldset>

    <PickerOutput
      v-model="format"
      :formats="[
        { value: 'link', label: t.formatLink, lang: 'html' },
        { value: 'import', label: t.formatImport, lang: 'css' },
      ]"
      :output="output"
      :has-selection="hasSelection"
      :empty-text="t.empty"
      :format-label="t.formatLabel"
      :copy-text="t.copy"
      :copied-text="t.copied"
    >
      <p v-if="needsIconSheet" class="instui-text -size-x-small -color-secondary cdn-picker__note">
        {{ t.iconsNote }}
      </p>
      <p class="instui-text -size-x-small -color-secondary cdn-picker__note">{{ t.fontsNote }}</p>
    </PickerOutput>
  </div>
</template>

<style scoped>
/* Layout only — surface, controls, and type come from the InstUI component/utility classes on the
   elements themselves; what's left here is grid/flow the classes don't express. */
.cdn-picker {
  margin: 1.5rem 0 0;
}
.cdn-picker__group {
  margin: 0 0 1rem;
}
.cdn-picker__search {
  width: 100%;
  margin-bottom: 0.5rem;
}
/* The scrollable component grid; chrome (bg/border/radius/padding) is on the .instui-view classes. */
.cdn-picker__components {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.25rem 0.75rem;
  max-height: 24rem;
  overflow-y: auto;
}
/* Base/Utilities pair a checkbox with an info-popover trigger, so they need their own flex row
   instead of the bare checkbox label the other grid items use. */
.cdn-picker__labeled-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.cdn-picker__popover {
  max-width: 16rem;
}
.cdn-picker__note {
  display: block;
  margin: 0.5rem 0 0;
}
</style>
