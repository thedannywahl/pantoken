// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initRemove } from "../src/behaviors/remove.ts";

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

test("reads --timeout as milliseconds, dispatches dismiss, and fades before removal", () => {
  vi.useFakeTimers();
  document.body.innerHTML = `<div id="alert" style="--timeout: 10"></div>`;
  const alert = document.getElementById("alert") as HTMLElement;
  let event: Event | undefined;
  document.addEventListener("dismiss", (received) => (event = received), { once: true });

  initRemove(alert);
  vi.advanceTimersByTime(10);
  expect(event?.bubbles).toBe(true);
  expect(event?.cancelable).toBe(true);
  expect(alert.classList.contains("instui-transition")).toBe(true);
  expect(alert.classList.contains("-fade-exiting")).toBe(true);
  expect(alert.isConnected).toBe(true);

  vi.advanceTimersByTime(400);
  expect(alert.isConnected).toBe(false);
});

test("preventDefault keeps the target mounted", () => {
  vi.useFakeTimers();
  const alert = document.body.appendChild(document.createElement("div"));
  alert.addEventListener("dismiss", (event) => event.preventDefault());
  initRemove(alert, { timeout: 10 });

  vi.advanceTimersByTime(500);
  expect(alert.isConnected).toBe(true);
  expect(alert.classList.contains("-fade-exiting")).toBe(false);
});

test("transition none removes immediately", () => {
  vi.useFakeTimers();
  const alert = document.body.appendChild(document.createElement("div"));
  alert.classList.add("-transition-none");
  initRemove(alert, { timeout: 10 });
  vi.advanceTimersByTime(10);
  expect(alert.isConnected).toBe(false);
});

test("the fallback respects the transition plugin duration override", () => {
  vi.useFakeTimers();
  const alert = document.body.appendChild(document.createElement("div"));
  alert.style.setProperty("--instui-transition-duration", "1s");
  initRemove(alert, { timeout: 10 });

  vi.advanceTimersByTime(1000);
  expect(alert.isConnected).toBe(true);
  vi.advanceTimersByTime(110);
  expect(alert.isConnected).toBe(false);
});

test("non-positive and invalid timeouts don't arm a timer", () => {
  vi.useFakeTimers();
  const zero = document.body.appendChild(document.createElement("div"));
  const invalid = document.body.appendChild(document.createElement("div"));
  invalid.style.setProperty("--timeout", "soon");
  initRemove(zero, { timeout: 0 });
  initRemove(invalid);

  vi.runAllTimers();
  expect(zero.isConnected).toBe(true);
  expect(invalid.isConnected).toBe(true);
});

test("cleanup cancels a pending dismissal", () => {
  vi.useFakeTimers();
  const alert = document.body.appendChild(document.createElement("div"));
  const handle = initRemove(alert, { timeout: 10 });
  handle.cleanup();
  vi.runAllTimers();
  expect(alert.isConnected).toBe(true);
});
