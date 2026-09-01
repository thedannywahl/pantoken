import { expect, test } from "vite-plus/test";
import { danglingReferences } from "@pantoken/utils";
import { buttonCss, chromeCss, containerCss, textCss } from "../generated/embedded.ts";
import { buildPendoCss } from "../src/build.ts";
import { COMPONENTS, LAYER_ORDER } from "../src/layers.ts";

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

test("scope + important are on by default and toggle off", () => {
  const on = buildPendoCss();
  expect(on).toContain("@scope (._pendo-step-container) {");
  expect(on).toMatch(/!important\s*[;}]/); // declaration-level !important

  const off = buildPendoCss({ scope: false, important: false });
  expect(off).not.toContain("@scope");
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

test("banner classes select violet and sea container treatments", () => {
  expect(containerCss).toContain('[class~="instui-banner"]');
  expect(containerCss).toContain('[class~="instui-banner-sea"]');
  expect(containerCss).not.toContain("instui-banner-violet");
  expect(containerCss).toContain("--instui-component-banner-violet-background");
  expect(containerCss).toContain("--instui-component-banner-sea-background");
  expect(containerCss).toContain("--instui-icon-megaphone");
});

test("banner sizing follows the guide container at the InstUI sm breakpoint", () => {
  expect(containerCss).toContain("container: pantoken-pendo-guide / inline-size");
  expect(containerCss).toContain("@container pantoken-pendo-guide (max-width: 30em)");
  expect(containerCss).toContain("--instui-component-banner-relaxed-padding-vertical");
  expect(containerCss).toContain("--instui-component-banner-compact-padding-vertical");
  expect(textCss).toContain("@container pantoken-pendo-guide (max-width: 30em)");
  expect(textCss).toContain("--instui-component-heading-title-card-regular-font-size");
  expect(textCss).toContain("--instui-component-heading-title-card-mini-font-size");
});

test("banner buttons map Pendo variants without restyling the close button", () => {
  expect(buttonCss).toContain("._pendo-button-primaryButton, ._pendo-button-custom");
  expect(buttonCss).toContain("--instui-color-background-interactive-action-primary-on-color-base");
  expect(buttonCss).toContain("._pendo-button-secondaryButton, ._pendo-button-tertiaryButton");
  expect(buttonCss).toContain("background-color: transparent");
  expect(buttonCss).toContain('[aria-disabled="true"]');
  expect(buttonCss).not.toContain("._pendo-close-guide");
  expect(chromeCss).toContain("--instui-component-banner-close-button-margin-top");
});
