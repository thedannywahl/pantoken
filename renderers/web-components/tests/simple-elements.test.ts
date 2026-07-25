// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();

afterEach(() => {
  document.body.innerHTML = "";
});

/** Mount some HTML and return the first matching element (already upgraded). */
function mount<T extends HTMLElement = HTMLElement>(html: string, selector: string): T {
  document.body.innerHTML = html;
  return document.querySelector(selector) as T;
}

test("button renders an inner <button> with the variant modifier and slotted label", () => {
  const el = mount(`<instui-button variant="danger">Delete</instui-button>`, "instui-button");
  const btn = el.shadowRoot?.querySelector("button");
  expect(btn?.className).toBe("instui-button -color-danger");
  expect(btn?.getAttribute("part")).toBe("button");
  expect(el.shadowRoot?.querySelector("slot")).toBeTruthy();
});

test("button without a variant drops the -color- modifier", () => {
  const el = mount(`<instui-button>Go</instui-button>`, "instui-button");
  expect(el.shadowRoot?.querySelector("button")?.className).toBe("instui-button");
});

test("button repaints on a variant attribute change (attributeChangedCallback)", () => {
  const el = mount(`<instui-button variant="primary">Go</instui-button>`, "instui-button");
  el.setAttribute("variant", "success");
  expect(el.shadowRoot?.querySelector("button")?.className).toContain("-color-success");
});

test("badge renders a span with the variant modifier", () => {
  const el = mount(`<instui-badge variant="danger">9</instui-badge>`, "instui-badge");
  const span = el.shadowRoot?.querySelector("span");
  expect(span?.className).toBe("instui-badge -color-danger");
  expect(span?.getAttribute("part")).toBe("badge");
});

test("pill renders a span with the variant modifier", () => {
  const el = mount(`<instui-pill variant="success">Active</instui-pill>`, "instui-pill");
  expect(el.shadowRoot?.querySelector("span")?.className).toBe("instui-pill -color-success");
});

test("tag renders a fixed-class span (no variant)", () => {
  const el = mount(`<instui-tag>Design</instui-tag>`, "instui-tag");
  const span = el.shadowRoot?.querySelector("span");
  expect(span?.className).toBe("instui-tag");
  expect(span?.getAttribute("part")).toBe("tag");
});

test("spinner renders a status span", () => {
  const el = mount(`<instui-spinner></instui-spinner>`, "instui-spinner");
  const span = el.shadowRoot?.querySelector("span");
  expect(span?.getAttribute("role")).toBe("status");
  expect(span?.className).toBe("instui-spinner");
});

test("avatar composes color/size/shape modifiers from attributes", () => {
  const el = mount(
    `<instui-avatar variant="green" size="lg" shape="rectangle">AB</instui-avatar>`,
    "instui-avatar",
  );
  const cls = el.shadowRoot?.querySelector("span")?.className ?? "";
  expect(cls).toContain("instui-avatar");
  expect(cls).toContain("-color-green");
  expect(cls).toContain("-size-lg");
  expect(cls).toContain("-shape-rectangle");
});

test("avatar with a non-rectangle shape omits the shape modifier", () => {
  const el = mount(`<instui-avatar shape="circle">JS</instui-avatar>`, "instui-avatar");
  expect(el.shadowRoot?.querySelector("span")?.className).toBe("instui-avatar");
});

test("progress clamps value 0–100 and sets the fill width", () => {
  const over = mount(`<instui-progress value="150"></instui-progress>`, "instui-progress");
  expect(over.shadowRoot?.querySelector(".bar")?.getAttribute("style")).toBe("width:100%");
  const under = mount(`<instui-progress value="-20"></instui-progress>`, "instui-progress");
  expect(under.shadowRoot?.querySelector(".bar")?.getAttribute("style")).toBe("width:0%");
  const mid = mount(
    `<instui-progress value="60" variant="success"></instui-progress>`,
    "instui-progress",
  );
  const bar = mid.shadowRoot?.querySelector("div.bar");
  expect(bar?.getAttribute("style")).toBe("width:60%");
  expect(bar?.className).toBe("bar -color-success");
  expect(mid.shadowRoot?.querySelector('[role="progressbar"]')).toBeTruthy();
});

test("metric escapes value/label and renders them (attributes, not slots)", () => {
  const el = mount(
    `<instui-metric value="1,024" label="Enrolled"></instui-metric>`,
    "instui-metric",
  );
  expect(el.shadowRoot?.querySelector(".value")?.textContent).toBe("1,024");
  expect(el.shadowRoot?.querySelector(".label")?.textContent).toBe("Enrolled");
});

test("metric escapes HTML in its value", () => {
  const el = mount(`<instui-metric value="a<b>&quot;"></instui-metric>`, "instui-metric");
  // The escaped markup should not create a child element.
  expect(el.shadowRoot?.querySelector(".value b")).toBeNull();
  expect(el.shadowRoot?.querySelector(".value")?.textContent).toBe('a<b>"');
});

