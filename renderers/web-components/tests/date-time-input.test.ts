// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

function dateTime(attrs = ""): {
  el: HTMLElement;
  date: HTMLElement;
  time: HTMLInputElement;
} {
  document.body.innerHTML = `<instui-date-time-input ${attrs}></instui-date-time-input>`;
  const el = document.querySelector("instui-date-time-input") as HTMLElement;
  const root = el.shadowRoot as ShadowRoot;
  return {
    el,
    date: root.querySelector("instui-date-input") as HTMLElement,
    time: root.querySelector('input[type="time"]') as HTMLInputElement,
  };
}

test("splits an initial value across the nested date-input and time field", () => {
  const { date, time } = dateTime(`value="2026-07-08T14:30"`);
  expect(date.getAttribute("value")).toBe("2026-07-08");
  expect(time.value).toBe("14:30");
});

test("a date with no time renders an empty time field", () => {
  const { date, time } = dateTime(`value="2026-07-08"`);
  expect(date.getAttribute("value")).toBe("2026-07-08");
  expect(time.value).toBe("");
});

test("changing the date part recomputes a date-only value and emits a composed `change`", () => {
  const { el, date } = dateTime();
  let detail: { value: string } | undefined;
  el.addEventListener("change", (e) => (detail = (e as CustomEvent).detail));
  date.setAttribute("value", "2026-03-10");
  date.dispatchEvent(new CustomEvent("change", { bubbles: true, composed: true }));
  expect(el.getAttribute("value")).toBe("2026-03-10");
  expect(detail?.value).toBe("2026-03-10");
});

test("with both a date and a time the value combines as yyyy-mm-ddThh:mm", () => {
  const { el, date, time } = dateTime(`value="2026-07-08"`);
  time.value = "09:15";
  time.dispatchEvent(new Event("change", { bubbles: true }));
  expect(el.getAttribute("value")).toBe("2026-07-08T09:15");
  // sanity: the date part is still there
  expect(date.getAttribute("value")).toBe("2026-07-08");
});

test("a time with no date yields an empty combined value", () => {
  const { el, time } = dateTime();
  time.value = "09:15";
  time.dispatchEvent(new Event("change", { bubbles: true }));
  expect(el.getAttribute("value")).toBe("");
});

test("setting the value attribute externally splits it back across both fields", () => {
  const { el, date, time } = dateTime(`value="2026-07-08T14:30"`);
  el.setAttribute("value", "2026-12-25T08:00");
  expect(date.getAttribute("value")).toBe("2026-12-25");
  expect(time.value).toBe("08:00");
});

test("a change from an unrelated target is ignored", () => {
  const { el } = dateTime(`value="2026-07-08T14:30"`);
  let fired = false;
  el.addEventListener("change", () => (fired = true));
  el.shadowRoot?.querySelector(".dt")?.dispatchEvent(new CustomEvent("change", { bubbles: true }));
  expect(fired).toBe(false);
});
