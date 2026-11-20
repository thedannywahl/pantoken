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

test("Canvas switches variants without changing docs or audit selection", () => {
  const entry = {
    examples: ["Interactive", "Static", "Audit"],
    exampleLabels: {
      0: ["canvas-rce", "docs"],
      1: ["canvas-rce-no-interactions"],
      2: ["automatica11y"],
    },
  };
  expect(resolveExampleTargets(entry)).toEqual({ automatica11y: [2], canvasRce: [0], docs: [0] });
  expect(resolveExampleTargets(entry, { interactions: false })).toEqual({
    automatica11y: [2],
    canvasRce: [1],
    docs: [0],
  });
  expect(
    resolveExampleTargets(
      { examples: ["Interactive"], exampleLabels: { 0: ["canvas-rce"] } },
      { interactions: false },
    ).canvasRce,
  ).toEqual([0]);
  expect(
    resolveExampleTargets({
      examples: ["Static only"],
      exampleLabels: { 0: ["canvas-rce-no-interactions"] },
    }).canvasRce,
  ).toEqual([]);
});

test("Canvas falls back to the first unlabeled example without hiding it from docs", () => {
  expect(
    resolveExampleTargets({
      examples: ["Audit", "Canvas fallback", "Docs"],
      exampleLabels: { 0: ["automatica11y"], 2: ["docs"] },
    }),
  ).toEqual({
    automatica11y: [0],
    canvasRce: [1],
    docs: [1, 2],
  });
});

test("returns no targets for an empty example list", () => {
  expect(resolveExampleTargets({ examples: [] })).toEqual({
    automatica11y: [],
    canvasRce: [],
    docs: [],
  });
});

test("does not treat audience-like text in an unfenced example body as metadata", () => {
  expect(
    resolveExampleTargets({ examples: ['<p class="-docs">The -automatica11y option</p>'] }),
  ).toEqual({
    automatica11y: [],
    canvasRce: [0],
    docs: [0],
  });
});
