/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import type { TaggedIcon } from "../src/icons.js";
import { createIconsPlugin, DEFAULT_ICON_TRIGGER, ICONS_COMMAND } from "../src/plugins/icons.js";

// Avoid happy-dom actually fetching the injected top-level bundle <link>s over the network.
vi.mock("@pantoken/cdn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@pantoken/cdn")>()),
  buildFileUrl: (file: { package: string; path?: string }) => `data:text/css,/*${file.package}*/`,
}));

const mockIcons: TaggedIcon[] = [
  { name: "heart", source: "simple-icons", description: "Heart icon" },
  { name: "close", source: "components", description: "Close icon" },
];

/** A minimal `Editor`-shaped stub backed by a real happy-dom document. */
function createMockEditor() {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  const contentDoc = document.implementation.createHTMLDocument("");
  const commands = new Map<string, () => void>();
  const container = document.createElement("div");
  document.body.append(container);
  // Held separately from the editor so assertions never reference an unbound method off it.
  const mocks = {
    addCommand: vi.fn((name: string, handler: () => void) => commands.set(name, handler)),
    close: vi.fn(),
    insertContent: vi.fn(),
    setRng: vi.fn(),
    open: vi.fn(() => ({ close: mocks.close })),
    addButton: vi.fn(),
    addMenuItem: vi.fn(),
    addAutocompleter: vi.fn(),
  };
  const editor = {
    addCommand: mocks.addCommand,
    execCommand: vi.fn((name: string) => commands.get(name)?.()),
    getContainer: () => container,
    getDoc: () => contentDoc,
    insertContent: mocks.insertContent,
    selection: { setRng: mocks.setRng },
    windowManager: { open: mocks.open },
    ui: {
      registry: {
        addButton: mocks.addButton,
        addMenuItem: mocks.addMenuItem,
        addAutocompleter: mocks.addAutocompleter,
      },
    },
  } as unknown as Editor;
  return { editor, mocks };
}

function setup(overrides: Partial<Parameters<typeof createIconsPlugin>[0]> = {}) {
  const { editor, mocks } = createMockEditor();
  const currentAssets: TaggedIcon[] = [];
  createIconsPlugin({
    icons: mockIcons,
    currentAssets: currentAssets as never,
    ...overrides,
  })(editor);
  return { editor, mocks, currentAssets };
}

/** Open the dialog and return the mounted picker root. */
function openPicker(editor: Editor, open: ReturnType<typeof vi.fn>): HTMLElement {
  editor.execCommand(ICONS_COMMAND);
  const spec = open.mock.calls[0][0];
  document.body.insertAdjacentHTML("beforeend", spec.body.items[0].html);
  // The plugin looks the shell up by id after `open` returns, so re-run it now that it exists.
  open.mockClear();
  editor.execCommand(ICONS_COMMAND);
  return document.getElementById("pantoken-icon-picker")!;
}

test("the toolbar button and menu item both open the picker dialog", () => {
  const { mocks } = setup();
  const button = mocks.addButton.mock.calls[0][1];
  button.onAction();
  expect(mocks.open).toHaveBeenCalledTimes(1);

  const menuItem = mocks.addMenuItem.mock.calls[0][1];
  menuItem.onAction();
  expect(mocks.open).toHaveBeenCalledTimes(2);
});

test("registerUi: false skips the standalone toolbar button/menu item but keeps the command", () => {
  const { mocks } = setup({ registerUi: false });
  expect(mocks.addButton).not.toHaveBeenCalled();
  expect(mocks.addMenuItem).not.toHaveBeenCalled();
  expect(mocks.addCommand).toHaveBeenCalledWith(ICONS_COMMAND, expect.any(Function));
});

test("opening the picker injects the preview stylesheets once", () => {
  const { editor, mocks } = setup();
  openPicker(editor, mocks.open);
  const owned = document.head.querySelectorAll("[data-pantoken-icon-picker]");
  // Two <style> elements (chrome + inline glyph tokens) plus one <link> per CDN-backed source.
  expect(owned).toHaveLength(4);
  expect(document.head.querySelectorAll("style[data-pantoken-icon-picker]")).toHaveLength(2);
});

