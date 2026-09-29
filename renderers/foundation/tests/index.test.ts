import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { toFoundationCss, toFoundationSettings } from "../src/index.ts";
import { checkCompatibility } from "../scripts/check-compatibility.ts";

test("settings resolve to concrete Sass values that color functions can use", () => {
  const scss = toFoundationSettings();
  expect(scss).toMatch(/\$primary-color: #[\da-fA-F]{6};/u);
  expect(scss).toMatch(/\$foundation-palette: \([\s\S]*"primary": #[\da-fA-F]{6}/u);
  expect(scss).not.toContain("var(");
  expect(scss).not.toContain("!default");
});

test("useDefault appends !default so consumer overrides win", () => {
  const scss = toFoundationSettings({ useDefault: true });
  expect(scss).toMatch(/\$primary-color: #[\da-fA-F]{6} !default;/u);
});

test("the CSS overlay themes Foundation's compiled classes", () => {
  const css = toFoundationCss();
  expect(css).toContain(".button {");
  expect(css).toContain(".button.alert {");
  expect(css).toContain(".callout {");
  expect(css).toContain("var(--instui-color-background-brand)");
});

test("scope prefixes every overlay selector", () => {
  const css = toFoundationCss({ scope: ".instui" });
  expect(css).toContain(".instui .button {");
  expect(css).toContain(".instui body {");
});

test("every mapped Instructure token exists in the IR (no drift)", () => {
  const all = `${toFoundationSettings()}\n${toFoundationCss()}`;
  expect(unknownReferences(all, tokens)).toEqual([]);
});

test("rejects Foundation releases outside the checked major", async () => {
  await expect(checkCompatibility("7.0.0")).rejects.toThrow("Invalid Foundation 6 release");
});
