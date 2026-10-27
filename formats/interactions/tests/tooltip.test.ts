// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initTooltip, type TooltipHandle } from "../src/behaviors/tooltip.ts";

const handles: TooltipHandle[] = [];

afterEach(() => {
  for (const handle of handles) handle.cleanup();
  handles.length = 0;
  vi.restoreAllMocks();
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
  handles.push(handle);
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

test("initialization marks managed visibility and cleanup restores the CSS fallback", () => {
  const { wrapper, handle } = setup();
  expect(wrapper.hasAttribute("data-tooltip-managed")).toBe(true);
  handle.cleanup();
  expect(wrapper.hasAttribute("data-tooltip-managed")).toBe(false);
});

test("cleanup restores an existing marker value and original show class", () => {
  const { wrapper, tip, handle } = setup();
  handle.cleanup();
  wrapper.setAttribute("data-tooltip-managed", "previous");
  tip.classList.add("-show");
  const next = initTooltip(wrapper, tip);
  handles.push(next);
  next.cancelAndHide();
  expect(tip.classList.contains("-show")).toBe(false);
  next.cleanup();
  expect(wrapper.getAttribute("data-tooltip-managed")).toBe("previous");
  expect(tip.classList.contains("-show")).toBe(true);
});

test("pointer and focus independently keep the bubble visible", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup();
  wrapper.dispatchEvent(new Event("pointerenter"));
  wrapper.dispatchEvent(new FocusEvent("focusin"));
  vi.advanceTimersByTime(0);
  wrapper.dispatchEvent(new Event("pointerleave"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
  wrapper.dispatchEvent(new Event("pointerenter"));
  wrapper.dispatchEvent(new FocusEvent("focusout"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
  wrapper.dispatchEvent(new Event("pointerleave"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("focus movement within the wrapper doesn't hide or restart a pending show", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup(100);
  const next = document.createElement("button");
  wrapper.append(next);
  wrapper.dispatchEvent(new FocusEvent("focusin"));
  vi.advanceTimersByTime(50);
  wrapper.dispatchEvent(new FocusEvent("focusout", { relatedTarget: next }));
  wrapper.dispatchEvent(new FocusEvent("focusin"));
  vi.advanceTimersByTime(50);
  expect(tip.classList.contains("-show")).toBe(true);
});

test("focus movement between assigned slot nodes stays within the wrapper", () => {
  vi.useFakeTimers();
  const { handle } = setup();
  handle.cleanup();
  document.body.innerHTML = "<div><button>First</button><button>Second</button></div>";
  const host = document.querySelector("div")!;
  const root = host.attachShadow({ mode: "open" });
  root.innerHTML = '<span class="instui-tooltip"><slot></slot><span class="tip">Help</span></span>';
  const wrapper = root.querySelector<HTMLElement>(".instui-tooltip")!;
  const tip = root.querySelector<HTMLElement>(".tip")!;
  handles.push(initTooltip(wrapper, tip));
  wrapper.dispatchEvent(new FocusEvent("focusin"));
  vi.advanceTimersByTime(0);
  wrapper.dispatchEvent(
    new FocusEvent("focusout", { relatedTarget: host.querySelectorAll("button")[1] }),
  );
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
  wrapper.dispatchEvent(new FocusEvent("focusout", { relatedTarget: document.body }));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("Escape outside the wrapper dismisses a pointer-open tooltip", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup();
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
  expect(tip.classList.contains("-show")).toBe(true);
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  expect(tip.classList.contains("-show")).toBe(false);
});

test("Escape stays dismissed until both focus and pointer leave, then new entry reopens", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup();
  wrapper.dispatchEvent(new Event("pointerenter"));
  wrapper.dispatchEvent(new FocusEvent("focusin"));
  vi.advanceTimersByTime(0);
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  wrapper.dispatchEvent(new Event("pointerleave"));
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
  wrapper.dispatchEvent(new FocusEvent("focusout"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
  wrapper.dispatchEvent(new Event("pointerleave"));
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
});

test("cancelAndHide while inactive doesn't prevent the next real entry", () => {
  vi.useFakeTimers();
  const { wrapper, tip, handle } = setup();
  handle.cancelAndHide();
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
});

test("re-entry cancels a pending hide without restarting visible content", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup(100, 100);
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(100);
  wrapper.dispatchEvent(new Event("pointerleave"));
  vi.advanceTimersByTime(50);
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(100);
  expect(tip.classList.contains("-show")).toBe(true);
});

test("leaving before show delay cancels the pending reveal", () => {
  vi.useFakeTimers();
  const { wrapper, tip } = setup(200);
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(50);
  wrapper.dispatchEvent(new Event("pointerleave"));
  vi.advanceTimersByTime(500);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("initial focus and hover are recognized without requiring another entry", () => {
  vi.useFakeTimers();
  const { wrapper, tip, handle } = setup();
  handle.cleanup();
  wrapper.querySelector("button")!.focus();
  const focused = initTooltip(wrapper, tip);
  handles.push(focused);
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
  focused.cleanup();
  wrapper.querySelector("button")!.blur();
  vi.spyOn(wrapper, "matches").mockImplementation((selector) => selector === ":hover");
  handles.push(initTooltip(wrapper, tip));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
});
