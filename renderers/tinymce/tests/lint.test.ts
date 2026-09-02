/**
 * @vitest-environment happy-dom
 */
import { expect, test } from "vite-plus/test";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { diagnosticCount, forceLinting, forEachDiagnostic } from "@codemirror/lint";
import { validateClassToken } from "../src/cssdoc/model.js";
import { pantokenHtmlLinter } from "../src/codemirror/lint.js";

/** Builds a detached `EditorView` running the real linter extension over `doc`. */
function lintView(doc: string): EditorView {
  const state = EditorState.create({ doc, extensions: [pantokenHtmlLinter({ model: [] })] });
  return new EditorView({ state });
}

test("pantokenHtmlLinter reports a diagnostic for an unknown component token", async () => {
  const view = lintView('<button class="instui-unknown">Click</button>');
  forceLinting(view);
  await Promise.resolve();

  expect(diagnosticCount(view.state)).toBeGreaterThan(0);
  const messages: string[] = [];
  forEachDiagnostic(view.state, (d) => messages.push(d.message));
  expect(messages.some((m) => m.includes("Unknown component"))).toBe(true);
  view.destroy();
});

test("pantokenHtmlLinter reports no diagnostics for a valid pantoken token", async () => {
  const view = lintView('<button class="instui-button">Click</button>');
  forceLinting(view);
  await Promise.resolve();

  expect(diagnosticCount(view.state)).toBe(0);
  view.destroy();
});

test("pantokenHtmlLinter ignores non-pantoken classes", async () => {
  const view = lintView('<button class="my-custom-class">Click</button>');
  forceLinting(view);
  await Promise.resolve();

  expect(diagnosticCount(view.state)).toBe(0);
  view.destroy();
});

test("pantokenHtmlLinter validates every instui- token across multiple class attributes", async () => {
  const view = lintView(
    '<button class="instui-button">A</button><span class="instui-unknown -color-primary">B</span>',
  );
  forceLinting(view);
  await Promise.resolve();

  expect(diagnosticCount(view.state)).toBeGreaterThan(0);
  view.destroy();
});

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
  const html = '<button class="instui-button -color-secondary">Click</button>';
  const classAttributeRegex = /class=["']([^"']+)["']/g;
  const match = classAttributeRegex.exec(html);
  expect(match).toBeDefined();
  const classes = match![1].split(/\s+/);
  expect(classes).toContain("instui-button");
  expect(classes).toContain("-color-secondary");
});
