import { expect, test } from "vite-plus/test";
import { resolveExampleTargets, stripExampleMetadata } from "../src/example-targets.ts";

test.each([
  ["-automatica11y\n<p>Hi</p>", false, "<p>Hi</p>"],
  ["-a-a-a \t-b\r\n<p>Hi</p>", false, "<p>Hi</p>"],
  [" -a\n<p>Hi</p>", false, " -a\n<p>Hi</p>"],
  ["-a\n-b\n<p>Hi</p>", false, "-b\n<p>Hi</p>"],
  [" \n-a\n-b \n<p>Hi</p>", true, "<p>Hi</p>"],
  ["-a\n\n  <p>Hi</p>", true, "  <p>Hi</p>"],
  ["-a bad\n<p>Hi</p>", false, "-a bad\n<p>Hi</p>"],
  ["-a", true, "-a"],
  ["-a-a!", false, "-a-a!"],
] as const)("strips only valid metadata: %j (%s)", (input, multiline, expected) => {
  expect(stripExampleMetadata(input, multiline)).toBe(expected);
});

test("scans long malformed flag sequences without backtracking", () => {
  for (const input of ["-a".repeat(100_000), "-a ".repeat(100_000), "-a".repeat(100_000) + "!"]) {
    expect(stripExampleMetadata(input)).toBe(input);
    expect(stripExampleMetadata(input, true)).toBe(input);
  }
}, 2_000);

test("Canvas routes explicit examples by interactions state without changing docs selection", () => {
  const examples = [
    "-canvas-rce\n```html\n<div>With close button</div>\n```",
    "```html -canvas-rce-no-interactions\n<div>Static</div>\n```",
    "-docs\n```html\n<div>Docs</div>\n```",
  ];
  expect(resolveExampleTargets(examples)).toEqual({ automatica11y: [], canvasRce: [0], docs: [2] });
  expect(resolveExampleTargets(examples, { interactions: false })).toEqual({
    automatica11y: [],
    canvasRce: [1],
    docs: [2],
  });
  expect(
    resolveExampleTargets(["-canvas-rce\n```html\n<div>Legacy</div>\n```"], { interactions: false })
      .canvasRce,
  ).toEqual([0]);
  expect(
    resolveExampleTargets(["-canvas-rce-no-interactions\n```html\n<div>Static only</div>\n```"])
      .canvasRce,
  ).toEqual([]);
});

test("keeps existing Canvas and docs behavior when there are no audience flags", () => {
  expect(resolveExampleTargets(["first", "-nocard\n```html\nsecond\n```"])).toEqual({
    automatica11y: [],
    canvasRce: [0],
    docs: [0, 1],
  });
});

test("uses explicit audience examples and assigns unflagged examples to missing audiences", () => {
  const examples = [
    "unflagged first",
    "-automatica11y\n```html\naudit\n```",
    "```html -canvas-rce\ncanvas\n```",
    "unflagged remainder",
  ];

  expect(resolveExampleTargets(examples)).toEqual({
    automatica11y: [1],
    canvasRce: [2],
    docs: [0, 3],
  });
});

test("Canvas takes the first unassigned example and docs get the remainder", () => {
  expect(
    resolveExampleTargets([
      "-automatica11y\n```html\naudit\n```",
      "Canvas fallback",
      "Docs fallback",
    ]),
  ).toEqual({
    automatica11y: [0],
    canvasRce: [1],
    docs: [2],
  });
});

test("keeps only explicitly tagged docs examples when the docs audience is specified", () => {
  expect(
    resolveExampleTargets([
      "Canvas fallback",
      "-docs\n```html\ndocumentation\n```",
      "-automatica11y\n```html\naudit\n```",
    ]),
  ).toEqual({
    automatica11y: [2],
    canvasRce: [0],
    docs: [1],
  });
});

test("returns no targets for an empty example list", () => {
  expect(resolveExampleTargets([])).toEqual({ automatica11y: [], canvasRce: [], docs: [] });
});

test("does not use the legacy example comment as an Automatica11y fallback", () => {
  expect(
    resolveExampleTargets([
      "```html\n\\3c !-- automatica11y: button -->\n<button>Save</button>\n```",
    ]),
  ).toEqual({
    automatica11y: [],
    canvasRce: [0],
    docs: [0],
  });
});

test("does not treat audience-like text in an unfenced example body as metadata", () => {
  expect(resolveExampleTargets(['<p class="-docs">The -automatica11y option</p>'])).toEqual({
    automatica11y: [],
    canvasRce: [0],
    docs: [0],
  });
});
