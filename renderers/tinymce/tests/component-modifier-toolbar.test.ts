/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import type { CssDocEntry } from "../src/cssdoc/model.js";
import {
  COMPONENT_MODIFIER_CONTEXT_TOOLBAR_NAME,
  COMPONENT_MODIFIER_MENU_NAME,
  registerComponentModifierToolbar,
  resolveComponentContext,
} from "../src/lib/component-modifier-toolbar.js";

const model = [
  {
    name: "button",
    className: ".instui-button",
    kind: "component",
    modifiers: [
      { name: "-color-primary", prop: "color", value: "primary" },
      { name: "-color-secondary", prop: "color", value: "secondary" },
      { name: "-condensed", prop: "condensed" },
      { name: "-legacy", prop: "legacy", deprecated: { canonical: "-condensed" } },
    ],
  },
  {
    name: "badge",
    className: ".instui-badge",
    kind: "component",
    modifiers: [{ name: "-size-sm", prop: "size", value: "sm" }],
  },
  {
    name: "icon",
    className: ".instui-icon",
    kind: "component",
    modifiers: [{ name: "-size-sm", prop: "size", value: "sm" }],
  },
  {
    name: "layout",
    className: ".--display-flex",
    kind: "utility",
    global: true,
    modifiers: [
      { name: "--display-flex", prop: "display", value: "flex" },
      { name: "--display-grid", prop: "display", value: "grid" },
    ],
  },
] as CssDocEntry[];

function createMockEditor(node: Element, body: HTMLElement) {
  const mocks = {
    addContextToolbar: vi.fn(),
    addMenuButton: vi.fn(),
    nodeChanged: vi.fn(),
    transact: vi.fn((action: () => void) => action()),
  };
  const editor = {
    getBody: () => body,
    nodeChanged: mocks.nodeChanged,
    selection: { getNode: () => node },
    undoManager: { transact: mocks.transact },
    ui: {
      registry: {
        addContextToolbar: mocks.addContextToolbar,
        addMenuButton: mocks.addMenuButton,
      },
    },
  } as unknown as Editor;
  return { editor, mocks };
}

function setupClasses(classes: string): {
  body: HTMLDivElement;
  component: HTMLButtonElement;
  child: HTMLSpanElement;
} {
  const body = document.createElement("div");
  const component = document.createElement("button");
  const child = document.createElement("span");
  component.className = classes;
  component.append(child);
  body.append(component);
  return { body, component, child };
}

function fetchMenu(editor: Editor, mocks: ReturnType<typeof createMockEditor>["mocks"]): any[] {
  registerComponentModifierToolbar(editor, model);
  const menu = mocks.addMenuButton.mock.calls[0][1];
  const success = vi.fn();
  menu.fetch(success);
  return success.mock.calls[0][0];
}

test("resolveComponentContext uses the nearest known component ancestor", () => {
  const { body, component, child } = setupClasses("instui-button");
  const badge = document.createElement("span");
  badge.className = "instui-badge";
  const badgeChild = document.createElement("span");
  badge.append(badgeChild);
  component.append(badge);

  expect(resolveComponentContext(child, body, model)?.entry.name).toBe("button");
  expect(resolveComponentContext(badgeChild, body, model)?.entry.name).toBe("badge");
  const icon = document.createElement("span");
  icon.className = "instui-icon";
  component.append(icon);
  expect(resolveComponentContext(icon, body, model)?.entry.name).toBe("button");
  expect(resolveComponentContext(body, body, model)).toBeUndefined();
});

test("registers a context toolbar for nested component content", () => {
  const { body, child } = setupClasses("instui-button");
  const { editor, mocks } = createMockEditor(child, body);
  registerComponentModifierToolbar(editor, model);

  expect(mocks.addMenuButton).toHaveBeenCalledWith(COMPONENT_MODIFIER_MENU_NAME, expect.anything());
  expect(mocks.addContextToolbar).toHaveBeenCalledWith(
    COMPONENT_MODIFIER_CONTEXT_TOOLBAR_NAME,
    expect.objectContaining({ items: COMPONENT_MODIFIER_MENU_NAME }),
  );
  const predicate = mocks.addContextToolbar.mock.calls[0][1].predicate;
  expect(predicate(child)).toBe(true);
  expect(predicate(document.createElement("p"))).toBe(false);
});

test("replaces valued modifiers and Default removes the active value", () => {
  const { body, component, child } = setupClasses("instui-button -color-primary custom-class");
  const { editor, mocks } = createMockEditor(child, body);
  const items = fetchMenu(editor, mocks);
  const color = items.find((item) => item.text === "Color");
  const colorItems = color.getSubmenuItems();

  colorItems.find((item: any) => item.text === "Secondary").onAction();
  expect(component.className).toBe("instui-button custom-class -color-secondary");

  colorItems.find((item: any) => item.text === "Default").onAction();
  expect(component.className).toBe("instui-button custom-class");
  expect(mocks.transact).toHaveBeenCalledTimes(2);
  expect(mocks.nodeChanged).toHaveBeenCalledTimes(2);
});

test("toggles boolean modifiers independently", () => {
  const { body, component, child } = setupClasses("instui-button");
  const { editor, mocks } = createMockEditor(child, body);
  const options = fetchMenu(editor, mocks).find((item) => item.text === "Options");
  const condensed = options.getSubmenuItems().find((item: any) => item.text === "Condensed");

  condensed.onAction();
  expect(component.classList.contains("-condensed")).toBe(true);
  condensed.onAction();
  expect(component.classList.contains("-condensed")).toBe(false);
  expect(options.getSubmenuItems().some((item: any) => item.text === "Legacy")).toBe(false);
});

test("groups and applies global utility modifiers", () => {
  const { body, component, child } = setupClasses("instui-button --display-grid");
  const { editor, mocks } = createMockEditor(child, body);
  const utilities = fetchMenu(editor, mocks).find((item) => item.text === "Utilities");
  const layout = utilities.getSubmenuItems().find((item: any) => item.text === "Layout");
  const flex = layout.getSubmenuItems().find((item: any) => item.text === "Flex");

  flex.onAction();
  expect(component.classList.contains("--display-grid")).toBe(false);
  expect(component.classList.contains("--display-flex")).toBe(true);
});
