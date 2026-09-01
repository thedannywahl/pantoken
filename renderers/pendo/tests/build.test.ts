import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vite-plus/test";
import { danglingReferences } from "@pantoken/utils";
import { buttonCss, chromeCss, containerCss, textCss } from "../generated/embedded.ts";
import { buildPendoCss } from "../src/build.ts";
import { COMPONENTS, LAYER_ORDER, PENDO_VARS_CSS } from "../src/layers.ts";

test("generated global.css starts with the exact package version", () => {
  const root = resolve(import.meta.dirname, "..");
  const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
    name: string;
    version: string;
  };
  const css = readFileSync(resolve(root, "generated/global.css"), "utf8");
  expect(css.startsWith(`/*! ${packageJson.name}@${packageJson.version} */\n`)).toBe(true);
});

test("composes token layer, layer order, and all component layers", () => {
  const css = buildPendoCss();
  // @layer order declaration lists every layer, tokens first, manual last.
  expect(css).toContain(`@layer ${LAYER_ORDER.map((l) => `instui.${l}`).join(", ")};`);
  // token layer comes from pantoken, scoped to the guide container.
  expect(css).toContain("@layer instui.tokens {");
  expect(css).toContain('[class*="instui"]');
  expect(css).toContain("@property --instui-");
  // every component layer is present.
  for (const c of COMPONENTS) expect(css).toContain(`@layer instui.${c.layer} {`);
  // a representative component rule survived the port.
  expect(css).toContain("._pendo-button");
});

test("the focus ring is delegated to the focus-outline plugin in a last-declared layer", () => {
  const css = buildPendoCss();
  // focusOutline is the last layer (lowest !important priority) and holds the plugin's ring.
  expect(LAYER_ORDER[LAYER_ORDER.length - 1]).toBe("focusOutline");
  expect(css).toContain("@layer instui.focusOutline {");
  expect(css).toContain(":where(:focus-visible)");
  expect(css).toContain("--instui-focus-outline-color");
  // The manual focus-outline tokens and the delegated per-component :focus rules are gone.
  expect(css).not.toContain("--manual-light-focus-outline");
});

test("close and standard button interactions use the canonical component tokens", () => {
  expect(chromeCss).toContain("display: inline-flex");
  expect(chromeCss).toContain("align-items: center");
  expect(chromeCss).toContain("justify-content: center");
  expect(chromeCss).toContain("mask: var(--instui-icon-x) center / contain no-repeat");
  expect(chromeCss).toContain("transform: translateY(2px)");
  expect(chromeCss).toContain("--instui-color-background-interactive-action-tertiary-hover");
  expect(chromeCss).toContain("--instui-color-background-interactive-action-tertiary-active");
  expect(chromeCss).not.toContain("primary-ghost-hover-background");
  expect(buttonCss).toContain("--instui-color-background-interactive-action-primary-hover");
  expect(buttonCss).toContain("--instui-color-stroke-interactive-action-primary-active");
  expect(buttonCss).toContain("--instui-color-background-interactive-action-secondary-hover");
  expect(buttonCss).toContain("--instui-color-stroke-interactive-action-secondary-active");
});

test("scope + important are on by default and toggle off", () => {
  const on = buildPendoCss();
  expect(on).toContain('@scope ([class*="instui"]._pendo-step-container) {');
  expect(on).toContain(":scope");
  expect(on).toMatch(/!important\s*[;}]/); // declaration-level !important

  const off = buildPendoCss({ scope: false, important: false });
  expect(off).not.toContain("@scope");
  expect(off).not.toContain(":is(:scope");
  expect(off).toContain(':is(:not(*), [class*="instui"])');
  // No declaration carries !important (a comment in popover.css mentions the word, so match a decl).
  expect(off).not.toMatch(/!important\s*[;}]/);
});

test("!important skips custom properties and @property descriptors", () => {
  const css = buildPendoCss();
  // custom-property declarations must not get !important.
  expect(css).not.toMatch(/--[\w-]+:[^;{}]*!important/);
  // @property initial-value stays clean.
  expect(css).not.toMatch(/initial-value:[^;}]*!important/);
});

test("custom scope selector is honored", () => {
  const css = buildPendoCss({ scopeSelector: '._pendo-step-container[class*="guide-instui"]' });
  expect(css).toContain('@scope (._pendo-step-container[class*="guide-instui"]) {');
});

test("the composed stylesheet has no dangling --instui-* references (self-contained)", () => {
  // Every var(--instui-*) the guide CSS references is defined in the same output (token layer,
  // manual extras, or the focus-outline layer). Shared drift check from @pantoken/utils.
  expect(danglingReferences(buildPendoCss())).toEqual([]);
});

test("flatten option converts @property at-rules to :scope declarations", () => {
  const css = buildPendoCss({ flatten: true });
  expect(css).not.toContain("@property --instui-");
  // Flattened declarations land on :scope inside the @scope block.
  expect(css).toContain(":scope");
});

