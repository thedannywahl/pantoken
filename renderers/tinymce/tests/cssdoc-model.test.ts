/**
 * @vitest-environment happy-dom
 */
import { expect, test } from "vite-plus/test";
import {
  findEntry,
  getModifierSuggestions,
  listComponents,
  listUtilities,
  validateClassToken,
} from "../src/cssdoc/model.js";

test("findEntry returns a component entry by name", () => {
  const button = findEntry("button");
  expect(button).toBeDefined();
  expect(button?.name).toBe("button");
  expect(button?.className).toBe(".instui-button");
});

test("findEntry returns undefined for unknown entries", () => {
  expect(findEntry("nonexistent")).toBeUndefined();
});

test("listComponents returns only component entries", () => {
  const components = listComponents();
  expect(components.length).toBeGreaterThan(0);
  expect(components.every((e) => e.kind === "component")).toBe(true);
  expect(components.some((e) => e.name === "button")).toBe(true);
  // Note: custom-components (card, agent-shell, banner) may be included but aren't guaranteed.
});

test("listUtilities returns only utility entries", () => {
  const utilities = listUtilities();
  expect(utilities.length).toBeGreaterThan(0);
  expect(utilities.every((e) => e.kind === "utility")).toBe(true);
});

test("getModifierSuggestions returns modifiers for a known component", () => {
  const buttonMods = getModifierSuggestions("button");
  expect(buttonMods.length).toBeGreaterThan(0);
  // Modifiers may vary; just check that we got some modifiers back
});

test("getModifierSuggestions filters by prefix", () => {
  const buttonColorMods = getModifierSuggestions("button", "-color-");
  expect(buttonColorMods.length).toBeGreaterThan(0);
  expect(buttonColorMods.every((m) => m.name.startsWith("-color-"))).toBe(true);
});

test("getModifierSuggestions returns empty for unknown component", () => {
  expect(getModifierSuggestions("nonexistent")).toEqual([]);
});

test("validateClassToken detects non-pantoken tokens", () => {
  const errors = validateClassToken("my-class");
  expect(errors.length).toBeGreaterThan(0);
  expect(errors[0]).toContain("instui-");
});

test("validateClassToken accepts valid component tokens", () => {
  const errors = validateClassToken("instui-button");
  // Should not have an "unknown component" error.
  expect(errors.filter((e) => e.includes("Unknown component"))).toHaveLength(0);
});

test("validateClassToken detects unknown components", () => {
  const errors = validateClassToken("instui-nonexistent");
  expect(errors.some((e) => e.includes("Unknown component"))).toBe(true);
});

test("validateClassToken accepts a known modifier on a known component", () => {
  const errors = validateClassToken("instui-button-color-danger");
  expect(errors).toHaveLength(0);
});

test("validateClassToken skips pattern-based modifiers like -icon-*", () => {
  // "button" has a pattern modifier (-icon-*) that can't be validated by substring match;
  // it must be skipped rather than reported as an error.
  const errors = validateClassToken("instui-button-icon-arrow-right");
  expect(errors).toHaveLength(0);
});
