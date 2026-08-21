// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initResponsiveOverlay } from "../src/behaviors/responsive-overlay.ts";
import { makeOnCommand } from "../src/shared/index.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

function setup(attrs = "", classes = "instui-drawer-layout") {
  document.body.innerHTML = `
    <button command="--toggle" commandfor="d">Toggle</button>
    <button command="--open" commandfor="d">Open</button>
    <button command="--close" commandfor="d">Close</button>
    <div id="d" class="${classes}" ${attrs}>
      <aside class="tray">Tray</aside>
      <main class="content">Main</main>
    </div>
  `;
  const host = document.getElementById("d") as HTMLElement;
  const invokerSupported = "command" in (HTMLButtonElement.prototype as object);
  const onCommand = makeOnCommand(invokerSupported);
  initResponsiveOverlay(host, onCommand);
  return { host };
}

test("--toggle / --open / --close commands update open state", () => {
  const { host } = setup();
  (document.querySelector('[command="--toggle"]') as HTMLButtonElement).click();
  expect(host.hasAttribute("open")).toBe(true);
  (document.querySelector('[command="--close"]') as HTMLButtonElement).click();
  expect(host.hasAttribute("open")).toBe(false);
  (document.querySelector('[command="--open"]') as HTMLButtonElement).click();
  expect(host.hasAttribute("open")).toBe(true);
});

test("sets overlay state when host is narrower than --pantoken-bp-md", () => {
  const { host } = setup();
  Object.defineProperty(host, "clientWidth", { configurable: true, get: () => 200 });
  host.style.setProperty("--pantoken-bp-md", "400px");
  window.dispatchEvent(new Event("resize"));
  expect(host.hasAttribute("should-overlay-tray")).toBe(true);
  expect(host.classList.contains("-should-overlay-tray")).toBe(true);
});

test("clears overlay state when host widens past --pantoken-bp-md", () => {
  const { host } = setup();
  let width = 200;
  Object.defineProperty(host, "clientWidth", { configurable: true, get: () => width });
  host.style.setProperty("--pantoken-bp-md", "400px");
  window.dispatchEvent(new Event("resize"));
  expect(host.hasAttribute("should-overlay-tray")).toBe(true);
  width = 600;
  window.dispatchEvent(new Event("resize"));
  expect(host.hasAttribute("should-overlay-tray")).toBe(false);
  expect(host.classList.contains("-should-overlay-tray")).toBe(false);
});

test("emits overlaytraychange when overlay state changes", () => {
  const { host } = setup();
  const seen: boolean[] = [];
  host.addEventListener("overlaytraychange", (event) => {
    const detail = (event as CustomEvent<{ shouldOverlayTray: boolean }>).detail;
    seen.push(detail.shouldOverlayTray);
  });
  let width = 600;
  Object.defineProperty(host, "clientWidth", { configurable: true, get: () => width });
  host.style.setProperty("--pantoken-bp-md", "400px");
  window.dispatchEvent(new Event("resize"));
  width = 200;
  window.dispatchEvent(new Event("resize"));
  expect(seen).toEqual([false, true]);
});
