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
const format = ref<"link" | "import">("link");
const copied = ref(false);

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
  <div class="cdn-picker">
    <fieldset class="cdn-picker__group">
      <legend>{{ t.componentsLabel }}</legend>
      <label class="cdn-picker__check cdn-picker__all">
        <input type="checkbox" v-model="allComponents" />
        <span>{{ t.allComponents }}</span>
      </label>
      <div
        class="cdn-picker__components"
        :class="{ 'cdn-picker__components--disabled': allComponents }"
      >
        <label v-for="c in components" :key="c.name" class="cdn-picker__check">
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
      <fieldset class="cdn-picker__group">
        <legend>{{ t.tokenSheetLabel }}</legend>
        <label class="cdn-picker__radio">
          <input type="radio" value="lean" v-model="tokenSheet" />
          <span>{{ t.tokenLean }}</span>
        </label>
        <label class="cdn-picker__radio">
          <input type="radio" value="full" v-model="tokenSheet" />
          <span>{{ t.tokenFull }}</span>
        </label>
      </fieldset>

      <fieldset class="cdn-picker__group">
        <legend>{{ t.formatLabel }}</legend>
        <label class="cdn-picker__radio">
          <input type="radio" value="link" v-model="format" />
          <span>{{ t.formatLink }}</span>
        </label>
        <label class="cdn-picker__radio">
          <input type="radio" value="import" v-model="format" />
          <span>{{ t.formatImport }}</span>
        </label>
        <label class="cdn-picker__radio">
          <input type="checkbox" v-model="includeBase" />
          <span>{{ t.includeBase }}</span>
        </label>
      </fieldset>
    </div>

    <div class="cdn-picker__output">
      <template v-if="hasSelection">
        <div class="cdn-picker__code">
          <button class="cdn-picker__copy" type="button" @click="copy">
            {{ copied ? t.copied : t.copy }}
          </button>
          <pre><code>{{ output }}</code></pre>
        </div>
        <p v-if="needsIconSheet" class="cdn-picker__note">{{ t.iconsNote }}</p>
        <p class="cdn-picker__note">{{ t.fontsNote }}</p>
      </template>
      <p v-else class="cdn-picker__empty">{{ t.empty }}</p>
    </div>
  </div>
</template>

<style scoped>
.cdn-picker {
  margin: 1.5rem 0;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.cdn-picker__group {
  border: 0;
  padding: 0;
  margin: 0 0 1rem;
}
.cdn-picker__group legend {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  padding: 0;
}
.cdn-picker__all {
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.cdn-picker__components {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.25rem 0.75rem;
  max-height: 16rem;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.cdn-picker__components--disabled {
  opacity: 0.45;
  pointer-events: none;
}
.cdn-picker__check,
.cdn-picker__radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.cdn-picker__radio {
  margin-right: 1.25rem;
  margin-bottom: 0.25rem;
}
.cdn-picker__check input,
.cdn-picker__radio input {
  accent-color: var(--vp-c-brand-1);
}
.cdn-picker__options {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.cdn-picker__output {
  margin-top: 0.5rem;
}
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
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s;
}
.cdn-picker__copy:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.cdn-picker__note {
  margin: 0.5rem 0 0;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}
.cdn-picker__empty {
  margin: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
