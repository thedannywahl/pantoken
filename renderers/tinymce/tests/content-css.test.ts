// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import { injectContentStylesheet, pantokenContentCssUrls } from "../src/content-css.js";

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
  injectContentStylesheet(editor, "https://cdn.example.com/a.css");
  const links = editor.getDoc().head.querySelectorAll("link");
  expect(links).toHaveLength(1);
  expect(links[0]?.rel).toBe("stylesheet");
  expect(links[0]?.href).toBe("https://cdn.example.com/a.css");
});

test("injectContentStylesheet is idempotent for the same url", () => {
  const editor = fakeEditor() as unknown as Parameters<typeof injectContentStylesheet>[0];
  injectContentStylesheet(editor, "https://cdn.example.com/a.css");
  injectContentStylesheet(editor, "https://cdn.example.com/a.css");
  expect(editor.getDoc().head.querySelectorAll("link")).toHaveLength(1);
});
