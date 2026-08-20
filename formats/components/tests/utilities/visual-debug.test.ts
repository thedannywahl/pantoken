import { expect, test } from "vite-plus/test";
import { visualDebugCss } from "../../src/index.ts";
import { visualDebug } from "../../src/utilities/visual-debug/index.ts";
import { validate } from "../_validate.ts";

test("visual-debug: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(visualDebug);
});

test("visual-debug utility: outlines an element and its immediate children", () => {
  const css = visualDebugCss({ prefix: "instui" });
  expect(css).toContain(".-with-visual-debug {");
  expect(css).toContain("outline: 0.0625rem solid var(--pantoken-visual-debug-color, #f42272);");
  expect(css).toContain(".-with-visual-debug > * {");
  expect(css).toContain("outline: 0.0625rem dashed var(--pantoken-visual-debug-color, #f42272);");
});
