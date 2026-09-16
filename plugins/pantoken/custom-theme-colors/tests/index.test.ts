import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import { customThemeColors, customThemeColorsCss, COLOR_KEYS } from "../src/index.ts";

test("is a css-only plugin", () => {
  expect(capabilitiesOf(customThemeColors())).toEqual(["css"]);
});

test("emits rules for all color namespaces and only instui tokens", () => {
  const css = customThemeColorsCss();
  for (const key of COLOR_KEYS) {
    expect(css).toContain(`:root[data-pantoken-color="${key}"]`);
    expect(css).toContain("--instui-primitive-color-navy-navy10:");
    expect(css).toContain("--instui-primitive-color-blue-blue10:");
    expect(css).toContain("--instui-color-background-accent-blue:");
  }
  expect(css).not.toContain("--vp-");
});

test("preserves semantic status colors when blue primitives are remapped", () => {
  const css = customThemeColorsCss(
    new Map([
      ["--instui-primitive-color-blue-blue100", "#2b7abc"],
      ["--instui-primitive-color-blue-blue140", "#1d354f"],
      ["--instui-color-background-info", "var(--instui-primitive-color-blue-blue100)"],
      ["--instui-color-background-pastel-info", "var(--instui-primitive-color-blue-blue140)"],
      ["--instui-color-stroke-info", "var(--instui-primitive-color-blue-blue100)"],
      ["--instui-color-text-info", "var(--instui-primitive-color-blue-blue140)"],
      ["--instui-color-icon-info", "var(--instui-primitive-color-blue-blue140)"],
    ]),
  );

  for (const key of COLOR_KEYS) {
    expect(css).toContain(`:root[data-pantoken-color="${key}"]`);
    expect(css).toContain("--instui-color-background-info: #2b7abc;");
    expect(css).toContain("--instui-color-background-pastel-info: #1d354f;");
    expect(css).toContain("--instui-color-stroke-info: #2b7abc;");
    expect(css).toContain("--instui-color-text-info: #1d354f;");
    expect(css).toContain("--instui-color-icon-info: #1d354f;");
  }
});

test("plugin css hook appends rules", () => {
  const plugin = customThemeColors();
  const out = plugin.css?.({ tokens: [], css: "" });
  expect(out && "append" in out ? out.append : "").toContain(':root[data-pantoken-color="navy"]');
});
