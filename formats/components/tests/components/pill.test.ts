import { expect, test } from "vite-plus/test";
import { pillCss } from "../../src/index.ts";
import { pill } from "../../src/components/pill/index.ts";
import { validate } from "../_validate.ts";

test("pill: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(pill);
});

test("pill uses the 1.9.0 size and spacing tokens", () => {
  const css = pillCss({ prefix: "instui" });
  expect(css).toContain("var(--instui-component-pill-neutral-background-color)");
  expect(css).toContain("var(--instui-component-pill-padding-vertical)");
  expect(css).toContain("var(--instui-component-pill-gap-content)");
  expect(css).toContain("var(--instui-component-pill-gap-icon-label)");
  expect(css).toContain(".-size-x-small");
  expect(css).toContain("var(--instui-component-pill-height-x-small)");
  expect(css).toContain(".-size-medium");
  expect(css).toContain("var(--instui-component-pill-height-medium)");
  expect(css).toContain(".-size-large");
  expect(css).toContain("var(--instui-component-pill-height-large)");
});

test("pill supports status and accent backgrounds", () => {
  const css = pillCss({ prefix: "instui" });
  for (const color of [
    "neutral",
    "info",
    "success",
    "warning",
    "danger",
    "error",
    "plum",
    "aurora",
    "sky",
    "orange",
    "violet",
    "sea",
    "stone",
  ]) {
    expect(css).toContain(`.-color-${color}`);
  }
  expect(css).toContain("var(--instui-component-pill-error-background-color)");
  expect(css).toContain("var(--instui-component-pill-plum-background-color)");
  expect(css).toContain("var(--instui-component-pill-stone-border-color)");
});
