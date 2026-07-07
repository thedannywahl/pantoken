import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { toShadcnCss } from "../src/index.ts";

test("emits shadcn variables pointing at Instructure tokens", () => {
  const css = toShadcnCss();
  expect(css).toContain("--primary: var(--instui-color-background-brand);");
  expect(css).toContain("--ring: var(--instui-color-stroke-brand);");
  expect(css).toContain(":root {");
});

test("respects a custom selector", () => {
  expect(toShadcnCss({ selector: ".dark" })).toContain(".dark {");
});

test("every mapped Instructure token actually exists in the IR (no drift)", () => {
  expect(unknownReferences(toShadcnCss(), tokens)).toEqual([]);
});
