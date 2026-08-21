// @vitest-environment happy-dom
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

function drawer(attrs = ""): HTMLElement {
  document.body.innerHTML = `<instui-drawer-layout id="d" ${attrs}><nav slot="tray">Nav</nav><article>Main</article></instui-drawer-layout>`;
  return document.querySelector("instui-drawer-layout") as HTMLElement;
}

test("renders a tray slot and a content slot", () => {
  const el = drawer("open placement=start");
  const root = el.shadowRoot as ShadowRoot;
  expect(root.querySelector('slot[name="tray"]')).toBeTruthy();
  expect(root.querySelector(".content slot:not([name])")).toBeTruthy();
});

test("content pane carries role=region per InstUI's DrawerLayout accessibility guidance", () => {
  const el = drawer("open");
  const root = el.shadowRoot as ShadowRoot;
  expect(root.querySelector(".content")?.getAttribute("role")).toBe("region");
});

test("toggle() flips the open attribute; forced values win", () => {
  const el = drawer();
  const api = el as unknown as { toggle(force?: boolean): void };
  expect(el.hasAttribute("open")).toBe(false);
  api.toggle();
  expect(el.hasAttribute("open")).toBe(true);
  api.toggle();
  expect(el.hasAttribute("open")).toBe(false);
  api.toggle(true);
  expect(el.hasAttribute("open")).toBe(true);
  api.toggle(false);
  expect(el.hasAttribute("open")).toBe(false);
});

test("--toggle / --open / --close commands drive it from light DOM (click fallback)", () => {
  const el = drawer();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<button id="t" command="--toggle" commandfor="d">T</button>
     <button id="o" command="--open" commandfor="d">O</button>
     <button id="c" command="--close" commandfor="d">C</button>`,
  );
  (document.getElementById("t") as HTMLButtonElement).click();
  expect(el.hasAttribute("open")).toBe(true);
  (document.getElementById("c") as HTMLButtonElement).click();
  expect(el.hasAttribute("open")).toBe(false);
  (document.getElementById("o") as HTMLButtonElement).click();
  expect(el.hasAttribute("open")).toBe(true);
});

test("sets should-overlay-tray when host width is below --drawer-layout-min-width", () => {
  const el = drawer("open");
  Object.defineProperty(el, "clientWidth", { configurable: true, get: () => 200 });
  el.style.setProperty("--drawer-layout-min-width", "400px");
  window.dispatchEvent(new Event("resize"));
  expect(el.hasAttribute("should-overlay-tray")).toBe(true);
  expect(el.classList.contains("-should-overlay-tray")).toBe(true);
});

test("re-connecting does not double-render the layout", () => {
  const el = drawer("open");
  const root = el.shadowRoot as ShadowRoot;
  // A second connectedCallback bails because .layout already exists.
  el.remove();
  document.body.appendChild(el);
  expect(root.querySelectorAll(".layout").length).toBe(1);
});

test('placement styling uses only logical (inline-*) properties, never left/right, so it flips under dir="rtl"', () => {
  const css = readFileSync(
    resolve(import.meta.dirname, "../src/elements/drawer-layout.css"),
    "utf8",
  );
  expect(css).toContain("flex-direction: row-reverse");
  expect(css).toContain("inset-inline-start: 0");
  expect(css).not.toMatch(/(?<![a-z-])(left|right)\s*:/i);
});
