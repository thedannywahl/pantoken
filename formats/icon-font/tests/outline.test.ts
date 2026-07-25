import { expect, test } from "vite-plus/test";
import { svgToGlyphPath } from "../src/outline.ts";

test("a fill icon converts every primitive shape to subpaths, joined verbatim", () => {
  const svg =
    '<svg viewBox="0 0 32 48">' +
    '<rect x="1" y="2" width="4" height="6"/>' +
    '<circle cx="12" cy="12" r="3"/>' +
    '<line x1="1" y1="1" x2="2" y2="2"/>' +
    '<polyline points="0,0 1,1 2,2"/>' +
    '<polygon points="0,0 4,0 4,4 0,4"/>' +
    "</svg>";
  const { d, width, height } = svgToGlyphPath(svg);
  // viewBox width/height are read from the 3rd/4th numbers.
  expect([width, height]).toEqual([32, 48]);
  expect(d).toContain("M1,2 h4 v6 h-4 z"); // rect
  expect(d).toContain("a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0"); // circle
  expect(d).toContain("M1,1 L2,2"); // line
  expect(d).toContain("M0,0 L1,1 L2,2"); // polyline
  expect(d).toContain("M0,0 L4,0 L4,4 L0,4 z"); // polygon (closed)
});

test("a polygon/polyline with fewer than two points is skipped", () => {
  const svg = '<svg viewBox="0 0 24 24"><polygon points="0,0"/></svg>';
  expect(svgToGlyphPath(svg).d).toBe("");
});

test("defaults the viewBox to 24x24 when absent", () => {
  const svg = "<svg><path d='M1 1 L2 2'/></svg>";
  expect(svgToGlyphPath(svg)).toMatchObject({ width: 24, height: 24 });
});

test("a closed stroke subpath is outlined via the closed-line join", () => {
  // The `z` marks the subpath closed, exercising the etClosedLine branch of the offsetter.
  const svg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M4 4 L20 4 L20 20 L4 20 Z"/></svg>';
  const { d } = svgToGlyphPath(svg);
  expect(d.startsWith("M")).toBe(true);
  expect(d).toContain("Z");
});

test("splits a multi-subpath fill path into its M-anchored chunks", () => {
  const svg = '<svg viewBox="0 0 24 24"><path d="M0 0 L4 0 M8 8 L12 8"/></svg>';
  const { d } = svgToGlyphPath(svg);
  // Both subpaths survive in the joined output.
  expect(d).toContain("M0 0 L4 0");
  expect(d).toContain("M8 8 L12 8");
});
