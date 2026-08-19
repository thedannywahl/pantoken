import { expect, test } from "vite-plus/test";
import { gapCss } from "../../src/index.ts";
import { gap } from "../../src/utilities/gap/index.ts";
import { validate } from "../_validate.ts";

test("gap: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(gap);
});

test("gap utilities: short and long step spellings, component-attached", () => {
  const css = gapCss({ prefix: "instui" });
  expect(css).toContain(".instui-gap-sm,");
  expect(css).toContain("gap: var(--instui-spacing-space-sm);");
  expect(css).toContain(".instui-button.-gap-sm");
  expect(css).toContain(".instui-view.-gap-sm");
  expect(css).toContain(".instui-gap-small,");
  expect(css).toContain(".instui-gap-0,");
  expect(css).toContain(".instui-gap-none,");
  expect(gapCss({ prefix: "ui" })).toContain(".ui-gap-md");
});
