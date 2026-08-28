<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref } from "vue";
import type { CommandCycleController, CommandCycleOption } from "./useCommandCycle";

interface Props {
  cycle: CommandCycleController;
  options: CommandCycleOption[];
  copyLabel: string;
  copiedLabel: string;
  suffixVariant: "terminal" | "agent";
  showCopy?: boolean;
  showSelector?: boolean;
  copyVisible?: boolean;
  popoverVisible?: boolean;
  autoOpenOnRowHover?: boolean;
  popoverPlacement?: "below" | "above";
}

const props = withDefaults(defineProps<Props>(), {
  showCopy: true,
  showSelector: true,
  autoOpenOnRowHover: true,
  popoverPlacement: "below",
});

const popoverOpen = ref(false);
const copyFeedback = ref(false);
const copyButtonRef = ref<HTMLButtonElement | null>(null);
let copyFeedbackTimeoutId: ReturnType<typeof setTimeout> | undefined;
const resolvedPopoverOpen = computed(() => {
  if (props.popoverVisible === undefined) return popoverOpen.value;
  return props.popoverVisible || popoverOpen.value;
});

onUnmounted(() => {
  clearTimeout(copyFeedbackTimeoutId);
});

function closePopoverUnless(e: FocusEvent, container: HTMLElement | null) {
  const next = e.relatedTarget as Node | null;
  if (!container || !next || !container.contains(next)) popoverOpen.value = false;
}

async function pickOption(index: number, event: MouseEvent) {
  props.cycle.pick(index);
  popoverOpen.value = false;

  // Keyboard activation of a menu button dispatches click with detail=0.
  if (!props.showCopy || event.detail !== 0) return;
  await nextTick();
  copyButtonRef.value?.focus({ preventScroll: true });
}

function tone(option: CommandCycleOption): string {
  return option.darkColor ? `light-dark(${option.color}, ${option.darkColor})` : option.color;
}

async function copyText(value: string, onSuccess: () => void) {
  if (!value) return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      const probe = document.createElement("textarea");
      probe.value = value;
      probe.setAttribute("readonly", "true");
      probe.style.position = "fixed";
      probe.style.opacity = "0";
      document.body.appendChild(probe);
      probe.select();
      document.execCommand("copy");
      document.body.removeChild(probe);
    }

    onSuccess();
  } catch {
    // Ignore clipboard failures in restricted contexts.
  }
}

async function copyVisibleCommand() {
  await copyText(props.cycle.visibleText.value, () => {
    copyFeedback.value = true;
    clearTimeout(copyFeedbackTimeoutId);
    copyFeedbackTimeoutId = setTimeout(() => {
      copyFeedback.value = false;
    }, 1400);
  });
}

function openPopoverIfEnabled() {
  if (props.showSelector && props.autoOpenOnRowHover) popoverOpen.value = true;
}
</script>

<template>
  <span
    class="gs-command-row"
    tabindex="0"
    @mouseenter="openPopoverIfEnabled"
    @focus="props.showSelector ? (popoverOpen = true) : undefined"
    @focusout="
      closePopoverUnless($event, ($event.currentTarget as HTMLElement)?.parentElement ?? null)
    "
  >
    <slot
      name="leading"
      :cycle="props.cycle"
      :active-option="props.cycle.activeOption.value"
    ></slot>
    <span
      v-if="props.cycle.iconVisible.value"
      class="instui-icon gs-command-row__icon"
      :class="`-icon-${props.cycle.activeOption.value.icon}`"
      :style="{ color: tone(props.cycle.activeOption.value) }"
      aria-hidden="true"
    ></span>
    <span :style="{ color: tone(props.cycle.activeOption.value) }">{{
      props.cycle.typedLauncher.value
    }}</span>
    <span class="gs-command-row__suffix" :class="`-${props.suffixVariant}`">{{
      props.cycle.typedSuffix.value
    }}</span>
    <span
      class="gs-command-row__cursor"
      :class="{ 'gs-command-row__cursor--blink': props.cycle.cursorBlink.value }"
      :style="{ backgroundColor: tone(props.cycle.activeOption.value) }"
      aria-hidden="true"
    ></span>
    <slot name="inline" :cycle="props.cycle" :active-option="props.cycle.activeOption.value"></slot>
    <button
      v-if="props.showCopy"
      ref="copyButtonRef"
      type="button"
      class="gs-command-row__copy"
      :class="{ '-copied': copyFeedback, '-visible': props.copyVisible }"
      :aria-label="props.copyLabel"
      @click="copyVisibleCommand"
    >
      <span class="instui-icon -icon-copy" aria-hidden="true"></span>
    </button>
    <span
      v-if="props.showCopy && copyFeedback"
      class="gs-command-row__copy-popover"
      aria-live="polite"
      >{{ props.copiedLabel }}</span
    >
    <span
      v-if="props.showSelector && resolvedPopoverOpen"
      class="gs-command-row__popover"
      :class="`-${props.popoverPlacement}`"
      @mouseleave="popoverOpen = false"
    >
      <button
        v-for="(option, i) in props.options"
        :key="option.id"
        type="button"
        :style="{ color: tone(option) }"
        @click="pickOption(i, $event)"
      >
        <span
          v-if="option.icon"
          class="instui-icon gs-command-row__icon"
          :class="`-icon-${option.icon}`"
          aria-hidden="true"
        ></span>
        {{ option.label }}
      </button>
    </span>
    <slot
      name="trailing"
      :cycle="props.cycle"
      :active-option="props.cycle.activeOption.value"
    ></slot>
  </span>
