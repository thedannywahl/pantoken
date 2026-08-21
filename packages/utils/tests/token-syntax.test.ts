import { expect, test } from "vite-plus/test";
import { candidatePropertyCoverage, syntaxMismatches } from "../src/token-syntax.ts";
import type { Token } from "@pantoken/model";

test("syntaxMismatches flags a font-weight value that fails the real CSS grammar", () => {
  const bad: Token = {
    name: "--instui-component-text-content-quote-font-weight",
    syntax: "*",
    inherits: true,
    value: "Medium Italic",
  };
  expect(syntaxMismatches([bad])).toEqual([{ name: bad.name, value: bad.value, kind: "mismatch" }]);
});

test("syntaxMismatches accepts a real font-weight value", () => {
  const good: Token = {
    name: "--instui-font-weight-body-base",
    syntax: "<integer>",
    inherits: true,
    value: "400",
  };
  expect(syntaxMismatches([good])).toEqual([]);
});

test("syntaxMismatches validates a real font-style value and flags a bad one", () => {
  const good: Token = {
    name: "--instui-component-text-content-quote-font-style",
    syntax: "*",
    inherits: true,
    value: "italic",
  };
  const bad: Token = { ...good, value: "Medium Italic" };
  expect(syntaxMismatches([good])).toEqual([]);
  expect(syntaxMismatches([bad])).toEqual([{ name: bad.name, value: bad.value, kind: "mismatch" }]);
});

test("syntaxMismatches accepts decomposed box-shadow/drop-shadow pieces as bare lengths, not the full composite grammar", () => {
  const pieces: Token[] = [
    {
      name: "--instui-component-avatar-box-shadow-blur",
      syntax: "*",
      inherits: true,
      value: "1rem",
    },
    { name: "--instui-component-avatar-box-shadow-x", syntax: "*", inherits: true, value: "0" },
    {
      name: "--instui-component-avatar-box-shadow-color",
      syntax: "*",
      inherits: true,
      value: "rgba(45,59,69,0.12)",
    },
    {
      name: "--instui-drop-shadow-blur-elevation1-dropshadow1",
      syntax: "*",
      inherits: true,
      value: "0.125rem",
    },
  ];
  expect(syntaxMismatches(pieces)).toEqual([]);
});

test("syntaxMismatches accepts an icon-color special value (currentColor), not an SVG url", () => {
  const iconColor: Token = {
    name: "--instui-icon-color-inherit",
    syntax: "*",
    inherits: true,
    value: "currentColor",
  };
  expect(syntaxMismatches([iconColor])).toEqual([]);
});

test("syntaxMismatches doesn't misroute a component whose NAME merely contains an unrelated property word", () => {
  // "ColorPicker" has "color" in its own component name, but this leaf is a real `padding`.
  const colorPickerPadding: Token = {
    name: "--instui-component-color-picker-hash-mark-container-left-padding",
    syntax: "*",
    inherits: true,
    value: "0.5rem",
  };
  expect(syntaxMismatches([colorPickerPadding])).toEqual([]);
});

test("syntaxMismatches flags a stringified `undefined` value (a real upstream bug)", () => {
  const bad: Token = {
    name: "--instui-component-top-nav-bar-layout-small-viewport-tray-fix-top-position",
    syntax: "*",
    inherits: true,
    value: "undefined",
  };
  expect(syntaxMismatches([bad])).toEqual([{ name: bad.name, value: bad.value, kind: "mismatch" }]);
});

test("syntaxMismatches accepts the primitive colour palette and background-* real properties", () => {
  const clean: Token[] = [
    {
      name: "--instui-primitive-color-aurora-aurora10",
      syntax: "*",
      inherits: true,
      value: "#D8FCEB",
    },
    { name: "--instui-primitive-opacity50", syntax: "*", inherits: true, value: "0.5" },
    {
      name: "--instui-component-color-indicator-background-size",
      syntax: "*",
      inherits: true,
      value: "0.5rem 0.5rem",
    },
    {
      name: "--instui-component-drawer-layout-tray-overflow-y",
      syntax: "*",
      inherits: true,
      value: "auto",
    },
    {
      name: "--instui-component-shared-tokens-focus-outline-inset",
      syntax: "*",
      inherits: true,
      value: "0rem",
    },
  ];
  expect(syntaxMismatches(clean)).toEqual([]);
});

