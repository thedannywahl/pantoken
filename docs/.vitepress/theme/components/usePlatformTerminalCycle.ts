import { computed, ref, type ComputedRef, type Ref } from "vue";
import { PM_OPTIONS, type PmOption } from "./pm-options.ts";
import { PLATFORM_OPTIONS, type PlatformOption } from "./platform-options.ts";
import { createCursorBlink, createCycleStepper, useTypedDisplay } from "./cycle-helpers.ts";
import type { CommandCycleController } from "./useCommandCycle.ts";

/** Durations (in milliseconds) driving each phase of the combined slide/type/delete cycle. */
export interface PlatformTerminalCycleTimings {
  /** Pill slide-in duration — matches `.platform-viewport`'s CSS transition. */
  enterMs: number;
  typeMs: number;
  deleteMs: number;
  holdMs: number;
  /** Pill slide-out duration — matches `.platform-viewport`'s CSS transition. */
  exitMs: number;
  blinkMs: number;
}

/** Real-world default timings, matching the pill's existing 450ms CSS transition. */
export const DEFAULT_PLATFORM_TERMINAL_TIMINGS: PlatformTerminalCycleTimings = {
  enterMs: 450,
  typeMs: 70,
  deleteMs: 40,
  holdMs: 1400,
  exitMs: 450,
  blinkMs: 600,
};

type CyclePhase = "entering" | "typing" | "paused" | "deleting" | "exiting";

/** Options for {@link usePlatformTerminalCycle}. */
export interface UsePlatformTerminalCycleOptions {
  reducedMotion: Ref<boolean>;
  timings?: PlatformTerminalCycleTimings;
}

/**
 * Reactive state and controls shared by the hero's platform pill and its mock terminal.
 *
 * Inherits and conforms to `CommandCycleController<PmOption>` so `CommandCycleRow.vue` needs no
 * changes to render either cycle.
 */
export interface PlatformTerminalCycleController extends CommandCycleController<PmOption> {
  phase: Ref<CyclePhase>;
  pmIndex: Ref<number>;
  platformIndex: Ref<number>;
  activePlatform: ComputedRef<PlatformOption>;
  /** The pantoken command or npm package text after the launcher, e.g. `"pantoken generate wordpress"`. */
  commandBody: ComputedRef<string>;
  /** `activeLauncher + commandBody`, the complete line the terminal types out. */
  fullText: ComputedRef<string>;
  /** Jump directly to a platform (the hero's new dropdown) — stays paused until `resume()`. */
  pickPlatform: (index: number) => void;
  /** Pause both the pill's slide and the terminal's typing (hover/focus on either surface). */
  pause: () => void;
}

function commandBodyText(platform: PlatformOption): string {
  const { verb, arg } = platform.command;
  if (verb === "install") return `@pantoken/${arg}`;
  return `pantoken ${verb} ${arg}`;
}

/** A Fisher-Yates shuffle of `[0, length)` — the platform cycle's display order is randomized
 *  per page load, while `PLATFORM_OPTIONS` itself (and the dropdown's category grouping) stays put. */
function shuffledIndices(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * The longest possible `launcher + commandBody` across every pm/platform combination — reserved
 * as a hidden sizer's content (`CommandCycleRow`'s `sizerText` prop) so the terminal row never
 * reflows as it cycles.
 */
export const WIDEST_PLATFORM_COMMAND_TEXT: string = PM_OPTIONS.flatMap((pm) =>
  PLATFORM_OPTIONS.map((platform) => {
    const isInstall = platform.command.verb === "install";
    return (isInstall ? pm.installLauncher : pm.launcher) + commandBodyText(platform);
  }),
).reduce((widest, text) => (text.length > widest.length ? text : widest), "");

/**
 * Drives the hero's rotating `.platform` pill and its mock terminal from one shared state
 * machine: `entering` (pill slides in) → `typing` → `paused` (hold) → `deleting` → `exiting`
 * (pill slides out) → advance both the pm and platform index → `entering` again. The pm and
 * platform indices each wrap independently (an odometer, not a shared index), so package
 * managers keep cycling through every platform in turn.
 */
