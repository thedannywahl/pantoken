/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import { createComponentsPlugin } from "../src/plugins/components.js";

// Mock editor object
function createMockEditor(): Editor {
  const mockHead = document.createElement("div");
  const mockDoc = {
    head: mockHead,
    createElement: (tag: string) => document.createElement(tag),
  };

  const mockWindowManager = {
    open: vi.fn().mockReturnValue({
      close: vi.fn(),
    }),
  };

  const mockUiRegistry = {
    addButton: vi.fn(),
    addMenuItem: vi.fn(),
  };

  return {
    windowManager: mockWindowManager,
    ui: { registry: mockUiRegistry },
    insertContent: vi.fn(),
    getDoc: vi.fn().mockReturnValue(mockDoc),
  } as unknown as Editor;
}

// Mock model data
const mockModel = [
  {
    name: "button",
    className: ".instui-button",
    kind: "component",
    description: "A clickable button",
    examples: ['<button class="instui-button">Click me</button>'],
    modifiers: [],
  },
  {
    name: "badge",
    className: ".instui-badge",
    kind: "utility",
    description: "A small badge",
    examples: ['<span class="instui-badge">New</span>'],
    modifiers: [],
  },
];

test("createComponentsPlugin registers toolbar button and menu item", () => {
  const editor = createMockEditor();
  const plugin = createComponentsPlugin({
    model: mockModel as any,
    currentAssets: [],
  });

  plugin(editor);

  expect(editor.ui.registry.addButton).toHaveBeenCalledWith(
    "pantokenComponents",
    expect.any(Object),
  );
  expect(editor.ui.registry.addMenuItem).toHaveBeenCalledWith(
    "pantokenComponents",
    expect.any(Object),
  );
});

test("toolbar button opens dialog when clicked", () => {
  const editor = createMockEditor();
  const plugin = createComponentsPlugin({
    model: mockModel as any,
    currentAssets: [],
  });

  plugin(editor);

  // Extract the onAction callback from the button registration.
  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  const buttonConfig = addButtonCall[1];

  expect(buttonConfig.onAction).toBeDefined();
  buttonConfig.onAction();

  expect(editor.windowManager.open).toHaveBeenCalled();
});

test("onMissingAsset callback is invoked when component is inserted", () => {
  const editor = createMockEditor();
  const currentAssets = [] as any[];
  const onMissingAsset = vi.fn();

  const plugin = createComponentsPlugin({
    model: mockModel as any,
    currentAssets,
    onMissingAsset,
  });

  plugin(editor);

  // Get button config and open dialog.
  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  const buttonConfig = addButtonCall[1];
  buttonConfig.onAction();

  // Get the dialog config and simulate onSubmit.
  const openCall = (editor.windowManager.open as any).mock.calls[0];
  const dialogConfig = openCall[0];

  // Simulate selecting button and submitting.
  const mockApi = {
    getData: vi.fn().mockReturnValue({ component: "button" }),
    close: vi.fn(),
  };

  dialogConfig.onSubmit(mockApi);

  // Verify the callback was called.
  expect(onMissingAsset).toHaveBeenCalledWith(
    expect.objectContaining({
      package: "@pantoken/components",
      path: "dist/button.css",
    }),
  );
});

test("component example is inserted into editor", () => {
  const editor = createMockEditor();
  const plugin = createComponentsPlugin({
    model: mockModel as any,
    currentAssets: [],
  });

  plugin(editor);

  // Open dialog via button.
  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  const buttonConfig = addButtonCall[1];
  buttonConfig.onAction();

  // Simulate submission.
  const openCall = (editor.windowManager.open as any).mock.calls[0];
  const dialogConfig = openCall[0];

  const mockApi = {
    getData: vi.fn().mockReturnValue({ component: "button" }),
    close: vi.fn(),
  };

  dialogConfig.onSubmit(mockApi);

  // Verify insertContent was called with the example HTML.
  expect(editor.insertContent).toHaveBeenCalledWith(
    '<button class="instui-button">Click me</button>',
  );
});
