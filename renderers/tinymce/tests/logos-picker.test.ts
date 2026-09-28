/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import type { LogoMeta, Product } from "../src/logos.js";
import { buildLogoMarkup, filterLogos, getLogoCdnFile, logoVariantLabel } from "../src/logos.js";
import { createLogosPlugin, insertLogo } from "../src/plugins/logos.js";

// A data: URL so happy-dom never fetches the injected stylesheet links over the network.
vi.mock("@pantoken/cdn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@pantoken/cdn")>()),
  buildFileUrl: (file: { package: string; path?: string }) =>
    `data:text/css,/*${file.package}/${file.path}*/`,
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

// Mock editor object backed by the real happy-dom document, so the dialog shell can be mounted.
function createMockEditor(): Editor {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  const container = document.createElement("div");
  document.body.append(container);
  const contentDoc = document.implementation.createHTMLDocument("");
  const commands = new Map<string, () => void>();

  const mockWindowManager = {
    open: vi.fn().mockReturnValue({
      close: vi.fn(),
      setEnabled: vi.fn(),
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
    on: vi.fn(),
    addCommand: vi.fn((name: string, handler: () => void) => commands.set(name, handler)),
    execCommand: vi.fn((name: string) => commands.get(name)?.()),
    getContainer: () => container,
    getDoc: vi.fn().mockReturnValue(contentDoc),
  } as unknown as Editor;
}

const canvasHorizontal: LogoMeta = {
  product: "canvas",
  layout: "horizontal",
  colorMode: "color",
  name: "canvas-horizontal-color",
  path: "canvas/horizontal-color.svg",
  width: 478,
  height: 121,
};
const masteryIcon: LogoMeta = {
  product: "mastery",
  layout: "icon",
  colorMode: "dark",
  name: "mastery-icon-dark",
  path: "mastery/icon-dark.svg",
  width: 24,
  height: 24,
};

// Mock product data
const mockProducts: readonly Product[] = ["canvas", "instructure", "mastery"] as const;

const mockLogos: readonly LogoMeta[] = [canvasHorizontal, masteryIcon];

/** Open the dialog through the toolbar button and return its spec plus the mounted picker root. */
function openPicker(editor: Editor) {
  const open = editor.windowManager.open as unknown as ReturnType<typeof vi.fn>;
  const button = (editor.ui.registry.addButton as any).mock.calls[0][1];
  button.onAction();
  const spec = open.mock.calls[0][0];
  document.body.insertAdjacentHTML("beforeend", spec.body.items[0].html);
  // The plugin looks the shell up by id after `open` returns, so re-open now that it exists.
  open.mockClear();
  button.onAction();
  return {
    spec: open.mock.calls[0][0],
    dialog: open.mock.results[0].value as {
      close: ReturnType<typeof vi.fn>;
      setEnabled: ReturnType<typeof vi.fn>;
    },
    root: document.getElementById("pantoken-logo-picker")!,
  };
}

const tiles = (root: HTMLElement): HTMLButtonElement[] =>
  Array.from(root.querySelectorAll(".pantoken-ip__tile"));

const inserted = (editor: Editor) =>
  (editor as unknown as { insertContent: ReturnType<typeof vi.fn> }).insertContent;

test("escapes localized logo alt text before inserting it into an HTML attribute", () => {
  const markup = buildLogoMarkup({ product: "canvas", name: "canvas" } as LogoMeta, '<"&>');
  expect(markup).toContain('aria-label="Canvas &lt;&quot;&amp;&gt;"');
});

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

test("the dialog body is the tile picker shell, with Insert disabled until a tile is selected", () => {
  const editor = createMockEditor();
  createLogosPlugin({ logos: mockLogos, products: mockProducts, currentAssets: [] })(editor);
  const { spec } = openPicker(editor);

  expect(spec.body.items[0]).toMatchObject({ type: "htmlpanel" });
  expect(spec.body.items[0].html).toBe(
    '<div id="pantoken-logo-picker" class="pantoken-ip pantoken-lp"></div>',
  );
  expect(spec.buttons.find((b: any) => b.name === "insert").enabled).toBe(false);
});

test("tabs list All plus each product that has a logo, in the given order", () => {
  const editor = createMockEditor();
  createLogosPlugin({ logos: mockLogos, products: mockProducts, currentAssets: [] })(editor);
  const { root } = openPicker(editor);

  const tabs = [...root.querySelectorAll<HTMLButtonElement>(".pantoken-ip__tab")];
  expect(tabs.map((tab) => tab.textContent)).toEqual(["All", "Canvas", "Mastery"]);
  expect(tiles(root)).toHaveLength(2);

  tabs[2]!.click();
  expect(tiles(root).map((tile) => tile.getAttribute("aria-label"))).toEqual([
    "Mastery — icon · dark",
  ]);
});

test("tiles preview the mask-painted glyph with a variant caption", () => {
  const editor = createMockEditor();
  createLogosPlugin({ logos: mockLogos, products: mockProducts, currentAssets: [] })(editor);
  const { root } = openPicker(editor);

  const tile = tiles(root)[0]!;
  expect(tile.querySelector(".instui-logo.-logo-canvas-horizontal-color")).not.toBeNull();
  expect(tile.querySelector(".pantoken-lp__caption")!.textContent).toBe("horizontal · color");
  expect(
    document.head.querySelector('link[data-pantoken-icon-picker="@pantoken/plugin-logos"]'),
  ).not.toBeNull();
});

test("selecting a tile enables Insert, and submitting inserts that variant", () => {
  const editor = createMockEditor();
  const currentAssets: { package: string; path: string }[] = [];
  createLogosPlugin({ logos: mockLogos, products: mockProducts, currentAssets })(editor);
  const { spec, dialog, root } = openPicker(editor);

  tiles(root)[1]!.click();
  expect(dialog.setEnabled).toHaveBeenLastCalledWith("insert", true);

  const api = { close: vi.fn() };
  spec.onSubmit(api);
  expect(inserted(editor)).toHaveBeenCalledWith(
    expect.stringContaining('class="instui-logo -logo-mastery-icon-dark"'),
  );
  expect(currentAssets).toEqual([
    { package: "@pantoken/plugin-logos", path: "dist/mastery-icon-dark.css" },
  ]);
  expect(api.close).toHaveBeenCalled();
});

test("double-clicking a tile inserts it and closes the dialog", () => {
  const editor = createMockEditor();
  createLogosPlugin({ logos: mockLogos, products: mockProducts, currentAssets: [] })(editor);
  const { dialog, root } = openPicker(editor);

  tiles(root)[0]!.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
  expect(inserted(editor)).toHaveBeenCalledWith(
    expect.stringContaining('class="instui-logo -logo-canvas-horizontal-color"'),
  );
  expect(dialog.close).toHaveBeenCalled();
});

test("submitting without a selection just closes the dialog", () => {
  const editor = createMockEditor();
  createLogosPlugin({ logos: mockLogos, products: mockProducts, currentAssets: [] })(editor);
  const { spec } = openPicker(editor);

  const api = { close: vi.fn() };
  spec.onSubmit(api);
  expect(inserted(editor)).not.toHaveBeenCalled();
  expect(api.close).toHaveBeenCalled();
});

test("buildLogoMarkup renders a mask-painted, non-decorative glyph", () => {
  const meta: LogoMeta = {
    product: "canvas",
    layout: "horizontal",
    colorMode: "color",
    name: "canvas-horizontal-color",
    path: "canvas/horizontal-color.svg",
    width: 478,
    height: 121,
  };
  const html = buildLogoMarkup(meta);
  expect(html).toBe(
    '<span class="instui-logo -logo-canvas-horizontal-color" contenteditable="false" role="img" aria-label="Canvas logo">\u200B</span>',
  );
  expect(html).not.toContain("<svg");
  expect(html).not.toContain("about:blank");
  expect(html).not.toContain("aria-hidden");
});

test("getLogoCdnFile resolves the logo's mask-painter stylesheet", () => {
  const meta: LogoMeta = {
    product: "canvas",
    layout: "horizontal",
    colorMode: "color",
    name: "canvas-horizontal-color",
    path: "canvas/horizontal-color.svg",
    width: 478,
    height: 121,
  };
  expect(getLogoCdnFile(meta)).toEqual({
    package: "@pantoken/plugin-logos",
    path: "dist/canvas-horizontal-color.css",
  });
});

test("insertLogo inserts a mask-painted glyph and tracks/injects its stylesheet", () => {
  const editor = createMockEditor();
  const currentAssets: { package: string; path: string }[] = [];

  insertLogo(editor, "canvas", "horizontal", "color", { currentAssets });

  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).toHaveBeenCalledWith(
    expect.stringContaining('class="instui-logo -logo-canvas-horizontal-color"'),
  );
  expect(currentAssets).toEqual([
    { package: "@pantoken/plugin-logos", path: "dist/canvas-horizontal-color.css" },
  ]);
});

test("insertLogo delegates the logo package export to the caller's asset URL builder", () => {
  const editor = createMockEditor();
  const buildAssetUrl = vi.fn(() => "data:text/css,/*local canvas-horizontal-color*/");

  insertLogo(editor, "canvas", "horizontal", "color", { currentAssets: [], buildAssetUrl });

  expect(buildAssetUrl).toHaveBeenCalledWith({
    package: "@pantoken/plugin-logos",
    path: "dist/canvas-horizontal-color.css",
  });
  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).toHaveBeenCalledWith(
    expect.stringContaining('class="instui-logo -logo-canvas-horizontal-color"'),
  );
});