test("rating renders `max` stars, fills `value` of them, and derives an aria-label", () => {
  const el = mount(`<instui-rating value="3" max="5"></instui-rating>`, "instui-rating");
  const stars = el.shadowRoot?.querySelectorAll(".instui-icon") ?? [];
  expect(stars.length).toBe(5);
  const solid = el.shadowRoot?.querySelectorAll(".-icon-star-solid") ?? [];
  expect(solid.length).toBe(3);
  expect(el.shadowRoot?.querySelector('[role="img"]')?.getAttribute("aria-label")).toBe("3/5");
  expect(el.shadowRoot?.querySelector(".label")?.textContent).toBe("3/5");
});

test("rating honors an explicit label and clamps value/max", () => {
  const el = mount(
    `<instui-rating value="-1" max="0" label="No rating"></instui-rating>`,
    "instui-rating",
  );
  // max clamps to at least 1, value to at least 0.
  expect((el.shadowRoot?.querySelectorAll(".instui-icon") ?? []).length).toBe(1);
  expect((el.shadowRoot?.querySelectorAll(".-icon-star-solid") ?? []).length).toBe(0);
  expect(el.shadowRoot?.querySelector('[role="img"]')?.getAttribute("aria-label")).toBe(
    "No rating",
  );
});

test("progress-circle clamps value, sets --value, and derives an aria-label", () => {
  const el = mount(
    `<instui-progress-circle value="75"></instui-progress-circle>`,
    "instui-progress-circle",
  );
  const span = el.shadowRoot?.querySelector("span");
  expect(span?.getAttribute("style")).toBe("--value:75");
  expect(span?.getAttribute("aria-label")).toBe("75%");
  const clamped = mount(
    `<instui-progress-circle value="500" label="Almost"></instui-progress-circle>`,
    "instui-progress-circle",
  );
  expect(clamped.shadowRoot?.querySelector("span")?.getAttribute("style")).toBe("--value:100");
  expect(clamped.shadowRoot?.querySelector("span")?.getAttribute("aria-label")).toBe("Almost");
});

test("icon-button applies aria-label from `label` and the square modifier", () => {
  const el = mount(
    `<instui-icon-button label="Close"><span>x</span></instui-icon-button>`,
    "instui-icon-button",
  );
  const btn = el.shadowRoot?.querySelector("button");
  expect(btn?.className).toBe("instui-button -shape-square");
  expect(btn?.getAttribute("aria-label")).toBe("Close");
});

test("icon-button without a label omits aria-label", () => {
  const el = mount(`<instui-icon-button></instui-icon-button>`, "instui-icon-button");
  expect(el.shadowRoot?.querySelector("button")?.hasAttribute("aria-label")).toBe(false);
});

test("toggle-button reflects pressed=true to aria-pressed and defaults to false", () => {
  const on = mount(
    `<instui-toggle-button pressed="true">Bookmarked</instui-toggle-button>`,
    "instui-toggle-button",
  );
  expect(on.shadowRoot?.querySelector("button")?.getAttribute("aria-pressed")).toBe("true");
  const off = mount(`<instui-toggle-button>Off</instui-toggle-button>`, "instui-toggle-button");
  expect(off.shadowRoot?.querySelector("button")?.getAttribute("aria-pressed")).toBe("false");
});

test("truncate sets --lines when given, omits the style otherwise", () => {
  const el = mount(`<instui-truncate lines="2">Long text</instui-truncate>`, "instui-truncate");
  expect(el.shadowRoot?.querySelector("span")?.getAttribute("style")).toBe("--lines:2");
  const single = mount(`<instui-truncate>Long text</instui-truncate>`, "instui-truncate");
  expect(single.shadowRoot?.querySelector("span")?.hasAttribute("style")).toBe(false);
});

test("img builds an <img> from src/alt with constrain and display-block modifiers", () => {
  const el = mount(
    `<instui-img src="/hero.jpg" alt="Campus" constrain="cover" display="block"></instui-img>`,
    "instui-img",
  );
  const img = el.shadowRoot?.querySelector("img");
  expect(img?.getAttribute("src")).toBe("/hero.jpg");
  expect(img?.getAttribute("alt")).toBe("Campus");
  const cls = img?.className ?? "";
  expect(cls).toContain("-constrain-cover");
  expect(cls).toContain("-display-block");
});

test("img without modifiers renders the base class only", () => {
  const el = mount(`<instui-img src="/a.png" alt="A"></instui-img>`, "instui-img");
  expect(el.shadowRoot?.querySelector("img")?.className).toBe("instui-img");
});

test("side-nav-bar adds the -minimized modifier only when minimized=true", () => {
  const min = mount(
    `<instui-side-nav-bar minimized="true"><a href="/">Home</a></instui-side-nav-bar>`,
    "instui-side-nav-bar",
  );
  expect(min.shadowRoot?.querySelector("nav")?.className).toBe("instui-side-nav-bar -minimized");
  const norm = mount(`<instui-side-nav-bar></instui-side-nav-bar>`, "instui-side-nav-bar");
  expect(norm.shadowRoot?.querySelector("nav")?.className).toBe("instui-side-nav-bar");
});

test("tree-browser renders a role=tree shell with a slot", () => {
  const el = mount(`<instui-tree-browser></instui-tree-browser>`, "instui-tree-browser");
  const div = el.shadowRoot?.querySelector("div");
  expect(div?.getAttribute("role")).toBe("tree");
  expect(div?.className).toBe("instui-tree-browser");
  expect(el.shadowRoot?.querySelector("slot")).toBeTruthy();
});
