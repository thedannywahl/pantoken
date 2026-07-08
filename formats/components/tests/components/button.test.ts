import { expect, test } from "vite-plus/test";
import { buttonCss } from "../../src/index.ts";
import { button } from "../../src/components/button.ts";
import { validate } from "../_validate.ts";

test("button: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(button);
});

test("button has primary default plus secondary and danger variants", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button {");
  expect(css).toContain(".instui-button.-color-secondary");
  expect(css).toContain(".instui-button.-color-danger");
  expect(css).toContain("var(--instui-color-background-interactive-action-primary-base)");
});

test("button gains icon, condensed, and toggle modifiers", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-shape-square");
  expect(css).toContain(".instui-button.-condensed");
  expect(css).toContain('.instui-button.-toggle[aria-pressed="true"]');
  expect(css).toContain(".instui-button.-without-border"); // InstUI withBorder={false}
});

test("button has success color and small/large size modifiers", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-color-success");
  expect(css).toContain("var(--instui-color-background-interactive-action-success-base)");
  expect(css).toContain(".instui-button.-size-sm");
  expect(css).toContain(".instui-button.-size-lg");
  expect(css).toContain("var(--instui-component-base-button-large-height)");
});

test("button has tertiary, primary-inverse, ai, ai-secondary colors and a circle shape", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-color-tertiary");
  expect(css).toContain(".instui-button.-color-primary-inverse");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-background)");
  expect(css).toContain(".instui-button.-color-ai");
  expect(css).toContain("var(--instui-color-background-interactive-action-ai-top-gradient-base)");
  expect(css).toContain(".instui-button.-color-ai-secondary");
  expect(css).toContain(".instui-button.-shape-circle");
  expect(css).toContain("border-radius: 50%");
});

test("ai buttons carry gradient borders, a ring, and an auto ai glyph", () => {
  const css = buttonCss({ prefix: "instui" });
  // ai-primary: distinct fill (padding-box) and stroke (border-box) gradients.
  expect(css).toContain("var(--instui-color-stroke-interactive-action-ai-top-gradient-base)");
  expect(css).toContain("padding-box");
  expect(css).toContain("border-box");
  // ai-secondary: a masked ::after ring plus violet→sea gradient text (clipped to the glyphs).
  expect(css).toContain(".instui-button.-color-ai-secondary::after");
  expect(css).toContain("mask-composite: exclude");
  expect(css).toContain("background-clip: text");
  expect(css).toContain(
    "var(--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base)",
  );
  // The ai glyph is added automatically to both AI variants.
  expect(css).toContain(".instui-button.-color-ai::before");
  expect(css).toContain(".instui-button.-color-ai-secondary::before");
  expect(css).toContain("data:image/svg+xml");
  // Hover/active restore a fill (border-box clip) using the secondary hover gradient tokens.
  expect(css).toContain(".instui-button.-color-ai-secondary:hover");
  expect(css).toContain(
    "var(--instui-color-background-interactive-action-ai-secondary-hover-top-gradient)",
  );
});

test("primary-inverse resolves its hover border to the on-color hover token", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-color-primary-inverse:hover");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-hover-border-color)");
});

test("button has a ghost (withBackground=false) variant and a block (display) variant", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button.-without-background");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-color)");
  expect(css).toContain(".instui-button.-color-secondary.-ghost");
  expect(css).toContain("var(--instui-component-base-button-secondary-ghost-border-color)");
  expect(css).toContain(".instui-button.-display-block");
  expect(css).toContain("width: 100%");
  // Ghost hover derives a low-opacity, darkened wash from the brand (via @pantoken/plugin-colors),
  // so the coloured rest text stays legible instead of printing same-on-same.
  expect(css).toContain(".instui-button.-without-background:hover");
  expect(css).toContain(
    "color-mix(in srgb, hsl(from var(--instui-component-base-button-primary-ghost-color) h s calc(l - 10)) 10%, transparent)",
  );
});

test("base button pins the medium height so sizes order small < medium < large", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("min-height: var(--instui-component-base-button-medium-height)");
});
