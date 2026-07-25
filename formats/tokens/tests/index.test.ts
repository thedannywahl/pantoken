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
  expect(provenance.designTokens.package).toBe("@instructure/instructure-design-tokens");
  // A 7–40 char commit sha records the exact vendored source (the design-tokens package.json version
  // is unreliable — stuck at 1.0.0 across tags — so the commit, not the version, is the provenance).
  expect(provenance.designTokens.commit).toMatch(/^[0-9a-f]{7,40}$/u);
  expect(provenance.uiIcons.package).toBe("@instructure/ui-icons");
});
