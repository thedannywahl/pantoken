import { expect, test } from "vite-plus/test";
import {
  buildTheme,
  buildThemeCss,
  ENGLISH_THEME_STRINGS,
  THEME_CSS,
  THEME_JS,
} from "../src/index.ts";

test("THEME_CSS imports pantoken's CDN-hosted tokens, components, and fonts", () => {
  expect(THEME_CSS).toContain("npm/@pantoken/css/dist/style.rebrand.light.lean.css");
  expect(THEME_CSS).toContain("npm/@pantoken/components/dist/components.css");
  expect(THEME_CSS).toContain("https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css");
});

test("THEME_JS loads pantoken's interactions IIFE bundle from the CDN", () => {
  expect(THEME_JS).toContain("pantokenTheme");
  expect(THEME_JS).toContain(
    "https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/interactions.iife.js",
  );
});

test("buildTheme() with no options matches the committed jsDelivr-default templates", () => {
  expect(buildTheme()).toEqual({ css: THEME_CSS, js: THEME_JS });
});

test("buildTheme honors an alternate provider and pinned version", () => {
  const { css, js } = buildTheme({ provider: "unpkg", version: "1.2.3" });
  expect(css).toContain("https://unpkg.com/@pantoken/components@1.2.3/dist/components.css");
  expect(js).toContain("https://unpkg.com/@pantoken/interactions@1.2.3/dist/interactions.iife.js");
});

test("buildTheme lets a caller add another pantoken package's CSS", () => {
  const { css } = buildTheme({
    css: [{ package: "@pantoken/wordpress", path: "dist/wordpress.css" }],
  });
  expect(css).toContain("https://cdn.jsdelivr.net/npm/@pantoken/wordpress/dist/wordpress.css");
});

test("buildTheme falls back to English for any string a caller's override omits", () => {
  const { css, js } = buildTheme({
    strings: { cssHeaderTitle: "translated title" },
  });
  expect(css).toContain("translated title");
  expect(css).toContain(ENGLISH_THEME_STRINGS.sectionFonts);
  expect(js).toContain(ENGLISH_THEME_STRINGS.jsHeaderTitle);
});

test("buildTheme defaults to the rebrand/light token sheet", () => {
  expect(buildThemeCss()).toContain("npm/@pantoken/css/dist/style.rebrand.light.lean.css");
});

test("buildTheme honors theme/mode for every @pantoken/css lean sheet variant", () => {
  expect(buildThemeCss({ theme: "rebrand", mode: "adaptive" })).toContain(
    "npm/@pantoken/css/dist/style.lean.css",
  );
  expect(buildThemeCss({ theme: "rebrand", mode: "light" })).toContain(
    "npm/@pantoken/css/dist/style.rebrand.light.lean.css",
  );
  expect(buildThemeCss({ theme: "canvas" })).toContain(
    "npm/@pantoken/css/dist/style.canvas.lean.css",
  );
  expect(buildThemeCss({ theme: "canvasHighContrast" })).toContain(
    "npm/@pantoken/css/dist/style.canvas-high-contrast.lean.css",
  );
});

test("an explicit css override takes precedence over theme/mode", () => {
  const css = buildThemeCss({
    theme: "canvas",
    css: [{ package: "@pantoken/css", path: "dist/style.lean.css" }],
  });
  expect(css).toContain("npm/@pantoken/css/dist/style.lean.css");
  expect(css).not.toContain("style.canvas.lean.css");
});
