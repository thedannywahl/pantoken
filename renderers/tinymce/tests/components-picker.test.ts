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
    addContextToolbar: vi.fn(),
    addMenuButton: vi.fn(),
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
  expect(editor.ui.registry.addContextToolbar).toHaveBeenCalledWith(
    "pantokenComponentModifiersContext",
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

test("picker lists eligible components and custom components without a search field", () => {
  const editor = createMockEditor();
  const plugin = createComponentsPlugin({
    model: [
      ...mockModel,
      {
        name: "agent-shell",
        className: ".instui-agent-shell",
        kind: "custom-component",
        examples: [],
      },
      {
        name: "date-input",
        className: ".instui-date-input",
        kind: "component",
        examples: [],
      },
      {
        name: "text-input",
        className: ".instui-text-input",
        kind: "component",
        examples: [],
      },
      {
        name: "icon-button",
        className: ".instui-icon-button",
        kind: "component",
        examples: [],
      },
      {
        name: "future-panel",
        className: ".instui-future-panel",
        kind: "component",
        examples: [],
      },
      {
        name: "editor-card",
        className: ".instui-editor-card",
        kind: "custom-component",
        examples: [],
      },
      {
        name: "spacing",
        className: ".instui-spacing",
        kind: "utility",
        examples: [],
      },
    ] as any,
    currentAssets: [],
  });

  plugin(editor);
  (editor.ui.registry.addButton as any).mock.calls[0][1].onAction();

  const dialogConfig = (editor.windowManager.open as any).mock.calls[0][0];
  const items = dialogConfig.body.items;

  expect(items).toHaveLength(1);
  expect(items[0].name).toBe("component");
  expect(items[0].items.map((item: { value: string }) => item.value)).toEqual([
    "button",
    "editor-card",
    "future-panel",
    "icon-button",
  ]);
  expect(items[0].items.map((item: { text: string }) => item.text)).toEqual([
    "button",
    "editor-card",
    "future-panel",
    "icon-button",
  ]);
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
  const insertContent = (editor as unknown as Record<string, unknown>).insertContent;
  expect(insertContent).toHaveBeenCalledWith('<button class="instui-button">Click me</button>');
});

test("component example is written into the CodeMirror doc while the source view is active", () => {
  const editor = createMockEditor();
  const insertAtCursor = vi.fn();
  (editor as unknown as Record<string, unknown>).plugins = {
    pantoken_source_toggle: { isSourceMode: () => true, insertAtCursor },
  };
  const plugin = createComponentsPlugin({
    model: mockModel as any,
    currentAssets: [],
  });

  plugin(editor);
  (editor.ui.registry.addButton as any).mock.calls[0][1].onAction();
  const dialogConfig = (editor.windowManager.open as any).mock.calls[0][0];
  dialogConfig.onSubmit({
    getData: vi.fn().mockReturnValue({ component: "button" }),
    close: vi.fn(),
  });

  expect(insertAtCursor).toHaveBeenCalledWith('<button class="instui-button">Click me</button>');
  const insertContent = (editor as unknown as Record<string, unknown>).insertContent;
  expect(insertContent).not.toHaveBeenCalled();
});

test("component example inserts only the HTML from a fenced example", () => {
  const editor = createMockEditor();
  const plugin = createComponentsPlugin({
    model: [
      {
        name: "editor-card",
        className: ".instui-editor-card",
        kind: "custom-component",
        description: "A surface container for editor content.",
        examples: [
          '-nocard ```html\n<div class="instui-editor-card --p-md">\n  <p>Content here.</p>\n</div>\n```',
        ],
        modifiers: [],
      },
    ] as any,
    currentAssets: [],
  });

  plugin(editor);
  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  addButtonCall[1].onAction();

  const openCall = (editor.windowManager.open as any).mock.calls[0];
  openCall[0].onSubmit({
    getData: vi.fn().mockReturnValue({ component: "editor-card" }),
    close: vi.fn(),
  });

  const insertContent = (editor as unknown as Record<string, unknown>).insertContent;
  expect(insertContent).toHaveBeenCalledWith(
    '<div class="instui-editor-card --p-md">\n  <p>Content here.</p>\n</div>',
  );
});
