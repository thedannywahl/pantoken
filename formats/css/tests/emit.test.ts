import { expect, test } from "vite-plus/test";
import { buildCssFile } from "../src/emit.ts";

test("buildCssFile wraps a section in an @layer and trims values", () => {
  const out = buildCssFile({
    comments: ["/* my tokens */"],
    scope: ":root",
    sections: [{ layer: "pantoken", pairs: [["--instui-spacing-space-md", "  1rem  "]] }],
  });
  expect(out).toContain("@layer pantoken {");
  expect(out).toContain("--instui-spacing-space-md: 1rem;");
  expect(out).toContain("/* my tokens */");
});

test("buildCssFile can register non-inheriting @property and drops empty sections", () => {
  const out = buildCssFile({
    comments: [],
    scope: ":root",
    properties: [{ name: "--instui-color-brand", syntax: "<color>", value: " #0374b5 " }],
    sections: [{ pairs: [] }],
    inherits: false,
  });
  expect(out).toContain("@property --instui-color-brand");
  expect(out).toContain("inherits: false;");
  expect(out).toContain("initial-value: #0374b5;");
  // An empty section contributes no scoped block.
  expect(out).not.toContain(":root {");
});
