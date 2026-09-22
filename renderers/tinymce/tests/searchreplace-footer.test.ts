/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import {
  createSearchReplaceFooterPlugin,
  SEARCHREPLACE_FOOTER_PLUGIN_NAME,
  SEARCHREPLACE_FOOTER_STATUSBAR_NAME,
} from "../src/plugins/searchreplace-footer.js";

function fakeEditor() {
  const container = document.createElement("div");
  const statusbar = document.createElement("div");
  const statusbarText = document.createElement("div");
  statusbarText.className = "tox-statusbar__text-container";
  statusbar.append(statusbarText);
  container.append(statusbar);
  const listeners = new Map<string, Array<(event?: unknown) => void>>();
  return {
    execCommand: vi.fn(),
    getContainer: vi.fn(() => container),
    on: vi.fn((name: string, callback: (event?: unknown) => void) => {
      listeners.set(name, [...(listeners.get(name) ?? []), callback]);
    }),
    off: vi.fn(),
    listeners,
  };
}

test("exposes stable plugin/control names", () => {
  expect(SEARCHREPLACE_FOOTER_PLUGIN_NAME).toBe("pantoken_searchreplace_footer");
  expect(SEARCHREPLACE_FOOTER_STATUSBAR_NAME).toBe("pantokenSearchReplaceStatus");
});

test("attaches a footer button that opens the search & replace dialog", () => {
  const editor = fakeEditor();
  createSearchReplaceFooterPlugin()(editor as never);

  for (const handler of editor.listeners.get("PostRender") ?? []) handler();
  const button = editor
    .getContainer()
    .querySelector<HTMLButtonElement>(`#${SEARCHREPLACE_FOOTER_STATUSBAR_NAME}`);
  expect(button).not.toBeNull();

  button?.click();
  expect(editor.execCommand).toHaveBeenCalledWith("SearchReplace");

  for (const handler of editor.listeners.get("remove") ?? []) handler();
  expect(button?.isConnected).toBe(false);
});