</template>

<style scoped>
.gs-command-row {
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  outline: none;
  padding-inline-end: 0.25em;
}

.gs-command-row__cursor {
  display: inline-block;
  inline-size: 2px;
  block-size: 1em;
  margin-inline-start: 2px;
  vertical-align: -0.15em;
}

.gs-command-row__copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 1.5rem;
  block-size: 1.5rem;
  margin-inline-start: 0.35rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--vp-c-text-2);
  opacity: 0;
  transform: translateY(1px);
  cursor: pointer;
  transition:
    opacity 120ms ease,
    border-color 120ms ease,
    background-color 120ms ease,
    color 120ms ease;
}

.gs-command-row:hover .gs-command-row__copy,
.gs-command-row:focus-within .gs-command-row__copy {
  opacity: 1;
}

.gs-command-row__copy:hover,
.gs-command-row__copy:focus-visible {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}

.gs-command-row__copy.-copied {
  color: #22a06b;
}

.gs-command-row__copy.-visible {
  opacity: 1;
}

.gs-command-row__copy-popover {
  position: absolute;
  inset-inline-end: 0;
  inset-block-end: calc(100% + 0.45rem);
  z-index: 2;
  padding: 0.18rem 0.45rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: light-dark(#f7f9fc, #202731);
  color: var(--vp-c-text-2);
  font-size: 0.72rem;
  line-height: 1.2;
  white-space: nowrap;
  box-shadow: var(--vp-shadow-2);
}

.gs-command-row__cursor--blink {
  animation: gs-command-row-blink 0.3s step-end 2;
}

@keyframes gs-command-row-blink {
  50% {
    opacity: 0;
  }
}

.gs-command-row__suffix.-terminal {
  color: light-dark(
    var(--instui-color-institutional-brand-primary),
    var(--instui-color-institutional-brand-font-color-dark)
  );
}

.gs-command-row__suffix.-agent {
  color: light-dark(
    var(--instui-color-institutional-brand-primary),
    var(--instui-color-institutional-brand-font-color-dark)
  );
}

.gs-command-row__icon {
  margin-inline-end: 0.35em;
  font-size: 1em;
  vertical-align: -0.15em;
}

.gs-command-row__popover {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-start: 0;
  z-index: 1;
  display: flex;
  min-inline-size: 10rem;
  flex-direction: column;
  padding: 4px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: light-dark(
    var(--instui-color-background-container),
    var(--instui-color-background-page)
  );
  box-shadow: var(--vp-shadow-3);
}

.gs-command-row__popover.-above {
  inset-block-start: auto;
  inset-block-end: 100%;
}

.gs-command-row__popover button {
  padding: 4px 8px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.gs-command-row__popover button:hover,
.gs-command-row__popover button:focus-visible {
  background: light-dark(#e9edf3, #2a3038);
}

@media (prefers-reduced-motion: reduce) {
  .gs-command-row__cursor--blink {
    animation: none;
  }
}
</style>