test("picking an icon inserts it, tracks its CSS asset, and closes the dialog", () => {
  const { editor, mocks, currentAssets } = setup();
  const root = openPicker(editor, mocks.open);
  root.querySelector<HTMLButtonElement>(".pantoken-ip__tile")!.click();

  expect(mocks.insertContent).toHaveBeenCalledWith(
    '<span class="instui-icon -icon-heart" aria-hidden="true"></span>',
  );
  expect(currentAssets).toEqual([
    { package: "@pantoken/plugin-simple-icons", path: "dist/icons/heart.css" },
  ]);
  expect(mocks.close).toHaveBeenCalled();
});

test("picking an icon in source view routes the insert to the CodeMirror doc", () => {
  const insertAtCursor = vi.fn();
  const { editor, mocks } = createMockEditor();
  (editor as unknown as Record<string, unknown>).plugins = {
    pantoken_source_toggle: { isSourceMode: () => true, insertAtCursor },
  };
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);
  const root = openPicker(editor, mocks.open);
  root.querySelector<HTMLButtonElement>(".pantoken-ip__tile")!.click();

  expect(insertAtCursor).toHaveBeenCalledWith(
    '<span class="instui-icon -icon-heart" aria-hidden="true"></span>',
  );
  expect(mocks.insertContent).not.toHaveBeenCalled();
});

test("the autocompleter defaults to a trigger the emoticons plugin does not claim", () => {
  const { mocks } = setup();
  const [name, spec] = mocks.addAutocompleter.mock.calls[0];
  expect(name).toBe("pantokenIcons");
  expect(spec.trigger).toBe(DEFAULT_ICON_TRIGGER);
  expect(spec.trigger).not.toBe(":");
});

test("the autocompleter trigger is configurable", () => {
  const { mocks } = setup({ trigger: ";" });
  expect(mocks.addAutocompleter.mock.calls[0][1].trigger).toBe(";");
});

test("autocompleter rows carry the icon name and its source label", async () => {
  const { mocks } = setup();
  const spec = mocks.addAutocompleter.mock.calls[0][1];
  const results = await spec.fetch("hear", 10);
  expect(results).toHaveLength(1);
  const texts = results[0].items[0].items
    .filter((item: { type: string }) => item.type === "cardtext")
    .map((item: { text: string }) => item.text);
  expect(texts).toEqual(["heart", "Simple Icons"]);
});

test("autocompleter rows show a glyph resolved from the injected source stylesheet", async () => {
  const { mocks } = setup();
  document.documentElement.style.setProperty(
    "--instui-icon-heart",
    "url('data:image/svg+xml;utf8,%3Csvg%3E%3C/svg%3E')",
  );
  const spec = mocks.addAutocompleter.mock.calls[0][1];
  const [row] = await spec.fetch("heart", 10);
  const image = row.items[0].items.find((item: { type: string }) => item.type === "cardimage");
  expect(image.src).toBe("data:image/svg+xml;charset=utf-8,%3Csvg%3E%3C/svg%3E");
  document.documentElement.style.removeProperty("--instui-icon-heart");
});

test("autocompleter onAction inserts the selected icon", async () => {
  const { mocks } = setup();
  const spec = mocks.addAutocompleter.mock.calls[0][1];
  const hide = vi.fn();
  const range = {} as Range;
  spec.onAction({ hide }, range, "simple-icons:heart");

  expect(mocks.setRng).toHaveBeenCalledWith(range);
  expect(mocks.insertContent).toHaveBeenCalledWith(
    '<span class="instui-icon -icon-heart" aria-hidden="true"></span>',
  );
  expect(hide).toHaveBeenCalled();
});

test("autocompleter onAction ignores a value that is not a known icon", () => {
  const { mocks } = setup();
  const spec = mocks.addAutocompleter.mock.calls[0][1];
  spec.onAction({ hide: vi.fn() }, {} as Range, "nope:nope");
  expect(mocks.insertContent).not.toHaveBeenCalled();
});
