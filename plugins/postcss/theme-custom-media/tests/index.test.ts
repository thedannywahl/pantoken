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

test("resolves scale breakpoint aliases from the tray-width token IR (short/long/device names agree)", () => {
  const css = [
    "@media (--breakpoint-lg-up) { .x { display: block; } }",
    "@media (--breakpoint-large-up) { .y { display: block; } }",
    "@media (--breakpoint-laptop-up) { .z { display: block; } }",
    "@media (--breakpoint-lg-down) { .w { display: none; } }",
  ].join("\n");

  const out = run(css, "rebrand");
  expect(out).toContain("@media (min-width: 48em) { .x { display: block; } }");
  expect(out).toContain("@media (min-width: 48em) { .y { display: block; } }");
  expect(out).toContain("@media (min-width: 48em) { .z { display: block; } }");
  expect(out).toContain("@media (max-width: 47.9375em) { .w { display: none; } }");
});

test("resolves the theme-dependent content breakpoints", () => {
  const contentCss = "@media (--breakpoint-content-down) { .x { display: none; } }";
  expect(run(contentCss, "rebrand")).toContain(
    "@media (max-width: 68.6875em) { .x { display: none; } }",
  );
  expect(run(contentCss, "canvas")).toContain(
    "@media (max-width: 59.1875em) { .x { display: none; } }",
  );
  expect(run(contentCss, "canvasHighContrast")).toContain(
    "@media (max-width: 59.1875em) { .x { display: none; } }",
  );

  const fullWidthCss = "@media (--breakpoint-content-full-width-down) { .x { display: none; } }";
  expect(run(fullWidthCss, "rebrand")).toContain(
    "@media (max-width: 98.6875em) { .x { display: none; } }",
  );
  // `content` and `content-full-width` coincide in canvas/canvasHighContrast (both 59.25em).
  expect(run(fullWidthCss, "canvas")).toContain(
    "@media (max-width: 59.1875em) { .x { display: none; } }",
  );
});

test("drops breakpoint @custom-media declarations from emitted css", () => {
  const out = run(
    "@custom-media --breakpoint-lg-up (min-width: 48em);\n@custom-media --foo (width > 10px);\n@media (--breakpoint-lg-up) { .x { color: blue; } }",
    "rebrand",
  );
  expect(out).not.toContain("@custom-media --breakpoint-lg-up");
  expect(out).toContain("@custom-media --foo");
  expect(out).toContain("color: blue");
});
