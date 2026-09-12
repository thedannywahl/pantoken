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

test("plugin css hook appends rules", () => {
  const plugin = customThemeColors();
  const out = plugin.css?.({ tokens: [], css: "" });
  expect(out && "append" in out ? out.append : "").toContain(':root[data-pantoken-color="navy"]');
});
