import { expect, test, vi, beforeEach } from "vite-plus/test";
import { writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { siteThemesCss, writeSiteThemes } from "./site-themes.ts";

vi.mock("node:fs");

const writeMock = vi.mocked(writeFileSync);
const mkdirMock = vi.mocked(mkdirSync);
const copyMock = vi.mocked(copyFileSync);

beforeEach(() => {
  vi.clearAllMocks();
});

test("the docs theme sheet carries the component foundation variables", () => {
  const css = siteThemesCss();

  expect(css).toContain("--instui-elevation-above:");
  expect(css).toContain("--instui-focus-outline-color:");
});

test("theme blocks are element-scoped, so a nested subtree can pick its own theme", () => {
  const css = siteThemesCss();

  expect(css).toContain('[data-pantoken-theme="canvas"] {');
  expect(css).toContain('[data-pantoken-theme="canvasHighContrast"] {');
  // A `:root`-anchored theme block could only ever apply once per document.
  expect(css).not.toContain(":root[data-pantoken-theme=");
});

test("no scheme forcing blocks: the docs scope pins color-scheme itself", () => {
  const css = siteThemesCss();

  // `color-scheme` is inherited, so setting it on the scope element already resolves `light-dark()`
  // for that subtree. The forcing blocks are ~87kb of pure duplication here.
  expect(css).not.toContain("@layer pantoken.scheme");
  expect(css).not.toContain('[data-pantoken-scheme="dark"]');
});

test("every varying token is declared in every theme block", () => {
  const css = siteThemesCss();
  const names = (theme: string): string[] => {
    const start = css.indexOf(`  [data-pantoken-theme="${theme}"] {`);
    return css
      .slice(start, css.indexOf("\n  }", start))
      .split("\n")
      .flatMap((line) => line.match(/^\s+(--[\w-]+):/)?.[1] ?? [])
      .sort();
  };

  const rebrand = names("rebrand");
  expect(rebrand.length).toBeGreaterThan(0);
  // A token missing from one block would inherit the enclosing scope's value when nested.
  expect(names("canvas")).toEqual(rebrand);
  expect(names("canvasHighContrast")).toEqual(rebrand);
});

test("properties are registered once, so a second sheet cannot clobber them", () => {
  const registered = siteThemesCss().match(/@property\s+(--[\w-]+)/g) ?? [];
  expect(registered.length).toBeGreaterThan(0);
  expect(registered.length).toBe(new Set(registered).size);
});

test("writeSiteThemes writes theme CSS to vitepress theme and demos-assets", () => {
  const css = writeSiteThemes();

  expect(mkdirMock).toHaveBeenCalled();
  expect(writeMock).toHaveBeenCalledWith(
    expect.stringContaining("site-themes.css"),
    expect.stringContaining("--instui-"),
  );
  expect(copyMock).toHaveBeenCalledWith(
    expect.stringContaining(".vitepress"),
    expect.stringContaining("demos-assets"),
  );
  expect(css).toContain("--instui-");
});
