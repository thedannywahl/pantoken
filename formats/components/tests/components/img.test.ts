import { expect, test } from "vite-plus/test";
import { imgCss } from "../../src/index.ts";
import { img } from "../../src/components/img.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("img: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(img);
});

test("img has display, constrain, and composable grayscale/blur effects", () => {
  const css = norm(imgCss({ prefix: "instui" }));
  expect(css).toContain(".instui-img {");
  expect(css).toContain(".instui-img.-display-block");
  expect(css).toContain(
    ".instui-img.-constrain-cover { inline-size: 100%; block-size: 100%; object-fit: cover; }",
  );
  expect(css).toContain(".instui-img.-constrain-contain");
  // Effects compose via a custom property so grayscale + blur stack.
  expect(css).toContain("filter: var(--pantoken-img-filter)");
  expect(css).toContain(".instui-img.-with-grayscale.-with-blur");
  expect(css).toContain("var(--instui-component-img-image-blur-amount)");
});
