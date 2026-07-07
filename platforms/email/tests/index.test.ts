import { expect, test } from "vite-plus/test";
import { emailTokens, light } from "../src/index.ts";

test("provides concrete, inline-friendly token values", () => {
  expect(light.colorBackgroundBrand.startsWith("#")).toBe(true);
  expect(light.colorBackgroundBrand.includes("var(")).toBe(false);
});

test("emailTokens selects the mode", () => {
  expect(emailTokens("light")).toBe(light);
});
