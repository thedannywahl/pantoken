// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import {
  injectContentStylesheet,
  pantokenContentCssUrls,
  retargetContentStylesheets,
} from "../src/content-css.js";

const STYLESHEET_URL = "data:text/css,body%7B%7D";

test("pantokenContentCssUrls delegates to buildFileUrls", () => {
  const urls = pantokenContentCssUrls(
    [{ package: "@pantoken/components", path: "dist/base.css" }],
    "unpkg",
  );
  expect(urls).toEqual(["https://unpkg.com/@pantoken/components/dist/base.css"]);
});

/** A minimal `Editor`-shaped stub backed by a real happy-dom document. */
function fakeEditor() {
  const doc = document.implementation.createHTMLDocument("");
  return { getDoc: () => doc };
}

test("injectContentStylesheet appends exactly one stylesheet link", () => {
  const editor = fakeEditor() as unknown as Parameters<typeof injectContentStylesheet>[0];
  injectContentStylesheet(editor, STYLESHEET_URL);
  const links = editor.getDoc().head.querySelectorAll("link");
  expect(links).toHaveLength(1);
  expect(links[0]?.rel).toBe("stylesheet");
  expect(links[0]?.href).toBe(STYLESHEET_URL);
});

test("injectContentStylesheet is idempotent for the same url", () => {
  const editor = fakeEditor() as unknown as Parameters<typeof injectContentStylesheet>[0];
  injectContentStylesheet(editor, STYLESHEET_URL);
  injectContentStylesheet(editor, STYLESHEET_URL);
  expect(editor.getDoc().head.querySelectorAll("link")).toHaveLength(1);
});

const FILE = { package: "@pantoken/plugin-logos", path: "dist/canvas-icon-color.css" };

test("a tagged stylesheet is idempotent per file and updates its url in place", () => {
  const editor = fakeEditor() as unknown as Parameters<typeof injectContentStylesheet>[0];
  injectContentStylesheet(editor, "data:text/css,/*a*/", FILE);
  injectContentStylesheet(editor, "data:text/css,/*b*/", FILE);
  const links = editor.getDoc().head.querySelectorAll("link");
  expect(links).toHaveLength(1);
  expect(links[0]?.getAttribute("href")).toBe("data:text/css,/*b*/");
  expect(links[0]?.getAttribute("data-pantoken-asset")).toBe(
    "@pantoken/plugin-logos:dist/canvas-icon-color.css",
  );
});

test("retargetContentStylesheets re-resolves tagged links and leaves others alone", () => {
  const editor = fakeEditor() as unknown as Parameters<typeof injectContentStylesheet>[0];
  injectContentStylesheet(editor, STYLESHEET_URL);
  injectContentStylesheet(editor, "data:text/css,/*jsdelivr*/", FILE);
  retargetContentStylesheets(
    editor,
    (file) => `data:text/css,/*unpkg ${file.package}/${file.path}*/`,
  );
  const [untagged, tagged] = editor.getDoc().head.querySelectorAll("link");
  expect(untagged?.getAttribute("href")).toBe(STYLESHEET_URL);
  expect(tagged?.getAttribute("href")).toBe(
    "data:text/css,/*unpkg @pantoken/plugin-logos/dist/canvas-icon-color.css*/",
  );
});
