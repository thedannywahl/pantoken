/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import {
  createVisualBlocksFooterPlugin,
  VISUALBLOCKS_FOOTER_PLUGIN_NAME,
  VISUALBLOCKS_FOOTER_STATUSBAR_NAME,
} from "../src/plugins/visualblocks-footer.js";

function fakeEditor() {
  const container = document.createElement("div");
  const statusbar = document.createElement("div");
  const statusbarText = document.createElement("div");
  statusbarText.className = "tox-statusbar__text-container";
  statusbar.append(statusbarText);
  container.append(statusbar);
  const doc = document.implementation.createHTMLDocument();
  const listeners = new Map<string, Array<(event?: unknown) => void>>();
  return {
    execCommand: vi.fn(),
    getContainer: vi.fn(() => container),
    getDoc: vi.fn(() => doc),
    on: vi.fn((name: string, callback: (event?: unknown) => void) => {
      listeners.set(name, [...(listeners.get(name) ?? []), callback]);
    }),
    off: vi.fn(),
    listeners,
  };
}

test("exposes stable plugin/control names", () => {
  expect(VISUALBLOCKS_FOOTER_PLUGIN_NAME).toBe("pantoken_visualblocks_footer");
  expect(VISUALBLOCKS_FOOTER_STATUSBAR_NAME).toBe("pantokenVisualBlocksStatus");
});

test("attaches a footer button that toggles visual blocks and reflects its state", () => {
  const editor = fakeEditor();
  createVisualBlocksFooterPlugin()(editor as never);

  for (const handler of editor.listeners.get("PostRender") ?? []) handler();
  const button = editor
    .getContainer()
    .querySelector<HTMLButtonElement>(`#${VISUALBLOCKS_FOOTER_STATUSBAR_NAME}`);
  expect(button).not.toBeNull();
  expect(button?.getAttribute("aria-pressed")).toBe("false");

  button?.click();
  expect(editor.execCommand).toHaveBeenCalledWith("mceVisualBlocks");

  for (const handler of editor.listeners.get("VisualBlocks") ?? []) handler({ state: true });
  expect(button?.getAttribute("aria-pressed")).toBe("true");

  for (const handler of editor.listeners.get("remove") ?? []) handler();
  expect(button?.isConnected).toBe(false);
});

test("injects the outline stylesheet into the content document on init", () => {
  const editor = fakeEditor();
  createVisualBlocksFooterPlugin()(editor as never);

  for (const handler of editor.listeners.get("init") ?? []) handler();
  expect(editor.getDoc().getElementById("pantokenVisualBlocksStyle")).not.toBeNull();

  // Re-firing init must not duplicate the stylesheet.
  for (const handler of editor.listeners.get("init") ?? []) handler();
  expect(editor.getDoc().querySelectorAll("#pantokenVisualBlocksStyle")).toHaveLength(1);
});
