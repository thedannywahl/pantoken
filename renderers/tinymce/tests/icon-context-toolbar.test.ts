/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import { isIconElement, registerIconContextToolbar } from "../src/lib/icon-context-toolbar.js";

function createMockEditor(node: HTMLElement) {
  const mocks = {
    addButton: vi.fn(),
    addMenuButton: vi.fn(),
    addContextToolbar: vi.fn(),
    remove: vi.fn(),
    transact: vi.fn((fn: () => void) => fn()),
  };
  const editor = {
    selection: { getNode: () => node },
    dom: { remove: mocks.remove },
    undoManager: { transact: mocks.transact },
    ui: {
      registry: {
        addButton: mocks.addButton,
        addMenuButton: mocks.addMenuButton,
        addContextToolbar: mocks.addContextToolbar,
      },
    },
  } as unknown as Editor;
  return { editor, mocks };
}

function iconSpan(): HTMLSpanElement {
  const span = document.createElement("span");
  span.className = "instui-icon -icon-heart";
  document.body.append(span);
  return span;
}

test("isIconElement matches only .instui-icon spans", () => {
  const span = iconSpan();
  expect(isIconElement(span)).toBe(true);
  expect(isIconElement(document.createElement("div"))).toBe(false);
  const otherSpan = document.createElement("span");
  expect(isIconElement(otherSpan)).toBe(false);
});

test("registers the context toolbar with a predicate matching icon spans and the three buttons", () => {
  const { editor, mocks } = createMockEditor(iconSpan());
  registerIconContextToolbar(editor);

  expect(mocks.addButton).toHaveBeenCalledWith("pantokenIconColor", expect.anything());
  expect(mocks.addMenuButton).toHaveBeenCalledWith("pantokenIconSize", expect.anything());
  expect(mocks.addButton).toHaveBeenCalledWith("pantokenIconDelete", expect.anything());
  expect(mocks.addContextToolbar).toHaveBeenCalledWith(
    "pantokenIconContext",
    expect.objectContaining({
      items: "pantokenIconColor pantokenIconSize pantokenIconDelete",
      position: "node",
      scope: "node",
    }),
  );

  const predicate = mocks.addContextToolbar.mock.calls[0][1].predicate;
  expect(predicate(iconSpan())).toBe(true);
  expect(predicate(document.createElement("div"))).toBe(false);
});

test("the delete button removes the selected icon node", () => {
  const span = iconSpan();
  const { editor, mocks } = createMockEditor(span);
  registerIconContextToolbar(editor);

  const deleteButton = mocks.addButton.mock.calls.find(
    (call) => call[0] === "pantokenIconDelete",
  )![1];
  deleteButton.onAction();

  expect(mocks.remove).toHaveBeenCalledWith(span);
});

test("the size menu sets and clears an inline font-size on the selected icon", () => {
  const span = iconSpan();
  const { editor, mocks } = createMockEditor(span);
  registerIconContextToolbar(editor);

  const sizeMenu = mocks.addMenuButton.mock.calls[0][1];
  const success = vi.fn();
  sizeMenu.fetch(success);
  const items = success.mock.calls[0][0];
  expect(items.map((item: { text: string }) => item.text)).toEqual([
    "Small",
    "Medium",
    "Large",
    "Extra large",
  ]);

  items[2].onAction();
  expect(span.style.fontSize).toBe("1.5em");

  items[1].onAction();
  expect(span.style.fontSize).toBe("");
});

test("the color button applies a chosen color to the selected icon", () => {
  const span = iconSpan();
  const { editor, mocks } = createMockEditor(span);
  registerIconContextToolbar(editor);

  const colorButton = mocks.addButton.mock.calls.find(
    (call) => call[0] === "pantokenIconColor",
  )![1];

  const originalCreateElement = document.createElement.bind(document);
  const clickSpy = vi.fn();
  vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
    const el = originalCreateElement(tag);
    if (tag === "input") {
      el.click = clickSpy;
    }
    return el;
  });

  colorButton.onAction();
  expect(clickSpy).toHaveBeenCalledTimes(1);

  vi.restoreAllMocks();
});
