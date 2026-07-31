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
  expect(css).toContain(':root[data-pantoken-theme="canvas"]');
  expect(css).toContain(':root[data-pantoken-theme="canvasHighContrast"]');
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
