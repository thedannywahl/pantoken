// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initCloseButton } from "../src/behaviors/close-button.ts";

afterEach(() => {
  vi.useRealTimers();
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

test.each(["alert", "banner"])("dismisses the documented %s close-button markup", (component) => {
  vi.useFakeTimers();
  document.body.innerHTML = `
    <div id="message" class="instui-${component}" role="status">
      Saved.
      <button class="instui-close-button" aria-label="Close"></button>
    </div>
  `;
  const message = document.getElementById("message")!;
  const closeButton = message.querySelector<HTMLButtonElement>("button")!;
  const dismissed = vi.fn();
  message.addEventListener("dismiss", dismissed);
  initCloseButton(closeButton);
  closeButton.click();
  expect(dismissed).toHaveBeenCalledOnce();
  expect(message.classList.contains("-fade-exiting")).toBe(true);
  vi.runAllTimers();
  expect(message.isConnected).toBe(false);
});

test.each(["alert", "banner"])("allows canceling %s close-button dismissal", (component) => {
  vi.useFakeTimers();
  document.body.innerHTML = `
    <div id="message" class="instui-${component}">
      <button class="instui-close-button" aria-label="Close"></button>
    </div>
  `;
  const message = document.getElementById("message")!;
  message.addEventListener("dismiss", (event) => event.preventDefault());
  const closeButton = message.querySelector<HTMLButtonElement>("button")!;
  initCloseButton(closeButton);
  closeButton.click();
  vi.runAllTimers();
  expect(message.isConnected).toBe(true);
  expect(message.classList.contains("-fade-exiting")).toBe(false);
});

test("dismisses a nested message without closing its containing dialog", () => {
  document.body.innerHTML = `
    <dialog open>
      <div class="instui-alert -transition-none">
        <button class="instui-close-button" aria-label="Close"></button>
      </div>
    </dialog>
  `;
  const dialog = document.querySelector("dialog")!;
  const closeButton = document.querySelector<HTMLButtonElement>("button")!;
  initCloseButton(closeButton);
  closeButton.click();
  expect(document.querySelector(".instui-alert")).toBeNull();
  expect(dialog.hasAttribute("open")).toBe(true);
});

test("does nothing when no dismissible ancestor is found", () => {
  document.body.innerHTML = `<button id="btn">Close</button>`;
  const btn = document.getElementById("btn") as HTMLElement;
  initCloseButton(btn);
  expect(() => btn.click()).not.toThrow();
});

test.each([
  ["instui", undefined],
  ["x", "x"],
  ["", ""],
])("dismisses the nearest alert for the %j prefix", (prefix, option) => {
  const cls = prefix ? `${prefix}-alert` : "alert";
  document.body.innerHTML = `<div id="a" class="${cls}"><button id="btn">Close</button></div>`;
  const alert = document.getElementById("a") as HTMLElement;
  const seen = vi.fn();
  alert.addEventListener("dismiss", seen);
  initCloseButton(document.getElementById("btn") as HTMLElement, { prefix: option });
  (document.getElementById("btn") as HTMLElement).click();
  expect(seen).toHaveBeenCalledOnce();
});
