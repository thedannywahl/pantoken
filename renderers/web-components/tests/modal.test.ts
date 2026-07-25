// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { register } from "../src/index.ts";

register();
afterEach(() => {
  document.body.innerHTML = "";
});

function modal(attrs = ""): { el: HTMLElement; dialog: HTMLDialogElement } {
  document.body.innerHTML = `<instui-modal id="m" ${attrs}><p>Body</p></instui-modal>`;
  const el = document.querySelector("instui-modal") as HTMLElement;
  const dialog = el.shadowRoot?.querySelector("dialog") as HTMLDialogElement;
  return { el, dialog };
}

test("renders a <dialog> with a slot and starts closed", () => {
  const { el, dialog } = modal();
  expect(dialog).toBeInstanceOf(HTMLDialogElement);
  expect(el.shadowRoot?.querySelector("slot")).toBeTruthy();
  expect(dialog.open).toBe(false);
});

test("the open attribute drives showModal(); removing it closes the dialog", () => {
  const { el, dialog } = modal();
  el.setAttribute("open", "");
  expect(dialog.open).toBe(true);
  el.removeAttribute("open");
  expect(dialog.open).toBe(false);
});

test("mounting with open shows the modal immediately", () => {
  const { dialog } = modal("open");
  expect(dialog.open).toBe(true);
});

test("a native dialog close reflects the open attribute off and re-fires a bubbling `close`", () => {
  const { el, dialog } = modal("open");
  let bubbled = false;
  document.addEventListener("close", (e) => (bubbled = e.bubbles), { once: true });
  dialog.close();
  expect(el.hasAttribute("open")).toBe(false);
  expect(bubbled).toBe(true);
});

test("the --show / --close / --toggle commands drive it from light DOM (click fallback)", () => {
  const { el, dialog } = modal();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<button id="s" command="--show" commandfor="m">Show</button>
     <button id="c" command="--close" commandfor="m">Close</button>
     <button id="t" command="--toggle" commandfor="m">Toggle</button>`,
  );
  (document.getElementById("s") as HTMLButtonElement).click();
  expect(el.hasAttribute("open")).toBe(true);
  expect(dialog.open).toBe(true);
  (document.getElementById("c") as HTMLButtonElement).click();
  expect(el.hasAttribute("open")).toBe(false);
  (document.getElementById("t") as HTMLButtonElement).click();
  expect(el.hasAttribute("open")).toBe(true);
});

test("a native `command` event on the host drives it (the Invoker API path)", () => {
  const { el, dialog } = modal();
  // onCommand always attaches a `command` listener; simulate the native CommandEvent shape.
  const show = new Event("command", { bubbles: true }) as Event & {
    command: string;
    source: Element | null;
  };
  show.command = "--show";
  show.source = null;
  el.dispatchEvent(show);
  expect(el.hasAttribute("open")).toBe(true);
  expect(dialog.open).toBe(true);
  const close = new Event("command") as Event & { command: string; source: Element | null };
  close.command = "--close";
  close.source = null;
  el.dispatchEvent(close);
  expect(el.hasAttribute("open")).toBe(false);
});

test("syncOpen is idempotent: re-setting open while already shown does not throw", () => {
  const { el, dialog } = modal("open");
  expect(() => el.setAttribute("open", "")).not.toThrow();
  expect(dialog.open).toBe(true);
});
