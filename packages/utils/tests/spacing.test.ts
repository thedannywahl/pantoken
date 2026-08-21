import { expect, test } from "vite-plus/test";
import { SPACING_AUTO_STEP, SPACING_STEPS } from "../src/spacing.ts";

test("SPACING_STEPS runs none/0 → 2xl with matching short/long keys", () => {
  expect(SPACING_STEPS[0]).toEqual({
    short: "0",
    long: "none",
    value: "var(--instui-component-shared-tokens-spacing-general-space-none)",
  });
  expect(SPACING_STEPS.at(-1)).toEqual({
    short: "2xl",
    long: "xx-large",
    value: "var(--instui-spacing-space2xl)",
  });
});

test("SPACING_AUTO_STEP spells the same both ways", () => {
  expect(SPACING_AUTO_STEP).toEqual({ short: "auto", long: "auto", value: "auto" });
});
