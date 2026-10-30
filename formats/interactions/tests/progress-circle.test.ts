// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initProgressCircle } from "../src/behaviors/progress-circle.ts";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

test.each([true, false])(
  "reduced motion releases mount state (initially reduced: %s)",
  (initial) => {
    vi.useFakeTimers();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const matches = vi.spyOn(media, "matches", "get").mockReturnValue(initial);
    vi.spyOn(window, "matchMedia").mockReturnValue(media);
    const detach = vi.spyOn(media, "removeEventListener");
    const circle = document.body.appendChild(document.createElement("span"));
    circle.classList.add("-should-animate-on-mount");
    initProgressCircle(circle, { animationDelay: 1000 });
    if (!initial) {
      expect(circle.classList.contains("-should-animate-on-mount")).toBe(true);
      matches.mockReturnValue(true);
      media.dispatchEvent(new Event("change"));
    }
    expect(circle.classList.contains("-should-animate-on-mount")).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    expect(detach).toHaveBeenCalledWith("change", expect.any(Function));
  },
);

test("releases the mount modifier after --animation-delay milliseconds", () => {
  vi.useFakeTimers();
  document.body.innerHTML =
    '<span class="instui-progress-circle -should-animate" style="--animation-delay: 20"></span>';
  const circle = document.querySelector("span") as HTMLElement;
  initProgressCircle(circle);

  vi.advanceTimersByTime(19);
  expect(circle.classList.contains("-should-animate")).toBe(true);
  vi.advanceTimersByTime(1);
  expect(circle.classList.contains("-should-animate")).toBe(false);
});

test("accepts and removes the deprecated typo alias", () => {
  vi.useFakeTimers();
  const circle = document.body.appendChild(document.createElement("span"));
  circle.classList.add("-shold-animate-on-mount");
  initProgressCircle(circle, { animationDelay: 0 });
  vi.runAllTimers();
  expect(circle.classList.contains("-shold-animate-on-mount")).toBe(false);
});

test("cleanup cancels a pending animation and finish can release it directly", () => {
  vi.useFakeTimers();
  const circle = document.body.appendChild(document.createElement("span"));
  circle.classList.add("-should-animate");
  const handle = initProgressCircle(circle, { animationDelay: 50 });
  handle.cleanup();
  vi.runAllTimers();
  expect(circle.classList.contains("-should-animate")).toBe(true);
  handle.finish();
  expect(circle.classList.contains("-should-animate")).toBe(false);
});

test("does not schedule work without an animation modifier", () => {
  vi.useFakeTimers();
  const circle = document.body.appendChild(document.createElement("span"));
  initProgressCircle(circle, { animationDelay: 10 });
  expect(vi.getTimerCount()).toBe(0);
});
