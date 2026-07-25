import { expect, test } from "vite-plus/test";
import { toDtcg } from "../src/transform.ts";
import type { Token } from "@pantoken/model";

const fixture: Token[] = [
  { name: "--instui-primitive-color-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  {
    name: "--instui-color-brand",
    syntax: "*",
    inherits: true,
    value: "var(--instui-primitive-color-blue)",
    refersTo: "--instui-primitive-color-blue",
  },
  {
    name: "--instui-color-bg",
    syntax: "*",
    inherits: true,
    value: "light-dark(#fff, #000)",
    themed: true,
  },
  { name: "--instui-spacing-md", syntax: "<length>", inherits: true, value: "16px" },
  {
    name: "--instui-icon-x",
    syntax: "<image>",
    inherits: true,
    value: "url('data:...')",
    meta: { kind: "icon" },
  },
];

test("emits a nested DTCG tree with $value/$type, resolving references", () => {
  const doc = toDtcg(fixture, "light") as Record<
    string,
    Record<string, { $value: string; $type?: string }>
  >;
  expect(doc.color.brand).toEqual({ $value: "#0374B5", $type: "color" });
  expect(doc.spacing.md).toEqual({ $value: "16px", $type: "dimension" });
});

test("collapses light-dark() to the chosen mode", () => {
  const light = toDtcg(fixture, "light") as Record<string, Record<string, { $value: string }>>;
  const dark = toDtcg(fixture, "dark") as Record<string, Record<string, { $value: string }>>;
  expect(light.color.bg.$value).toBe("#fff");
  expect(dark.color.bg.$value).toBe("#000");
});

test("excludes icon tokens (DTCG describes tokens, not glyphs)", () => {
  const doc = toDtcg(fixture) as Record<string, unknown>;
  expect(doc.icon).toBeUndefined();
});

test("maps explicit numeric/percentage/integer syntaxes to DTCG $type", () => {
  const tokens: Token[] = [
    { name: "--instui-number-lh", syntax: "<number>", inherits: true, value: "1.5" },
    { name: "--instui-integer-z", syntax: "<integer>", inherits: true, value: "10" },
    { name: "--instui-percentage-w", syntax: "<percentage>", inherits: true, value: "50%" },
  ];
  const doc = toDtcg(tokens) as Record<string, Record<string, { $type?: string }>>;
  expect(doc.number.lh.$type).toBe("number");
  expect(doc.integer.z.$type).toBe("number");
  expect(doc.percentage.w.$type).toBe("dimension");
});

test("sniffs the $type of reference (syntax '*') tokens from the resolved value", () => {
  const tokens: Token[] = [
    { name: "--instui-primitive-red", syntax: "<color>", inherits: true, value: "#ff0000" },
    // Resolves to a color via var() → sniffed as color.
    {
      name: "--instui-color-alias",
      syntax: "*",
      inherits: true,
      value: "var(--instui-primitive-red)",
      refersTo: "--instui-primitive-red",
    },
    // Concrete dimension / number values sniffed directly.
    { name: "--instui-x-dim", syntax: "*", inherits: true, value: "8px" },
    { name: "--instui-x-num", syntax: "*", inherits: true, value: "42" },
    // rgb()/hsl() functional colors are recognized too.
    { name: "--instui-x-rgb", syntax: "*", inherits: true, value: "rgb(1, 2, 3)" },
    // No recognizable shape → no $type.
    { name: "--instui-x-word", syntax: "*", inherits: true, value: "auto" },
  ];
  const doc = toDtcg(tokens) as Record<string, Record<string, { $value: string; $type?: string }>>;
  expect(doc.color.alias.$type).toBe("color");
  expect(doc.x.dim.$type).toBe("dimension");
  expect(doc.x.num.$type).toBe("number");
  expect(doc.x.rgb.$type).toBe("color");
  expect(doc.x.word).toEqual({ $value: "auto" });
});

test("defaults mode to 'light' when omitted", () => {
  const doc = toDtcg(fixture) as Record<string, Record<string, { $value: string }>>;
  expect(doc.color.bg.$value).toBe("#fff");
});
