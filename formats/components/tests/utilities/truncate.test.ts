import { expect, test } from "vite-plus/test";
import { truncateCss } from "../../src/index.ts";
import { truncate } from "../../src/utilities/truncate/index.ts";
import { validate } from "../_validate.ts";

test("truncate: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(truncate);
});

test("truncate utility: usable bare or chained onto any component", () => {
  const css = truncateCss({ prefix: "instui" });
  expect(css).toContain(".instui-truncate, .instui-button.-truncate");
  expect(css).toContain("-webkit-line-clamp: var(--lines, 1);");
  expect(css).toContain(
    ".instui-truncate.-truncate-character, .instui-button.-truncate.-truncate-character",
  );
  expect(css).toContain(".instui-truncate.-truncate-word, .instui-button.-truncate.-truncate-word");
  expect(css).toContain(".instui-truncate.-max-lines-3, .instui-button.-truncate.-max-lines-3");
  expect(css).toContain(".instui-truncate.-lines-3, .instui-button.-truncate.-lines-3");
  expect(truncateCss({ prefix: "ui" })).toContain(".ui-truncate, .ui-button.-truncate");
});
