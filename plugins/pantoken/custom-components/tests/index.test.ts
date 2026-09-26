import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { unknownReferences } from "@pantoken/utils";
import { byTheme } from "@pantoken/tokens";
import {
  agentShellRules,
  aiGradientRules,
  bannerRules,
  buttonSetRules,
  cardRules,
  customComponents,
  logoRules,
} from "../src/index.ts";

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

test("every custom component appears in the plugin css output", () => {
  const css = cssOf(customComponents());
  expect(css).toContain(cardRules());
  expect(css).toContain(agentShellRules());
  expect(css).toContain(bannerRules());
  expect(css).toContain(aiGradientRules());
  expect(css).toContain(logoRules());
  expect(css).toContain(buttonSetRules());
});

test("buttonSetRules emits prefixed and unprefixed selectors", () => {
  expect(buttonSetRules()).toContain(".instui-button-set");
  expect(buttonSetRules("my-")).toContain(".my-button-set");
  expect(buttonSetRules("")).toContain(".button-set {");
});

test("button-set joins show one shared 1px border that -without-seam hides", () => {
  const css = buttonSetRules("instui-");
  expect(css).toContain(".instui-button-set {");
  expect(css).toContain("gap: 0");
  expect(css).toContain("flex-wrap: nowrap");
  expect(css).not.toContain("flex-wrap: wrap");
  expect(css).not.toContain("box-shadow");
  expect(css).toContain(".instui-button-set > .instui-button {");
  expect(css).toContain("border-radius: 0");
  expect(css).toContain(
    ".instui-button-set:is(:not(.-color-ai-secondary), .-without-seam) > .instui-button:not(:first-child) {\n  border-inline-start: 0;",
  );
  expect(css).toContain(
    ".instui-button-set.-color-ai-secondary:not(.-without-seam) {\n  gap: var(--instui-border-width-sm);",
  );
  expect(css).toContain("margin-inline-start: calc(-1 * var(--instui-border-width-sm))");
  // Must stay the last rule so it outranks the group's color/hover/active border colors.
  expect(css.trimEnd()).toMatch(
    /\.instui-button-set\.-without-seam > \.instui-button\.instui-button:not\(:last-child\) \{\n {2}border-inline-end-color: transparent;\n\}$/u,
  );
  expect(css).toContain(".instui-button-set > .instui-button:first-child");
  expect(css).toContain(
    "border-start-start-radius: var(--instui-component-base-button-border-radius)",
  );
  expect(css).toContain(".instui-button-set > .instui-button:last-child");
  expect(css).toContain(
    "border-start-end-radius: var(--instui-component-base-button-border-radius)",
  );
});

test("button-set cascades -size-sm and -toggle defaults to unmodified children", () => {
  const css = buttonSetRules("instui-");
  expect(css).toContain('.instui-button-set.-size-sm > .instui-button:not([class*="-size-"])');
  expect(css).toContain("var(--instui-component-base-button-small-height)");
  expect(css).toContain(
    '.instui-button-set.-toggle > .instui-button:not(.-toggle)[aria-pressed="true"]',
  );
  expect(css).toContain("var(--instui-color-background-interactive-action-secondary-active)");
});

test("button-set cascades -color-secondary to unmodified children only", () => {
  const css = buttonSetRules("instui-");
  expect(css).toContain(
    '.instui-button-set.-color-secondary > .instui-button:not([class*="-color-"])',
  );
  expect(css).toContain("var(--instui-component-base-button-secondary-background)");
  // A button's own -color-* class is excluded from every cascaded rule, so button.css's
  // higher-specificity same-element rule for `.instui-button.-color-primary` still applies.
  expect(css).not.toContain(".instui-button-set.-color-secondary > .instui-button.-color-primary");
});

test("button-set never cascades -icon-* from the group", () => {
  const css = buttonSetRules("instui-");
  expect(css).not.toMatch(/\.instui-button-set\.-icon-/u);
  expect(css).toContain(':is([class^="-icon-"], [class*=" -icon-"])');
  expect(css).not.toContain('[class*="-icon-"]');
});

test("button-set references only real tokens per theme", () => {
  for (const theme of ["rebrand", "canvas", "canvasHighContrast"] as const) {
    const drift = unknownReferences(buttonSetRules("instui-"), byTheme(theme));
    expect(drift).toEqual([]);
  }
});

