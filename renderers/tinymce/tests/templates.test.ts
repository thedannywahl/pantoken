import { expect, test, vi } from "vite-plus/test";
import { createTemplatesPlugin, TEMPLATES_TOOLBAR_NAME } from "../src/plugins/templates.js";
import type { StarterTemplate } from "../src/types.js";

const templates: StarterTemplate[] = [
  { title: "Hero", content: "<div>hero</div>" },
  { title: "Callout", content: "<div>callout</div>" },
];

/** A minimal `Editor`-shaped stub recording the calls this plugin makes. */
function fakeEditor() {
  const registry = {
    addButton: vi.fn(),
    addMenuItem: vi.fn(),
  };
  const editor = {
    ui: { registry },
    setContent: vi.fn(),
    windowManager: {
      open: vi.fn(),
      confirm: vi.fn(),
    },
  };
  return editor;
}

test("registers a toolbar button and menu item listing every template", () => {
  const editor = fakeEditor();
  const plugin = createTemplatesPlugin({ templates });
  plugin(editor as never);

  expect(editor.ui.registry.addButton).toHaveBeenCalledWith(
    TEMPLATES_TOOLBAR_NAME,
    expect.objectContaining({ text: "Insert template" }),
  );
  expect(editor.ui.registry.addMenuItem).toHaveBeenCalledWith(
    TEMPLATES_TOOLBAR_NAME,
    expect.objectContaining({ text: "Insert template…" }),
  );
});

test("confirming the dialog replaces the document with the chosen template", () => {
  const editor = fakeEditor();
  const onInsert = vi.fn();
  const plugin = createTemplatesPlugin({ templates, onInsert });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();

  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  expect(dialogSpec.body.items[0].items).toEqual([
    { value: "Hero", text: "Hero" },
    { value: "Callout", text: "Callout" },
  ]);

  const api = { getData: () => ({ template: "Callout" }), close: vi.fn() };
  dialogSpec.onSubmit(api);
  expect(api.close).toHaveBeenCalled();

  const confirmCallback = editor.windowManager.confirm.mock.calls[0]?.[1] as (
    confirmed: boolean,
  ) => void;
  confirmCallback(true);

  expect(editor.setContent).toHaveBeenCalledWith("<div>callout</div>");
  expect(onInsert).toHaveBeenCalledWith(templates[1]);
});

test("declining the confirm does not modify the editor", () => {
  const editor = fakeEditor();
  const plugin = createTemplatesPlugin({ templates });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();
  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  const api = { getData: () => ({ template: "Hero" }), close: vi.fn() };
  dialogSpec.onSubmit(api);

  const confirmCallback = editor.windowManager.confirm.mock.calls[0]?.[1] as (
    confirmed: boolean,
  ) => void;
  confirmCallback(false);

  expect(editor.setContent).not.toHaveBeenCalled();
});
