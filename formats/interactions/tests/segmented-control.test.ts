// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initSegmentedControl } from "../src/behaviors/segmented-control.ts";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

function setup() {
  document.body.innerHTML = `
    <fieldset class="instui-segmented-control" aria-label="Course view">
      <div class="segments">
        <label class="segment"><input type="radio" name="view" checked> Grid</label>
        <label class="segment"><input type="radio" name="view" disabled> Map</label>
        <label class="segment"><input type="radio" name="view"> List</label>
      </div>
      <button class="overflow-start" type="button" hidden></button>
      <button class="overflow-end" type="button" hidden></button>
    </fieldset>`;
  return {
    host: document.querySelector<HTMLElement>(".instui-segmented-control")!,
    radios: [...document.querySelectorAll<HTMLInputElement>(".segment input")],
    strip: document.querySelector<HTMLElement>(".segments")!,
    start: document.querySelector<HTMLButtonElement>(".overflow-start")!,
    end: document.querySelector<HTMLButtonElement>(".overflow-end")!,
  };
}

test("keeps native single selection and skips disabled segments with arrow keys", () => {
  const { host, radios } = setup();
  const handle = initSegmentedControl(host);
  const changed = vi.fn();
  radios[2].addEventListener("change", changed);
  radios[0].dispatchEvent(
    new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true }),
  );
  expect(radios[2].checked).toBe(true);
  expect(radios[0].checked).toBe(false);
  expect(document.activeElement).toBe(radios[2]);
  expect(changed).toHaveBeenCalledOnce();
  expect(host.getAttribute("aria-label")).toBe("Course view");
  handle.cleanup();
});

test("supports Home, End, Space, and Enter without duplicate change events", () => {
  const { host, radios } = setup();
  initSegmentedControl(host, { size: "sm" });
  expect(host.classList.contains("-size-sm")).toBe(true);
  radios[2].dispatchEvent(
    new KeyboardEvent("keydown", { key: "Home", bubbles: true, cancelable: true }),
  );
  expect(radios[0].checked).toBe(true);
  radios[0].dispatchEvent(
    new KeyboardEvent("keydown", { key: "End", bubbles: true, cancelable: true }),
  );
  expect(radios[2].checked).toBe(true);
  const change = vi.fn();
  radios[2].addEventListener("change", change);
  radios[2].dispatchEvent(
    new KeyboardEvent("keydown", { key: " ", bubbles: true, cancelable: true }),
  );
  radios[2].dispatchEvent(
    new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
  );
  expect(change).not.toHaveBeenCalled();
});

test("enables overflow arrows only when requested and measured content clips", () => {
  const { host, strip, start, end } = setup();
  Object.defineProperty(strip, "scrollWidth", { configurable: true, value: 300 });
  Object.defineProperty(strip, "clientWidth", { configurable: true, value: 100 });
  const rect = (left: number, right: number): DOMRect => ({ left, right }) as DOMRect;
  vi.spyOn(strip, "getBoundingClientRect").mockReturnValue(rect(0, 100));
  strip.querySelectorAll<HTMLElement>(".segment").forEach((segment, index) => {
    vi.spyOn(segment, "getBoundingClientRect").mockReturnValue(rect(index * 80, index * 80 + 70));
  });
  const handle = initSegmentedControl(host, { isOverflown: true });
  expect(start.hidden).toBe(true);
  expect(end.hidden).toBe(false);
  Object.defineProperty(strip, "scrollWidth", { configurable: true, value: 90 });
  handle.refresh();
  expect(start.hidden).toBe(true);
  expect(end.hidden).toBe(true);
  handle.cleanup();
});

test("reuses one handle and removes keyboard listeners on cleanup", () => {
  const { host, radios } = setup();
  const handle = initSegmentedControl(host);
  expect(initSegmentedControl(host)).toBe(handle);
  handle.cleanup();
  radios[0].dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
  expect(radios[0].checked).toBe(true);
});

test("overflow arrows reveal the next clipped segment in each writing direction", () => {
  const { host, strip, start, end } = setup();
  Object.defineProperty(strip, "scrollWidth", { configurable: true, value: 300 });
  Object.defineProperty(strip, "clientWidth", { configurable: true, value: 100 });
  Object.defineProperty(start, "offsetWidth", { configurable: true, value: 20 });
  Object.defineProperty(end, "offsetWidth", { configurable: true, value: 20 });
  const rect = (left: number, right: number): DOMRect => ({ left, right }) as DOMRect;
  vi.spyOn(strip, "getBoundingClientRect").mockReturnValue(rect(0, 100));
  const items = [...strip.querySelectorAll<HTMLElement>(".segment")];
  items.forEach((item, index) =>
    vi.spyOn(item, "getBoundingClientRect").mockReturnValue(rect(index * 80 + 20, index * 80 + 70)),
  );
  const scrollBy = vi.fn();
  strip.scrollBy = scrollBy;
  const handle = initSegmentedControl(host, { isOverflown: true });
  expect(start.hidden).toBe(true);
  expect(end.hidden).toBe(false);
  end.click();
  expect(scrollBy).toHaveBeenCalledWith({ left: 70, behavior: "smooth" });

  strip.style.direction = "rtl";
  items.forEach((item, index) =>
    vi.spyOn(item, "getBoundingClientRect").mockReturnValue(rect(30 - index * 80, 80 - index * 80)),
  );
  handle.refresh();
  end.click();
  expect(scrollBy).toHaveBeenLastCalledWith({ left: -70, behavior: "smooth" });
  handle.cleanup();
});

test("DOM-ready entry registers an existing fieldset once", async () => {
  const { host, radios } = setup();
  await import("../src/components/segmented-control.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
  radios[0].dispatchEvent(
    new KeyboardEvent("keydown", { key: "End", bubbles: true, cancelable: true }),
  );
  expect(radios[2].checked).toBe(true);
  expect(initSegmentedControl(host)).toBe(initSegmentedControl(host));
});
