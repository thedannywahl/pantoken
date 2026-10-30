// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initMenu } from "../src/behaviors/menu.ts";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

const entries = `<button id="edit" role="menuitem">Edit</button>
  <button id="disabled" role="menuitem" aria-disabled="true">Disabled</button>
  <button id="delete" role="menuitem">Delete</button>
  <button id="hidden" role="menuitem" hidden>Hidden</button>
  <button id="native-disabled" role="menuitem" disabled>Disabled natively</button>
  <div role="separator"></div>`;

function setup(content = entries, initiallyOpen = false, shadow = false) {
  let root: Document | ShadowRoot = document;
  if (shadow) {
    const host = document.createElement("div");
    document.body.append(host);
    root = host.attachShadow({ mode: "open" });
  }
  const container = root instanceof ShadowRoot ? root : document.body;
  container.innerHTML = `<button id="trigger" popovertarget="menu">Actions</button>
    <div id="menu" role="menu" popover="auto">${content}</div>
    <button id="outside">Outside</button>`;
  const menu = root.getElementById("menu")!;
  const trigger = root.getElementById("trigger") as HTMLButtonElement;
  let open = initiallyOpen;
  vi.spyOn(menu, "matches").mockImplementation((selector) =>
    selector === ":popover-open" ? open : Element.prototype.matches.call(menu, selector),
  );
  Object.defineProperty(trigger, "popoverTargetElement", { get: () => menu, configurable: true });
  const show = vi.fn(() => {
    if (open) return;
    open = true;
    menu.dispatchEvent(new Event("toggle"));
  });
  const hide = vi.fn(() => {
    if (!open) return;
    open = false;
    menu.dispatchEvent(new Event("toggle"));
  });
  Object.defineProperties(menu, {
    showPopover: { value: show, configurable: true },
    hidePopover: { value: hide, configurable: true },
  });
  const key = (element: HTMLElement, value: string, options: KeyboardEventInit = {}) => {
    const event = new KeyboardEvent("keydown", {
      key: value,
      bubbles: true,
      cancelable: true,
      ...options,
    });
    element.dispatchEvent(event);
    return event;
  };
  const item = (id: string): HTMLElement => root.getElementById(id)!;
  return { root, menu, trigger, show, hide, key, item };
}

test.each(["ArrowDown", "ArrowUp"])("trigger %s opens at the corresponding end", (keyName) => {
  const { root, menu, trigger, key, show, item } = setup();
  initMenu(menu, trigger);
  expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
  expect(trigger.getAttribute("aria-controls")).toBe("menu");
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  expect(key(trigger, keyName).defaultPrevented).toBe(true);
  expect(root.activeElement).toBe(item(keyName === "ArrowUp" ? "delete" : "edit"));
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
  key(trigger, "ArrowDown");
  expect(root.activeElement).toBe(item("edit"));
  expect(show).toHaveBeenCalledTimes(1);
});

test.each([false, true])("initial open synchronizes state (shadow root: %s)", (shadow) => {
  const { root, menu, trigger, item, key } = setup(entries, true, shadow);
  initMenu(menu, trigger);
  expect(root.activeElement).toBe(item("edit"));
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
  key(item("edit"), "Escape");
  expect(root.activeElement).toBe(trigger);
});