test("syntaxMismatches doesn't shadow a real `margin`/`letter-spacing`/`background-size` with a generic length cluster", () => {
  const clean: Token[] = [
    {
      name: "--instui-component-byline-title-margin",
      syntax: "*",
      inherits: true,
      value: "0 0 0.5rem 0",
    },
    {
      name: "--instui-component-base-button-letter-spacing",
      syntax: "*",
      inherits: true,
      value: "normal",
    },
  ];
  expect(syntaxMismatches(clean)).toEqual([]);
});

test("syntaxMismatches accepts the final manually-mapped stragglers (border-bottom-inverse, transform, text-transform, digit/inverse-suffixed color)", () => {
  const clean: Token[] = [
    {
      name: "--instui-component-top-nav-bar-layout-small-viewport-bottom-border-inverse",
      syntax: "*",
      inherits: true,
      value: "0.0625rem solid #E8EAEC",
    },
    {
      name: "--instui-component-base-button-transform",
      syntax: "*",
      inherits: true,
      value: "none",
    },
    {
      name: "--instui-component-base-button-text-transform",
      syntax: "*",
      inherits: true,
      value: "none",
    },
    {
      name: "--instui-component-progress-circle-large-transform",
      syntax: "*",
      inherits: true,
      value: "4.5em",
    },
    {
      name: "--instui-color-drop-shadow-shadow-color1",
      syntax: "*",
      inherits: true,
      value: "rgba(0,0,0,0.1)",
    },
    {
      name: "--instui-component-top-nav-bar-item-color-inverse",
      syntax: "*",
      inherits: true,
      value: "inherit",
    },
    { name: "--instui-component-icon-illu-lg", syntax: "*", inherits: true, value: "10rem" },
    {
      name: "--instui-component-img-image-blur-amount",
      syntax: "*",
      inherits: true,
      value: "0.25em",
    },
  ];
  expect(syntaxMismatches(clean)).toEqual([]);
});

test("syntaxMismatches skips contextual (var()/light-dark()) values", () => {
  const ref: Token = {
    name: "--instui-font-weight-body-base",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-font-weight-bold)",
  };
  expect(syntaxMismatches([ref])).toEqual([]);
});

test("syntaxMismatches flags a name with no modeled property as unmodeled, not a mismatch", () => {
  const unmodeled: Token = {
    name: "--instui-some-unmapped-thing",
    syntax: "*",
    inherits: true,
    value: "anything at all",
  };
  expect(syntaxMismatches([unmodeled])).toEqual([
    { name: unmodeled.name, value: unmodeled.value, kind: "unmodeled" },
  ]);
});

test("syntaxMismatches validates a bespoke property against its shared grammar", () => {
  const validGlyph: Token = {
    name: "--instui-icon-glyph-alert",
    syntax: "<image>",
    inherits: true,
    value: "url(data:image/svg+xml,%3Csvg/%3E)",
  };
  const invalidGlyph: Token = { ...validGlyph, value: "not-a-url" };
  expect(syntaxMismatches([validGlyph])).toEqual([]);
  expect(syntaxMismatches([invalidGlyph])).toEqual([
    { name: invalidGlyph.name, value: invalidGlyph.value, kind: "mismatch" },
  ]);
});

test("candidatePropertyCoverage confirms a name pattern is safe to add for real values", () => {
  const colorsWithAlpha = [
    { name: "--instui-primitive-color-grey-opacity10", value: "rgba(28,34,43,0.1)" },
    { name: "--instui-primitive-color-white-opacity75", value: "rgba(255,255,255,0.75)" },
  ];
  expect(candidatePropertyCoverage(colorsWithAlpha, /-opacity\d/u, "color")).toEqual({
    matched: 2,
    invalid: [],
  });
});

test("candidatePropertyCoverage catches a plausible-looking but unsafe substring collision", () => {
  // A blind `/gap/` guess also matches an unrelated icon name — exactly what this check protects against.
  const collision = [
    { name: "--instui-spacing-gap-md", value: "1rem" },
    { name: "--instui-icon-megaphone", value: "url(data:image/svg+xml,%3Csvg/%3E)" },
  ];
  const coverage = candidatePropertyCoverage(collision, /gap/u, "gap");
  expect(coverage.matched).toBe(2);
  expect(coverage.invalid).toEqual([collision[1]]);
});
