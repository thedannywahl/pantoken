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

function positioned(placement = "", direction = "ltr", anchor = new DOMRect(450, 300, 80, 32)) {
  const { wrapper, tip, handle } = setup();
  handle.cleanup();
  wrapper.style.direction = direction;
  tip.style.direction = direction;
  tip.style.margin = "8px";
  if (placement) tip.classList.add(`-placement-${placement}`);
  vi.spyOn(wrapper, "getBoundingClientRect").mockReturnValue(anchor);
  vi.spyOn(tip, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 120, 40));
  const next = initTooltip(wrapper, tip);
  handles.push(next);
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  return { wrapper, tip, handle: next };
}

test.each([
  ["", "ltr", "top", "-20px", "-48px"],
  ["bottom", "ltr", "bottom", "-20px", "40px"],
  ["start", "ltr", "left", "-128px", "-4px"],
  ["end", "ltr", "right", "88px", "-4px"],
  ["start", "rtl", "right", "88px", "-4px"],
  ["end", "rtl", "left", "-128px", "-4px"],
])("preferred %s placement in %s stays on %s when it fits", (placement, direction, side, x, y) => {
  vi.useFakeTimers();
  const { tip } = positioned(placement, direction);
  expect(tip.getAttribute("data-tooltip-side")).toBe(side);
  expect(tip.style.left).toBe(x);
  expect(tip.style.top).toBe(y);
  expect(tip.style.transform).toBe("none");
});

test.each([
  ["", new DOMRect(0, 0, 80, 32), "bottom"],
  ["bottom", new DOMRect(0, 740, 80, 28), "top"],
  ["start", new DOMRect(0, 100, 80, 32), "right"],
  ["end", new DOMRect(1000, 100, 24, 32), "left"],
])("off-screen %s placement flips to %s", (placement, anchor, side) => {
  vi.useFakeTimers();
  const { tip } = positioned(placement, "ltr", anchor);
  expect(tip.getAttribute("data-tooltip-side")).toBe(side);
});

test("the cross-axis is clamped and resize/scroll refit against the current anchor", () => {
  vi.useFakeTimers();
  vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(320);
  vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(480);
  const { wrapper, tip } = positioned("", "ltr", new DOMRect(0, 100, 32, 32));
  expect(tip.style.left).toBe("8px");
  expect(tip.style.getPropertyValue("--pantoken-tooltip-viewport-inline-size")).toBe("304px");
  vi.spyOn(wrapper, "getBoundingClientRect").mockReturnValue(new DOMRect(288, 100, 32, 32));
  document.defaultView!.dispatchEvent(new Event("resize"));
  expect(tip.style.left).toBe("-96px");
  vi.spyOn(wrapper, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 0, 32, 32));
  document.dispatchEvent(new Event("scroll"));
  expect(tip.getAttribute("data-tooltip-side")).toBe("bottom");
});

test("when neither horizontal side fits, another side is used without covering the trigger", () => {
  vi.useFakeTimers();
  vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(200);
  vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(480);
  const { tip } = positioned("start", "ltr", new DOMRect(80, 0, 40, 32));
  expect(tip.getAttribute("data-tooltip-side")).toBe("bottom");
  expect(tip.style.top).toBe("40px");
});

test("when no side fits oversized content, the least-overflowing side is retained and clamped", () => {
  vi.useFakeTimers();
  vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(100);
  vi.spyOn(document.documentElement, "clientHeight", "get").mockReturnValue(40);
  const { tip } = positioned("start", "ltr", new DOMRect(40, 10, 20, 20));
  expect(tip.getAttribute("data-tooltip-side")).toBe("top");
  expect(tip.style.left).toBe("-32px");
  expect(tip.style.top).toBe("-2px");
});

