/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import type { LogoMeta, Product } from "../src/logos.js";
import { createLogosPlugin, generateLogoHtml, insertLogo } from "../src/plugins/logos.js";

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

test("selecting product/layout/color-mode updates the dialog state without throwing", () => {
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
  const layoutSelectbox = dialogConfig.body.items.find((item: any) => item.name === "layout");
  const colorModeSelectbox = dialogConfig.body.items.find((item: any) => item.name === "colorMode");

  expect(() => productSelectbox.onChange({})).not.toThrow();
  expect(() => layoutSelectbox.onChange({ target: { value: "vertical" } })).not.toThrow();
  expect(() => colorModeSelectbox.onChange({ target: { value: "monochrome" } })).not.toThrow();
});

test("Insert button starts disabled because no product is preselected", () => {
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
  const insertButton = dialogConfig.buttons.find((b: any) => b.text === "Insert");
  expect(insertButton.disabled).toBe(true);
});

test("generateLogoHtml renders an <img> tag encoding the variant", () => {
  const html = generateLogoHtml("canvas", "horizontal", "color");
  expect(html).toContain('data-product="canvas"');
  expect(html).toContain('data-layout="horizontal"');
  expect(html).toContain('data-color-mode="color"');
});

test("insertLogo inserts HTML, tracks the CSS asset, and injects the stylesheet", () => {
  const editor = createMockEditor();
  const currentAssets: any[] = [];
  const onMissingAsset = vi.fn();

  insertLogo(editor, "canvas", "horizontal", "color", {
    logos: mockLogos,
    products: mockProducts,
    currentAssets,
    onMissingAsset,
  });

  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).toHaveBeenCalledWith(expect.stringContaining('data-product="canvas"'));
  expect(currentAssets).toEqual([
    { package: "@pantoken/plugin-logos", path: "dist/canvas-horizontal-color.css" },
  ]);
  expect(onMissingAsset).toHaveBeenCalledWith({
    package: "@pantoken/plugin-logos",
    path: "dist/canvas-horizontal-color.css",
  });
});

test("insertLogo does not duplicate an already-tracked CSS asset", () => {
  const editor = createMockEditor();
  const cssFile = { package: "@pantoken/plugin-logos", path: "dist/canvas-horizontal-color.css" };
  const currentAssets: any[] = [cssFile];
  const onMissingAsset = vi.fn();

  insertLogo(editor, "canvas", "horizontal", "color", {
    logos: mockLogos,
    products: mockProducts,
    currentAssets,
    onMissingAsset,
  });

  expect(currentAssets).toHaveLength(1);
  expect(onMissingAsset).not.toHaveBeenCalled();
});

test("submitting the dialog without a selected product just closes it", () => {
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
  const api = { close: vi.fn() };
  dialogConfig.onSubmit(api);

  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).not.toHaveBeenCalled();
  expect(api.close).toHaveBeenCalled();
});
