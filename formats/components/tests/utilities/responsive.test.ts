import { expect, test } from "vite-plus/test";
import { responsiveUtilitiesCss } from "../../src/index.ts";
import { responsive } from "../../src/utilities/responsive.ts";
import { validate } from "../_validate.ts";

test("responsive: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(responsive);
});

test("responsive utilities emit viewport hidden-max/min classes at the breakpoint scale", () => {
  const css = responsiveUtilitiesCss({ prefix: "instui" });
  expect(css).toContain(
    "@media (max-width: 48rem) { .instui-hidden-max-md { display: none !important; } }",
  );
  expect(css).toContain(
    "@media (min-width: 48rem) { .instui-hidden-min-md { display: none !important; } }",
  );
  expect(css).toContain(".instui-hidden-max-sm");
  expect(css).toContain(".instui-hidden-min-xl");
  // Container-query variants react to a marked container's width, not the viewport.
  expect(css).toContain(".instui-container { container-type: inline-size; }");
  expect(css).toContain(
    "@container (max-width: 48rem) { .instui-cq-hidden-max-md { display: none !important; } }",
  );
  expect(css).toContain(".instui-cq-hidden-min-lg");
});
