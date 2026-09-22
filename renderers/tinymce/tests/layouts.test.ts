/** @vitest-environment happy-dom */
import { expect, test, vi } from "vite-plus/test";
import {
  createLayoutsPlugin,
  LAYOUTS_PLUGIN_NAME,
  LAYOUTS_TOOLBAR_NAME,
  materializeLayout,
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
    insertContent: vi.fn(),
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

test("inserting a layout adds it at the cursor without confirmation", () => {
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
  expect(editor.insertContent).toHaveBeenCalledWith("<div>callout</div>");
  expect(editor.windowManager.confirm).not.toHaveBeenCalled();
  expect(onInsert).toHaveBeenCalledWith(layouts[1]);
});

test("replacing confirms before replacing the document with the chosen layout", () => {
  const editor = fakeEditor();
  const onInsert = vi.fn();
  const plugin = createLayoutsPlugin({ layouts, onInsert });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();
  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  expect(dialogSpec.buttons).toEqual([
    { type: "cancel", text: "Cancel" },
    { type: "custom", name: "replace", text: "Replace" },
    { type: "submit", text: "Insert", primary: true },
  ]);

  const api = { getData: () => ({ layout: "callout" }), close: vi.fn() };
  dialogSpec.onAction(api, { name: "replace" });
  expect(api.close).toHaveBeenCalled();

  const confirmCallback = editor.windowManager.confirm.mock.calls[0]?.[1] as (
    confirmed: boolean,
  ) => void;
  confirmCallback(true);

  expect(editor.setContent).toHaveBeenCalledWith("<div>callout</div>");
  expect(onInsert).toHaveBeenCalledWith(layouts[1]);
});

test("inserts into the CodeMirror doc at the cursor while the source view is active", () => {
  const editor = fakeEditor();
  const insertAtCursor = vi.fn();
  (editor as unknown as Record<string, unknown>).plugins = {
    pantoken_source_toggle: { isSourceMode: () => true, insertAtCursor },
  };
  const plugin = createLayoutsPlugin({ layouts });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();
  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  dialogSpec.onSubmit({ getData: () => ({ layout: "callout" }), close: vi.fn() });

  expect(insertAtCursor).toHaveBeenCalledWith("<div>callout</div>");
  expect(editor.insertContent).not.toHaveBeenCalled();
});

test("replaces the CodeMirror doc after confirmation while the source view is active", () => {
  const editor = fakeEditor();
  const replaceAll = vi.fn();
  (editor as unknown as Record<string, unknown>).plugins = {
    pantoken_source_toggle: { isSourceMode: () => true, replaceAll },
  };
  const plugin = createLayoutsPlugin({ layouts });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();
  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  dialogSpec.onAction(
    { getData: () => ({ layout: "callout" }), close: vi.fn() },
    { name: "replace" },
  );
  const confirmCallback = editor.windowManager.confirm.mock.calls[0]?.[1] as (
    confirmed: boolean,
  ) => void;
  confirmCallback(true);

  expect(replaceAll).toHaveBeenCalledWith("<div>callout</div>");
  expect(editor.setContent).not.toHaveBeenCalled();
});

test("declining the confirm does not modify the editor", () => {
  const editor = fakeEditor();
  const plugin = createLayoutsPlugin({ layouts });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();
  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  const api = { getData: () => ({ layout: "hero" }), close: vi.fn() };
  dialogSpec.onAction(api, { name: "replace" });

  const confirmCallback = editor.windowManager.confirm.mock.calls[0]?.[1] as (
    confirmed: boolean,
  ) => void;
  confirmCallback(false);

  expect(editor.setContent).not.toHaveBeenCalled();
});

test("materializes a declared image placeholder and preserves decorative alt text", () => {
  const attributes = new Map<string, string>([
    ["data-pantoken-image-placeholder", "decorative-image"],
  ]);
  const image = {
    classList: { add: vi.fn() },
    getAttribute: (name: string) => attributes.get(name) ?? null,
    removeAttribute: (name: string) => attributes.delete(name),
    setAttribute: (name: string, value: string) => attributes.set(name, value),
  };
  const document = {
    body: { innerHTML: '<img class="instui-img" src="generated" alt="">' },
    querySelectorAll: () => [image],
  };
  class FakeDOMParser {
    parseFromString() {
      return document;
    }
  }
  vi.stubGlobal("DOMParser", FakeDOMParser);

  const layout: PageLayout = {
    name: "decorative",
    title: "Decorative",
    html: '<img class="instui-img" data-pantoken-image-placeholder="decorative-image">',
    imagePlaceholders: [{ key: "decorative-image", width: 240, height: 120 }],
  };
  const html = materializeLayout(layout, (placeholder) => ({
    src: `https://example.test/${placeholder.key}.png`,
  }));

  expect(image.classList.add).toHaveBeenCalledWith("instui-img");
  expect(attributes.get("src")).toBe("https://example.test/decorative-image.png");
  expect(attributes.get("alt")).toBe("");
  expect(attributes.get("width")).toBe("240");
  expect(attributes.get("height")).toBe("120");
  expect(attributes.has("data-pantoken-image-placeholder")).toBe(false);
  expect(html).toContain('alt=""');
  vi.unstubAllGlobals();
});

test("resolves placeholders when inserting a layout through the plugin", () => {
  const editor = fakeEditor();
  const layout: PageLayout = {
    name: "with-image",
    title: "With image",
    html: '<img class="instui-img" data-pantoken-image-placeholder="course-image">',
    imagePlaceholders: [{ key: "course-image", width: 600, height: 400 }],
  };
  const plugin = createLayoutsPlugin({
    layouts: [layout],
    resolveImage: (placeholder) => ({
      src: `https://placehold.co/${placeholder.width}x${placeholder.height}.png`,
    }),
  });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();
  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  dialogSpec.onAction(
    { getData: () => ({ layout: "with-image" }), close: vi.fn() },
    { name: "replace" },
  );
  const confirmCallback = editor.windowManager.confirm.mock.calls[0]?.[1] as (
    confirmed: boolean,
  ) => void;
  confirmCallback(true);

  expect(editor.setContent).toHaveBeenCalledWith(
    '<img class="instui-img" src="https://placehold.co/600x400.png" alt="" width="600" height="400">',
  );
});

test("renders a passed-in locale, falling back to English for missing translations", () => {
  const editor = fakeEditor();
  const plugin = createLayoutsPlugin({ locale: "hu" });
  plugin(editor as never);

  const openAction = editor.ui.registry.addButton.mock.calls[0]?.[1].onAction as () => void;
  openAction();

  const dialogSpec = editor.windowManager.open.mock.calls[0]?.[0];
  const heroItem = dialogSpec.body.items[0].items.find(
    (item: { value: string }) => item.value === "hero",
  );
  expect(heroItem).toEqual({ value: "hero", text: "Hero" });
});
