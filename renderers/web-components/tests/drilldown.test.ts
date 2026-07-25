// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

const MARKUP = `
  <instui-drilldown active="root">
    <div data-page="root">
      <div class="item" data-goto="settings">Settings</div>
      <div class="item">Home</div>
    </div>
    <div data-page="settings">
      <div class="item">Profile</div>
    </div>
  </instui-drilldown>`;

// A template fragment keeps the light-DOM children inert until we append, so they are already in
// place when the custom element upgrades and its connectedCallback reads them (happy-dom otherwise
// runs connectedCallback before innerHTML children attach).
function drilldown(markup = MARKUP): HTMLElement {
  const tpl = document.createElement("template");
  tpl.innerHTML = markup;
  document.body.appendChild(tpl.content);
  return document.querySelector("instui-drilldown") as HTMLElement;
}

function menuText(el: HTMLElement): string {
  return el.shadowRoot?.querySelector(".instui-menu")?.textContent ?? "";
}

test("renders the active page's items into a shadow menu (no back row at root)", () => {
  const el = drilldown();
  expect(menuText(el)).toContain("Settings");
  expect(menuText(el)).toContain("Home");
  expect(el.shadowRoot?.querySelector(".-drilldown-back")).toBeNull();
});

test("clicking a data-goto item descends and adds a Back row + navigate event", () => {
  const el = drilldown();
  let page: string | undefined;
  el.addEventListener("navigate", (e) => (page = (e as CustomEvent).detail.page));
  el.shadowRoot?.querySelector<HTMLElement>('[data-goto="settings"]')?.click();
  expect(el.getAttribute("active")).toBe("settings");
  expect(page).toBe("settings");
  expect(menuText(el)).toContain("Profile");
  expect(el.shadowRoot?.querySelector(".-drilldown-back")).toBeTruthy();
});

test("clicking the synthesized Back row returns to the previous page", () => {
  const el = drilldown();
  el.shadowRoot?.querySelector<HTMLElement>('[data-goto="settings"]')?.click();
  el.shadowRoot?.querySelector<HTMLElement>(".-drilldown-back")?.click();
  expect(el.getAttribute("active")).toBe("root");
  expect(el.shadowRoot?.querySelector(".-drilldown-back")).toBeNull();
});

test("Enter on an item activates it (click); Escape/ArrowLeft go back", () => {
  const el = drilldown();
  const goto = el.shadowRoot?.querySelector<HTMLElement>('[data-goto="settings"]');
  // Dispatch on the item so it bubbles to the menu's keydown handler with a natural target.
  goto?.dispatchEvent(
    new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
  );
  expect(el.getAttribute("active")).toBe("settings");
  el.shadowRoot
    ?.querySelector<HTMLElement>(".instui-menu")
    ?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }));
  expect(el.getAttribute("active")).toBe("root");
});

test("descending to an unknown page id is a no-op", () => {
  const el = drilldown(`
    <instui-drilldown active="root">
      <div data-page="root"><div class="item" data-goto="missing">Go</div></div>
    </instui-drilldown>`);
  el.shadowRoot?.querySelector<HTMLElement>('[data-goto="missing"]')?.click();
  expect(el.getAttribute("active")).toBe("root");
});

test("back at the root level is a no-op", () => {
  const el = drilldown();
  el.shadowRoot
    ?.querySelector<HTMLElement>(".instui-menu")
    ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  expect(el.getAttribute("active")).toBe("root");
});

test("setting the active attribute externally reseeds the stack and repaints", () => {
  const el = drilldown();
  el.setAttribute("active", "settings");
  expect(menuText(el)).toContain("Profile");
  // Reseeded to a single-entry stack, so there is no Back row.
  expect(el.shadowRoot?.querySelector(".-drilldown-back")).toBeNull();
});

test("with no active attribute it starts on the first [data-page]", () => {
  const el = drilldown(`
    <instui-drilldown>
      <div data-page="first"><div class="item">One</div></div>
      <div data-page="second"><div class="item">Two</div></div>
    </instui-drilldown>`);
  expect(menuText(el)).toContain("One");
  expect(el.getAttribute("active") ?? "first").toBe("first");
});

test("--goto / --back commands drive it from light DOM (click fallback)", () => {
  const el = drilldown();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<button id="g" command="--goto" commandfor="${el.id || setId(el)}" data-page="settings">Go</button>
     <button id="b" command="--back" commandfor="${el.id}">Back</button>`,
  );
  (document.getElementById("g") as HTMLButtonElement).click();
  expect(el.getAttribute("active")).toBe("settings");
  (document.getElementById("b") as HTMLButtonElement).click();
  expect(el.getAttribute("active")).toBe("root");
});

/** Give the element an id so a light-DOM commandfor can target it. */
function setId(el: HTMLElement): string {
  el.id = "dd";
  return el.id;
}
