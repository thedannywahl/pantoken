// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initTooltip } from "../src/behaviors/tooltip.ts";

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

function setup(showDelay = 0, hideDelay = 0) {
  document.body.innerHTML = `
    <span class="instui-tooltip">
      <button>Trigger</button>
      <span class="tip" role="tooltip">Help text</span>
    </span>
  `;
  const wrapper = document.querySelector<HTMLElement>(".instui-tooltip")!;
  const tip = document.querySelector<HTMLElement>(".tip")!;
  const handle = initTooltip(wrapper, tip, { showDelay, hideDelay });
  return { wrapper, tip, handle };
}

test("pointerenter shows the tip after showDelay", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup(200);
  wrapper.dispatchEvent(new Event("pointerenter"));
  expect(tip.classList.contains("-show")).toBe(false);
  vi.advanceTimersByTime(200);
  expect(tip.classList.contains("-show")).toBe(true);
});

test("pointerleave hides the tip after hideDelay", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup(0, 100);
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
  wrapper.dispatchEvent(new Event("pointerleave"));
  expect(tip.classList.contains("-show")).toBe(true);
  vi.advanceTimersByTime(100);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("focusin/focusout mirror pointer behaviour", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup();
  wrapper.dispatchEvent(new Event("focusin"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
  wrapper.dispatchEvent(new Event("focusout"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("Escape dismisses and cancels a pending show", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup(500);
  wrapper.dispatchEvent(new Event("pointerenter"));
  wrapper.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  vi.advanceTimersByTime(500);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("cancelAndHide cancels a pending show timer", () => {
  vi.useFakeTimers();
  const { wrapper, tip, handle } = setup(200);
  wrapper.dispatchEvent(new Event("pointerenter"));
  handle.cancelAndHide();
  vi.advanceTimersByTime(200);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("cleanup removes listeners so events no longer affect tip", () => {
  vi.useFakeTimers();
  const { wrapper, tip, handle } = setup();
  handle.cleanup();
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
});
