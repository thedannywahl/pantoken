import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "vite-plus/test";
import { SKIN_FILES } from "../scripts/generate.ts";

const generatedRoot = resolve(import.meta.dirname, "../generated/skins");

test("generates every published theme skin and content stylesheet", () => {
  for (const file of SKIN_FILES) {
    const path = resolve(generatedRoot, file);
    expect(existsSync(path), file).toBe(true);
    const css = readFileSync(path, "utf8");
    expect(css).toContain(file.endsWith("content.css") ? "body {" : ".tox-tinymce");
  }
});

test("keeps dark mode in Next Gen only", () => {
  const nextGenUi = readFileSync(resolve(generatedRoot, "next-gen/skin.css"), "utf8");
  expect(nextGenUi).toContain(':root[data-pantoken-scheme="dark"]');

  // The editable content is hand-authored with its own dark block (not run through the
  // token-driven `scopeDarkMode()` pass the chrome skin uses) — still Next Gen only, since
  // canvas/canvas-high-contrast are single-scheme themes.
  const nextGenContent = readFileSync(resolve(generatedRoot, "next-gen/content.css"), "utf8");
  expect(nextGenContent).toContain(':root[data-pantoken-scheme="dark"]');

  for (const file of SKIN_FILES.filter((file) => !file.startsWith("next-gen/"))) {
    expect(readFileSync(resolve(generatedRoot, file), "utf8")).not.toContain(
      'data-pantoken-scheme="dark"',
    );
  }
});

test("corrects toolbar-button and menu-item active states for dark mode", () => {
  // `.tox-tbtn--enabled/--active` and `.tox-collection__item--active` both derive from
  // `@color-tint`, which resolves light in dark mode — without the override in
  // `next-gen-dark/dark-overrides.less` they'd render light text on a light background.
  const nextGenUi = readFileSync(resolve(generatedRoot, "next-gen/skin.css"), "utf8");
  expect(nextGenUi).toContain(
    ':root[data-pantoken-scheme="dark"] .tox .tox-tbtn--enabled,\n' +
      ':root[data-pantoken-scheme="dark"] .tox .tox-tbtn--enabled:hover,\n' +
      ':root[data-pantoken-scheme="dark"] .tox .tox-tbtn--enabled:focus,\n' +
      ':root[data-pantoken-scheme="dark"] .tox .tox-tbtn--active,\n' +
      ':root[data-pantoken-scheme="dark"] .tox .tox-tbtn:active {\n' +
      "  background: #D5E2F6;\n" +
      "  color: #1D354F;\n" +
      "}",
  );
  expect(nextGenUi).toContain(
    ':root[data-pantoken-scheme="dark"] .tox .tox-collection--list .tox-collection__item--active:not(.tox-collection__item--state-disabled) {\n' +
      "  background-color: #D5E2F6;\n" +
      "  color: #1D354F;\n" +
      "}",
  );
});

test("uses Oxide convention skin entrypoints with theme variable overrides", () => {
  const sourceRoot = resolve(import.meta.dirname, "../oxide/src/less/skins/ui");
  for (const [theme, color] of [
    ["next-gen", "--instui-color-stroke-base"],
    ["canvas", "--instui-color-stroke-base"],
    ["canvas-high-contrast", "--instui-color-stroke-base"],
  ] as const) {
    const source = readFileSync(resolve(sourceRoot, theme, "skin.less"), "utf8");
    expect(source).toContain('@import "src/less/theme/theme";');
    expect(source).toContain("src/less/generated/");
    const generatedName = theme === "next-gen" ? "next-gen-light" : theme;
    const generated = readFileSync(
      resolve(import.meta.dirname, `../oxide/src/less/generated/${generatedName}-tokens.less`),
      "utf8",
    );
    expect(generated).toContain(`// ${color}`);
  }

  expect(readFileSync(resolve(generatedRoot, "next-gen/skin.css"), "utf8")).toContain(
    "border-color:",
  );
});
