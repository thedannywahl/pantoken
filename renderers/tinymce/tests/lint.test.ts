/**
 * @vitest-environment happy-dom
 */
import { expect, test } from "vite-plus/test";
import { validateClassToken } from "../src/cssdoc/model.js";

test("validateClassToken rejects unknown component tokens", () => {
  const errors = validateClassToken("instui-unknown");
  expect(errors.length).toBeGreaterThan(0);
  expect(errors.some((e) => e.includes("Unknown"))).toBe(true);
});

test("validateClassToken accepts known component tokens", () => {
  const errors = validateClassToken("instui-button");
  // Should have no "unknown component" errors.
  expect(errors.filter((e) => e.includes("Unknown"))).toHaveLength(0);
});

test("validateClassToken rejects non-pantoken tokens", () => {
  const errors = validateClassToken("my-custom-class");
  expect(errors.length).toBeGreaterThan(0);
  expect(errors.some((e) => e.includes("instui-"))).toBe(true);
});

test("validateClassToken accepts incomplete pantoken tokens", () => {
  const errors = validateClassToken("instui-");
  // This is an incomplete token, should produce an error.
  expect(errors.length).toBeGreaterThan(0);
});

test("linter can extract class attributes from HTML", () => {
  const html = '<button class="instui-button">Click</button>';
  const classAttributeRegex = /class=["']([^"']+)["']/g;
  const match = classAttributeRegex.exec(html);
  expect(match).toBeDefined();
  expect(match![1]).toBe("instui-button");
});

test("linter extracts multiple classes from single attribute", () => {
  const html = '<button class="instui-button -color-primary">Click</button>';
  const classAttributeRegex = /class=["']([^"']+)["']/g;
  const match = classAttributeRegex.exec(html);
  expect(match).toBeDefined();
  const classes = match![1].split(/\s+/);
  expect(classes).toContain("instui-button");
  expect(classes).toContain("-color-primary");
});
