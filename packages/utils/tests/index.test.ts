import { expect, test } from "vite-plus/test";
import {
  VAR_RE,
  camelCase,
  colorUtilitiesCss,
  danglingReferences,
  makeResolver,
  parseHexColor,
  resolveTokens,
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

test("colorUtilitiesCss maps bg/fg/border to semantic colour tokens only", () => {
  const css = colorUtilitiesCss(
    {
      background: ["brand", "success"],
      text: ["secondary"],
      stroke: ["base"],
    },
    { prefix: "instui" },
  );
  expect(css).toContain(".instui-bg-brand { background: var(--instui-color-background-brand); }");
  expect(css).toContain(".instui-fg-secondary { color: var(--instui-color-text-secondary); }");
  expect(css).toContain(".instui-border-base { border-color: var(--instui-color-stroke-base); }");
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
