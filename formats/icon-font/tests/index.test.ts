import { expect, test } from "vite-plus/test";
import { buildIconFont } from "../src/build.ts";
import { svgToGlyphPath } from "../src/outline.ts";

test("outlines a stroke icon into a filled path", () => {
  const svg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/></svg>';
  const { d, width, height } = svgToGlyphPath(svg);
  expect([width, height]).toEqual([24, 24]);
  // A single-segment stroke becomes a closed filled polygon (multiple points), not the bare line.
  expect(d.startsWith("M")).toBe(true);
  expect(d).toContain("Z");
  expect(d).not.toBe("M19 12H5");
});

test("passes a fill icon through unchanged", () => {
  const svg = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>';
  expect(svgToGlyphPath(svg).d).toBe("M0 0h24v24H0z");
});

test("builds a font with WOFF2 + TTF, CSS, and codepoints", async () => {
  const font = await buildIconFont({ icons: ["arrow-left", "check-mark"], fontName: "PanTokens" });

  // WOFF2 magic signature is "wOF2".
  expect(String.fromCharCode(...font.woff2.subarray(0, 4))).toBe("wOF2");
  // TTF is non-trivial.
  expect(font.ttf.byteLength).toBeGreaterThan(1000);

  expect(Object.keys(font.codepoints)).toContain("arrow-left");
  expect(font.codepoints["arrow-left"].startsWith("e")).toBe(true); // PUA
  expect(font.css).toContain("@font-face");
  expect(font.css).toContain(".instui-icon-arrow-left::before");
  expect(font.css).toContain('font-family: "PanTokens"');
}, 30000);
