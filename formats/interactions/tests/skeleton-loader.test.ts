// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initSkeletonLoading } from "../src/behaviors/skeleton-loader.ts";

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

function setup() {
  document.body.innerHTML = `
    <div class="instui-skeleton-loading">
      <span data-skeleton-status role="status"></span>
      <span data-skeleton-error role="alert"></span>
      <div data-skeleton-region aria-busy="true">
        <div class="instui-skeleton-loader" aria-hidden="true"></div>
      </div>
    </div>`;
  const busyRegion = document.querySelector<HTMLElement>("[data-skeleton-region]")!;
  const status = document.querySelector<HTMLElement>("[data-skeleton-status]")!;
  const error = document.querySelector<HTMLElement>("[data-skeleton-error]")!;
  return { busyRegion, status, error };
}

test("announces a persistent load after the delay, outside the busy region", () => {
  vi.useFakeTimers();
  const { busyRegion, status, error } = setup();
  const handle = initSkeletonLoading(busyRegion, { status, error });
  expect(status.textContent).toBe("");
  expect(error.textContent).toBe("");
  handle.setLoading("Loading courses");
  expect(busyRegion.getAttribute("aria-busy")).toBe("true");
  vi.advanceTimersByTime(399);
  expect(status.textContent).toBe("");
  vi.advanceTimersByTime(1);
  expect(status.textContent).toBe("Loading courses");
});

test("fast loads cancel their announcement and report results", () => {
  vi.useFakeTimers();
  const { busyRegion, status, error } = setup();
  const handle = initSkeletonLoading(busyRegion, { status, error });
  handle.setLoading("Loading courses");
  handle.setLoaded("24 courses");
  vi.runAllTimers();
  expect(busyRegion.getAttribute("aria-busy")).toBe("false");
  expect(status.textContent).toBe("24 courses");
  expect(error.textContent).toBe("");
});

test("empty and error states clear stale announcements without rendering content", () => {
  vi.useFakeTimers();
  const { busyRegion, status, error } = setup();
  const handle = initSkeletonLoading(busyRegion, { status, error });
  handle.setEmpty("No courses found");
  expect(status.textContent).toBe("No courses found");
  handle.setLoading("Retrying");
  handle.setError("Couldn't load courses. Retry");
  vi.runAllTimers();
  expect(status.textContent).toBe("");
  expect(error.textContent).toBe("Couldn't load courses. Retry");
  expect(busyRegion.getAttribute("aria-busy")).toBe("false");
  expect(busyRegion.querySelector(".instui-skeleton-loader")).not.toBeNull();
});

test("accepts parent state events, ignores unknown events and uses text-only announcements", () => {
  const { busyRegion, status, error } = setup();
  const handle = initSkeletonLoading(busyRegion, { status, error });
  busyRegion.dispatchEvent(
    new CustomEvent("pantoken:skeleton-state", { detail: { state: "bogus", message: "ignored" } }),
  );
  busyRegion.dispatchEvent(
    new CustomEvent("pantoken:skeleton-state", {
      detail: { state: "loaded", message: "<b>Done</b>" },
    }),
  );
  expect(status.textContent).toBe("<b>Done</b>");
  expect(status.querySelector("b")).toBeNull();
  expect(initSkeletonLoading(busyRegion, { status, error })).toBe(handle);
  handle.cleanup();
  busyRegion.dispatchEvent(
    new CustomEvent("pantoken:skeleton-state", { detail: { state: "error", message: "late" } }),
  );
  expect(error.textContent).toBe("");
});

test("rejects announcements inside the busy region", () => {
  const { busyRegion, error } = setup();
  const inside = document.createElement("span");
  busyRegion.append(inside);
  expect(() => initSkeletonLoading(busyRegion, { status: inside, error })).toThrow(
    "outside the busy region",
  );
});

test("DOM-ready registration binds the parent region without binding each shape", async () => {
  const { busyRegion, status, error } = setup();
  await import("../src/components/skeleton-loader.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
  busyRegion.dispatchEvent(
    new CustomEvent("pantoken:skeleton-state", {
      detail: { state: "loaded", message: "Courses ready" },
    }),
  );
  expect(status.textContent).toBe("Courses ready");
  expect(error.textContent).toBe("");
  expect(document.querySelector(".instui-skeleton-loader")?.getAttribute("aria-busy")).toBeNull();
});