test("mangle option renames --instui-* custom properties to short identifiers", () => {
  const css = buildPendoCss({ mangle: true });
  // After mangling, no long instui primitive names remain.
  expect(css).not.toContain("--instui-primitive-");
});

test("compact theme class suffixes select banner color and glyph treatments", () => {
  expect(containerCss).toContain('[class*="instui"])[data-layout="lightboxBlank"]');
  expect(containerCss).toContain(':not([class*="instui-alert"])');
  expect(containerCss).toContain('[class*="-sea"]');
  expect(containerCss).toContain('[class*="-megaphone"]');
  expect(containerCss).toContain('[class*="-poll"]');
  expect(containerCss).toContain('[class*="-canvas"]');
  expect(containerCss).toContain('[class*="-parchment"]');
  expect(containerCss).toContain('[class*="-mastery"]');
  expect(containerCss).toContain('[class*="-learnplatform"]');
  expect(containerCss).toContain("--instui-component-banner-violet-background");
  expect(containerCss).toContain("--instui-component-banner-sea-background");
  expect(containerCss).toContain("box-shadow: none;");
  expect(containerCss).toContain("--instui-icon-lightbulb");
  expect(containerCss).toContain("--instui-icon-megaphone");
  expect(containerCss).toContain("--instui-icon-message-circle-question-mark");
  expect(containerCss).toContain("--instui-logo-canvas-icon-reversed");
  expect(containerCss).toContain("--instui-logo-parchment-icon-reversed");
  expect(containerCss).toContain("--instui-logo-mastery-icon-reversed");
  expect(containerCss).toContain("--instui-logo-learnplatform-icon-reversed");
  expect(containerCss).toContain('&[class*="-danger"]');
  expect(containerCss).toContain('&[class*="-success"]');
  expect(containerCss).toContain('&[class*="-warning"]');
  expect(containerCss).toContain(
    ':is(:scope[class*="instui-alert"], [class*="instui-alert"])[data-layout="lightboxBlank"]',
  );
  expect(PENDO_VARS_CSS).toContain("--instui-logo-canvas-icon-reversed");
  expect(PENDO_VARS_CSS).toContain("--instui-logo-parchment-icon-reversed");
  expect(PENDO_VARS_CSS).toContain("--instui-logo-mastery-icon-reversed");
  expect(PENDO_VARS_CSS).toContain("--instui-logo-learnplatform-icon-reversed");
  expect(PENDO_VARS_CSS).not.toContain("horizontal");
});

test("banner sizing follows the guide container at the InstUI sm breakpoint", () => {
  expect(containerCss).toContain("container: pantoken-pendo-guide / inline-size");
  expect(containerCss).toContain("@container pantoken-pendo-guide (max-width: 30em)");
  expect(containerCss).toContain("--instui-component-banner-relaxed-padding-vertical");
  expect(containerCss).toContain("--instui-component-banner-compact-padding-vertical");
  expect(containerCss).toContain(
    "inset-block-start: var(--instui-component-banner-relaxed-padding-vertical)",
  );
  expect(containerCss).toContain(
    "inset-block-start: var(--instui-component-banner-compact-padding-vertical)",
  );
  expect(textCss).toContain("@container pantoken-pendo-guide (max-width: 30em)");
  expect(textCss).toContain("--instui-component-heading-title-card-regular-font-size");
  expect(textCss).toContain("--instui-component-heading-title-card-mini-font-size");
});

test("layout titles and subtitles follow the banner heading scale", () => {
  expect(textCss).toContain(
    ':is(:scope[class*="instui-alert"], [class*="instui-alert"])[data-layout="lightboxBlank"]',
  );
  expect(textCss).toContain("--instui-component-heading-title-card-regular-font-size");
  expect(textCss).toContain('[data-layout="tooltipBlank"]');
  expect(textCss).toContain("--instui-component-heading-title-card-mini-font-size");
  expect(textCss).toContain("--instui-font-size-text-sm");
});

test("popover cards retain their border and small padding on every edge", () => {
  expect(containerCss).toContain(
    "border: var(--instui-border-width-sm) solid var(--instui-component-popover-border-color);",
  );
  expect(containerCss).toContain(
    "padding: var(--instui-component-shared-tokens-spacing-padding-card-sm);",
  );
});

test("banner buttons map Pendo variants without restyling the close button", () => {
  expect(buttonCss).toContain("._pendo-button-primaryButton, ._pendo-button-custom");
  expect(buttonCss).toContain("--instui-color-background-interactive-action-primary-on-color-base");
  expect(buttonCss).toContain("._pendo-button-secondaryButton, ._pendo-button-tertiaryButton");
  expect(buttonCss).toContain("background-color: transparent");
  expect(buttonCss).toContain(
    "border-color: var(--instui-color-stroke-interactive-action-primary-on-color-base);",
  );
  expect(buttonCss).toContain(
    "color: var(--instui-color-stroke-interactive-action-primary-on-color-base);",
  );
  expect(buttonCss).toContain('[aria-disabled="true"]');
  expect(buttonCss).not.toContain("._pendo-close-guide");
  expect(chromeCss).toContain("--instui-component-banner-close-button-margin-top");
});
