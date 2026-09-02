/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import { EditorView } from "codemirror";
import {
  createSourceTogglePlugin,
  SOURCE_TOGGLE_PLUGIN_NAME,
  SOURCE_TOGGLE_TOOLBAR_NAME,
} from "../src/plugins/source-toggle.js";

/** A minimal `Editor`-shaped stub backed by a real happy-dom element, so
 * `contentAreaContainer.insertAdjacentElement` has a real parent to attach to. */
function fakeEditor(content: string) {
  const contentAreaContainer = document.createElement("div");
  document.body.append(contentAreaContainer);
  const registry = { addToggleButton: vi.fn() };
  const listeners = new Map<string, () => void>();
  const editor = {
    contentAreaContainer,
    ui: { registry },
    on: vi.fn((name: string, callback: () => void) => listeners.set(name, callback)),
    getContent: vi.fn(() => content),
    setContent: vi.fn(),
  };
  return { editor, listeners };
}

test("exposes the plugin/toolbar names used by init options", () => {
  expect(SOURCE_TOGGLE_PLUGIN_NAME).toBe("pantoken_source_toggle");
  expect(SOURCE_TOGGLE_TOOLBAR_NAME).toBe("sourcecode");
});

test("registers a toggle button and starts out of source mode", () => {
  const { editor } = fakeEditor("<p>hi</p>");
  const plugin = createSourceTogglePlugin({ height: 300 });
  const api = plugin(editor as never);

  expect(editor.ui.registry.addToggleButton).toHaveBeenCalledWith(
    SOURCE_TOGGLE_TOOLBAR_NAME,
    expect.objectContaining({ icon: "sourcecode", tooltip: "Source code" }),
  );
  expect(api.isSourceMode()).toBe(false);
  expect(api.getContent()).toBe("");
});

test("toggling on mirrors the WYSIWYG content into the source view and notifies callbacks", () => {
  const { editor } = fakeEditor("<p>hello</p>");
  const onChange = vi.fn();
  const onToggle = vi.fn();
  const plugin = createSourceTogglePlugin({ height: 200, onChange, onToggle });
  const api = plugin(editor as never);

  const toggleConfig = editor.ui.registry.addToggleButton.mock.calls[0]?.[1];
  const toggleApi = { setActive: vi.fn() };
  toggleConfig.onAction(toggleApi);

  expect(toggleApi.setActive).toHaveBeenCalledWith(true);
  expect(api.isSourceMode()).toBe(true);
  expect(api.getContent()).toBe("<p>hello</p>");
  expect(onChange).toHaveBeenCalledWith("<p>hello</p>");
  expect(onToggle).toHaveBeenCalledWith(true);
});

test("toggling off writes the source view's content back into the editor", () => {
  const { editor } = fakeEditor("<p>hello</p>");
  const onToggle = vi.fn();
  const plugin = createSourceTogglePlugin({ height: 200, onToggle });
  const api = plugin(editor as never);

  const toggleConfig = editor.ui.registry.addToggleButton.mock.calls[0]?.[1];
  const toggleApi = { setActive: vi.fn() };
  toggleConfig.onAction(toggleApi); // on
  toggleConfig.onAction(toggleApi); // off

  expect(toggleApi.setActive).toHaveBeenLastCalledWith(false);
  expect(api.isSourceMode()).toBe(false);
  expect(editor.setContent).toHaveBeenCalledWith("<p>hello</p>");
  expect(onToggle).toHaveBeenLastCalledWith(false);
  expect(api.getContent()).toBe("");
});

test("passes extra extensions through to the underlying CodeMirror view", () => {
  const { editor } = fakeEditor("<p>x</p>");
  const onDocChanged = vi.fn();
  const extension = EditorView.updateListener.of((update: { docChanged: boolean }) => {
    if (update.docChanged) onDocChanged();
  });
  const plugin = createSourceTogglePlugin({ height: 200, extensions: [extension] });
  const api = plugin(editor as never);

  const toggleConfig = editor.ui.registry.addToggleButton.mock.calls[0]?.[1];
  toggleConfig.onAction({ setActive: vi.fn() });

  expect(api.isSourceMode()).toBe(true);
  expect(onDocChanged).toHaveBeenCalled();
});

test("the 'remove' handler tears down the CodeMirror view without throwing", () => {
  const { editor, listeners } = fakeEditor("<p>x</p>");
  const plugin = createSourceTogglePlugin({ height: 200 });
  const api = plugin(editor as never);

  const toggleConfig = editor.ui.registry.addToggleButton.mock.calls[0]?.[1];
  toggleConfig.onAction({ setActive: vi.fn() });

  expect(editor.on).toHaveBeenCalledWith("remove", expect.any(Function));
  expect(() => listeners.get("remove")?.()).not.toThrow();
  expect(api.isSourceMode()).toBe(true);
});

test("the 'remove' handler is a no-op when the source view was never opened", () => {
  const { editor, listeners } = fakeEditor("<p>x</p>");
  createSourceTogglePlugin({ height: 200 })(editor as never);

  expect(() => listeners.get("remove")?.()).not.toThrow();
});
