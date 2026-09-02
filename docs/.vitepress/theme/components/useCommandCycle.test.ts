import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { computed, ref } from "vue";
import { useCommandCycle, type CommandCycleOption } from "./useCommandCycle";

// beatBlink() schedules a cursor blink via requestAnimationFrame, a browser API this suite's node
// environment doesn't provide — a synchronous stub is enough since these tests don't assert on
// cursorBlink itself, only on phase/charCount/activeIndex.
beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  });
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const OPTIONS: CommandCycleOption[] = [
  { id: "a", label: "a", launcher: "a-", color: "#000" },
  { id: "b", label: "b", launcher: "b-", color: "#000" },
];
const SUFFIX = "cmd";
// launcher (2 chars) + suffix (3 chars), no icon.
const FULL_LENGTH = OPTIONS[0].launcher.length + SUFFIX.length;

const TIMINGS = { typeMs: 10, deleteMs: 10, holdMs: 10, startHoldMs: 10, blinkMs: 10 };

function makeCycle(overrides?: Partial<Parameters<typeof useCommandCycle>[0]>) {
  const isPaused = ref(false);
  const reducedMotion = ref(false);
  const cycle = useCommandCycle({
    options: OPTIONS,
    suffix: SUFFIX,
    isPaused,
    reducedMotion,
    timings: TIMINGS,
    ...overrides,
  });
  return { cycle, isPaused, reducedMotion };
}

test("types the launcher and suffix out one character at a time", () => {
  const { cycle } = makeCycle();
  cycle.start();

  expect(cycle.visibleText.value).toBe("");
  vi.advanceTimersByTime(TIMINGS.typeMs);
  expect(cycle.visibleText.value).toBe("a");
  vi.advanceTimersByTime(TIMINGS.typeMs * (FULL_LENGTH - 1));
  expect(cycle.visibleText.value).toBe("a-cmd");
});

// The row sizes itself to the longest possible command, so it needs the whole suffix up front
// rather than however much of it is typed right now.
test("exposes the full suffix regardless of how much has been typed", () => {
  const suffix = ref(SUFFIX);
  const { cycle } = makeCycle({ suffix: computed(() => suffix.value) });
  cycle.start();

  expect(cycle.typedSuffix.value).toBe("");
  expect(cycle.suffixText.value).toBe("cmd");

  suffix.value = "other";
  expect(cycle.suffixText.value).toBe("other");
});

test("holds at full length, backspaces to empty, then advances to the next option", () => {
  const { cycle } = makeCycle();
  cycle.start();
  vi.advanceTimersByTime(TIMINGS.typeMs * FULL_LENGTH);
  expect(cycle.visibleText.value).toBe("a-cmd");
  expect(cycle.activeIndex.value).toBe(0);

  // Held at full length through holdMs, then backspaces one character at a time.
  vi.advanceTimersByTime(TIMINGS.holdMs);
  vi.advanceTimersByTime(TIMINGS.deleteMs * FULL_LENGTH);
  expect(cycle.visibleText.value).toBe("");

  // Idle hold, then the next option starts typing (cycles, wrapping at the end of the list).
  vi.advanceTimersByTime(TIMINGS.startHoldMs);
  vi.advanceTimersByTime(TIMINGS.typeMs);
  expect(cycle.activeIndex.value).toBe(1);
  expect(cycle.visibleText.value).toBe("b");
});

test("wraps from the last option back to the first", () => {
  const { cycle } = makeCycle();
  cycle.pick(1);
  cycle.resume();

  // Full cycle for option 1: hold, delete, idle, then option 0 starts typing.
  vi.advanceTimersByTime(TIMINGS.holdMs);
  vi.advanceTimersByTime(TIMINGS.deleteMs * FULL_LENGTH);
  vi.advanceTimersByTime(TIMINGS.startHoldMs);
  vi.advanceTimersByTime(TIMINGS.typeMs);
  expect(cycle.activeIndex.value).toBe(0);
});

test("reducedMotion renders the full text immediately with no timers pending", () => {
  const { cycle } = makeCycle({ reducedMotion: ref(true) });
  cycle.start();

  expect(cycle.visibleText.value).toBe("a-cmd");
  expect(vi.getTimerCount()).toBe(0);
});

test("pick() jumps straight to the chosen option at full length", () => {
  const { cycle } = makeCycle();
  cycle.start();
  vi.advanceTimersByTime(TIMINGS.typeMs); // partway through typing option 0

  cycle.pick(1);
  expect(cycle.activeIndex.value).toBe(1);
  expect(cycle.visibleText.value).toBe("b-cmd");
});

test("isPaused freezes scheduling until resumed", () => {
  const { cycle, isPaused } = makeCycle();
  cycle.start();
  vi.advanceTimersByTime(TIMINGS.typeMs * FULL_LENGTH); // fully typed, entering the paused phase

  isPaused.value = true;
  cycle.pauseAtFull();
  vi.advanceTimersByTime(TIMINGS.holdMs * 10);
  expect(cycle.visibleText.value).toBe("a-cmd"); // untouched while paused

  isPaused.value = false;
  cycle.resume();
  vi.advanceTimersByTime(TIMINGS.holdMs);
  vi.advanceTimersByTime(TIMINGS.deleteMs);
  expect(cycle.visibleText.value).toBe("a-cm"); // backspacing resumed
});

test("stop() clears pending timers", () => {
  const { cycle } = makeCycle();
  cycle.start();
  vi.advanceTimersByTime(TIMINGS.typeMs);
  cycle.stop();

  vi.advanceTimersByTime(TIMINGS.typeMs * FULL_LENGTH);
  expect(cycle.visibleText.value).toBe("a"); // frozen where stop() caught it
});
