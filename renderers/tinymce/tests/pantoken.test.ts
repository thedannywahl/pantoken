/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import {
  createPantokenPlugin,
  PANTOKEN_PLUGIN_NAME,
  PANTOKEN_TOOLBAR_NAME,
} from "../src/plugins/pantoken.js";

// Avoid happy-dom actually fetching the icons plugin's injected top-level bundle <link>s.
vi.mock("@pantoken/cdn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@pantoken/cdn")>()),
  buildFileUrl: (file: { package: string; path?: string }) => `data:text/css,/*${file.package}*/`,
}));

test("composes all content plugins behind one pantoken menu button", () => {
  const commands = new Map<string, () => void>();
  const registry = {
    addButton: vi.fn(),
    addMenuItem: vi.fn(),
    addIcon: vi.fn(),
    addMenuButton: vi.fn(),
    addAutocompleter: vi.fn(),
    addContextToolbar: vi.fn(),
  };
  const editor = {
    editorManager: { Resource: { add: vi.fn() } },
    on: vi.fn(),
    dom: { select: () => [] },
    addCommand: vi.fn((name: string, action: () => void) => commands.set(name, action)),
    execCommand: vi.fn((name: string) => commands.get(name)?.()),
    ui: { registry },
    getContainer: () => document.createElement("div"),
    windowManager: { open: vi.fn(), confirm: vi.fn() },
  };
  const plugin = createPantokenPlugin({
    components: { model: [], currentAssets: [] },
    icons: { icons: [], currentAssets: [] },
    logos: { logos: [], products: [], currentAssets: [] },
  });

  plugin(editor as never);

  expect(PANTOKEN_PLUGIN_NAME).toBe("pantoken");
  // The icons plugin's own context toolbar (color/delete buttons) registers regardless of
  // `registerUi: false` — only each sub-plugin's own insert-toolbar button must stay suppressed.
  expect(registry.addButton).not.toHaveBeenCalledWith("pantokenComponents", expect.anything());
  expect(registry.addButton).not.toHaveBeenCalledWith("pantokenIcons", expect.anything());
  expect(registry.addButton).not.toHaveBeenCalledWith("pantokenLogos", expect.anything());
  expect(registry.addMenuItem).not.toHaveBeenCalled();
  expect(registry.addIcon).toHaveBeenCalledWith(
    PANTOKEN_TOOLBAR_NAME,
    expect.stringContaining('viewBox="0 0 24 24"><svg x="4" y="4" width="16" height="16"'),
  );
  expect(registry.addMenuButton).toHaveBeenCalledWith(
    PANTOKEN_TOOLBAR_NAME,
    expect.objectContaining({ icon: PANTOKEN_TOOLBAR_NAME }),
  );

  const success = vi.fn();
  // The icons plugin's own context-toolbar size menu also calls `addMenuButton` — find the
  // pantoken meta menu button by name rather than assuming call order.
  const pantokenMenuButtonCall = registry.addMenuButton.mock.calls.find(
    (call) => call[0] === PANTOKEN_TOOLBAR_NAME,
  );
  pantokenMenuButtonCall?.[1].fetch(success);
  const items = success.mock.calls[0]?.[0];
  expect(items.map((item: { text: string }) => item.text)).toEqual([
    "Components",
    "Icons",
    "Logos",
    "Layouts",
  ]);

  for (const item of items) item.onAction();
  expect(editor.execCommand).toHaveBeenCalledTimes(4);
  expect(editor.execCommand).toHaveBeenCalledWith("pantokenOpenIcons");
  expect(editor.windowManager.open).toHaveBeenCalledTimes(4);
});

test("pantoken menu uses per-editor translations with English fallback", () => {
  const registry = {
    addIcon: vi.fn(),
    addMenuButton: vi.fn(),
    addButton: vi.fn(),
    addAutocompleter: vi.fn(),
    addContextToolbar: vi.fn(),
  };
  const editor = {
    editorManager: { Resource: { add: vi.fn() } },
    on: vi.fn(),
    dom: { select: () => [] },
    addCommand: vi.fn(),
    ui: { registry },
    getContainer: () => document.createElement("div"),
  };
  createPantokenPlugin({
    strings: { componentsToolbarText: "Komponensek" },
    components: { model: [], currentAssets: [] },
    icons: { icons: [], currentAssets: [] },
    logos: { logos: [], products: [], currentAssets: [] },
  })(editor as never);
  const success = vi.fn();
  registry.addMenuButton.mock.calls
    .find(([name]) => name === PANTOKEN_TOOLBAR_NAME)?.[1]
    .fetch(success);
  expect(success.mock.calls[0]?.[0].map(({ text }: { text: string }) => text)).toEqual([
    "Komponensek",
    "Icons",
    "Logos",
    "Layouts",
  ]);
});
