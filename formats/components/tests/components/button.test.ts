import { expect, test } from "vite-plus/test";
import { buttonCss } from "../../src/index.ts";
import { button } from "../../src/components/button/index.ts";
import { validate } from "../_validate.ts";

test("button: emits exactly one well-formed cssdoc record with no token drift", () => {
  validate(button);
});

test("button has primary default plus secondary and danger variants", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("@scope (.instui-button)");
  expect(css).toContain("& {");
  expect(css).toContain("&.-color-secondary");
  expect(css).toContain("&.-color-danger");
  expect(css).toContain("border: var(--instui-border-width-sm) solid transparent");
  expect(css).toContain("var(--instui-color-background-interactive-action-primary-base)");
  expect(css).toContain("var(--instui-component-base-button-primary-disabled-background-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-disabled-border-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-color)");
});

test("button group wrapper uses the shared button gap token", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain(".instui-button-group");
  expect(css).toContain("display: flex");
  expect(css).toContain("flex-wrap: wrap");
  expect(css).toContain("var(--instui-component-shared-tokens-spacing-gap-buttons)");
});

test("secondary color uses base-button secondary tokens", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("var(--instui-component-base-button-secondary-background)");
  expect(css).toContain("var(--instui-component-base-button-secondary-border-color)");
  expect(css).toContain("var(--instui-component-base-button-secondary-color)");
  expect(css).toContain("var(--instui-component-base-button-secondary-hover-background)");
  expect(css).toContain("var(--instui-component-base-button-secondary-hover-border-color)");
  expect(css).toContain("var(--instui-component-base-button-secondary-hover-text-color)");
  expect(css).toContain("var(--instui-component-base-button-secondary-active-background)");
  expect(css).toContain("var(--instui-component-base-button-secondary-active-border-color)");
  expect(css).toContain("var(--instui-component-base-button-secondary-active-text-color)");
  expect(css).toContain("var(--instui-component-base-button-secondary-disabled-background-color)");
  expect(css).toContain("var(--instui-component-base-button-secondary-disabled-border-color)");
  expect(css).toContain("var(--instui-component-base-button-secondary-disabled-text-color)");
});

test("-color-primary and -size-md are explicit, first-class twins of the (default) base rule", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("&.-color-primary {");
  expect(css).toContain("&.-color-primary:hover");
  expect(css).toContain("&.-color-primary:active");
  expect(css).toContain("&.-size-md {");
  expect(css).toContain("var(--instui-component-base-button-medium-font-size)");
  expect(css).toContain("var(--instui-component-base-button-medium-height)");
  expect(css).toContain("var(--instui-component-base-button-medium-padding-horizontal)");
});

test("button gains icon, condensed, and toggle modifiers", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("&.-shape-square");
  expect(css).toContain("&.-condensed");
  expect(css).toContain('&.-toggle[aria-pressed="true"]');
  expect(css).toContain("&.-without-border"); // InstUI withBorder={false}
});

test("button has success color and small/medium/large size modifiers", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("&.-color-success");
  expect(css).toContain("var(--instui-color-background-interactive-action-success-base)");
  expect(css).toContain("&.-size-sm");
  expect(css).toContain("&.-size-md");
  expect(css).toContain("&.-size-lg");
  expect(css).toContain("var(--instui-component-base-button-large-height)");
});

test("button has tertiary, primary-inverse, ai, ai-secondary colors and a circle shape", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("&.-color-tertiary");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-border-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-hover-background)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-hover-border-color)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-hover-text-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-active-background)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-active-border-color)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-active-text-color)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-disabled-border-color)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-disabled-text-color)");
  expect(css).toContain("&.-color-primary-inverse");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-background)");
  expect(css).toContain("&.-color-ai");
  expect(css).toContain("var(--instui-color-background-interactive-action-ai-top-gradient-base)");
  expect(css).toContain("&.-color-ai-secondary");
  expect(css).toContain("&.-shape-circle");
  expect(css).toContain("border-radius: 50%");
});

