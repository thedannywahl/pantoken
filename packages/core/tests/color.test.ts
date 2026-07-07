import { expect, test } from "vite-plus/test";
import { applyModify } from "../src/color.ts";

test("applyModify darkens a hex colour", () => {
  const out = applyModify("#808080", { type: "darken", value: 0.5 });
  expect(out).toBe("#404040");
});

test("applyModify lightens a hex colour", () => {
  const out = applyModify("#808080", { type: "lighten", value: 0.5 });
  // L moves halfway toward white.
  expect(out).toBe("#c0c0c0");
});

test("applyModify adds an alpha channel", () => {
  expect(applyModify("#ffffff", { type: "alpha", value: 0.5 })).toBe("#ffffff80");
});

test("applyModify returns undefined for non-hex and for mix", () => {
  expect(applyModify("var(--x)", { type: "darken", value: 0.1 })).toBeUndefined();
  expect(applyModify("#fff", { type: "mix", value: 0.5, color: "#000" })).toBeUndefined();
});