export function usePlatformTerminalCycle(
  options: UsePlatformTerminalCycleOptions,
): PlatformTerminalCycleController {
  const { reducedMotion, timings = DEFAULT_PLATFORM_TERMINAL_TIMINGS } = options;

  const phase = ref<CyclePhase>("entering");
  const pmIndex = ref(0);
  // The platform cycle steps through this shuffled order (an index into `PLATFORM_OPTIONS`), not
  // the array's own order — `platformOrderPos` is this composable's position within it.
  const platformOrder = shuffledIndices(PLATFORM_OPTIONS.length);
  let platformOrderPos = 0;
  const platformIndex = ref(platformOrder[0]);
  const charCount = ref(0);
  const { cursorBlink, beatBlink, clearBlinkTimer } = createCursorBlink(timings.blinkMs);

  const activeOption = computed(() => PM_OPTIONS[pmIndex.value]);
  const activePlatform = computed(() => PLATFORM_OPTIONS[platformIndex.value]);
  const commandBody = computed(() => commandBodyText(activePlatform.value));
  const activeLauncher = computed(() =>
    activePlatform.value.command.verb === "install"
      ? activeOption.value.installLauncher
      : activeOption.value.launcher,
  );
  const fullText = computed(() => activeLauncher.value + commandBody.value);
  const iconOffset = computed(() => (activeOption.value.icon ? 1 : 0));
  const iconVisible = computed(() => !!activeOption.value.icon && charCount.value > 0);

  const { typedLauncher, typedSuffix, visibleText } = useTypedDisplay(
    activeLauncher,
    commandBody,
    charCount,
    iconOffset,
  );
  const totalLength = computed(() => iconOffset.value + fullText.value.length);

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let isPaused = false;

  function clearTimers() {
    clearTimeout(timeoutId);
    clearBlinkTimer();
  }

  function after(ms: number, run: () => void) {
    timeoutId = setTimeout(run, ms);
  }

  const { scheduleTyping, schedulePaused, scheduleDeleting } = createCycleStepper(
    charCount,
    totalLength,
    timings,
    after,
    beatBlink,
    () => scheduleNext(),
  );

  function scheduleEntering() {
    after(timings.enterMs, () => {
      phase.value = "typing";
      charCount.value = 0;
      scheduleNext();
    });
  }

  function scheduleExiting() {
    after(timings.exitMs, () => {
      pmIndex.value = (pmIndex.value + 1) % PM_OPTIONS.length;
      platformOrderPos = (platformOrderPos + 1) % platformOrder.length;
      platformIndex.value = platformOrder[platformOrderPos];
      phase.value = "entering";
      scheduleNext();
    });
  }

  const phaseHandlers: Record<CyclePhase, () => void> = {
    entering: scheduleEntering,
    typing: () => scheduleTyping(() => (phase.value = "paused")),
    paused: () => schedulePaused(() => (phase.value = "deleting")),
    deleting: () => scheduleDeleting(() => (phase.value = "exiting")),
    exiting: scheduleExiting,
  };

  function scheduleNext() {
    clearTimeout(timeoutId);
    if (isPaused || reducedMotion.value) return;
    phaseHandlers[phase.value]();
  }

  function start() {
    if (reducedMotion.value) {
      charCount.value = totalLength.value;
      phase.value = "paused";
      return;
    }
    scheduleNext();
  }

  function stop() {
    clearTimers();
  }

  function pause() {
    isPaused = true;
    clearTimers();
  }

  // Alias — freezing in place (rather than jumping to the fully-typed state) reads better for the
  // slide phases, which `pauseAtFull` (named for parity with `useCommandCycle`) doesn't have.
  const pauseAtFull = pause;

  function resume() {
    isPaused = false;
    scheduleNext();
  }

  function pick(index: number) {
    clearTimers();
    pmIndex.value = index;
    charCount.value = totalLength.value;
    cursorBlink.value = false;
    phase.value = "paused";
    isPaused = true;
  }

  function pickPlatform(index: number) {
    clearTimers();
    platformIndex.value = index;
    // Keeps the shuffled order continuing forward from wherever the user just picked, instead of
    // resuming from its old position (or restarting the whole shuffle).
    platformOrderPos = platformOrder.indexOf(index);
    charCount.value = totalLength.value;
    cursorBlink.value = false;
    phase.value = "paused";
    isPaused = true;
  }

  return {
    phase,
    pmIndex,
    platformIndex,
    activePlatform,
    commandBody,
    fullText,
    activeIndex: pmIndex,
    activeOption,
    iconVisible,
    typedLauncher,
    typedSuffix,
    suffixText: commandBody,
    visibleText,
    cursorBlink,
    totalLength,
    start,
    stop,
    pauseAtFull,
    resume,
    pick,
    pickPlatform,
    pause,
  };
}
