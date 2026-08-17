// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { register } from "../src/index.ts";

register();

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

test("alert renders a role=alert div with the variant modifier", () => {
  document.body.innerHTML = `<instui-alert variant="success">Saved.</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  const div = el.shadowRoot?.querySelector('[role="alert"]');
  expect(div?.className).toContain("instui-alert");
  expect(div?.className).toContain("-color-success");
  expect(div?.className).not.toContain("-without-shadow");
  expect(el.shadowRoot?.querySelector("slot")).toBeTruthy();
});

test("alert with has-shadow=false adds the -without-shadow modifier", () => {
  document.body.innerHTML = `<instui-alert variant="info" has-shadow="false">Flat.</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  expect(el.shadowRoot?.querySelector('[role="alert"]')?.className).toContain("-without-shadow");
});

test("alert repaints when has-shadow toggles (attributeChangedCallback)", () => {
  document.body.innerHTML = `<instui-alert variant="info">x</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  el.setAttribute("has-shadow", "false");
  expect(el.shadowRoot?.querySelector('[role="alert"]')?.className).toContain("-without-shadow");
});

test("a timeout auto-dismisses: fires a cancelable, bubbling `dismiss`, then removes the alert", () => {
  vi.useFakeTimers();
  document.body.innerHTML = `<instui-alert variant="warning" timeout="10">Saving…</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  let evt: Event | undefined;
  document.addEventListener("dismiss", (e) => (evt = e), { once: true });
  vi.advanceTimersByTime(10);
  expect(evt).toBeDefined();
  expect(evt?.bubbles).toBe(true);
  expect(evt?.cancelable).toBe(true);
  expect(el.classList.contains("instui-transition")).toBe(true);
  expect(el.classList.contains("-fade-exiting")).toBe(true);
  // The fallback removal timer (400ms) runs even though happy-dom never fires transitionend.
  vi.advanceTimersByTime(400);
  expect(el.isConnected).toBe(false);
});

test("preventDefault on `dismiss` keeps the alert mounted", () => {
  vi.useFakeTimers();
  document.body.innerHTML = `<instui-alert variant="warning" timeout="10">Keep me</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  document.addEventListener("dismiss", (e) => e.preventDefault(), { once: true });
  vi.advanceTimersByTime(500);
  expect(el.isConnected).toBe(true);
  expect(el.classList.contains("-fade-exiting")).toBe(false);
});

test("transition=none removes immediately when the timeout elapses", () => {
  vi.useFakeTimers();
  document.body.innerHTML = `<instui-alert timeout="10" transition="none">Done</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  vi.advanceTimersByTime(10);
  expect(el.isConnected).toBe(false);
});

test("disconnecting before the timeout clears the auto-dismiss timer (never dismisses)", () => {
  vi.useFakeTimers();
  document.body.innerHTML = `<instui-alert variant="warning" timeout="50">Bye</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  let fired = false;
  document.addEventListener("dismiss", () => (fired = true), { once: true });
  el.remove();
  vi.advanceTimersByTime(100);
  expect(fired).toBe(false);
});

test("a non-positive timeout is ignored (no auto-dismiss)", () => {
  vi.useFakeTimers();
  document.body.innerHTML = `<instui-alert variant="info" timeout="0">x</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  vi.advanceTimersByTime(1000);
  expect(el.isConnected).toBe(true);
});

test("a non-numeric timeout is ignored (no auto-dismiss)", () => {
  vi.useFakeTimers();
  document.body.innerHTML = `<instui-alert variant="info" timeout="soon">x</instui-alert>`;
  const el = document.querySelector("instui-alert") as HTMLElement;
  vi.advanceTimersByTime(1000);
  expect(el.isConnected).toBe(true);
});
