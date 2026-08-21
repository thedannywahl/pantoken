import { expect, test } from "vite-plus/test";
import {
  VAR_RE,
  camelCase,
  candidatePropertyCoverage,
  colorUtilitiesCss,
  danglingReferences,
  makeResolver,
  parseHexColor,
  resolveTokens,
  sanitizeSvg,
  syntaxMismatches,
  tokenUtilitiesCss,
  unknownReferences,
} from "../src/index.ts";
import type { Token } from "@pantoken/model";

const IR: Token[] = [
  { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#0374B5" },
  { name: "--instui-brand", syntax: "*", inherits: true, value: "var(--instui-leaf)" },
  { name: "--instui-bg", syntax: "*", inherits: true, value: "light-dark(#fff, #000)" },
  {
    name: "--instui-themed-ref",
    syntax: "*",
    inherits: true,
    value: "light-dark(var(--instui-leaf), #000)",
  },
];

test("typed VAR_RE captures the property name", () => {
  const m = VAR_RE.exec("color: var(--instui-leaf);");
  expect(m?.[1]).toBe("--instui-leaf");
});

test("makeResolver expands reference chains", () => {
  const resolve = makeResolver(IR);
  expect(resolve("var(--instui-brand)")).toBe("#0374B5");
});

test("makeResolver keeps light-dark() without a mode, collapses with one", () => {
  expect(makeResolver(IR)("var(--instui-bg)")).toBe("light-dark(#fff, #000)");
  expect(makeResolver(IR, { mode: "light" })("var(--instui-bg)")).toBe("#fff");
  expect(makeResolver(IR, { mode: "dark" })("var(--instui-bg)")).toBe("#000");
  // light-dark whose branch is itself a reference resolves too.
  expect(makeResolver(IR, { mode: "light" })("var(--instui-themed-ref)")).toBe("#0374B5");
});

test("overrides win over the base set", () => {
  const over: Token[] = [
    { name: "--instui-leaf", syntax: "<color>", inherits: true, value: "#000" },
  ];
  expect(makeResolver(IR, { overrides: over })("var(--instui-brand)")).toBe("#000");
});

test("resolveTokens returns a name→resolved map", () => {
  const map = resolveTokens(IR, { mode: "dark" });
  expect(map.get("--instui-brand")).toBe("#0374B5");
  expect(map.get("--instui-bg")).toBe("#000");
});

test("camelCase converts kebab", () => {
  expect(camelCase("color-background-brand")).toBe("colorBackgroundBrand");
});

test("sanitizeSvg removes script elements", () => {
  const in_ = `<svg><script>alert(1)</script><path d="M0 0"/></svg>`;
  expect(sanitizeSvg(in_)).not.toContain("<script");
  expect(sanitizeSvg(in_)).toContain("<path");
});

test("sanitizeSvg removes event-handler attributes", () => {
  const in_ = `<svg><path onclick="evil()" onload="bad()" d="M0 0"/></svg>`;
  const out = sanitizeSvg(in_);
  expect(out).not.toContain("onclick");
  expect(out).not.toContain("onload");
  expect(out).toContain(`d="M0 0"`);
});

test("sanitizeSvg is case-insensitive for script tags", () => {
  expect(sanitizeSvg("<svg><SCRIPT>x</SCRIPT></svg>")).not.toContain("SCRIPT");
});

test("sanitizeSvg passes through clean SVG unchanged", () => {
  const clean = `<svg viewBox="0 0 24 24"><path d="M0 0"/></svg>`;
  expect(sanitizeSvg(clean)).toBe(clean);
});

test("sanitizeSvg strips on* attributes that would survive a single-pass replacement", () => {
  // Crafted so the outer on* value contains another on* — a single pass would only strip the outer.
  const in_ = `<svg><path ononclick="evil()" d="M0 0"/></svg>`;
  const out = sanitizeSvg(in_);
  expect(out).not.toContain("onclick");
  expect(out).not.toContain("on");
});

test("parseHexColor handles #rgb, #rrggbb, #rrggbbaa", () => {
  expect(parseHexColor("#fff")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
  expect(parseHexColor("#0374B5")).toEqual({ r: 3, g: 116, b: 181, a: 1 });
  expect(parseHexColor("#00000080")?.a).toBeCloseTo(128 / 255);
  expect(parseHexColor("nope")).toBeUndefined();
});

test("unknownReferences flags token names not defined by the IR (drift)", () => {
  const bridge = "--x: var(--instui-leaf); --y: var(--instui-gone);";
  expect(unknownReferences(bridge, IR)).toEqual(["--instui-gone"]);
  expect(unknownReferences("--x: var(--instui-leaf);", IR)).toEqual([]);
});

test("danglingReferences flags var() refs a stylesheet never defines", () => {
  const selfContained = "@property --instui-a {} .b { color: var(--instui-a); }";
  expect(danglingReferences(selfContained)).toEqual([]);
  const dangling =
    ":root { --instui-a: red; } .b { color: var(--instui-a); background: var(--instui-b); }";
  expect(danglingReferences(dangling)).toEqual(["--instui-b"]);
});

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

test("colorUtilitiesCss maps bg/text/border to semantic colour tokens only", () => {
  const css = colorUtilitiesCss(
    {
      background: ["brand", "success"],
      text: ["secondary"],
      stroke: ["base"],
    },
    { prefix: "instui" },
  );
  expect(css).toContain(".instui-bg-brand { background: var(--instui-color-background-brand); }");
  expect(css).toContain(".instui-text-secondary { color: var(--instui-color-text-secondary); }");
  expect(css).toContain(".instui-border-base { border-color: var(--instui-color-stroke-base); }");
});

test("colorUtilitiesCss accepts explicit [name, token] pairs alongside plain names", () => {
  const css = colorUtilitiesCss(
    {
      background: [["primary", "--instui-component-view-background-primary"]],
      text: [],
      stroke: [],
    },
    { prefix: "instui" },
  );
  expect(css).toContain(
    ".instui-bg-primary { background: var(--instui-component-view-background-primary); }",
  );
});

test("colorUtilitiesCss chainTargets emits a bare selector plus one per target", () => {
  const css = colorUtilitiesCss(
    { background: ["brand"], text: [], stroke: [] },
    { prefix: "instui", chainTargets: ["button", "view"] },
  );
  expect(css).toContain(
    ".instui-bg-brand, .instui-button.-bg-brand, .instui-view.-bg-brand { background: var(--instui-color-background-brand); }",
  );
});

test("tokenUtilitiesCss maps each token to its property; class name is the token tail", () => {
  const css = tokenUtilitiesCss(
    [
      { property: "font-weight", tokens: ["--instui-font-weight-body-strong"] },
      { property: "border-radius", tokens: ["--instui-border-radius-md"] },
    ],
    { prefix: "instui" },
  );
  expect(css).toContain(
    ".instui-font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }",
  );
  expect(css).toContain(
    ".instui-border-radius-md { border-radius: var(--instui-border-radius-md); }",
  );
  // Unprefixed opt-out drops the prefix but keeps the full token tail.
  expect(
    tokenUtilitiesCss([{ property: "font-weight", tokens: ["--instui-font-weight-body-strong"] }], {
      prefix: null,
    }),
  ).toContain(".font-weight-body-strong { font-weight: var(--instui-font-weight-body-strong); }");
});
