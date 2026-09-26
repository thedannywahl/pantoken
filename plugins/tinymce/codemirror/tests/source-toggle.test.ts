/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import { EditorView } from "codemirror";
import {
  createSourceTogglePlugin,
  SOURCE_FORMAT_TOOLBAR_NAME,
  SOURCE_TOGGLE_PLUGIN_NAME,
  SOURCE_TOGGLE_STATUSBAR_NAME,
  SOURCE_TOGGLE_TOOLBAR_NAME,
} from "../src/index.js";

/** A minimal `Editor`-shaped stub backed by a real happy-dom element, so
 * `contentAreaContainer.insertAdjacentElement` has a real parent to attach to. */
function fakeEditor(content: string) {
  const contentAreaContainer = document.createElement("div");
  document.body.append(contentAreaContainer);
  const registry = { addToggleButton: vi.fn(), addButton: vi.fn(), addIcon: vi.fn() };
  const listeners = new Map<string, (event?: unknown) => void>();
  const editor = {
    contentAreaContainer,
    ui: { registry },
    on: vi.fn((name: string, callback: (event?: unknown) => void) => listeners.set(name, callback)),
    getContent: vi.fn(() => content),
    setContent: vi.fn(),
    notificationManager: { open: vi.fn() },
  };
  return { editor, listeners };
}

/** The source view's container is inserted right after `contentAreaContainer`. */
function sourceContainerFor(editor: { contentAreaContainer: HTMLElement }): HTMLElement {
  return editor.contentAreaContainer.nextElementSibling as HTMLElement;
}

function toggleOn(editor: ReturnType<typeof fakeEditor>["editor"]): void {
  const toggleConfig = (editor.ui.registry.addToggleButton as ReturnType<typeof vi.fn>).mock
    .calls[0]?.[1];
  toggleConfig.onAction({ setActive: vi.fn() });
}

