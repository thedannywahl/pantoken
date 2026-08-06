// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initModal } from "../src/behaviors/modal.ts";
import { makeOnCommand } from "../src/shared/index.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

function setup() {
  document.body.innerHTML = `
    <button command="--show" commandfor="m">Open</button>
    <button command="--close" commandfor="m">Close</button>
    <button command="--toggle" commandfor="m">Toggle</button>
    <dialog id="m" class="instui-modal"><p>Content</p></dialog>
  `;
  const dialog = document.getElementById("m") as HTMLDialogElement;
  const invokerSupported = "command" in (HTMLButtonElement.prototype as object);
  const onCommand = makeOnCommand(invokerSupported);
  initModal(dialog, dialog, onCommand);
  return { dialog };
}

test("--show sets open attribute and calls showModal", () => {
  const { dialog } = setup();
  document.querySelector<HTMLButtonElement>('[command="--show"]')?.click();
  expect(dialog.hasAttribute("open")).toBe(true);
});

test("--close removes open attribute and calls close", () => {
  const { dialog } = setup();
  dialog.setAttribute("open", "");
  document.querySelector<HTMLButtonElement>('[command="--close"]')?.click();
  expect(dialog.hasAttribute("open")).toBe(false);
});

test("--toggle flips the open attribute", () => {
  const { dialog } = setup();
  document.querySelector<HTMLButtonElement>('[command="--toggle"]')?.click();
  expect(dialog.hasAttribute("open")).toBe(true);
  document.querySelector<HTMLButtonElement>('[command="--toggle"]')?.click();
  expect(dialog.hasAttribute("open")).toBe(false);
});

test("open attribute change syncs dialog state", () => {
  const { dialog } = setup();
  dialog.setAttribute("open", "");
  // MutationObserver fires synchronously in happy-dom
  expect(dialog.hasAttribute("open")).toBe(true);
  dialog.removeAttribute("open");
  expect(dialog.hasAttribute("open")).toBe(false);
});

test("close event from dialog removes open attribute", () => {
  const { dialog } = setup();
  dialog.setAttribute("open", "");
  dialog.dispatchEvent(new Event("close", { bubbles: true }));
  expect(dialog.hasAttribute("open")).toBe(false);
});
