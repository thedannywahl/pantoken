import { expect, test } from "vite-plus/test";
import { toggleDetailsCss } from "../../src/index.ts";
import { toggleDetails } from "../../src/components/toggle-details.ts";
import { validate } from "../_validate.ts";

test("toggle-details: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(toggleDetails);
});

test("toggle-details hides the native marker, has a rotating chevron + filled variant", () => {
  const css = toggleDetailsCss({ prefix: "instui" });
  expect(css).toContain("summary::-webkit-details-marker { display: none; }");
  expect(css).toContain(".instui-toggle-details > summary::before");
  expect(css).toContain(
    ".instui-toggle-details[open] > summary::before { transform: rotate(90deg); }",
  );
  expect(css).toContain(".instui-toggle-details.-variant-filled > summary");
});
