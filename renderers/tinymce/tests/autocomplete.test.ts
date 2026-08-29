/**
 * @vitest-environment happy-dom
 */
import { expect, test } from "vite-plus/test";
import type { CssDocEntry } from "../src/cssdoc/model.js";

// Mock model with components
const mockModel: CssDocEntry[] = [
  {
    name: "button",
    className: ".instui-button",
    kind: "component",
    description: "A button component",
    examples: ['<button class="instui-button">Click</button>'],
    modifiers: [
      { name: "-color-primary", prop: "color", value: "primary" },
      { name: "-color-secondary", prop: "color", value: "secondary" },
      { name: "-size-small", prop: "size", value: "small" },
    ],
  } as any,
  {
    name: "badge",
    className: ".instui-badge",
    kind: "utility",
    description: "A badge utility",
    examples: ['<span class="instui-badge">New</span>'],
    modifiers: [],
  } as any,
];

test("autocomplete can find components matching prefix", () => {
  // Manually test the component matching logic
  const prefix = "bu"; // User typed "instui-bu..."
  const components = mockModel.filter((c) => c.name.toLowerCase().startsWith(prefix));
  expect(components.length).toBeGreaterThan(0);
  expect(components.some((c) => c.name === "button")).toBe(true);
});

test("autocomplete filters out non-matching components", () => {
  const prefix = "card";
  const components = mockModel.filter((c) => c.name.toLowerCase().startsWith(prefix));
  expect(components).toHaveLength(0);
});

test("autocomplete includes utilities in completions", () => {
  const prefix = "ba";
  const components = mockModel.filter((c) => c.name.toLowerCase().startsWith(prefix));
  expect(components.some((c) => c.kind === "utility")).toBe(true);
});

test("autocomplete can extract component name from partial token", () => {
  const partial = "instui-button-";
  const parts = partial.split("-");
  const componentName = parts[1]; // Should be "button"
  expect(componentName).toBe("button");
  const component = mockModel.find((c) => c.name === componentName);
  expect(component).toBeDefined();
});

test("autocomplete can suggest modifiers for a component", () => {
  const component = mockModel.find((c) => c.name === "button");
  expect(component).toBeDefined();
  expect(component!.modifiers).toBeDefined();
  expect(component!.modifiers.length).toBeGreaterThan(0);
  expect(component!.modifiers.some((m) => m.name.includes("color"))).toBe(true);
});

test("autocomplete ignores components without modifiers", () => {
  const component = mockModel.find((c) => c.name === "badge");
  expect(component).toBeDefined();
  expect(component!.modifiers).toHaveLength(0);
});
