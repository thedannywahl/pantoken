import { expect, test } from "vite-plus/test";
import { gapCss } from "../../src/index.ts";
import { gap } from "../../src/utilities/gap/index.ts";
import { validate } from "../_validate.ts";

test("gap: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(gap);
});

test("gap utilities: global modifier selector shape, chainable onto any component", () => {
  const css = gapCss({ prefix: "instui" });
  expect(css).toContain(":where(*).--gap-sm.--gap-sm.--gap-sm");
  expect(css).toContain("gap: var(--instui-spacing-space-sm);");
  expect(css).toContain(":where(*).--gap-small.--gap-small.--gap-small");
  expect(css).toContain(":where(*).--gap-0.--gap-0.--gap-0");
  expect(css).toContain(":where(*).--gap-none.--gap-none.--gap-none");
  expect(gapCss({ prefix: "ui" })).toContain(":where(*).--gap-md.--gap-md.--gap-md");
});
