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
