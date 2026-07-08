import { expect, test } from "vite-plus/test";
import { progressCircleCss } from "../../src/index.ts";
import { progressCircle } from "../../src/components/progress-circle.ts";
import { validate } from "../_validate.ts";

test("progress-circle: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(progressCircle);
});

test("progress circle has sizes, the meter palette, and an inverse scheme via custom props", () => {
  const css = progressCircleCss({ prefix: "instui" });
  expect(css).toContain("conic-gradient");
  expect(css).toContain(".instui-progress-circle.-size-sm");
  expect(css).toContain(".instui-progress-circle.-size-lg");
  expect(css).toContain(".instui-progress-circle.-color-success");
  expect(css).toContain("var(--instui-component-progress-circle-meter-color-brand-inverse)");
  expect(css).toContain(".instui-progress-circle.-color-primary-inverse");
});

test("progress circle registers --value, draws the ring on ::before, and centers a value", () => {
  const css = progressCircleCss({ prefix: "instui" });
  expect(css).toContain("@property --value");
  expect(css).toContain(".instui-progress-circle::before");
  expect(css).toContain(".instui-progress-circle .value");
  expect(css).toContain(".instui-progress-circle.-color-success");
});
