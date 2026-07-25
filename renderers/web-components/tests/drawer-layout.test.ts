// @vitest-environment happy-dom
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

/** A PointerEvent carrying the fields the resize handler reads. */
function pointer(type: string, clientX: number): PointerEvent {
  return new PointerEvent(type, { clientX, pointerId: 1, bubbles: true } as PointerEventInit);
}

test("renders a tray slot, a resize handle, and a content slot", () => {
  const el = drawer("open placement=start");
  const root = el.shadowRoot as ShadowRoot;
  expect(root.querySelector('slot[name="tray"]')).toBeTruthy();
  expect(root.querySelector('.handle[role="separator"]')).toBeTruthy();
  expect(root.querySelector(".content slot:not([name])")).toBeTruthy();
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

test("dragging the handle sets --drawer-width and toggles the -dragging class", () => {
  const el = drawer("open");
  const handle = el.shadowRoot?.querySelector<HTMLElement>(".handle") as HTMLElement;
  handle.dispatchEvent(pointer("pointerdown", 100));
  expect(handle.classList.contains("-dragging")).toBe(true);
  handle.dispatchEvent(pointer("pointermove", 300)); // +200px from start
  expect(el.style.getPropertyValue("--drawer-width")).toBe("200px");
  handle.dispatchEvent(pointer("pointerup", 300));
  expect(handle.classList.contains("-dragging")).toBe(false);
});

test("width is clamped to the 8rem–40rem range (128px–640px at 16px root)", () => {
  const el = drawer("open");
  const handle = el.shadowRoot?.querySelector<HTMLElement>(".handle") as HTMLElement;
  handle.dispatchEvent(pointer("pointerdown", 100));
  handle.dispatchEvent(pointer("pointermove", 50)); // negative delta → clamps up to 128px
  expect(el.style.getPropertyValue("--drawer-width")).toBe("128px");
  handle.dispatchEvent(pointer("pointermove", 5000)); // huge → clamps down to 640px
  expect(el.style.getPropertyValue("--drawer-width")).toBe("640px");
  handle.dispatchEvent(pointer("pointerup", 5000));
});

test("placement=end inverts the drag direction", () => {
  const el = drawer("open placement=end");
  const handle = el.shadowRoot?.querySelector<HTMLElement>(".handle") as HTMLElement;
  handle.dispatchEvent(pointer("pointerdown", 300));
  handle.dispatchEvent(pointer("pointermove", 100)); // moving left grows an end-docked tray
  expect(el.style.getPropertyValue("--drawer-width")).toBe("200px");
  handle.dispatchEvent(pointer("pointerup", 100));
});

test("re-connecting does not double-render the layout", () => {
  const el = drawer("open");
  const root = el.shadowRoot as ShadowRoot;
  // A second connectedCallback bails because .layout already exists.
  el.remove();
  document.body.appendChild(el);
  expect(root.querySelectorAll(".layout").length).toBe(1);
});
