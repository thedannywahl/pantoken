import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { unknownReferences } from "@pantoken/utils";
import { byTheme } from "@pantoken/tokens";
import { customComponents, cardRules, bannerRules } from "../src/index.ts";
import { agentShellRules } from "../src/components/agent-shell/index.ts";

const cssOf = (plugin: ReturnType<typeof customComponents>): string => {
  const out = plugin.css?.({ tokens: [], css: "" });
  return (out && "append" in out ? (out.append as string) : "") || "";
};

test("is a css-only plugin", () => {
  expect(capabilitiesOf(customComponents())).toEqual(["css"]);
});

test("appends by default, prepends when asked", () => {
  const appended = customComponents().css?.({ tokens: [], css: "" });
  expect(appended).toHaveProperty("append");
  const prepended = customComponents({ position: "prepend" }).css?.({ tokens: [], css: "" });
  expect(prepended).toHaveProperty("prepend");
});

test("card root uses the dedicated background, sm border-radius as mobile default, and elevation-card", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("var(--instui-component-card-background-color)");
  expect(css).toContain("var(--instui-component-card-border-radius-base-sm)");
  expect(css).toContain("var(--instui-elevation-card)");
});

test("card root has overflow:hidden and flex-shrink:0", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("overflow: hidden");
  expect(css).toContain("flex-shrink: 0");
});

test("responsive breakpoints step padding and border-radius at 320px and 640px", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("@media (min-width: 20rem)");
  expect(css).toContain("@media (min-width: 40rem)");
  expect(css).toContain("var(--instui-component-card-padding-base-sm)");
  expect(css).toContain("var(--instui-component-card-padding-base-md)");
  expect(css).toContain("var(--instui-component-card-padding-base-lg)");
  expect(css).toContain("var(--instui-component-card-border-radius-base-md)");
  expect(css).toContain("var(--instui-component-card-border-radius-base-lg)");
});

test("container variant adds border and responsive gap/border-radius to direct children", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("-variant-container");
  expect(css).toContain("var(--instui-component-card-nested-border-color)");
  expect(css).toContain("--instui-component-card-border-radius-nested-sm");
  expect(css).toContain("--instui-component-card-border-radius-nested-lg");
  expect(css).toContain(
    "var(--instui-component-shared-tokens-spacing-gap-cards-nested-containers-sm)",
  );
  expect(css).toContain(
    "var(--instui-component-shared-tokens-spacing-gap-cards-nested-containers-lg)",
  );
});

test("@scope block contains container-variant direct-child rules", () => {
  const css = cssOf(customComponents());
  expect(css).toContain("@scope (.instui-card)");
  expect(css).toMatch(/&\.-variant-container\s*>\s*\*/u);
});

test("cardRules() and bannerRules() default to instui- prefix and both appear in the plugin css output", () => {
  const css = cssOf(customComponents());
  expect(css).toContain(cardRules());
  expect(css).toContain(bannerRules());
});

test("cardRules accepts an explicit prefix", () => {
  expect(cardRules("my-")).toContain(".my-card");
  expect(cardRules("")).toContain(".card {");
});

test("agentShellRules emits prefixed and unprefixed selectors", () => {
  expect(agentShellRules()).toContain(".instui-agent-shell");
  expect(agentShellRules("my-")).toContain(".my-agent-shell");
  expect(agentShellRules("")).toContain(".agent-shell");
});

test("card references only real tokens per theme", () => {
  // --instui-elevation-* is declared by the shared elevation sheet, not the base token IR.
  const isLocal = (ref: string): boolean => ref.startsWith("--instui-elevation-");
  for (const theme of ["rebrand", "canvas", "canvasHighContrast"] as const) {
    const drift = unknownReferences(cardRules("instui-"), byTheme(theme)).filter(
      (ref) => !isLocal(ref),
    );
    expect(drift).toEqual([]);
  }
});

test("bannerRules emits prefixed and unprefixed selectors", () => {
  expect(bannerRules()).toContain(".instui-banner");
  expect(bannerRules("my-")).toContain(".my-banner");
  expect(bannerRules("")).toContain(".banner {");
});

