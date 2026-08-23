import { expect, test } from "vite-plus/test";
import { progressCircleCss } from "../../src/index.ts";
import { progressCircle } from "../../src/components/progress-circle/index.ts";
import { validate } from "../_validate.ts";
import { norm } from "../_css.ts";

test("progress-circle: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(progressCircle);
});

test("progress circle has sizes, the meter palette, and an inverse scheme via custom props", () => {
  const css = progressCircleCss({ prefix: "instui" });
  expect(css).toContain("conic-gradient");
  expect(css).toContain("@scope (.instui-progress-circle)");
  expect(css).toMatch(/&\.-size-sm/u);
  expect(css).toMatch(/&\.-size-md/u);
  expect(css).toMatch(/&\.-size-lg/u);
  expect(css).toMatch(/&:is\(\.-color-success,\s*\.-meter-color-success\)/u);
  expect(css).toContain("var(--instui-component-progress-circle-meter-color-brand-inverse)");
  expect(css).toMatch(/&\.-color-primary-inverse/u);
});

test("progress circle registers current, maximum, and animation inputs", () => {
  const css = progressCircleCss({ prefix: "instui" });
  expect(css).toContain("@property --value");
  expect(css).toContain("@property --value-now");
  expect(css).toContain("@property --min");
  expect(css).toContain("@property --max");
  expect(css).toContain("@property --value-max");
  expect(css).toContain("@property --animation-delay");
  expect(css).toContain("--value: var(--value-now)");
  expect(css).toContain("--min: 0");
  expect(css).toContain("--max: var(--value-max)");
  expect(css).toContain("(var(--value) - var(--min)) / (var(--max) - var(--min))");
  expect(css).toContain("@element progress, meter");
  // Two named @structure variants (cssdoc 0.11's @variant), named for the markup pattern (either can
  // host a <progress> or <meter>), not the element itself.
  expect(css).toMatch(
    /@structure\s+\*\s+@variant nested-label \{\s+\*\s+label \{\s+\*\s+\.instui-progress-circle \{\s+\*\s+\.value \{\}\s+\*\s+\}\s+\*\s+\}\s+\*\s+\}/u,
  );
  expect(css).toMatch(
    /@variant external-label \{\s+\*\s+label \{\}\s+\*\s+\.instui-progress-circle \{\s+\*\s+\.value \{\}\s+\*\s+\}\s+\*\s+\}/u,
  );
  expect(css).toContain('<label for="score">Score</label>');
  expect(css).toContain('<meter id="score"');
  expect(css).toMatch(/&::before/u);
  expect(css).toMatch(/&\s+\.value/u);
  expect(css).toMatch(/&:is\(\.-color-success,\s*\.-meter-color-success\)/u);
});

test("progress circle embeds the shared mount transition and a functional deprecated alias", () => {
  const css = norm(progressCircleCss({ prefix: "instui" }));
  expect(css).toContain("transition: --value 1s;");
  expect(css).toMatch(
    /&:is\(\.-should-animate,\s*\.-should-animate-on-mount,\s*\.-shold-animate-on-mount\)/u,
  );
  expect(css).toContain("opacity 0.5s 1s");
});

test("progress circle falls back to a custom :indeterminate state for a valueless <progress>", () => {
  const css = progressCircleCss({ prefix: "instui" });
  expect(css).toMatch(/&:indeterminate\s*\{/u);
  expect(css).toMatch(/&:indeterminate::before/u);
  expect(css).toContain("animation: pantoken-progress-circle-indeterminate");
  expect(css).toMatch(/&:indeterminate\s+\.value/u);
});
