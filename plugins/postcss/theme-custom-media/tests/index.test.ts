import { expect, test } from "vite-plus/test";
import postcss from "postcss";
import { themeCustomMedia } from "../src/index.ts";

const run = (css: string, theme: "rebrand" | "canvas" | "canvasHighContrast") =>
  postcss([themeCustomMedia({ theme })]).process(css, { from: undefined }).css;

test("keeps only selected theme branches and unwraps always-true wrappers", () => {
  const css = [
    "@media (--theme-canvas) { .x { color: blue; } }",
    "@media (--theme-canvas-high-contrast) { .x { color: yellow; } }",
    "@media (--theme-rebrand) { .x { color: red; } }",
  ].join("\n");

  const canvas = run(css, "canvas");
  expect(canvas).toContain(".x { color: blue; }");
  expect(canvas).not.toContain("yellow");
  expect(canvas).not.toContain("red");
  expect(canvas).not.toContain("@media");
});

test("keeps prefers-color-scheme in rebrand light/dark branches", () => {
  const css = [
    "@media (--theme-light) { .x { color: white; } }",
    "@media (--theme-dark) { .x { color: black; } }",
    "@media (--theme-canvas) { .x { color: blue; } }",
  ].join("\n");

  const out = run(css, "rebrand");
  expect(out).toContain("@media (prefers-color-scheme: light)");
  expect(out).toContain("@media (prefers-color-scheme: dark)");
  expect(out).not.toContain("theme:");
  expect(out).not.toContain("blue");
});

test("drops theme @custom-media declarations from emitted css", () => {
  const out = run(
    "@custom-media --theme-canvas (theme: canvas);\n@custom-media --foo (width > 10px);\n@media (--theme-canvas) { .x { color: blue; } }",
    "canvas",
  );
  expect(out).not.toContain("@custom-media --theme-canvas");
  expect(out).toContain("@custom-media --foo");
  expect(out).toContain("color: blue");
});
