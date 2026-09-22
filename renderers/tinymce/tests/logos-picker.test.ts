/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import type { LogoMeta, Product } from "../src/logos.js";
import { createLogosPlugin, generateLogoHtml, insertLogo } from "../src/plugins/logos.js";

vi.mock("@pantoken/cdn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@pantoken/cdn")>()),
  buildFileUrl: (file: { package: string; path?: string }) =>
    `https://cdn.example/${file.package}/${file.path}`,
}));

vi.mock("../src/logos.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../src/logos.js")>()),
  getLogoMeta: (product: string, layout: string, colorMode: string) =>
    product === "canvas" && layout === "horizontal" && colorMode === "color"
      ? {
          product: "canvas",
          layout: "horizontal",
          colorMode: "color",
          name: "canvas-horizontal-color",
          path: "canvas/horizontal-color.svg",
          width: 478,
          height: 121,
        }
      : undefined,
}));

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

test("dialog includes layout and color-mode selection with only real enum values", () => {
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
  // Regression guard: these dropdowns used to offer "vertical"/"monochrome", values that don't
  // exist in any real logo asset (see plugins/pantoken/logos' LogoLayout/LogoColorMode unions).
  expect(layoutSelectbox.items.map((i: any) => i.value)).toEqual(["horizontal", "stacked"]);
  expect(colorModeSelectbox.items.map((i: any) => i.value)).toEqual(["color", "light"]);
});

test("dialog initializes to the first product and default variant", () => {
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

  expect(dialogConfig.initialData).toEqual({
    product: "canvas",
    layout: "horizontal",
    colorMode: "color",
  });
});

test("Insert button starts enabled when a product is available", () => {
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
  expect(insertButton.enabled).toBe(true);
});

test("Insert button starts disabled when no product is available", () => {
  const editor = createMockEditor();
  const plugin = createLogosPlugin({
    logos: mockLogos,
    products: [],
    currentAssets: [],
  });

  plugin(editor);

  const addButtonCall = (editor.ui.registry.addButton as any).mock.calls[0];
  const buttonConfig = addButtonCall[1];
  buttonConfig.onAction();

  const openCall = (editor.windowManager.open as any).mock.calls[0];
  const dialogConfig = openCall[0];
  const insertButton = dialogConfig.buttons.find((b: any) => b.text === "Insert");
  expect(insertButton.enabled).toBe(false);
});

test("generateLogoHtml renders a hosted <img> sized from the logo's metadata", () => {
  const meta: LogoMeta = {
    product: "canvas",
    layout: "horizontal",
    colorMode: "color",
    name: "canvas-horizontal-color",
    path: "canvas/horizontal-color.svg",
    width: 478,
    height: 121,
  };
  const html = generateLogoHtml(meta, "https://cdn.example/canvas-horizontal-color.png");
  expect(html).toContain('class="instui-img"');
  expect(html).toContain('src="https://cdn.example/canvas-horizontal-color.png"');
  expect(html).toContain('width="478"');
  expect(html).toContain('height="121"');
  expect(html).toContain("alt=");
  expect(html).not.toContain("<svg");
  expect(html).not.toContain("about:blank");
});

test("insertLogo inserts a real hosted <img>, not a CSS-class placeholder", () => {
  const editor = createMockEditor();

  insertLogo(editor, "canvas", "horizontal", "color");

  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).toHaveBeenCalledWith(
    expect.stringContaining(
      'src="https://cdn.example/@pantoken/plugin-logos/dist/canvas-horizontal-color.png"',
    ),
  );
  expect(insertContent).toHaveBeenCalledWith(expect.stringContaining('width="478"'));
  expect(insertContent).toHaveBeenCalledWith(expect.stringContaining('height="121"'));
});

test("insertLogo writes into the CodeMirror doc while the source view is active", () => {
  const editor = createMockEditor();
  const insertAtCursor = vi.fn();
  (editor as unknown as Record<string, unknown>).plugins = {
    pantoken_source_toggle: { isSourceMode: () => true, insertAtCursor },
  };

  insertLogo(editor, "canvas", "horizontal", "color");

  expect(insertAtCursor).toHaveBeenCalledWith(expect.stringContaining('width="478"'));
  const insertContent = (editor as unknown as Record<string, unknown>).insertContent;
  expect(insertContent).not.toHaveBeenCalled();
});

test("insertLogo no-ops when the product/layout/colorMode combination has no matching logo", () => {
  const editor = createMockEditor();

  insertLogo(editor, "canvas", "stacked", "light");

  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).not.toHaveBeenCalled();
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
  const api = {
    close: vi.fn(),
    getData: vi.fn().mockReturnValue({ product: "", layout: "horizontal", colorMode: "color" }),
  };
  dialogConfig.onSubmit(api);

  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).not.toHaveBeenCalled();
  expect(api.close).toHaveBeenCalled();
});

test("submitting the dialog inserts the selected logo variant", () => {
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
  const api = {
    close: vi.fn(),
    getData: vi.fn().mockReturnValue({
      product: "canvas",
      layout: "horizontal",
      colorMode: "color",
    }),
  };
  dialogConfig.onSubmit(api);

  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).toHaveBeenCalledWith(
    expect.stringContaining(
      'src="https://cdn.example/@pantoken/plugin-logos/dist/canvas-horizontal-color.png"',
    ),
  );
  expect(api.close).toHaveBeenCalled();
});