test.each(["ltr", "rtl"])(
  "vertical navigation wraps and skips hidden/native-disabled items (%s)",
  (dir) => {
    const { root, menu, trigger, show, item, key } = setup();
    menu.dir = dir;
    initMenu(menu, trigger);
    show();
    key(item("edit"), "ArrowUp");
    expect(root.activeElement).toBe(item("delete"));
    key(item("delete"), "ArrowDown");
    expect(root.activeElement).toBe(item("edit"));
    key(item("edit"), "ArrowDown");
    expect(root.activeElement).toBe(item("disabled"));
    key(item("disabled"), "End");
    expect(root.activeElement).toBe(item("delete"));
    key(item("delete"), "Home");
    expect(root.activeElement).toBe(item("edit"));
    expect(menu.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(key(item("edit"), "ArrowLeft").defaultPrevented).toBe(false);
    expect(key(item("edit"), "ArrowRight").defaultPrevented).toBe(false);
  },
);

test("typeahead cycles matching labels and ignores modifiers and unmatched keys", () => {
  const { root, menu, trigger, show, item, key } = setup(
    '<button id="edit" role="menuitem">Edit</button><button id="export" role="menuitem" aria-label="Export">Icon</button>',
  );
  initMenu(menu, trigger);
  show();
  key(item("edit"), "E");
  expect(root.activeElement).toBe(item("export"));
  key(item("export"), "e");
  expect(root.activeElement).toBe(item("edit"));
  expect(key(item("edit"), "x").defaultPrevented).toBe(false);
  expect(key(item("edit"), "e", { ctrlKey: true }).defaultPrevented).toBe(false);
  expect(key(trigger, "ArrowUp", { altKey: true }).defaultPrevented).toBe(false);
  expect(key(trigger, "Enter").defaultPrevented).toBe(false);
});

test.each(["Enter", " "])("ordinary %s activation fires once and returns focus", (value) => {
  const { root, menu, trigger, show, item, key } = setup();
  initMenu(menu, trigger);
  const clicked = vi.fn();
  item("edit").addEventListener("click", clicked);
  show();
  expect(key(item("edit"), value).defaultPrevented).toBe(true);
  expect(clicked).toHaveBeenCalledTimes(1);
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  expect(root.activeElement).toBe(trigger);
});

test("ARIA-disabled items remain reachable but block pointer and keyboard activation", () => {
  const { menu, trigger, show, item, key } = setup();
  initMenu(menu, trigger);
  const clicked = vi.fn();
  item("disabled").addEventListener("click", clicked);
  show();
  item("disabled").focus();
  key(item("disabled"), "Enter");
  key(item("disabled"), " ");
  item("disabled").click();
  expect(clicked).not.toHaveBeenCalled();
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
});

test.each(["menuitemcheckbox", "menuitemradio"])(
  "checked state stays application-owned for %s",
  (role) => {
    const { root, menu, trigger, show, item, key } = setup(
      `<button id="check" role="${role}" aria-checked="false">Show grid</button>`,
    );
    initMenu(menu, trigger);
    item("check").addEventListener("click", () =>
      item("check").setAttribute("aria-checked", "true"),
    );
    show();
    key(item("check"), " ");
    expect(item("check").getAttribute("aria-checked")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(root.activeElement).toBe(item("check"));
    key(item("check"), "Enter");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  },
);

test("canceled clicks keep the menu open; application focus moves aren't overwritten", () => {
  const { root, menu, trigger, show, item } = setup();
  initMenu(menu, trigger);
  show();
  item("edit").addEventListener("click", (event) => event.preventDefault(), { once: true });
  item("edit").click();
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
  item("edit").addEventListener("click", () => item("outside").focus());
  item("edit").click();
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  expect(root.activeElement).toBe(item("outside"));
});

test.each([false, true])(
  "Tab closes without canceling sequential navigation (shift: %s)",
  (shiftKey) => {
    const { menu, trigger, show, item, key } = setup();
    initMenu(menu, trigger);
    show();
    expect(key(item("edit"), "Tab", { shiftKey }).defaultPrevented).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  },
);

test("nested menu events don't affect the parent; grouping retains item navigation", () => {
  const { root, menu, trigger, show, item, key } = setup(
    `<div role="group" aria-label="Editing"><button id="edit" role="menuitem">Edit</button></div>
     <div role="menu"><button id="nested" role="menuitem" tabindex="3">Nested</button></div>`,
  );
  initMenu(menu, trigger);
  show();
  expect(root.activeElement).toBe(item("edit"));
  expect(item("nested").getAttribute("tabindex")).toBe("3");
  expect(key(item("nested"), "Escape").defaultPrevented).toBe(false);
  item("nested").click();
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
});

test("closing externally updates expanded state without stealing focus", () => {
  const { root, menu, trigger, show, hide, item } = setup();
  initMenu(menu, trigger);
  show();
  item("outside").focus();
  hide();
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  expect(root.activeElement).toBe(item("outside"));
});

test("an emptied menu closes instead of trapping focus", () => {
  const { menu, trigger, show, item, key } = setup();
  initMenu(menu, trigger);
  for (const entry of menu.querySelectorAll<HTMLElement>('[role="menuitem"]')) entry.hidden = true;
  show();
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  item("edit").hidden = false;
  show();
  item("edit").hidden = true;
  key(item("edit"), "ArrowDown");
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
});

test("cleanup restores attributes and removes all listeners", () => {
  const { menu, trigger, show, item, key } = setup();
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");
  item("edit").setAttribute("tabindex", "5");
  const handle = initMenu(menu, trigger);
  show();
  handle.cleanup();
  handle.cleanup();
  expect(trigger.getAttribute("aria-haspopup")).toBe("true");
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  expect(trigger.hasAttribute("aria-controls")).toBe(false);
  expect(item("edit").getAttribute("tabindex")).toBe("5");
  expect(item("delete").hasAttribute("tabindex")).toBe(false);
  expect(key(item("edit"), "Escape").defaultPrevented).toBe(false);
  expect(key(trigger, "ArrowUp").defaultPrevented).toBe(false);
  item("delete").focus();
  expect(item("delete").hasAttribute("tabindex")).toBe(false);
});

test("rejects foreign/malformed targets, horizontal menus, submenus, and missing checked state", () => {
  const { menu, trigger, item } = setup();
  trigger.setAttribute("popovertarget", "foreign");
  expect(() => initMenu(menu, trigger)).toThrow("same root");
  trigger.setAttribute("popovertarget", "menu");
  menu.setAttribute("aria-orientation", "horizontal");
  expect(() => initMenu(menu, trigger)).toThrow("vertical");
  menu.removeAttribute("aria-orientation");
  item("edit").setAttribute("aria-haspopup", "menu");
  expect(() => initMenu(menu, trigger)).toThrow("submenus");
  item("edit").removeAttribute("aria-haspopup");
  item("edit").setAttribute("role", "menuitemradio");
  expect(() => initMenu(menu, trigger)).toThrow("aria-checked");
  item("edit").setAttribute("role", "menuitem");
  for (const entry of menu.querySelectorAll<HTMLElement>('[role="menuitem"]')) entry.hidden = true;
  expect(() => initMenu(menu, trigger)).toThrow("focusable");
  menu.remove();
  expect(() => initMenu(menu, trigger)).toThrow("connected");
});
