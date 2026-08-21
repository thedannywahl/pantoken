// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { initTruncateAuto, syncTruncateAutoLines } from "../src/behaviors/truncate.ts";

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});

function mockRects(hostHeight: number, parentHeight = hostHeight) {
  const rect = (height: number): DOMRect =>
    ({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 300,
      bottom: height,
      width: 300,
      height,
      toJSON: () => ({}),
    }) as DOMRect;
  return vi
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(function (this: HTMLElement): DOMRect {
      if (this.classList.contains("parent")) return rect(parentHeight);
      if (this.classList.contains("host")) return rect(hostHeight);
      return rect(hostHeight);
    });
}

test("syncTruncateAutoLines computes floor(availableHeight/lineHeight)", () => {
  document.body.innerHTML =
    '<div class="parent"><div class="instui-truncate host">Text</div></div>';
  const host = document.querySelector<HTMLElement>(".host")!;
  const parent = document.querySelector<HTMLElement>(".parent")!;
  parent.appendChild(host);
  const rectSpy = mockRects(0, 60);
  const styleSpy = vi
    .spyOn(window, "getComputedStyle")
    .mockImplementation(
      () => ({ lineHeight: "20px", fontSize: "16px" }) as unknown as CSSStyleDeclaration,
    );

  syncTruncateAutoLines(host, host);

  expect(host.style.getPropertyValue("--lines")).toBe("3");
  rectSpy.mockRestore();
  styleSpy.mockRestore();
});

test("initTruncateAuto wires resize and slotchange listeners, cleanup detaches", () => {
  const originalResizeObserver = globalThis.ResizeObserver;
  let callback: ResizeObserverCallback | undefined;
  let disconnectCalls = 0;
  class TestResizeObserver {
    constructor(cb: ResizeObserverCallback) {
      callback = cb;
    }
    observe(_target: Element): void {}
    disconnect(): void {
      disconnectCalls += 1;
    }
    unobserve(_target: Element): void {}
  }
  globalThis.ResizeObserver = TestResizeObserver as unknown as typeof ResizeObserver;

  document.body.innerHTML = '<div class="parent"><div class="instui-truncate host"></div></div>';
  const host = document.querySelector<HTMLElement>(".host")!;
  const slot = document.createElement("slot");
  const rectSpy = mockRects(0, 40);
  const styleSpy = vi
    .spyOn(window, "getComputedStyle")
    .mockImplementation(
      () => ({ lineHeight: "10px", fontSize: "16px" }) as unknown as CSSStyleDeclaration,
    );

  try {
    const handle = initTruncateAuto(host, host, { slot });
    expect(host.style.getPropertyValue("--lines")).toBe("4");
    callback?.([], {} as ResizeObserver);
    expect(host.style.getPropertyValue("--lines")).toBe("4");
    slot.dispatchEvent(new Event("slotchange"));
    expect(host.style.getPropertyValue("--lines")).toBe("4");
    handle.cleanup();
    expect(disconnectCalls).toBe(1);
  } finally {
    rectSpy.mockRestore();
    styleSpy.mockRestore();
    globalThis.ResizeObserver = originalResizeObserver;
  }
});