test("positioning honors visual viewport offsets and detaches its viewport listeners", () => {
  vi.useFakeTimers();
  const view = document.defaultView!;
  const previous = Object.getOwnPropertyDescriptor(view, "visualViewport");
  const visual = {
    width: 320,
    height: 200,
    offsetLeft: 20,
    offsetTop: 10,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  Object.defineProperty(view, "visualViewport", { configurable: true, value: visual });
  try {
    const { tip, handle } = positioned("", "ltr", new DOMRect(25, 15, 80, 32));
    expect(tip.style.left).toBe("3px");
    expect(tip.style.top).toBe("40px");
    expect(visual.addEventListener).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(visual.addEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
    handle.cleanup();
    expect(visual.removeEventListener).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(visual.removeEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
  } finally {
    if (previous) Object.defineProperty(view, "visualViewport", previous);
    else Reflect.deleteProperty(view, "visualViewport");
  }
});

test("cleanup restores authored positioning values and priorities without changing unrelated styles", () => {
  vi.useFakeTimers();
  const { wrapper, tip, handle } = setup();
  handle.cleanup();
  tip.style.setProperty("left", "3px", "important");
  tip.style.marginLeft = "2px";
  tip.style.color = "red";
  tip.style.setProperty("--pantoken-tooltip-viewport-inline-size", "12rem");
  tip.setAttribute("data-tooltip-side", "authored");
  const next = initTooltip(wrapper, tip);
  handles.push(next);
  wrapper.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  next.cleanup();
  expect(tip.style.left).toBe("3px");
  expect(tip.style.getPropertyPriority("left")).toBe("important");
  expect(tip.style.marginLeft).toBe("2px");
  expect(tip.style.color).toBe("red");
  expect(tip.style.getPropertyValue("--pantoken-tooltip-viewport-inline-size")).toBe("12rem");
  expect(tip.style.getPropertyValue("--pantoken-tooltip-gap")).toBe("");
  expect(tip.getAttribute("data-tooltip-side")).toBe("authored");
});

test("a document without a browsing context fails explicitly before managing the wrapper", () => {
  const wrapper = document.createElement("span");
  const tip = document.createElement("span");
  vi.spyOn(document, "defaultView", "get").mockReturnValue(null);
  expect(() => initTooltip(wrapper, tip)).toThrow("requires a document with a window");
  expect(wrapper.hasAttribute("data-tooltip-managed")).toBe(false);
});

function diagonalTravel(side: "top" | "bottom" | "left" | "right" = "bottom") {
  const point = (x: number, y: number) =>
    side === "top"
      ? { x, y: 200 - y }
      : side === "right"
        ? { x: y, y: x }
        : side === "left"
          ? { x: 200 - y, y: x }
          : { x, y };
  const rect = (x: number, y: number, width: number, height: number) => {
    const a = point(x, y);
    const b = point(x + width, y + height);
    return new DOMRect(
      Math.min(a.x, b.x),
      Math.min(a.y, b.y),
      Math.abs(b.x - a.x),
      Math.abs(b.y - a.y),
    );
  };
  const placement =
    side === "bottom" ? "" : side === "right" ? "end" : side === "left" ? "start" : "top";
  const { wrapper, tip, handle } = positioned(placement, "ltr", rect(16, 16, 59, 38));
  vi.spyOn(tip, "getBoundingClientRect").mockReturnValue(rect(4, 58, 251, 48));
  const pointer = (type: string, x: number, y: number, pointerType = "mouse") =>
    new PointerEvent(type, {
      clientX: point(x, y).x,
      clientY: point(x, y).y,
      pointerType,
    });
  wrapper.dispatchEvent(pointer("pointerenter", 45, 35));
  wrapper.dispatchEvent(pointer("pointermove", 66, 46));
  wrapper.dispatchEvent(pointer("pointerleave", 77, 52));
  return { wrapper, tip, handle, pointer };
}

test.each(["top", "bottom", "left", "right"] as const)(
  "diagonal travel toward the %s bubble stays visible outside the rectangular gap",
  (side) => {
    vi.useFakeTimers();
    const { wrapper, tip, pointer } = diagonalTravel(side);
    vi.advanceTimersByTime(0);
    expect(tip.classList.contains("-show")).toBe(true);
    document.dispatchEvent(pointer("pointermove", 77, 52));
    document.dispatchEvent(pointer("pointermove", 80, 56));
    vi.advanceTimersByTime(0);
    expect(tip.classList.contains("-show")).toBe(true);
    wrapper.dispatchEvent(pointer("pointerenter", 130, 82));
    wrapper.dispatchEvent(pointer("pointerleave", 300, 160));
    vi.advanceTimersByTime(0);
    expect(tip.classList.contains("-show")).toBe(false);
  },
);

test("moving away from the bubble or outside its corridor ends diagonal travel", () => {
  vi.useFakeTimers();
  const { tip, pointer } = diagonalTravel();
  document.dispatchEvent(pointer("pointermove", 77, 40));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
  const next = diagonalTravel();
  document.dispatchEvent(next.pointer("pointermove", 300, 54));
  vi.advanceTimersByTime(0);
  expect(next.tip.classList.contains("-show")).toBe(false);
});

test("Escape cancels diagonal travel, and a fresh pointer entry can reopen", () => {
  vi.useFakeTimers();
  const { wrapper, tip, pointer } = diagonalTravel();
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  expect(tip.classList.contains("-show")).toBe(false);
  document.dispatchEvent(pointer("pointermove", 80, 56));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
  wrapper.dispatchEvent(pointer("pointerenter", 45, 35));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
});

test("leaving the document closes a traveling tooltip; internal pointerout doesn't", () => {
  vi.useFakeTimers();
  const { tip } = diagonalTravel();
  document.dispatchEvent(new PointerEvent("pointerout", { relatedTarget: document.body }));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(true);
  document.dispatchEvent(new PointerEvent("pointerout"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("touch pointerleave doesn't start a diagonal hover corridor", () => {
  vi.useFakeTimers();
  const { wrapper, tip, pointer } = diagonalTravel();
  wrapper.dispatchEvent(pointer("pointerenter", 45, 35));
  wrapper.dispatchEvent(pointer("pointermove", 66, 46));
  wrapper.dispatchEvent(pointer("pointerleave", 77, 52, "touch"));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
});

test("cleanup detaches pending travel listeners and restores the original hidden state", () => {
  vi.useFakeTimers();
  const { tip, handle, pointer } = diagonalTravel();
  const remove = vi.spyOn(document, "removeEventListener");
  handle.cleanup();
  document.dispatchEvent(pointer("pointermove", 80, 56));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
  expect(remove).toHaveBeenCalledWith("pointermove", expect.any(Function));
  expect(remove).toHaveBeenCalledWith("pointerout", expect.any(Function));
});

test("an absent effective side doesn't manufacture a pointer corridor", () => {
  vi.useFakeTimers();
  const { wrapper, tip, pointer } = diagonalTravel();
  wrapper.dispatchEvent(pointer("pointerenter", 45, 35));
  tip.removeAttribute("data-tooltip-side");
  wrapper.dispatchEvent(pointer("pointerleave", 77, 52));
  vi.advanceTimersByTime(0);
  expect(tip.classList.contains("-show")).toBe(false);
});
