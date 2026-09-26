/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import {
  createFullscreenFooterPlugin,
  FULLSCREEN_FOOTER_PLUGIN_NAME,
  FULLSCREEN_FOOTER_STATUSBAR_NAME,
} from "../src/plugins/fullscreen-footer.js";

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
  expect(FULLSCREEN_FOOTER_PLUGIN_NAME).toBe("pantoken_fullscreen_footer");
  expect(FULLSCREEN_FOOTER_STATUSBAR_NAME).toBe("pantokenFullscreenStatus");
});

test("attaches a footer button that toggles fullscreen and reflects its state", () => {
  const editor = fakeEditor();
  createFullscreenFooterPlugin()(editor as never);

  for (const handler of editor.listeners.get("PostRender") ?? []) handler();
  const button = editor
    .getContainer()
    .querySelector<HTMLButtonElement>(`#${FULLSCREEN_FOOTER_STATUSBAR_NAME}`);
  expect(button).not.toBeNull();
  expect(button?.getAttribute("aria-pressed")).toBe("false");

  button?.click();
  expect(editor.execCommand).toHaveBeenCalledWith("mceFullScreen");

  for (const handler of editor.listeners.get("FullscreenStateChanged") ?? [])
    handler({ state: true });
  expect(button?.getAttribute("aria-pressed")).toBe("true");

  for (const handler of editor.listeners.get("remove") ?? []) handler();
  expect(button?.isConnected).toBe(false);
});

test("uses the editor's translated fullscreen label", () => {
  const editor = { ...fakeEditor(), translate: () => "Teljes képernyő" };
  createFullscreenFooterPlugin()(editor as never);
  for (const handler of editor.listeners.get("PostRender") ?? []) handler();
  expect(
    editor
      .getContainer()
      .querySelector(`#${FULLSCREEN_FOOTER_STATUSBAR_NAME}`)
      ?.getAttribute("title"),
  ).toBe("Teljes képernyő");
});
