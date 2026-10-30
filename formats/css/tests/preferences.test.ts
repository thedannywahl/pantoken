import { expect, test } from "vite-plus/test";
import { byTheme } from "@pantoken/tokens";
import { tokenPreferenceCss } from "../src/preferences.ts";
import { toCss } from "../src/to-css.ts";
import type { Token } from "@pantoken/model";

const token = (name: string, value: string): Token => ({
  name: `--instui-${name}`,
  value,
  syntax: "*",
  inherits: true,
});

test("preferences are automatic in declarations, not document-global registrations", () => {
  const tokens = [token("color-background-base", "#fff"), token("border-width-sm", "1px")];
  const css = toCss(tokens, { scope: ".app", layer: "pantoken.theme" });
  expect(css).toContain("@layer pantoken.base");
  expect(css).toContain("@media (prefers-contrast: more) {\n@layer pantoken.theme {\n.app {");
  expect(css).toContain("--instui-border-width-sm: max(2px, 1px)");
  expect(toCss(tokens, { emit: "properties" })).not.toContain("@media");
  expect(toCss([], { emit: "declarations" })).not.toContain("color-scheme");
});

test("more strengthens nonzero borders and focus without recoloring text or erasing zero borders", () => {
  const css = tokenPreferenceCss(
    [
      token("border-width-sm", "1px"),
      token("component-button-border-width", "0"),
      token("component-shared-tokens-focus-outline-width", "2px"),
      token("color-text-base", "#123456"),
      token("color-background-success", "#00aa00"),
    ],
    ":root",
  );
  expect(css).toContain("--instui-border-width-sm: max(2px, 1px)");
  expect(css).toContain("--instui-component-shared-tokens-focus-outline-width: max(3px, 2px)");
  expect(css).not.toContain("--instui-component-button-border-width:");
  expect(css).not.toContain("--instui-color-text-base:");
  expect(css).not.toContain("--instui-color-background-success:");
});

test("less removes decorative shadow color, not text contrast or focus cues", () => {
  const css = tokenPreferenceCss(
    [
      token("color-drop-shadow-shadow-color1", "#00000020"),
      token("color-text-muted", "#333"),
      token("component-shared-tokens-focus-outline-info-color", "#123456"),
    ],
    ":root",
  );
  expect(css).toContain("@media (prefers-contrast: less)");
  expect(css).toContain("--instui-color-drop-shadow-shadow-color1: transparent");
  expect(css).not.toContain("--instui-color-text-muted:");
  expect(css).not.toContain("--instui-component-shared-tokens-focus-outline-info-color:");
});

test("translucent surface aliases composite against semantic surfaces and retain tint references", () => {
  const css = tokenPreferenceCss(
    [
      token("primitive-color-brand", "#123456"),
      token("color-background-base", "light-dark(#fff, #222)"),
      token(
        "color-background-secondary",
        "color-mix(in srgb, var(--instui-primitive-color-brand) 20%, transparent)",
      ),
      token("component-tag-background", "var(--instui-color-background-secondary)"),
      token("color-background-overlay-dark", "rgba(12, 24, 36, 0.75)"),
      token("color-background-opacity-on-color", "#ffffff1a"),
      token("component-ghost-background", "transparent"),
      token("component-empty-background", "rgba(0,0,0,0.0)"),
      token("component-opaque-background", "#ffffffff"),
      token("component-transparent-background", "#00000000"),
      token("color-text-muted", "rgba(12,24,36,0.5)"),
      token("component-custom-background", "var(--custom-bg)"),
    ],
    ".theme",
    "pantoken.theme",
  );
  expect(css).toContain(
    "--instui-component-tag-background: color-mix(in srgb, var(--instui-primitive-color-brand) 20%, var(--instui-color-background-base))",
  );
  expect(css).toContain(
    "--instui-color-background-overlay-dark: color-mix(in srgb, rgb(12 24 36) 75%, var(--instui-color-background-inverse))",
  );
  expect(css).toContain("var(--instui-color-background-brand)");
  expect(css).not.toContain("--instui-component-ghost-background:");
  expect(css).not.toContain("--instui-component-empty-background:");
  expect(css).not.toContain("--instui-component-opaque-background:");
  expect(css).not.toContain("--instui-component-transparent-background:");
  expect(css).not.toContain("--instui-color-text-muted:");
  expect(css).not.toContain("--instui-component-custom-background:");
});

test("surface cycles produce an explicit error", () => {
  expect(() =>
    tokenPreferenceCss(
      [token("component-background", "var(--instui-component-background)")],
      ":root",
    ),
  ).toThrow("Circular surface token reference: --instui-component-background");
});

test.each(["rebrand", "canvas", "canvasHighContrast"] as const)(
  "every theme receives preferences without a theme switch (%s)",
  (theme) => {
    const tokens = byTheme(theme);
    const css = tokenPreferenceCss(tokens, ".theme");
    expect(css).toContain("prefers-contrast: more");
    expect(css).toContain("prefers-contrast: less");
    expect(css).toContain("prefers-reduced-transparency: reduce");
    expect(css).not.toContain("data-pantoken-theme");
    expect(css).not.toContain("--instui-color-text-base:");
    expect(css).toContain("--instui-component-mask-background-color:");
  },
);