test("aiGradientRules emits AI border/background helpers in the plugin API", () => {
  const css = aiGradientRules();
  expect(css).toContain(":where(*) .--border-color-ai");
  expect(css).toContain(":where(*) .--background-ai");
  expect(css).toContain("linear-gradient");
  expect(css).toContain("background-clip: padding-box, border-box");
  expect(css).toContain(":dir(rtl)");
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

test("banner actions use alert inline primary and secondary treatments", () => {
  const css = bannerRules("instui-");
  expect(css).toContain("--instui-color-background-interactive-action-primary-base");
  expect(css).toContain("--instui-color-stroke-interactive-action-primary-hover");
  expect(css).toContain("--instui-component-base-button-primary-disabled-background-color");
  expect(css).toContain("--instui-component-base-button-primary-ghost-border-color");
  expect(css).toContain("--instui-component-base-button-tertiary-hover-text-color");
  expect(css).toContain("--instui-component-base-button-tertiary-disabled-border-color");
  expect(css).not.toContain("--instui-component-base-button-primary-inverse-background");
});

test("banner border modifier is computed in every vendored theme", () => {
  for (const theme of ["rebrand", "canvas", "canvasHighContrast"] as const) {
    const token = byTheme(theme).find(
      ({ name }) => name === "--instui-component-banner-border-color",
    );
    expect(token?.value).toMatch(/^(?:#[0-9a-f]{8}|light-dark\(#[0-9a-f]{8}, #[0-9a-f]{8}\))$/iu);
    expect(token?.value).not.toContain("var(");
  }
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

test("banner color backgrounds resolve through the upstream pastel tokens", () => {
  for (const theme of ["rebrand", "canvas", "canvasHighContrast"] as const) {
    const tokens = byTheme(theme);
    const valueOf = (name: string): string =>
      tokens.find((token) => token.name === name)?.value ?? "";
    expect(valueOf("--instui-component-banner-violet-background")).toBe(
      "var(--instui-color-background-pastel-violet)",
    );
    expect(valueOf("--instui-component-banner-sea-background")).toBe(
      "var(--instui-color-background-pastel-sea)",
    );
    expect(valueOf("--instui-color-background-pastel-violet")).not.toBe("");
    expect(valueOf("--instui-color-background-pastel-sea")).not.toBe("");
  }
});

test("banner renders a megaphone icon by default and supports custom icon modifiers", () => {
  const css = bannerRules("instui-");
  expect(css).toContain("--pantoken-banner-glyph: var(--instui-icon-megaphone)");
  expect(css).toContain('&:is([class^="-icon-"], [class*=" -icon-"])');
  expect(css).not.toContain('[class*="-icon-"]');
  expect(css).toContain("--pantoken-banner-glyph: var(--pantoken-glyph)");
  expect(css).toContain("-webkit-mask: var(--pantoken-banner-glyph) center / 1.125rem no-repeat");
});

test("banner icon is absolutely positioned and sizes its swatch by spacing variant", () => {
  const css = bannerRules("instui-");
  expect(css).toContain("--pantoken-banner-icon-size: 2rem");
  expect(css).toContain("--pantoken-banner-icon-size: 1.5rem");
  expect(css).toContain("var(--instui-component-banner-relaxed-icon-border-radius)");
  expect(css).toContain("var(--instui-component-banner-compact-icon-border-radius)");
});

test("banner title and content use typography appropriate to the spacing variant", () => {
  const css = bannerRules("instui-");
  expect(css).toMatch(
    />\s*:is\(h1, h2, h3, h4, h5, h6, \.instui-heading:not\(\[class\*="-level-"\]\)\)/u,
  );
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
  expect(css).toMatch(/:has\(>\s*\.instui-close-button\)\s*\{/u);
  expect(css).toContain("--pantoken-banner-close-button-reserve");
});

test("banner keeps elevation absent and defaults button-group actions to inline styles", () => {
  const css = bannerRules("instui-");
  expect(css).not.toContain("box-shadow:");
  expect(css).toMatch(
    />\s*\.instui-button:not\(\[class\*="-color-"\]\),\s*>\s*\.button-group\s*>\s*\.instui-button:not\(:has\(\+ \.instui-button\)\):not\(\[class\*="-color-"\]\)\s*\{/u,
  );
  expect(css).toContain(".button-group");
  expect(css).toContain("var(--instui-color-background-interactive-action-primary-base)");
  expect(css).toContain("var(--instui-color-stroke-interactive-action-primary-base)");
  expect(css).toContain("var(--instui-color-text-interactive-action-primary-base)");
  expect(css).toMatch(
    />\s*\.button-group\s*>\s*\.instui-button:has\(\+ \.instui-button\):not\(\[class\*="-color-"\]\)\s*\{/u,
  );
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-border-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-hover-background)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-hover-text-color)");
  expect(css).toContain("var(--instui-component-base-button-primary-ghost-active-background)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-active-text-color)");
  expect(css).toContain("var(--instui-component-base-button-tertiary-disabled-text-color)");
  expect(css).toContain("var(--instui-component-shared-tokens-spacing-gap-buttons)");
  expect(css).not.toContain("first-of-type");
  expect(css).not.toContain("~ .instui-button");
  expect(css).not.toContain("primary-inverse");
  expect(css).not.toContain('[class*=" -"]');
});

test("banner defaults buttons to -size-sm unless a size modifier is present", () => {
  const css = bannerRules("instui-");
  expect(css).toMatch(
    />\s*\.instui-button:not\(\[class\*="-size-"\]\),\s*>\s*\.button-group\s*>\s*\.instui-button:not\(\[class\*="-size-"\]\)\s*\{/u,
  );
  expect(css).toContain("var(--instui-component-base-button-small-font-size)");
  expect(css).toContain("var(--instui-component-base-button-small-height)");
  expect(css).toContain("var(--instui-component-base-button-small-padding-horizontal)");
});

test("banner references only real tokens per theme", () => {
  for (const theme of ["rebrand", "canvas", "canvasHighContrast"] as const) {
    const drift = unknownReferences(bannerRules("instui-"), byTheme(theme));
    expect(drift).toEqual([]);
  }
});
