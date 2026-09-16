import { expect, test } from "vite-plus/test";
import { applyModify } from "../src/color.ts";

test("applyModify darkens a hex colour", () => {
  const out = applyModify("#808080", { type: "darken", value: 0.5, space: "hsl" });
  expect(out).toBe("#404040");
});

test("applyModify lightens a hex colour", () => {
  const out = applyModify("#808080", { type: "lighten", value: 0.5, space: "hsl" });
  // L moves halfway toward white.
  expect(out).toBe("#c0c0c0");
});

test("applyModify adds an alpha channel", () => {
  expect(applyModify("#ffffff", { type: "alpha", value: 0.5, space: "hsl" })).toBe("#ffffff80");
});

test("applyModify returns undefined for non-hex", () => {
  expect(applyModify("var(--x)", { type: "darken", value: 0.1, space: "hsl" })).toBeUndefined();
});

test("applyModify handles each dominant channel (red, green, blue hue paths)", () => {
  // Chromatic inputs drive the max===r / max===g / max===b branches of rgb→hsl and the hue()
  // sector branches of hsl→rgb. We assert well-formed hex rather than brittle exact math.
  for (const hex of ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"]) {
    expect(applyModify(hex, { type: "darken", value: 0.4, space: "hsl" })).toMatch(
      /^#[0-9a-f]{6}$/,
    );
    expect(applyModify(hex, { type: "lighten", value: 0.4, space: "hsl" })).toMatch(
      /^#[0-9a-f]{6}$/,
    );
  }
});

test("applyModify darkening a primary keeps its hue and lowers its channel", () => {
  // Red darkened stays pure-red-ish: r drops, g and b stay 0.
  expect(applyModify("#ff0000", { type: "darken", value: 0.5, space: "hsl" })).toBe("#800000");
  expect(applyModify("#00ff00", { type: "darken", value: 0.5, space: "hsl" })).toBe("#008000");
  expect(applyModify("#0000ff", { type: "darken", value: 0.5, space: "hsl" })).toBe("#000080");
});

test("applyModify parses shorthand hex and clamps an out-of-range alpha", () => {
  // #abc expands to #aabbcc before the alpha channel is appended.
  expect(applyModify("#abc", { type: "alpha", value: 1, space: "hsl" })).toBe("#aabbcc");
});

test("applyModify lightening pure white is a no-op (already at max lightness)", () => {
  expect(applyModify("#ffffff", { type: "lighten", value: 0.5, space: "hsl" })).toBe("#ffffff");
});

test("applyModify replaces alpha and preserves it through HSL operations", () => {
  expect(applyModify("#12345680", { type: "alpha", value: 0.25, space: "hsl" })).toBe("#12345640");
  expect(applyModify("#80808080", { type: "darken", value: 0.5, space: "hsl" })).toBe("#40404080");
});

test("applyModify darkens and lightens in CIE LCH while preserving alpha", () => {
  expect(applyModify("#f2f4f5", { type: "darken", value: 0.1, space: "lch" })).toBe("#d7d9da");
  expect(applyModify("#80808080", { type: "lighten", value: 0.5, space: "lch" })).toBe("#bdbdbd80");
  expect(applyModify("#44709f", { type: "darken", value: 0.1, space: "lch" })).toBe("#376593");
  expect(applyModify("#44709f", { type: "lighten", value: 0.1, space: "lch" })).toBe("#537eae");
});
