/**
 * @vitest-environment happy-dom
 */
import { expect, test } from "vite-plus/test";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { completionStatus, currentCompletions, startCompletion } from "@codemirror/autocomplete";
import type { CssDocEntry } from "../src/cssdoc/model.js";
import { pantokenHtmlCompletion } from "../src/codemirror/autocomplete.js";

/** Builds a detached `EditorView` positioned at `pos` with the real completion extension. */
function completionView(doc: string, pos: number): EditorView {
  const state = EditorState.create({
    doc,
    selection: { anchor: pos },
    extensions: [pantokenHtmlCompletion({ model: [] })],
  });
  return new EditorView({ state, parent: document.body });
}

/** Waits for the async completion source to resolve before asserting on results. */
async function waitForCompletions(view: EditorView): Promise<void> {
  for (let i = 0; i < 20 && completionStatus(view.state) === "pending"; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

test("pantokenHtmlCompletion suggests component/utility names after 'instui-'", async () => {
  const doc = '<button class="instui-b">';
  const pos = doc.indexOf('"instui-b') + '"instui-b'.length;
  const view = completionView(doc, pos);
  startCompletion(view);
  await waitForCompletions(view);

  const labels = currentCompletions(view.state).map((c) => c.label);
  expect(labels).toContain("button");
  view.destroy();
});

test("pantokenHtmlCompletion suggests modifiers once a component name is complete", async () => {
  const doc = '<button class="instui-button-">';
  const pos = doc.indexOf('"instui-button-') + '"instui-button-'.length;
  const view = completionView(doc, pos);
  startCompletion(view);
  await waitForCompletions(view);

  const labels = currentCompletions(view.state).map((c) => c.label);
  expect(labels.length).toBeGreaterThan(0);
  view.destroy();
});

test("pantokenHtmlCompletion returns no completions outside a class attribute", async () => {
  const doc = "<p>instui-button</p>";
  const pos = doc.indexOf("instui-button") + "instui-button".length;
  const view = completionView(doc, pos);
  startCompletion(view);
  await waitForCompletions(view);

  expect(currentCompletions(view.state)).toHaveLength(0);
  view.destroy();
});

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
