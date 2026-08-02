// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";
import { isoDate } from "../src/lib/helpers.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

function calendar(attrs = ""): HTMLElement {
  document.body.innerHTML = `<instui-calendar ${attrs}></instui-calendar>`;
  return document.querySelector("instui-calendar") as HTMLElement;
}

test("renders a labelled month grid with weekday headers and 35–42 day cells", () => {
  const el = calendar(`value="2026-07-08"`);
  const root = el.shadowRoot as ShadowRoot;
  expect(root.getElementById("cal")?.getAttribute("aria-label")).toBe("July 2026");
  expect(root.querySelectorAll(".weekday").length).toBe(7);
  const days = root.querySelectorAll("button.day");
  expect(days.length % 7).toBe(0);
  expect(days.length).toBeGreaterThanOrEqual(28);
});

test("marks the selected day with -selected and aria-current", () => {
  const el = calendar(`value="2026-07-08"`);
  const selected = el.shadowRoot?.querySelector('button[data-value="2026-07-08"]');
  expect(selected?.className).toContain("-selected");
  expect(selected?.getAttribute("aria-current")).toBe("date");
});

test("days outside the visible month get -outside-month", () => {
  const el = calendar(`value="2026-07-08"`);
  // July 1 2026 is a Wednesday, so there are leading June days flagged -outside-month.
  const outside = el.shadowRoot?.querySelectorAll("button.-outside-month") ?? [];
  expect(outside.length).toBeGreaterThan(0);
});

test("marks today with -today", () => {
  const today = isoDate(new Date());
  const el = calendar(`value="${today}"`);
  const cell = el.shadowRoot?.querySelector(`button[data-value="${today}"]`);
  expect(cell?.className).toContain("-today");
});

test("clicking a day selects it: updates value/view and dispatches a composed `change`", () => {
  const el = calendar(`value="2026-07-08"`);
  let detail: { value: string } | undefined;
  el.addEventListener("change", (e) => (detail = (e as CustomEvent).detail));
  const day = el.shadowRoot?.querySelector<HTMLButtonElement>('button[data-value="2026-07-15"]');
  day?.click();
  expect(el.getAttribute("value")).toBe("2026-07-15");
  expect(el.getAttribute("view")).toBe("2026-07-15");
  expect(detail?.value).toBe("2026-07-15");
});

// A calendar mounted with NO observed attributes paints exactly once (only connectedCallback, no
// initial attributeChangedCallback), so the command click-fallback registers a single listener and
// one click shifts one month. Its base month is today.
test("the next chevron shifts the visible month forward by one", () => {
  const el = calendar();
  const now = new Date();
  const expected = isoDate(new Date(now.getFullYear(), now.getMonth() + 1, 1));
  el.shadowRoot?.querySelector<HTMLButtonElement>('button[command="--calendar-next"]')?.click();
  expect(el.getAttribute("view")).toBe(expected);
});

test("the prev chevron shifts the visible month back by one", () => {
  const el = calendar();
  const now = new Date();
  const expected = isoDate(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  el.shadowRoot?.querySelector<HTMLButtonElement>('button[command="--calendar-prev"]')?.click();
  expect(el.getAttribute("view")).toBe(expected);
});

test("with no value/view it falls back to the current month (no throw)", () => {
  const el = calendar();
  const thisMonth = new Date().toLocaleDateString("en", { month: "long", year: "numeric" });
  expect(el.shadowRoot?.getElementById("cal")?.getAttribute("aria-label")).toBe(thisMonth);
});

test("an invalid view falls back through value then today", () => {
  const el = calendar(`view="nonsense" value="2026-03-10"`);
  expect(el.shadowRoot?.getElementById("cal")?.getAttribute("aria-label")).toBe("March 2026");
});
