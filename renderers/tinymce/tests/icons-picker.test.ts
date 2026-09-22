/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import type { TaggedIcon } from "../src/icons.js";
import { createIconsPlugin } from "../src/plugins/icons.js";

// Avoid happy-dom actually fetching the injected top-level bundle <link>s over the network.
vi.mock("@pantoken/cdn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@pantoken/cdn")>()),
  buildFileUrl: (file: { package: string; path?: string }) => `data:text/css,/*${file.package}*/`,
}));

// Mock icon data
const mockIcons: TaggedIcon[] = [
  { name: "heart", source: "simple-icons", description: "Heart icon" },
  { name: "close", source: "components", description: "Close icon" },
];

/** A minimal `Editor`-shaped stub, backed by a real happy-dom document for `dom.select`. */
function createMockEditor() {
  const listeners = new Map<string, (e: unknown) => void>();
  const resourceAdd = vi.fn();
  const executed: string[] = [];
  const contentDoc = document.implementation.createHTMLDocument("");
  return {
    editorManager: { Resource: { add: resourceAdd } },
    on: vi.fn((name: string, handler: (e: unknown) => void) => listeners.set(name, handler)),
    fire: (name: string, e: unknown) => listeners.get(name)?.(e),
    execCommand: vi.fn((name: string) => executed.push(name)),
    dom: { select: (selector: string) => Array.from(document.querySelectorAll(selector)) },
    getDoc: () => contentDoc,
    windowManager: { open: vi.fn() },
    ui: { registry: { addButton: vi.fn(), addMenuItem: vi.fn() } },
    resourceAdd,
    executed,
  } as unknown as Editor & {
    fire: (name: string, e: unknown) => void;
    resourceAdd: ReturnType<typeof vi.fn>;
    executed: string[];
  };
}

test("createIconsPlugin injects the top-level icon-CSS bundles once", () => {
  document.head.innerHTML = "";
  const editor = createMockEditor();
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);
  expect(document.head.querySelectorAll("link[rel=stylesheet]")).toHaveLength(2);
});

test("createIconsPlugin registers the emoticons database", () => {
  const editor = createMockEditor();
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);
  expect(editor.resourceAdd).toHaveBeenCalledWith(
    "tinymce.plugins.pantoken-icons",
    expect.objectContaining({
      "components:close": expect.objectContaining({ category: "Instructure UI" }),
      "simple-icons:heart": expect.objectContaining({ category: "Simple Icons" }),
    }),
  );
});

test("createIconsPlugin registers toolbar button and menu item that open the native emoticons dialog", () => {
  const editor = createMockEditor();
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);

  const buttonConfig = (editor.ui.registry.addButton as any).mock.calls[0][1];
  buttonConfig.onAction();
  expect(editor.executed).toEqual(["mceEmoticons"]);
});

test("registerUi: false skips the standalone toolbar button/menu item", () => {
  const editor = createMockEditor();
  createIconsPlugin({ icons: mockIcons, currentAssets: [], registerUi: false })(editor);
  expect(editor.ui.registry.addButton).not.toHaveBeenCalled();
  expect(editor.ui.registry.addMenuItem).not.toHaveBeenCalled();
});

test("inserting an icon tracks its CSS asset and opens the label dialog", () => {
  const editor = createMockEditor();
  const currentAssets: any[] = [];
  const onMissingAsset = vi.fn();
  createIconsPlugin({ icons: mockIcons, currentAssets, onMissingAsset })(editor);

  editor.fire("ExecCommand", {
    command: "mceInsertContent",
    value: '<span class="instui-icon -icon-heart" data-pantoken-icon="simple-icons:heart"></span>',
  });

  expect(currentAssets).toEqual([
    { package: "@pantoken/plugin-simple-icons", path: "dist/icons/heart.css" },
  ]);
  expect(onMissingAsset).toHaveBeenCalled();
  expect(editor.windowManager.open).toHaveBeenCalledWith(
    expect.objectContaining({ initialData: { label: "heart" } }),
  );
});

test("unrelated ExecCommand events are ignored", () => {
  const editor = createMockEditor();
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);
  editor.fire("ExecCommand", { command: "bold", value: "" });
  expect(editor.windowManager.open).not.toHaveBeenCalled();
});

test("mirrors the native emoticons insertion into the CodeMirror doc while the source view is active", () => {
  const editor = createMockEditor();
  const insertAtCursor = vi.fn();
  (editor as unknown as Record<string, unknown>).plugins = {
    pantoken_source_toggle: { isSourceMode: () => true, insertAtCursor },
  };
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);

  editor.fire("ExecCommand", {
    command: "mceInsertContent",
    value: '<span class="instui-icon -icon-heart" data-pantoken-icon="simple-icons:heart"></span>',
  });

  expect(insertAtCursor).toHaveBeenCalledWith(
    '<span class="instui-icon -icon-heart" data-pantoken-icon="simple-icons:heart"></span>',
  );
});

test("label dialog submit updates the inserted icon's screen-reader text and clears the marker", () => {
  const editor = createMockEditor();
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);

  document.body.innerHTML =
    '<span class="instui-icon -icon-heart" data-pantoken-icon="simple-icons:heart">' +
    '<span class="instui-screen-reader-content">heart</span></span>';

  editor.fire("ExecCommand", {
    command: "mceInsertContent",
    value: '<span data-pantoken-icon="simple-icons:heart"></span>',
  });

  const dialogConfig = (editor.windowManager.open as any).mock.calls[0][0];
  const api = { getData: () => ({ label: "a heart" }), close: vi.fn() };
  dialogConfig.onSubmit(api);

  const node = document.querySelector("[data-pantoken-icon]");
  expect(node).toBeNull();
  expect(document.querySelector(".instui-screen-reader-content")?.textContent).toBe("a heart");
  expect(api.close).toHaveBeenCalled();
});

test("label dialog cancel still clears the transient marker", () => {
  const editor = createMockEditor();
  createIconsPlugin({ icons: mockIcons, currentAssets: [] })(editor);

  document.body.innerHTML =
    '<span class="instui-icon -icon-heart" data-pantoken-icon="simple-icons:heart"></span>';

  editor.fire("ExecCommand", {
    command: "mceInsertContent",
    value: '<span data-pantoken-icon="simple-icons:heart"></span>',
  });

  const dialogConfig = (editor.windowManager.open as any).mock.calls[0][0];
  dialogConfig.onCancel();

  expect(document.querySelector("[data-pantoken-icon]")).toBeNull();
});
