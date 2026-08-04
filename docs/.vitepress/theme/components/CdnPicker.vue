<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useData } from "vitepress";
import { CDN_PICKER_DEFAULTS, type CdnPickerStrings } from "../cdn";
import manifest from "../generated/cdn-manifest.json";

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

const selected = ref<Set<string>>(new Set());
// Base and utilities are structural includes, not entries in the component manifest — on by default.
const includeBase = ref(true);
const includeUtilities = ref(true);
const format = ref<"link" | "import">("link");
const copied = ref(false);
const search = ref("");

function toggle(name: string): void {
  const next = new Set(selected.value);
  if (next.has(name)) next.delete(name);
  else next.add(name);
  selected.value = next;
  copied.value = false;
}

// "All components" is a tri-state checkbox over the manifest list: checked when every component is
// selected, indeterminate when some are, unchecked when none are. Clicking it selects/clears everything
// without disabling the individual checkboxes.
const allCheckboxEl = ref<HTMLInputElement | null>(null);
const allSelected = computed(
  () => components.length > 0 && selected.value.size === components.length,
);
const someSelected = computed(() => selected.value.size > 0 && !allSelected.value);
watchEffect(() => {
  if (allCheckboxEl.value) allCheckboxEl.value.indeterminate = someSelected.value;
});

function toggleAll(checked: boolean): void {
  selected.value = checked ? new Set(components.map((c) => c.name)) : new Set();
  copied.value = false;
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

const combineUrl = computed(() => {
  // Track the latest release (no version pin) — pin yourself for production. jsDelivr serves raw file
  // paths (it ignores the package `exports` map), and every sheet ships under `dist/`.
  const c = "npm/@pantoken/components/dist";
  const files = ["npm/@pantoken/css/dist/style.lean.css"];
  if (includeBase.value) files.push(`${c}/base.css`);
  if (includeUtilities.value) files.push(`${c}/utilities.css`);
  if (needsIconSheet.value) files.push(`${c}/component-icons.css`);
  // Every component checked collapses to the whole barrel instead of combining every sheet by name.
  if (allSelected.value) files.push(`${c}/components.css`);
  else for (const comp of chosen.value) files.push(`${c}/${comp.name}.css`);
  return `https://cdn.jsdelivr.net/combine/${files.join(",")}`;
});

const output = computed(() =>
  format.value === "link"
    ? `<link rel="stylesheet" href="${combineUrl.value}">`
    : `@import url("${combineUrl.value}");`,
);

async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    // Clipboard blocked — the code stays selectable in the block.
  }
}
</script>

<template>
  <div
    class="cdn-picker instui-view -background-primary -border-radius-large -shadow-resting instui-p-md"
  >
    <fieldset class="instui-form-field-group cdn-picker__group">
      <legend>{{ t.componentsLabel }}</legend>
      <label class="instui-checkbox cdn-picker__all">
        <input
          ref="allCheckboxEl"
          type="checkbox"
          :checked="allSelected"
          @change="toggleAll(($event.target as HTMLInputElement).checked)"
        />
        <span>{{ t.allComponents }}</span>
      </label>
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
      <div
        class="cdn-picker__components instui-view -background-secondary -border-radius-medium -border-width-small instui-p-sm"
      >
        <label class="instui-checkbox">
          <input type="checkbox" v-model="includeBase" />
          <span>{{ t.includeBase }}</span>
        </label>
        <label class="instui-checkbox">
          <input type="checkbox" v-model="includeUtilities" />
          <span>{{ t.includeUtilities }}</span>
        </label>
        <label v-for="c in filteredComponents" :key="c.name" class="instui-checkbox">
          <input type="checkbox" :checked="selected.has(c.name)" @change="toggle(c.name)" />
          <span>{{ c.name }}</span>
        </label>
      </div>
    </fieldset>

    <div class="cdn-picker__output">
      <template v-if="hasSelection">
        <span class="instui-text -size-small -color-secondary cdn-picker__format-label">{{
          t.formatLabel
        }}</span>
        <div class="instui-tabs -variant-secondary">
          <div class="list" role="tablist">
            <button
              class="tab"
              role="tab"
              :aria-selected="format === 'link'"
              @click="format = 'link'"
            >
              {{ t.formatLink }}
            </button>
            <button
              class="tab"
              role="tab"
              :aria-selected="format === 'import'"
              @click="format = 'import'"
            >
              {{ t.formatImport }}
            </button>
          </div>
          <div class="panel" role="tabpanel">
            <div class="cdn-picker__code">
              <button
                class="instui-button -size-small -color-secondary -icon-copy cdn-picker__copy"
                type="button"
                @click="copy"
              >
                {{ copied ? t.copied : t.copy }}
              </button>
              <pre><code>{{ output }}</code></pre>
            </div>
            <p
              v-if="needsIconSheet"
              class="instui-text -size-x-small -color-secondary cdn-picker__note"
            >
              {{ t.iconsNote }}
            </p>
            <p class="instui-text -size-x-small -color-secondary cdn-picker__note">
              {{ t.fontsNote }}
            </p>
          </div>
        </div>
      </template>
      <p v-else class="instui-text -color-secondary -style-italic cdn-picker__empty">
        {{ t.empty }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Layout only — surface, controls, and type come from the InstUI component/utility classes on the
   elements themselves; what's left here is grid/flow the classes don't express. */
.cdn-picker {
  margin: 1.5rem 0;
}
.cdn-picker__group {
  margin: 0 0 1rem;
}
.cdn-picker__all {
  margin-bottom: 0.5rem;
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
  max-height: 16rem;
  overflow-y: auto;
}
.cdn-picker__output {
  margin-top: 1rem;
}
.cdn-picker__format-label {
  display: block;
  margin-bottom: 0.25rem;
}
/* Float the copy button over the code block; the button's own look comes from .instui-button. */
.cdn-picker__code {
  position: relative;
}
.cdn-picker__code pre {
  overflow-x: auto;
  padding: 1rem;
  padding-right: 5rem;
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  font-size: 0.8125rem;
  line-height: 1.5;
}
.cdn-picker__code code {
  white-space: pre-wrap;
  word-break: break-all;
  color: var(--vp-c-text-1);
}
.cdn-picker__copy {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1;
}
.cdn-picker__note {
  display: block;
  margin: 0.5rem 0 0;
}
.cdn-picker__empty {
  display: block;
  margin: 0;
}
</style>
