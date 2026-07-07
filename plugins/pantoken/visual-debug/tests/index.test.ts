import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { visualDebug } from "../src/index.ts";

const cssOf = (plugin: ReturnType<typeof visualDebug>): string => {
  const out = plugin.css?.({ tokens: [], css: "" });
  return (out && "append" in out ? (out.append as string) : "") || "";
};

test("is a css-only plugin", () => {
  expect(capabilitiesOf(visualDebug())).toEqual(["css"]);
});

test("emits the -with-visual-debug outline modifier + a child outline", () => {
  const css = cssOf(visualDebug());
  expect(css).toContain(".-with-visual-debug { outline:");
  expect(css).toContain(".-with-visual-debug > * { outline:");
  expect(css).toContain("--pantoken-visual-debug-color");
});

test("the outline colour is configurable", () => {
  const css = cssOf(visualDebug({ color: "red" }));
  expect(css).toContain(".-with-visual-debug { outline: 0.0625rem solid red; }");
});