test("insertLogo writes into the CodeMirror doc while the source view is active", () => {
  const editor = createMockEditor();
  const insertAtCursor = vi.fn();
  (editor as unknown as Record<string, unknown>).plugins = {
    pantoken_source_toggle: { isSourceMode: () => true, insertAtCursor },
  };

  insertLogo(editor, "canvas", "horizontal", "color", { currentAssets: [] });

  expect(insertAtCursor).toHaveBeenCalledWith(
    expect.stringContaining('class="instui-logo -logo-canvas-horizontal-color"'),
  );
  const insertContent = (editor as unknown as Record<string, unknown>).insertContent;
  expect(insertContent).not.toHaveBeenCalled();
});

test("insertLogo no-ops when the product/layout/colorMode combination has no matching logo", () => {
  const editor = createMockEditor();

  insertLogo(editor, "canvas", "stacked", "light", { currentAssets: [] });

  const insertContent = (editor as unknown as { insertContent: (html: string) => void })
    .insertContent;
  expect(insertContent).not.toHaveBeenCalled();
});

test("filterLogos matches product labels and variant words, optionally within one product", () => {
  expect(filterLogos(mockLogos, "canvas").map((logo) => logo.name)).toEqual([
    "canvas-horizontal-color",
  ]);
  expect(filterLogos(mockLogos, "dark").map((logo) => logo.name)).toEqual(["mastery-icon-dark"]);
  expect(filterLogos(mockLogos, "", "mastery")).toEqual([masteryIcon]);
  expect(filterLogos(mockLogos, "horizontal", "mastery")).toEqual([]);
});

test("logoVariantLabel joins layout, color mode, and language", () => {
  expect(logoVariantLabel({ ...canvasHorizontal, colorMode: "full-color", lang: "ar" })).toBe(
    "horizontal · full color · ar",
  );
});
