import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { toBootstrapCss } from "../src/index.ts";

test("emits Bootstrap variables pointing at Instructure tokens", () => {
  const css = toBootstrapCss();
  expect(css).toContain("--bs-primary: var(--instui-color-background-brand);");
  expect(css).toContain("--bs-body-bg: var(--instui-color-background-base);");
});

test("every mapped Instructure token exists in the IR (no drift)", () => {
  expect(unknownReferences(toBootstrapCss(), tokens)).toEqual([]);
});
