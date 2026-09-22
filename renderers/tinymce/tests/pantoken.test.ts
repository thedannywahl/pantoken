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
  expect(registry.addButton).not.toHaveBeenCalled();
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
  registry.addMenuButton.mock.calls[0]?.[1].fetch(success);
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