test("banner root uses border/color/radius tokens and defaults to relaxed size", () => {
  const css = bannerRules("instui-");
  expect(css).toContain("var(--instui-component-banner-border-color)");
  expect(css).toContain("var(--instui-component-banner-border-radius)");
  expect(css).toContain("var(--instui-component-banner-color)");
  expect(css).toContain("var(--instui-component-banner-relaxed-padding-vertical)");
  expect(css).toContain("var(--instui-component-banner-relaxed-content-gap-horizontal)");
});

test("banner -size-compact switches padding/gap/icon-radius tokens", () => {
  const css = bannerRules("instui-");
  expect(css).toContain("-size-compact");
  expect(css).toContain("var(--instui-component-banner-compact-padding-vertical)");
  expect(css).toContain("var(--instui-component-banner-compact-content-gap-horizontal)");
  expect(css).toContain("var(--instui-component-banner-compact-icon-border-radius)");
});

test("banner color modifiers set background and icon-background tokens", () => {
  const css = bannerRules("instui-");
  expect(css).toContain("-color-violet");
  expect(css).toContain("var(--instui-component-banner-violet-background)");
  expect(css).toContain("var(--instui-component-banner-violet-icon-background)");
  expect(css).toContain("-color-sea");
  expect(css).toContain("var(--instui-component-banner-sea-background)");
  expect(css).toContain("var(--instui-component-banner-sea-icon-background)");
});

test("banner renders an info icon by default and supports custom icon modifiers", () => {
  const css = bannerRules("instui-");
  expect(css).toContain("--pantoken-banner-glyph: var(--instui-icon-info)");
  expect(css).toContain("--pantoken-banner-glyph: var(--pantoken-glyph)");
  expect(css).toContain("-webkit-mask: var(--pantoken-banner-glyph) center / 1.125rem no-repeat");
});

test("banner icon is top-aligned and sizes its swatch by spacing variant", () => {
  const css = bannerRules("instui-");
  expect(css).toContain("align-items: flex-start");
  expect(css).toContain("--pantoken-banner-icon-size: 2rem");
  expect(css).toContain("--pantoken-banner-icon-size: 1.5rem");
  expect(css).toContain("var(--instui-component-banner-relaxed-icon-border-radius)");
  expect(css).toContain("var(--instui-component-banner-compact-icon-border-radius)");
});

test("banner title and content use typography appropriate to the spacing variant", () => {
  const css = bannerRules("instui-");
  expect(css).toMatch(/>\s*\.content\s*>\s*\.title/u);
  expect(css).toContain("var(--instui-component-heading-title-card-regular-font-size)");
  expect(css).toContain("var(--instui-component-heading-title-card-mini-font-size)");
  expect(css).toContain("var(--instui-font-size-text-base)");
  expect(css).toContain("var(--instui-component-text-content-small-font-size)");
  expect(css).toContain("var(--instui-component-text-content-small-line-height)");
});

test("banner pins a small close button at the top end and reserves content space", () => {
  const css = bannerRules("instui-");
  expect(css).toMatch(/>\s*\.instui-close-button:not\(\[class\*="-size-"\]\)/u);
  expect(css).toContain("var(--instui-component-base-button-small-height)");
  expect(css).toContain("position: absolute");
  expect(css).toContain(
    "inset-block-start: var(--instui-component-banner-close-button-margin-top)",
  );
  expect(css).toContain(
    "inset-inline-end: var(--instui-component-banner-close-button-margin-right)",
  );
  expect(css).toMatch(/:has\(>\s*\.instui-close-button\)\s*>\s*\.content/u);
});

test("banner keeps elevation absent and gives uncoloured buttons the on-color primary treatment", () => {
  const css = bannerRules("instui-");
  expect(css).not.toContain("box-shadow:");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-background)");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-hover-background)");
  expect(css).toContain("var(--instui-component-base-button-primary-inverse-active-background)");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-hover-border-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-on-color-active-border-color)");
});

test("banner references only real tokens per theme", () => {
  for (const theme of ["rebrand", "canvas", "canvasHighContrast"] as const) {
    const drift = unknownReferences(bannerRules("instui-"), byTheme(theme));
    expect(drift).toEqual([]);
  }
});
