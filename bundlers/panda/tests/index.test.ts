import { expect, test } from "vite-plus/test";
import { toPandaPreset } from "../src/to-panda.ts";
import defaultPreset, { pantokenPreset } from "../src/index.ts";
import type { Token } from "@pantoken/model";

test("the ready-made preset is built from the real token IR", () => {
  expect(pantokenPreset.name).toBe("@pantoken/panda");
  expect(pantokenPreset.theme.tokens.colors).toBeTruthy();
  expect(Object.keys(pantokenPreset.theme.tokens.colors ?? {}).length).toBeGreaterThan(0);
  expect(defaultPreset).toBe(pantokenPreset);
});

test("categorizes tokens into every Panda bucket by name and value", () => {
  const fixture: Token[] = [
    { name: "--instui-shadow-depth-1", syntax: "*", inherits: true, value: "0 1px 2px #0003" },
    { name: "--instui-duration-fast", syntax: "<time>", inherits: true, value: "150ms" },
    { name: "--instui-transition-duration-x", syntax: "*", inherits: true, value: "0.2s" },
    { name: "--instui-font-weight-bold", syntax: "*", inherits: true, value: "700" },
    { name: "--instui-line-height-default", syntax: "*", inherits: true, value: "1.5" },
    { name: "--instui-font-size-medium", syntax: "<length>", inherits: true, value: "1rem" },
    { name: "--instui-radius-large", syntax: "<length>", inherits: true, value: "16px" },
    { name: "--instui-corner-small", syntax: "<length>", inherits: true, value: "4px" },
    { name: "--instui-spacing-space-md", syntax: "<length>", inherits: true, value: "1rem" },
    { name: "--instui-sizes-icon", syntax: "<length>", inherits: true, value: "24px" },
  ];
  const t = toPandaPreset(fixture).theme;
  expect(t.semanticTokens.shadows?.["shadow-depth-1"]).toEqual({ value: "0 1px 2px #0003" });
  expect(t.semanticTokens.durations?.["duration-fast"]).toEqual({ value: "150ms" });
  expect(t.semanticTokens.durations?.["transition-duration-x"]).toEqual({ value: "0.2s" });
  expect(t.semanticTokens.fontWeights?.["font-weight-bold"]).toEqual({ value: "700" });
  expect(t.semanticTokens.lineHeights?.["line-height-default"]).toEqual({ value: "1.5" });
  expect(t.semanticTokens.fontSizes?.["font-size-medium"]).toEqual({ value: "1rem" });
  expect(t.semanticTokens.radii?.["radius-large"]).toEqual({ value: "16px" });
  expect(t.semanticTokens.radii?.["corner-small"]).toEqual({ value: "4px" });
  expect(t.semanticTokens.spacing?.["spacing-space-md"]).toEqual({ value: "1rem" });
  expect(t.semanticTokens.sizes?.["sizes-icon"]).toEqual({ value: "24px" });
});

test("skips gradients, url() values, and anything uncategorizable", () => {
  const fixture: Token[] = [
    {
      name: "--instui-color-gradient-brand",
      syntax: "*",
      inherits: true,
      value: "linear-gradient(#fff, #000)",
    },
    { name: "--instui-image-hero", syntax: "*", inherits: true, value: "url('data:...')" },
    { name: "--instui-mystery-token", syntax: "*", inherits: true, value: "sometimes" },
  ];
  const t = toPandaPreset(fixture).theme;
  const allKeys = [
    ...Object.values(t.tokens).flatMap((m) => Object.keys(m ?? {})),
    ...Object.values(t.semanticTokens).flatMap((m) => Object.keys(m ?? {})),
  ];
  expect(allKeys).toHaveLength(0);
});

test("a themed color that resolves identically in both modes stays a raw token", () => {
  const fixture: Token[] = [
    { name: "--instui-primitive-blue", syntax: "<color>", inherits: true, value: "#0374B5" },
  ];
  const t = toPandaPreset(fixture).theme;
  expect(t.tokens.colors?.["primitive-blue"]).toEqual({ value: "#0374B5" });
});
