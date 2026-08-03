<script setup lang="ts">
import { computed, ref } from "vue";
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
const allComponents = ref(false);
const tokenSheet = ref<"lean" | "full">("lean");
const includeBase = ref(false);
const includeUtilities = ref(false);
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

const chosen = computed(() => components.filter((c) => selected.value.has(c.name)));
// "All" uses the whole `components.css` barrel; otherwise the checked per-component sheets.
const active = computed(() => (allComponents.value ? components : chosen.value));
const hasSelection = computed(() => allComponents.value || chosen.value.length > 0);
const filteredComponents = computed(() => {
  const q = search.value.trim().toLowerCase();
  return q ? components.filter((c) => c.name.includes(q)) : components;
});
// The lean token sheet omits icons, so any active icon-using component needs component-icons.css. The
// full sheet already carries every icon.
const needsIconSheet = computed(
  () => tokenSheet.value === "lean" && active.value.some((c) => c.needsIcons),
);

const combineUrl = computed(() => {
  // Track the latest release (no version pin) — pin yourself for production. jsDelivr serves raw file
  // paths (it ignores the package `exports` map), and every sheet ships under `dist/`.
  const c = "npm/@pantoken/components/dist";
  const files = [
    `npm/@pantoken/css/dist/${tokenSheet.value === "lean" ? "style.lean.css" : "style.css"}`,
  ];
  if (includeBase.value) files.push(`${c}/base.css`);
  if (includeUtilities.value) files.push(`${c}/utilities.css`);
  if (needsIconSheet.value) files.push(`${c}/component-icons.css`);
  if (allComponents.value) files.push(`${c}/components.css`);
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
    class="cdn-picker instui-view -background-secondary -border-radius-large -border-width-small instui-p-md"
  >
    <fieldset class="instui-form-field-group cdn-picker__group">
      <legend>{{ t.componentsLabel }}</legend>
      <label class="instui-checkbox cdn-picker__all">
        <input type="checkbox" v-model="allComponents" />
        <span>{{ t.allComponents }}</span>
      </label>
      <input
        v-model="search"
        type="search"
        class="instui-text-input cdn-picker__search"
        placeholder="Filter components…"
        :disabled="allComponents"
        aria-label="Filter components"
      />
      <div
        class="cdn-picker__components instui-view -background-primary -border-radius-medium -border-width-small instui-p-sm"
        :class="{ 'cdn-picker__components--disabled': allComponents }"
      >
        <label v-for="c in filteredComponents" :key="c.name" class="instui-checkbox">
          <input
            type="checkbox"
            :checked="selected.has(c.name)"
            :disabled="allComponents"
            @change="toggle(c.name)"
          />
          <span>{{ c.name }}</span>
        </label>
      </div>
    </fieldset>

    <div class="cdn-picker__options">
      <fieldset class="instui-radio-input-group">
        <legend>{{ t.tokenSheetLabel }}</legend>
        <label class="instui-radio -variant-toggle">
          <input type="radio" name="cdn-token-sheet" value="lean" v-model="tokenSheet" />
          <span>{{ t.tokenLean }}</span>
        </label>
        <label class="instui-radio -variant-toggle">
          <input type="radio" name="cdn-token-sheet" value="full" v-model="tokenSheet" />
          <span>{{ t.tokenFull }}</span>
        </label>
      </fieldset>

      <fieldset class="instui-radio-input-group">
        <legend>{{ t.formatLabel }}</legend>
        <label class="instui-radio -variant-toggle">
          <input type="radio" name="cdn-format" value="link" v-model="format" />
          <span>{{ t.formatLink }}</span>
        </label>
        <label class="instui-radio -variant-toggle">
          <input type="radio" name="cdn-format" value="import" v-model="format" />
          <span>{{ t.formatImport }}</span>
        </label>
      </fieldset>

      <label class="instui-checkbox cdn-picker__base">
        <input type="checkbox" v-model="includeBase" />
        <span>{{ t.includeBase }}</span>
      </label>
      <label class="instui-checkbox cdn-picker__base">
        <input type="checkbox" v-model="includeUtilities" />
        <span>{{ t.includeUtilities }}</span>
      </label>
    </div>

    <div class="cdn-picker__output">
      <template v-if="hasSelection">
        <div class="cdn-picker__code">
          <button
            class="instui-button -size-small -color-secondary cdn-picker__copy"
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
        <p class="instui-text -size-x-small -color-secondary cdn-picker__note">{{ t.fontsNote }}</p>
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
.cdn-picker__components--disabled {
  opacity: 0.45;
  pointer-events: none;
}
/* Bottom-align so the lone base-reset checkbox lines up with the toggle controls, not their legends. */
.cdn-picker__options {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem 1.5rem;
}
.cdn-picker__base {
  margin-bottom: 0.25rem;
}
.cdn-picker__output {
  margin-top: 0.5rem;
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
