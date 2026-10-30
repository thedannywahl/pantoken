import { expect, test } from "vite-plus/test";
import { rangeInput } from "../../src/components/range-input/index.ts";
import { validate } from "../_validate.ts";

test("range-input: emits a well-formed record with no token drift", () => {
  validate(rangeInput);
});

test("forced colors replace the shadow-only thumb ring with a system-color keyboard outline", () => {
  for (const prefix of ["instui", "custom", ""]) {
    const css = rangeInput.css({ prefix });
    expect(css).toMatch(
      /&:focus-visible\s*\{\s*outline: none;\s*@media \(forced-colors: active\)\s*\{\s*outline: var\(--instui-focus-outline-width\) solid Highlight;\s*outline-offset: var\(--instui-focus-outline-offset\);/u,
    );
    expect(css).not.toContain("forced-color-adjust");
  }
});
