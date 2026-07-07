import { expect, test } from "vite-plus/test";
import { toFigmaColor, toFigmaVariables } from "../src/index.ts";
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
    value: "light-dark(#ffffff, #000000)",
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

test("toFigmaColor parses hex to RGBA 0-1", () => {
  expect(toFigmaColor("#ffffff")).toEqual({ r: 1, g: 1, b: 1, a: 1 });
  expect(toFigmaColor("not-a-color")).toBeUndefined();
});

test("builds a collection with light/dark modes and typed variables", () => {
  const payload = toFigmaVariables(fixture);
  expect(payload.collection).toBe("Instructure");
  expect(payload.modes).toEqual(["light", "dark"]);

  const byName = new Map(payload.variables.map((v) => [v.name, v]));
  const brand = byName.get("color/brand");
  expect(brand?.type).toBe("COLOR");
  expect(brand?.valuesByMode.light).toEqual({
    r: 0.011764705882352941,
    g: 0.4549019607843137,
    b: 0.7098039215686275,
    a: 1,
  });

  const bg = byName.get("color/bg");
  expect(bg?.valuesByMode.light).toEqual({ r: 1, g: 1, b: 1, a: 1 });
  expect(bg?.valuesByMode.dark).toEqual({ r: 0, g: 0, b: 0, a: 1 });

  const md = byName.get("spacing/md");
  expect(md?.type).toBe("FLOAT");
  expect(md?.valuesByMode.light).toBe(16);
});

test("excludes icon tokens", () => {
  const payload = toFigmaVariables(fixture);
  expect(payload.variables.some((v) => v.name.startsWith("icon/"))).toBe(false);
});
