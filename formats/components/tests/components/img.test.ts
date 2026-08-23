import { expect, test } from "vite-plus/test";
import { imgCss } from "../../src/index.ts";
import { img } from "../../src/components/img/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("img: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(img);
});

test("img has display, constrain, and composable grayscale/blur effects", () => {
  const css = norm(imgCss({ prefix: "instui" }));
  expect(css).toContain("@scope (.instui-img)");
  expect(css).toMatch(/&\s*\{/u);
  expect(css).toMatch(/&\.-display-block/u);
  expect(css).toMatch(
    /&\.-constrain-cover\s*\{\s*inline-size:\s*100%;\s*block-size:\s*100%;\s*object-fit:\s*cover;/u,
  );
  expect(css).toMatch(/&\.-constrain-contain/u);
  // Effects compose via a custom property so grayscale + blur stack.
  expect(css).toContain("filter: var(--pantoken-img-filter)");
  expect(css).toMatch(/&\.-with-grayscale\.-with-blur/u);
  expect(css).toContain("var(--instui-component-img-image-blur-amount)");
});
