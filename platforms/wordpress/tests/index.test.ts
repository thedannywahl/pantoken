import { expect, test } from "vite-plus/test";
import { toThemeJson } from "../src/to-theme-json.ts";
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
  { name: "--instui-spacing-space-md", syntax: "<length>", inherits: true, value: "0.75rem" },
  {
    name: "--instui-primitive-font-family-lato",
    syntax: "*",
    inherits: true,
    value: "Lato, sans-serif",
  },
  {
    name: "--instui-icon-x",
    syntax: "<image>",
    inherits: true,
    value: "url('data:...')",
    meta: { kind: "icon" },
  },
];

test("emits a v3 theme.json with palette, spacing, and font families", () => {
  const tj = toThemeJson(fixture);
  expect(tj.version).toBe(3);
  expect(tj.$schema).toContain("schemas.wp.org");

  const brand = tj.settings.color.palette.find((p) => p.slug === "brand");
  expect(brand?.color).toBe("#0374B5"); // reference resolved

  expect(tj.settings.spacing.spacingSizes.find((s) => s.slug === "space-md")?.size).toBe("0.75rem");
  expect(tj.settings.typography.fontFamilies.find((f) => f.slug === "lato")?.fontFamily).toContain(
    "Lato",
  );
});

test("excludes icons from the palette", () => {
  const tj = toThemeJson(fixture);
  expect(tj.settings.color.palette.some((p) => p.slug.startsWith("icon"))).toBe(false);
});
