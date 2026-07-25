// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

function dateInput(attrs = ""): {
  el: HTMLElement;
  input: HTMLInputElement;
  calendar: HTMLElement;
} {
  document.body.innerHTML = `<instui-date-input ${attrs}></instui-date-input>`;
  const el = document.querySelector("instui-date-input") as HTMLElement;
  const root = el.shadowRoot as ShadowRoot;
  return {
    el,
    input: root.querySelector("input") as HTMLInputElement,
    calendar: root.querySelector("instui-calendar") as HTMLElement,
  };
}

test("renders a text field, a trigger, and a nested calendar in a popover", () => {
  const { el, input, calendar } = dateInput(`value="2026-07-08" label="Due date"`);
  expect(input.value).toBe("2026-07-08");
  expect(input.getAttribute("aria-label")).toBe("Due date");
  expect(el.shadowRoot?.querySelector(".trigger")).toBeTruthy();
  expect(el.shadowRoot?.getElementById("datepop")?.hasAttribute("popover")).toBe(true);
  expect(calendar.getAttribute("value")).toBe("2026-07-08");
});

test("defaults label to Date and placeholder to yyyy-mm-dd", () => {
  const { input } = dateInput();
  expect(input.getAttribute("aria-label")).toBe("Date");
  expect(input.getAttribute("placeholder")).toBe("yyyy-mm-dd");
});

test("picking a day in the nested calendar commits, mirrors to the field, and emits `change`", () => {
  const { el, input, calendar } = dateInput(`value="2026-07-08"`);
  let detail: { value: string } | undefined;
  el.addEventListener("change", (e) => (detail = (e as CustomEvent).detail));
  // The calendar fires its own composed `change`; the date-input catches, commits, and re-emits.
  calendar.dispatchEvent(
    new CustomEvent("change", { detail: { value: "2026-07-20" }, bubbles: true, composed: true }),
  );
  expect(input.value).toBe("2026-07-20");
  expect(el.getAttribute("value")).toBe("2026-07-20");
  expect(detail?.value).toBe("2026-07-20");
});

test("typing a valid yyyy-mm-dd and committing on change updates value and calendar", () => {
  const { el, input, calendar } = dateInput();
  input.value = "2026-01-15";
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(el.getAttribute("value")).toBe("2026-01-15");
  expect(calendar.getAttribute("value")).toBe("2026-01-15");
});

test("clearing the field commits an empty value and drops the calendar selection", () => {
  const { el, input, calendar } = dateInput(`value="2026-07-08"`);
  input.value = "";
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(el.getAttribute("value")).toBe("");
  expect(calendar.hasAttribute("value")).toBe(false);
});

test("typing an invalid date does not commit", () => {
  const { el, input } = dateInput(`value="2026-07-08"`);
  input.value = "not-a-date";
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(el.getAttribute("value")).toBe("2026-07-08");
});

test("an external value change reflects into the field while it is not focused", () => {
  const { el, input, calendar } = dateInput(`value="2026-07-08"`);
  el.setAttribute("value", "2026-09-01");
  expect(input.value).toBe("2026-09-01");
  expect(calendar.getAttribute("value")).toBe("2026-09-01");
});
