// @vitest-environment happy-dom
import { afterEach, expect, test } from "vite-plus/test";
import { initCloseButton } from "../src/behaviors/close-button.ts";

afterEach(() => {
  document.body.innerHTML = "";
});

test("closes a <dialog> via data-close-target", () => {
  document.body.innerHTML = `
    <dialog id="d" open></dialog>
    <button id="btn" data-close-target="d">Close</button>
  `;
  const btn = document.getElementById("btn") as HTMLElement;
  const dialog = document.getElementById("d") as HTMLDialogElement;
  initCloseButton(btn);
  btn.click();
  expect(dialog.hasAttribute("open")).toBe(false);
});

test("closes nearest [open] ancestor when no target attribute", () => {
  document.body.innerHTML = `
    <div id="panel" open>
      <button id="btn">Close</button>
    </div>
  `;
  const btn = document.getElementById("btn") as HTMLElement;
  const panel = document.getElementById("panel") as HTMLElement;
  initCloseButton(btn);
  btn.click();
  expect(panel.hasAttribute("open")).toBe(false);
});

test("fires a bubbling close event on the dismissed target", () => {
  document.body.innerHTML = `
    <div id="panel" open>
      <button id="btn">Close</button>
    </div>
  `;
  const btn = document.getElementById("btn") as HTMLElement;
  initCloseButton(btn);
  const received: string[] = [];
  document.body.addEventListener("close", () => received.push("close"));
  btn.click();
  expect(received).toEqual(["close"]);
});

test("skips wiring when popovertarget is present (native handles it)", () => {
  document.body.innerHTML = `
    <div id="p" open></div>
    <button id="btn" popovertarget="p">Close</button>
  `;
  const btn = document.getElementById("btn") as HTMLElement;
  const panel = document.getElementById("p") as HTMLElement;
  initCloseButton(btn);
  btn.click();
  // No custom handler wired — native popover API owns it; panel stays open in test env
  expect(panel.hasAttribute("open")).toBe(true);
});

test("does nothing when no dismissible ancestor is found", () => {
  document.body.innerHTML = `<button id="btn">Close</button>`;
  const btn = document.getElementById("btn") as HTMLElement;
  initCloseButton(btn);
  expect(() => btn.click()).not.toThrow();
});
