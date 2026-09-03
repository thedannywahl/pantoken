import { expect, test } from "vite-plus/test";
import { capabilitiesOf } from "@pantoken/plugin-kit";
import {
  getLogoDataUri,
  getLogoSvg,
  logos,
  logosCss,
  logosPlugin,
  products,
} from "../src/index.ts";

test("ships the seven products", () => {
  expect(products).toEqual([
    "canvas",
    "igniteai",
    "instructure",
    "learnplatform",
    "mastery",
    "pantoken",
    "parchment",
  ]);
  expect(logos.length).toBeGreaterThan(0);
});

test("getLogoSvg returns SVG markup and honors defaults", () => {
  const svg = getLogoSvg("canvas");
  expect(svg).toContain("<svg");
  // Default layout/mode resolve to a real asset.
  expect(getLogoSvg("mastery", "horizontal", "full-color")).toContain("<svg");
  expect(getLogoSvg("canvas", "stacked", "full-color-bg")).toBeUndefined();
});

test("getLogoSvg resolves a localized wordmark variant by lang", () => {
  expect(getLogoSvg("pantoken", "horizontal", "full-color", "ar")).toContain("<svg");
  expect(getLogoSvg("pantoken", "horizontal", "full-color")).toContain("<svg");
  expect(getLogoSvg("pantoken", "horizontal", "full-color", "zh")).toContain("<svg");
});

test("getLogoDataUri encodes an SVG data URI", () => {
  const uri = getLogoDataUri("instructure");
  expect(uri).toMatch(/^data:image\/svg\+xml;base64,/u);
});

test("logos.css defines image tokens", () => {
  expect(logosCss).toContain("--instui-logo-canvas-");
  expect(logosCss).toContain('url("data:image/svg+xml;base64,');
});

test("the plugin's css hook contributes the image tokens", () => {
  const plugin = logosPlugin();
  expect(capabilitiesOf(plugin)).toContain("css");
  const contribution = plugin.css?.({ tokens: [], css: "" });
  expect(contribution?.append).toContain("--instui-logo-");
});
