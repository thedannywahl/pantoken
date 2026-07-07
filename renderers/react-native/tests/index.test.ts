import { expect, test } from "vite-plus/test";
import { dark, light, tokensForScheme } from "../src/index.ts";

test("colours are hex strings and dimensions are numbers", () => {
  expect(typeof light.colorBackgroundBase).toBe("string");
  expect(String(light.colorBackgroundBase).startsWith("#")).toBe(true);
  // A spacing token resolves to a number (dp).
  expect(typeof light.spacingSpaceMd).toBe("number");
});

test("representative tokens are fully resolved (no var()/light-dark()), icons excluded", () => {
  for (const key of ["colorBackgroundBase", "colorBackgroundBrand", "colorTextBase"]) {
    const value = String(light[key]);
    expect(value.includes("var(")).toBe(false);
    expect(value.includes("light-dark(")).toBe(false);
    expect(value.startsWith("#")).toBe(true);
  }
  // Glyph (<image>) icon tokens are excluded; semantic icon *colours* legitimately remain.
  expect(light.iconArrowLeft).toBeUndefined();
});

test("tokensForScheme selects light or dark", () => {
  expect(tokensForScheme("dark")).toBe(dark);
  expect(tokensForScheme("light")).toBe(light);
  expect(tokensForScheme(null)).toBe(light);
});
