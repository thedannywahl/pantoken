// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

function tooltip(attrs = ""): HTMLElement {
  document.body.innerHTML = `<instui-tooltip ${attrs}><button>Hover me</button></instui-tooltip>`;
  return document.querySelector("instui-tooltip") as HTMLElement;
}

test("renders the tip text and a slot for the trigger", () => {
  const el = tooltip(`tip="Helpful"`);
  const bubble = el.shadowRoot?.querySelector(".tip");
  expect(bubble?.textContent).toBe("Helpful");
  expect(bubble?.getAttribute("role")).toBe("tooltip");
  expect(el.shadowRoot?.querySelector("slot")).toBeTruthy();
});

test("placement maps to the -placement- modifier", () => {
  const el = tooltip(`tip="x" placement="bottom"`);
  expect(el.shadowRoot?.querySelector(".tip")?.className).toBe("tip -placement-bottom");
});

test("no placement leaves the base tip class", () => {
  const el = tooltip(`tip="x"`);
  expect(el.shadowRoot?.querySelector(".tip")?.className).toBe("tip");
});

test("the tip escapes HTML in the tip attribute", () => {
  const el = tooltip(`tip="a &lt;b&gt;"`);
  expect(el.shadowRoot?.querySelector(".tip")?.textContent).toBe("a <b>");
  expect(el.shadowRoot?.querySelector(".tip b")).toBeNull();
});

test("pointerenter reveals the tip after show-delay; pointerleave hides after hide-delay", () => {
  vi.useFakeTimers();
  const el = tooltip(`tip="x" show-delay="200" hide-delay="100"`);
  const wrap = el.shadowRoot?.querySelector<HTMLElement>(".instui-tooltip");
  const bubble = el.shadowRoot?.querySelector(".tip");
  wrap?.dispatchEvent(new Event("pointerenter"));
  expect(bubble?.classList.contains("-show")).toBe(false);
  vi.advanceTimersByTime(200);
  expect(bubble?.classList.contains("-show")).toBe(true);
  wrap?.dispatchEvent(new Event("pointerleave"));
  expect(bubble?.classList.contains("-show")).toBe(true);
  vi.advanceTimersByTime(100);
  expect(bubble?.classList.contains("-show")).toBe(false);
});

test("focusin/focusout gate the tip the same way (default 0 delay)", () => {
  vi.useFakeTimers();
  const el = tooltip(`tip="x"`);
  const wrap = el.shadowRoot?.querySelector<HTMLElement>(".instui-tooltip");
  const bubble = el.shadowRoot?.querySelector(".tip");
  wrap?.dispatchEvent(new Event("focusin"));
  vi.advanceTimersByTime(0);
  expect(bubble?.classList.contains("-show")).toBe(true);
  wrap?.dispatchEvent(new Event("focusout"));
  vi.advanceTimersByTime(0);
  expect(bubble?.classList.contains("-show")).toBe(false);
});

test("Escape dismisses an open tip immediately and cancels a pending show", () => {
  vi.useFakeTimers();
  const el = tooltip(`tip="x" show-delay="500"`);
  const wrap = el.shadowRoot?.querySelector<HTMLElement>(".instui-tooltip");
  const bubble = el.shadowRoot?.querySelector(".tip");
  wrap?.dispatchEvent(new Event("pointerenter"));
  // Escape bubbles from the light-DOM trigger; the host listener catches it.
  el.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  vi.advanceTimersByTime(500);
  expect(bubble?.classList.contains("-show")).toBe(false);
});

test("a negative delay is clamped to 0", () => {
  vi.useFakeTimers();
  const el = tooltip(`tip="x" show-delay="-50"`);
  const wrap = el.shadowRoot?.querySelector<HTMLElement>(".instui-tooltip");
  const bubble = el.shadowRoot?.querySelector(".tip");
  wrap?.dispatchEvent(new Event("pointerenter"));
  vi.advanceTimersByTime(0);
  expect(bubble?.classList.contains("-show")).toBe(true);
});

test("disconnecting clears a pending timer (no throw after removal)", () => {
  vi.useFakeTimers();
  const el = tooltip(`tip="x" show-delay="100"`);
  const wrap = el.shadowRoot?.querySelector<HTMLElement>(".instui-tooltip");
  wrap?.dispatchEvent(new Event("pointerenter"));
  el.remove();
  expect(() => vi.advanceTimersByTime(200)).not.toThrow();
});
