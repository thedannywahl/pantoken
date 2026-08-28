import { computed, ref, type ComputedRef, type Ref } from "vue";

export interface CommandCycleOption {
  id: string;
  label: string;
  launcher: string;
  color: string;
  darkColor?: string;
  icon?: string;
}

export interface CommandCycleTimings {
  typeMs: number;
  deleteMs: number;
  holdMs: number;
  startHoldMs: number;
  blinkMs: number;
}

type CyclePhase = "idle" | "typing" | "paused" | "deleting";

export interface UseCommandCycleOptions {
  options: CommandCycleOption[];
  suffix: string | ComputedRef<string>;
  isPaused: Ref<boolean>;
  reducedMotion: Ref<boolean>;
  timings: CommandCycleTimings;
}

export interface CommandCycleController {
  activeIndex: Ref<number>;
  activeOption: ComputedRef<CommandCycleOption>;
  iconVisible: ComputedRef<boolean>;
  typedLauncher: ComputedRef<string>;
  typedSuffix: ComputedRef<string>;
  visibleText: ComputedRef<string>;
  cursorBlink: Ref<boolean>;
  totalLength: ComputedRef<number>;
  start: () => void;
  stop: () => void;
  pauseAtFull: () => void;
  resume: () => void;
  pick: (index: number) => void;
}

export function useCommandCycle({
  options,
  suffix,
  isPaused,
  reducedMotion,
  timings,
}: UseCommandCycleOptions) {
  const activeIndex = ref(0);
  const activeOption = computed(() => options[activeIndex.value]);

  const phase = ref<CyclePhase>("typing");
  const charCount = ref(0);
  const cursorBlink = ref(false);

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let blinkTimeoutId: ReturnType<typeof setTimeout> | undefined;

  const suffixValue = computed(() => (typeof suffix === "string" ? suffix : suffix.value));
  const iconOffset = computed(() => (activeOption.value.icon ? 1 : 0));
  const iconVisible = computed(() => !!activeOption.value.icon && charCount.value > 0);

  const typedLauncher = computed(() =>
    activeOption.value.launcher.slice(
      0,
      Math.min(Math.max(0, charCount.value - iconOffset.value), activeOption.value.launcher.length),
    ),
  );

  const typedSuffix = computed(() =>
    suffixValue.value.slice(
      0,
      Math.max(0, charCount.value - iconOffset.value - activeOption.value.launcher.length),
    ),
  );

  const visibleText = computed(() => `${typedLauncher.value}${typedSuffix.value}`);
  const totalLength = computed(
    () => iconOffset.value + activeOption.value.launcher.length + suffixValue.value.length,
  );

  function clearTimers() {
    clearTimeout(timeoutId);
    clearTimeout(blinkTimeoutId);
  }

  function beatBlink() {
    cursorBlink.value = false;
    clearTimeout(blinkTimeoutId);
    requestAnimationFrame(() => {
      cursorBlink.value = true;
      blinkTimeoutId = setTimeout(() => {
        cursorBlink.value = false;
      }, timings.blinkMs);
    });
  }

  function scheduleNext() {
    clearTimeout(timeoutId);
    if (isPaused.value || reducedMotion.value) return;

    if (phase.value === "idle") {
      timeoutId = setTimeout(() => {
        activeIndex.value = (activeIndex.value + 1) % options.length;
        phase.value = "typing";
        scheduleNext();
      }, timings.startHoldMs);
      return;
    }

    if (phase.value === "typing") {
      if (charCount.value < totalLength.value) {
        timeoutId = setTimeout(() => {
          charCount.value++;
          scheduleNext();
        }, timings.typeMs);
      } else {
        phase.value = "paused";
        beatBlink();
        scheduleNext();
      }
      return;
    }

    if (phase.value === "paused") {
      timeoutId = setTimeout(() => {
        phase.value = "deleting";
        scheduleNext();
      }, timings.holdMs);
      return;
    }

    if (charCount.value > 0) {
      timeoutId = setTimeout(() => {
        charCount.value--;
        scheduleNext();
      }, timings.deleteMs);
    } else {
      phase.value = "idle";
      beatBlink();
      scheduleNext();
    }
  }

  function start() {
    if (reducedMotion.value) {
      charCount.value = totalLength.value;
      return;
    }
    scheduleNext();
  }

  function stop() {
    clearTimers();
  }

  function pauseAtFull() {
    clearTimers();
    cursorBlink.value = false;
    charCount.value = totalLength.value;
    phase.value = "paused";
  }

  function resume() {
    scheduleNext();
  }

  function pick(index: number) {
    activeIndex.value = index;
    pauseAtFull();
    if (!isPaused.value) scheduleNext();
  }

  const controller: CommandCycleController = {
    activeIndex,
    activeOption,
    iconVisible,
    typedLauncher,
    typedSuffix,
    visibleText,
    cursorBlink,
    totalLength,
    start,
    stop,
    pauseAtFull,
    resume,
    pick,
  };

  return controller;
}
