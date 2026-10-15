// @vitest-environment happy-dom
import { afterEach, expect, test, vi } from "vite-plus/test";
import { broadcastColor, broadcastTheme } from "./theme.ts";

afterEach(() => {
  vi.restoreAllMocks();
});

test.each([
  [{}, "same-origin"],
  [{ src: "/play/index.html" }, "same-origin"],
  [{ srcdoc: "preview" }, "same-origin"],
  [{ srcdoc: "preview", sandbox: "allow-scripts" }, "*"],
  [{ srcdoc: "preview", sandbox: "allow-scripts allow-same-origin" }, "same-origin"],
  [{ src: "data:text/html,preview" }, undefined],
  [{ src: "https://[" }, undefined],
] as const)("uses the constrained frame policy for both broadcasts: %j", (attributes, expected) => {
  const frame = document.createElement("iframe");
  for (const [name, value] of Object.entries(attributes)) frame.setAttribute(name, value);
  const postMessage = vi.fn();
  Object.defineProperty(frame, "contentWindow", { value: { postMessage } });
  vi.spyOn(document.documentElement, "querySelectorAll").mockReturnValue([
    frame,
  ] as unknown as NodeListOf<Element>);

  broadcastTheme("canvas", "navy");
  broadcastColor("blue");

  if (expected === undefined) {
    expect(postMessage).not.toHaveBeenCalled();
    return;
  }
  const origin = expected === "same-origin" ? document.location.origin : expected;
  expect(postMessage).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({ type: "pantoken-demo-theme", theme: "canvas" }),
    origin,
  );
  expect(postMessage).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({ type: "pantoken-demo-color", color: "blue" }),
    origin,
  );
});
