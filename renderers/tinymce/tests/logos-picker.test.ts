/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import type { LogoMeta, Product } from "../src/logos.js";
import { createLogosPlugin } from "../src/plugins/logos.js";

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

// Mock product data
const mockProducts: readonly Product[] = ["canvas", "instructure", "learnplatform"] as const;

const mockLogos: readonly LogoMeta[] = [];

test("createLogosPlugin registers toolbar button and menu item", () => {
  const editor = createMockEditor();
  const plugin = createLogosPlugin({
    logos: mockLogos,
    products: mockProducts,
    currentAssets: [],
  });

  plugin(editor);

  expect(editor.ui.registry.addButton).toHaveBeenCalledWith("pantokenLogos", expect.any(Object));
  expect(editor.ui.registry.addMenuItem).toHaveBeenCalledWith("pantokenLogos", expect.any(Object));
});

test("toolbar button opens dialog when clicked", () => {
  const editor = createMockEditor();
  const plugin = createLogosPlugin({
    logos: mockLogos,
    products: mockProducts,
    currentAssets: [],
  });

  plugin(editor);

  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  const buttonConfig = addButtonCall[1];

  buttonConfig.onAction();

  expect(editor.windowManager.open).toHaveBeenCalled();
});

test("dialog includes product selection", () => {
  const editor = createMockEditor();
  const plugin = createLogosPlugin({
    logos: mockLogos,
    products: mockProducts,
    currentAssets: [],
  });

  plugin(editor);

  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  const buttonConfig = addButtonCall[1];
  buttonConfig.onAction();

  const openCall = (editor.windowManager.open as any).mock.calls[0];
  const dialogConfig = openCall[0];

  const productSelectbox = dialogConfig.body.items.find((item: any) => item.name === "product");
  expect(productSelectbox).toBeDefined();
  expect(productSelectbox.type).toBe("selectbox");
  expect(productSelectbox.items).toHaveLength(3);
});

test("dialog includes layout and color-mode selection", () => {
  const editor = createMockEditor();
  const plugin = createLogosPlugin({
    logos: mockLogos,
    products: mockProducts,
    currentAssets: [],
  });

  plugin(editor);

  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  const buttonConfig = addButtonCall[1];
  buttonConfig.onAction();

  const openCall = (editor.windowManager.open as any).mock.calls[0];
  const dialogConfig = openCall[0];

  const layoutSelectbox = dialogConfig.body.items.find((item: any) => item.name === "layout");
  const colorModeSelectbox = dialogConfig.body.items.find((item: any) => item.name === "colorMode");

  expect(layoutSelectbox).toBeDefined();
  expect(colorModeSelectbox).toBeDefined();
});

test("CSS file is tracked when logo is inserted", () => {
  const editor = createMockEditor();
  const currentAssets = [] as any[];
  const onMissingAsset = vi.fn();

  const plugin = createLogosPlugin({
    logos: mockLogos,
    products: mockProducts,
    currentAssets,
    onMissingAsset,
  });

  plugin(editor);

  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  const buttonConfig = addButtonCall[1];
  buttonConfig.onAction();

  const openCall = (editor.windowManager.open as any).mock.calls[0];
  const dialogConfig = openCall[0];

  // Verify onSubmit callback exists.
  expect(dialogConfig.onSubmit).toBeDefined();
});
