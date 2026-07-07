import { expect, test } from "vite-plus/test";
import { tokens } from "@pantoken/tokens";
import { unknownReferences } from "@pantoken/utils";
import { toFoundationCss, toFoundationSettings } from "../src/index.ts";

test("settings map Foundation Sass variables to Instructure tokens", () => {
  const scss = toFoundationSettings();
  expect(scss).toContain("$primary-color: var(--instui-color-background-brand);");
  expect(scss).toContain("$body-background: var(--instui-color-background-base);");
  expect(scss).not.toContain("!default");
});

test("useDefault appends !default so consumer overrides win", () => {
  const scss = toFoundationSettings({ useDefault: true });
  expect(scss).toContain("$primary-color: var(--instui-color-background-brand) !default;");
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
