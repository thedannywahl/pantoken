/**
 * @vitest-environment happy-dom
 */
import { expect, test, vi } from "vite-plus/test";
import {
  createSupSubPlugin,
  SUP_SUB_PLUGIN_NAME,
  SUP_SUB_TOOLBAR_NAME,
} from "../src/plugins/sup-sub.js";

function fakeEditor() {
  return {
    queryCommandState: vi.fn(() => false),
    execCommand: vi.fn(),
    ui: { registry: { addIcon: vi.fn(), addMenuButton: vi.fn() } },
  };
}

test("exposes stable plugin/toolbar names", () => {
  expect(SUP_SUB_PLUGIN_NAME).toBe("pantoken_sup_sub");
  expect(SUP_SUB_TOOLBAR_NAME).toBe("pantokenSupSub");
});

test("registers a menu button offering superscript and subscript toggles", () => {
  const editor = fakeEditor();
  createSupSubPlugin()(editor as never);

  expect(editor.ui.registry.addMenuButton).toHaveBeenCalledWith(
    SUP_SUB_TOOLBAR_NAME,
    expect.objectContaining({ icon: SUP_SUB_TOOLBAR_NAME }),
  );

  const { fetch } = editor.ui.registry.addMenuButton.mock.calls[0]![1];
  const success = vi.fn();
  fetch(success);

  const items = success.mock.calls[0]![0];
  expect(items).toHaveLength(2);
  expect(items[0]).toMatchObject({ type: "togglemenuitem", text: "Superscript" });
  expect(items[1]).toMatchObject({ type: "togglemenuitem", text: "Subscript" });

  items[0].onAction();
  expect(editor.execCommand).toHaveBeenCalledWith("Superscript");
  items[1].onAction();
  expect(editor.execCommand).toHaveBeenCalledWith("Subscript");
});
