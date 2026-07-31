import { expect, test } from "vite-plus/test";
import { siteThemesCss } from "./site-themes.ts";

test("the docs theme sheet carries the component foundation variables", () => {
  const css = siteThemesCss();

  expect(css).toContain("--instui-elevation-above:");
  expect(css).toContain("--instui-focus-outline-color:");
  expect(css).toContain(':root[data-pantoken-theme="canvas"]');
  expect(css).toContain(':root[data-pantoken-theme="canvasHighContrast"]');
});