test("exposes the plugin/toolbar names used by init options", () => {
  expect(SOURCE_TOGGLE_PLUGIN_NAME).toBe("pantoken_source_toggle");
  expect(SOURCE_TOGGLE_TOOLBAR_NAME).toBe("sourcecode");
  expect(SOURCE_FORMAT_TOOLBAR_NAME).toBe("pantokenSourceFormat");
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

test("uses source-view string overrides without changing English defaults", () => {
  const { editor } = fakeEditor("<p>hi</p>");
  createSourceTogglePlugin({ height: 300, strings: { sourceToggleTooltip: "Forráskód" } })(
    editor as never,
  );
  expect(editor.ui.registry.addToggleButton).toHaveBeenCalledWith(
    SOURCE_TOGGLE_TOOLBAR_NAME,
    expect.objectContaining({ tooltip: "Forráskód" }),
  );
  expect(editor.ui.registry.addButton).toHaveBeenCalledWith(
    SOURCE_FORMAT_TOOLBAR_NAME,
    expect.objectContaining({ tooltip: "Format code" }),
  );
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

test("insertAtCursor inserts at the current selection", () => {
  const { editor } = fakeEditor("<p>hello</p>");
  const plugin = createSourceTogglePlugin({ height: 200 });
  const api = plugin(editor as never);
  toggleOn(editor);

  api.insertAtCursor("<span>x</span>");

  expect(api.getContent()).toBe("<span>x</span><p>hello</p>");
});

test("replaceAll replaces the entire source doc", () => {
  const { editor } = fakeEditor("<p>hello</p>");
  const plugin = createSourceTogglePlugin({ height: 200 });
  const api = plugin(editor as never);
  toggleOn(editor);

  api.replaceAll("<p>replaced</p>");

  expect(api.getContent()).toBe("<p>replaced</p>");
});

test("format pretty-prints the current doc via prettier", async () => {
  const { editor } = fakeEditor("<div><p>hi</p></div>");
  const plugin = createSourceTogglePlugin({ height: 200 });
  const api = plugin(editor as never);
  toggleOn(editor);

  await api.format();

  expect(api.getContent()).toContain("\n");
  expect(api.getContent()).not.toBe("<div><p>hi</p></div>");
});

test("entering source mode auto-formats the mirrored content", async () => {
  const { editor } = fakeEditor("<div><p>hi</p></div>");
  const plugin = createSourceTogglePlugin({ height: 200 });
  const api = plugin(editor as never);
  toggleOn(editor);

  // toggle() fires format() without awaiting it, so flush the pending promise chain.
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(api.getContent()).toContain("\n");
  expect(api.getContent()).not.toBe("<div><p>hi</p></div>");
});

test("registers a format button disabled outside of source mode", () => {
  const { editor } = fakeEditor("<p>x</p>");
  const plugin = createSourceTogglePlugin({ height: 200 });
  plugin(editor as never);

  const formatConfig = editor.ui.registry.addButton.mock.calls.find(
    (call: unknown[]) => call[0] === SOURCE_FORMAT_TOOLBAR_NAME,
  )?.[1];
  const setEnabled = vi.fn();
  formatConfig.onSetup({ setEnabled });

  expect(setEnabled).toHaveBeenCalledWith(false);

  toggleOn(editor);
  expect(setEnabled).toHaveBeenLastCalledWith(true);
});

test("resizes the source container to fill available height on fullscreen", () => {
  const { editor, listeners } = fakeEditor("<p>x</p>");
  const plugin = createSourceTogglePlugin({ height: 250 });
  plugin(editor as never);
  toggleOn(editor);

  const container = sourceContainerFor(editor);
  expect(container.style.height).toBe("250px");

  listeners.get("FullscreenStateChanged")?.({ state: true });
  expect(container.style.height).toBe("100%");

  listeners.get("FullscreenStateChanged")?.({ state: false });
  expect(container.style.height).toBe("250px");
});

test("reacts to the data-pantoken-scheme attribute for dark mode theming", async () => {
  const { editor } = fakeEditor("<p>x</p>");
  const plugin = createSourceTogglePlugin({ height: 200 });
  plugin(editor as never);
  toggleOn(editor);

  const container = sourceContainerFor(editor);
  expect(container.style.backgroundColor).toBe("#ffffff");

  document.documentElement.setAttribute("data-pantoken-scheme", "dark");
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(container.style.backgroundColor).toBe("#1e1e1e");
  document.documentElement.removeAttribute("data-pantoken-scheme");
});

test("installs syntax highlighting styles for HTML tokens", () => {
  const { editor } = fakeEditor('<div class="example">content</div>');
  const plugin = createSourceTogglePlugin({ height: 200 });
  plugin(editor as never);
  toggleOn(editor);

  const styles = Array.from(document.head.querySelectorAll("style"))
    .map((style) => style.textContent)
    .join("\n");

  expect(styles).toContain("#800000");
  expect(styles).toContain("#0000ff");
});

test("highlight and theme colors are !important, so they survive TinyMCE's `.tox :not(svg):not(rect)` reset", () => {
  const { editor } = fakeEditor('<div class="example">content</div>');
  const plugin = createSourceTogglePlugin({ height: 200 });
  plugin(editor as never);
  toggleOn(editor);

  const styles = Array.from(document.head.querySelectorAll("style"))
    .map((style) => style.textContent)
    .join("\n");

  expect(styles).toContain("#800000 !important");
  expect(styles).toMatch(/#ffffff\s*!important/);
});

/** A fake editor supporting multiple listeners per event and a statusbar container, for
 * exercising the footer-display mode. */
function footerEditor(content: string) {
  const contentAreaContainer = document.createElement("div");
  document.body.append(contentAreaContainer);
  const container = document.createElement("div");
  const statusbarText = document.createElement("div");
  statusbarText.className = "tox-statusbar__text-container";
  container.append(statusbarText);
  const registry = { addToggleButton: vi.fn(), addButton: vi.fn(), addIcon: vi.fn() };
  const listeners = new Map<string, Array<(event?: unknown) => void>>();
  const editor = {
    contentAreaContainer,
    ui: { registry },
    on: vi.fn((name: string, callback: (event?: unknown) => void) => {
      listeners.set(name, [...(listeners.get(name) ?? []), callback]);
    }),
    off: vi.fn(),
    getContainer: vi.fn(() => container),
    getContent: vi.fn(() => content),
    setContent: vi.fn(),
    notificationManager: { open: vi.fn() },
  };
  return { editor, listeners };
}

test("display: 'footer' registers no toolbar controls, only footer toggle and format buttons", () => {
  const { editor, listeners } = footerEditor("<p>hi</p>");
  const plugin = createSourceTogglePlugin({ height: 200, display: "footer" });
  const api = plugin(editor as never);

  expect(editor.ui.registry.addToggleButton).not.toHaveBeenCalled();
  expect(editor.ui.registry.addButton).not.toHaveBeenCalled();

  for (const handler of listeners.get("PostRender") ?? []) handler();
  const button = editor
    .getContainer()
    .querySelector<HTMLButtonElement>(`#${SOURCE_TOGGLE_STATUSBAR_NAME}`);
  expect(button).not.toBeNull();
  expect(button?.getAttribute("aria-pressed")).toBe("false");

  const formatButton = editor
    .getContainer()
    .querySelector<HTMLButtonElement>(`#${SOURCE_FORMAT_TOOLBAR_NAME}`);
  expect(formatButton).not.toBeNull();
  expect(formatButton?.disabled).toBe(true);

  button?.click();
  expect(api.isSourceMode()).toBe(true);
  expect(button?.getAttribute("aria-pressed")).toBe("true");
  expect(formatButton?.disabled).toBe(false);

  for (const handler of listeners.get("remove") ?? []) handler();
  expect(button?.isConnected).toBe(false);
  expect(formatButton?.isConnected).toBe(false);
});

test("display: 'both' registers the toolbar toggle and the footer button together", () => {
  const { editor, listeners } = footerEditor("<p>hi</p>");
  const plugin = createSourceTogglePlugin({ height: 200, display: "both" });
  plugin(editor as never);

  expect(editor.ui.registry.addToggleButton).toHaveBeenCalled();
  for (const handler of listeners.get("PostRender") ?? []) handler();
  expect(editor.getContainer().querySelector(`#${SOURCE_TOGGLE_STATUSBAR_NAME}`)).not.toBeNull();
});
