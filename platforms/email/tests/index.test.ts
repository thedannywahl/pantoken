import { expect, test } from "vite-plus/test";
import { emailTokens, light } from "../src/index.ts";
import { inlineEmailHtml } from "../src/inline.ts";

test("provides concrete, inline-friendly token values", () => {
  expect(light.colorBackgroundBrand.startsWith("#")).toBe(true);
  expect(light.colorBackgroundBrand.includes("var(")).toBe(false);
});

test("emailTokens selects the mode", () => {
  expect(emailTokens("light")).toBe(light);
});

test("inlineEmailHtml applies concrete pantoken component styles", () => {
  const html = '<button class="instui-button">Save</button>';

  expect(inlineEmailHtml(html)).toContain('style="display: inline-flex;');
});
