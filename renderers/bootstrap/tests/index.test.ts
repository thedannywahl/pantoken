import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { toBootstrapCss } from "../src/index.ts";
import { checkCompatibility } from "../scripts/check-compatibility.ts";

test("emits Bootstrap variables pointing at Instructure tokens", () => {
  const css = toBootstrapCss();
  expect(css).toContain("--bs-primary: var(--instui-color-background-brand);");
  expect(css).toContain("--bs-body-bg: var(--instui-color-background-base);");
  expect(css).toContain(":root .btn-primary {");
  expect(css).toContain(
    "--bs-btn-hover-bg: var(--instui-color-background-interactive-action-primary-hover);",
  );
});

test("scopes component variables with a custom theme selector", () => {
  expect(toBootstrapCss({ selector: "[data-bs-theme]" })).toContain(
    "[data-bs-theme] .btn-primary {",
  );
});

test("every mapped Instructure token exists in the IR (no drift)", () => {
  expect(unknownReferences(toBootstrapCss(), tokens)).toEqual([]);
});

test("rejects Bootstrap releases before button CSS variables were introduced", async () => {
  await expect(checkCompatibility("5.1.3")).rejects.toThrow("Invalid Bootstrap release");
});
