import { computed, ref, type ComputedRef, type Ref } from "vue";

/**
 * Creates reactive computed properties for typed text (launcher and suffix).
 */
export function useTypedDisplay(
  launcher: ComputedRef<string>,
  suffix: ComputedRef<string>,
  charCount: Ref<number>,
  iconOffset: ComputedRef<number>,
) {
  const typedLauncher = computed(() =>
    launcher.value.slice(
      0,
      Math.min(Math.max(0, charCount.value - iconOffset.value), launcher.value.length),
    ),
  );
  const typedSuffix = computed(() =>
    suffix.value.slice(0, Math.max(0, charCount.value - iconOffset.value - launcher.value.length)),
  );
  const visibleText = computed(() => `${typedLauncher.value}${typedSuffix.value}`);
  return { typedLauncher, typedSuffix, visibleText };
}

/**
 * Common stepper driving typing, pause/hold, and backspacing phases in cycle animations.
 */
export function createCycleStepper(
  charCount: Ref<number>,
  totalLength: ComputedRef<number>,
  timings: { typeMs: number; holdMs: number; deleteMs: number },
  after: (ms: number, run: () => void) => void,
  beatBlink: () => void,
  scheduleNext: () => void,
) {
  function scheduleTyping(onComplete: () => void) {
    if (charCount.value >= totalLength.value) {
      onComplete();
      beatBlink();
      scheduleNext();
      return;
    }
    after(timings.typeMs, () => {
      charCount.value++;
      scheduleNext();
    });
  }

  function schedulePaused(onHoldComplete: () => void) {
    after(timings.holdMs, () => {
      onHoldComplete();
      scheduleNext();
    });
  }

  function scheduleDeleting(onComplete: () => void) {
    if (charCount.value <= 0) {
      onComplete();
      beatBlink();
      scheduleNext();
      return;
    }
    after(timings.deleteMs, () => {
      charCount.value--;
      scheduleNext();
    });
  }

  return { scheduleTyping, schedulePaused, scheduleDeleting };
}

/**
 * Creates a cursor blinking controller for typing cycle animations.
 */
export function createCursorBlink(blinkMs: number): {
  cursorBlink: Ref<boolean>;
  beatBlink: () => void;
  clearBlinkTimer: () => void;
} {
  const cursorBlink = ref(false);
  let blinkTimeoutId: ReturnType<typeof setTimeout> | undefined;

  function clearBlinkTimer() {
    clearTimeout(blinkTimeoutId);
  }

  function beatBlink() {
    cursorBlink.value = false;
    clearTimeout(blinkTimeoutId);
    requestAnimationFrame(() => {
      cursorBlink.value = true;
      blinkTimeoutId = setTimeout(() => {
        cursorBlink.value = false;
      }, blinkMs);
    });
  }

  return { cursorBlink, beatBlink, clearBlinkTimer };
}
