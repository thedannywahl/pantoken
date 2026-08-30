import { expect, test, vi } from "vite-plus/test";
import {
  createLayoutsPlugin,
  LAYOUTS_PLUGIN_NAME,
  LAYOUTS_TOOLBAR_NAME,
} from "../src/plugins/layouts.js";
import type { PageLayout } from "../src/layouts.js";

const layouts: PageLayout[] = [
  { name: "hero", title: "Hero", html: "<div>hero</div>" },
  { name: "callout", title: "Callout", html: "<div>callout</div>" },
];

test("exposes the plugin name used in TinyMCE's init options", () => {
  expect(LAYOUTS_PLUGIN_NAME).toBe("pantoken_layouts");
});

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

test("registers a toolbar button and menu item listing every layout", () => {
  const editor = fakeEditor();
  const plugin = createLayoutsPlugin({ layouts });
  plugin(editor as never);

  expect(editor.ui.registry.addButton).toHaveBeenCalledWith(
    LAYOUTS_TOOLBAR_NAME,
    expect.objectContaining({ text: "Layouts" }),
  );
  expect(editor.ui.registry.addMenuItem).toHaveBeenCalledWith(
    LAYOUTS_TOOLBAR_NAME,
    expect.objectContaining({ text: "Layout…" }),
  );
});

test("defaults to the bundled pantoken page layouts", () => {
  const editor = fakeEditor();
  const plugin = createLayoutsPlugin();
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();

  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  const names = dialogSpec.body.items[0].items.map((item: { value: string }) => item.value);
  expect(names).toEqual(
    expect.arrayContaining(["hero", "callout", "rubric-note", "testimonial", "two-column"]),
  );
});

test("confirming the dialog replaces the document with the chosen layout", () => {
  const editor = fakeEditor();
  const onInsert = vi.fn();
  const plugin = createLayoutsPlugin({ layouts, onInsert });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();

  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  expect(dialogSpec.body.items[0].items).toEqual([
    { value: "hero", text: "Hero" },
    { value: "callout", text: "Callout" },
  ]);

  const api = { getData: () => ({ layout: "callout" }), close: vi.fn() };
  dialogSpec.onSubmit(api);
  expect(api.close).toHaveBeenCalled();

  const confirmCallback = editor.windowManager.confirm.mock.calls[0]?.[1] as (
    confirmed: boolean,
  ) => void;
  confirmCallback(true);

  expect(editor.setContent).toHaveBeenCalledWith("<div>callout</div>");
  expect(onInsert).toHaveBeenCalledWith(layouts[1]);
});

test("declining the confirm does not modify the editor", () => {
  const editor = fakeEditor();
  const plugin = createLayoutsPlugin({ layouts });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();
  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  const api = { getData: () => ({ layout: "hero" }), close: vi.fn() };
  dialogSpec.onSubmit(api);

  const confirmCallback = editor.windowManager.confirm.mock.calls[0]?.[1] as (
    confirmed: boolean,
  ) => void;
  confirmCallback(false);

  expect(editor.setContent).not.toHaveBeenCalled();
});
