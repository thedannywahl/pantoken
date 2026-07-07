import { expect, test } from "vite-plus/test";
import { byTheme, canvasTokens, tokens } from "../src/index.ts";
import { provenance, raw } from "../src/raw.ts";

test("default export is the rebrand IR with the expected layers", () => {
  expect(tokens.length).toBeGreaterThan(1000);
  const bg = tokens.find((t) => t.name === "--instui-color-background-base");
  expect(bg).toBeDefined();
  expect(["<color>", "*"]).toContain(bg?.syntax);
});

test("every theme is addressable", () => {
  expect(byTheme("rebrand")).toBe(tokens);
  expect(canvasTokens.length).toBeGreaterThan(500);
});

test("icons are present as <image> tokens in the vendored IR", () => {
  const arrow = tokens.find((t) => t.name === "--instui-icon-arrow-left");
  expect(arrow?.syntax).toBe("<image>");
  expect(arrow?.meta?.bidirectional).toBe(true);
});

test("raw Tokens Studio JSON and provenance are vendored", () => {
  expect(Object.keys(raw)).toContain("rebrand");
  expect(Object.keys(raw)).toContain("primitives");
  expect(provenance.upstream).toBe("@instructure/instructure-design-tokens");
});