test("ai buttons carry gradient borders, a ring, and an auto ai glyph", () => {
  const css = buttonCss({ prefix: "instui" });
  // ai-primary: distinct fill (padding-box) and stroke (border-box) gradients.
  expect(css).toContain("var(--instui-color-stroke-interactive-action-ai-top-gradient-base)");
  expect(css).toContain("padding-box");
  expect(css).toContain("border-box");
  // ai-secondary: a masked ::after ring plus violet→sea gradient text (clipped to the glyphs).
  expect(css).toContain("&.-color-ai-secondary::after");
  expect(css).toContain("mask-composite: exclude");
  expect(css).toContain("background-clip: text");
  expect(css).toContain(
    "var(--instui-color-text-interactive-action-ai-secondary-bottom-gradient-base)",
  );
  // The ai glyph is added automatically to both AI variants (appended in index.ts).
  expect(css).toContain(".instui-button.-color-ai::before");
  expect(css).toContain(".instui-button.-color-ai-secondary::before");
  expect(css).toContain("var(--instui-component-icon-action-ai-disabled-color)");
  expect(css).toContain("data:image/svg+xml");
  // Hover/active restore a fill (border-box clip) using the secondary hover gradient tokens.
  expect(css).toContain("&.-color-ai-secondary:hover");
  expect(css).toContain(
    "var(--instui-color-background-interactive-action-ai-secondary-hover-top-gradient)",
  );
});

test("primary-inverse resolves its hover border to the on-color hover token", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("&.-color-primary-inverse:hover");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-hover-border-color)");
});

test("-on-color fills primary white and leaves secondary transparent", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain('&.-on-color:not([class*="-color-"]),');
  expect(css).toContain("&.-color-primary.-on-color {");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-background)");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-border-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-color)");
  expect(css).toContain("&.-color-primary.-on-color:hover");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-hover-background)");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-hover-border-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-hover-text-color)");
  expect(css).toContain("&.-color-primary.-on-color:active");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-active-background)");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-active-border-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-active-text-color)");
  expect(css).toContain(
    "var(--instui-component-base-button-primary-on-color-disabled-background-color)",
  );
  expect(css).toContain(
    "var(--instui-component-base-button-primary-on-color-disabled-border-color)",
  );
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-disabled-text-color)");
  expect(css).toContain("&.-color-secondary.-on-color {");
  expect(css).toContain("background: transparent;");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-ghost-border-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-ghost-color)");
  expect(css).toContain("&.-color-secondary.-on-color:hover");
  expect(css).toContain(
    "var(--instui-component-base-button-primary-inverse-ghost-hover-background)",
  );
  expect(css).toContain("var(--instui-component-base-button-secondary-on-color-hover-text-color)");
  expect(css).toContain("&.-color-secondary.-on-color:active");
  expect(css).toContain(
    "var(--instui-component-base-button-primary-inverse-ghost-active-background)",
  );
  expect(css).toContain(
    "var(--instui-component-base-button-secondary-on-color-active-border-color)",
  );
  expect(css).toContain("var(--instui-component-base-button-secondary-on-color-active-text-color)");
  expect(css).toContain(
    "var(--instui-component-base-button-secondary-on-color-disabled-border-color)",
  );
  expect(css).toContain(
    "var(--instui-component-base-button-secondary-on-color-disabled-text-color)",
  );
});

test("button has fill/border removal modifiers, deprecated ghost, and a block variant", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("&.-without-background");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-color)");
  expect(css).toContain("&.-ghost");
  expect(css).toContain("&.-ghost:hover");
  expect(css).toContain("&.-display-block");
  expect(css).toContain("width: 100%");
  // Ghost hover derives a low-opacity, darkened wash from the brand (via @pantoken/plugin-colors),
  // so the coloured rest text stays legible instead of printing same-on-same. Appended in index.ts.
  expect(css).toContain(".instui-button.-without-background:hover");
  expect(css).toContain(
    "color-mix(in srgb, hsl(from var(--instui-component-base-button-primary-ghost-color) h s calc(l - 10)) 10%, transparent)",
  );
  expect(css).toContain("&.-without-border");
});

test("base button pins the medium height so sizes order small < medium < large", () => {
  const css = buttonCss({ prefix: "instui" });
  expect(css).toContain("min-height: var(--instui-component-base-button-medium-height)");
});
