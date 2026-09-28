// @vitest-environment happy-dom
import { expect, test, vi } from "vite-plus/test";
import type { Editor } from "tinymce";
import { normalizeGlyphHtml, registerGlyphSync } from "../src/lib/glyph-assets.js";
import { getUsedLogoCdnFiles } from "../src/logos.js";

vi.mock("@pantoken/cdn", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@pantoken/cdn")>()),
  buildFileUrl: (file: { package: string; path: string }) =>
    `data:text/css,/*${file.package}/${file.path}*/`,
}));

test("normalizeGlyphHtml fills empty glyph spans and marks them non-editable", () => {
  const html = normalizeGlyphHtml(
    '<p><span class="instui-logo -logo-canvas-horizontal-color" role="img" aria-label="Canvas logo"></span></p>',
    document,
  );
  const span = new DOMParser().parseFromString(html, "text/html").querySelector("span")!;
  expect(span.getAttribute("contenteditable")).toBe("false");
  expect(span.textContent).toBe("\u200B");
  expect(span.getAttribute("aria-label")).toBe("Canvas logo");
});

test("normalizeGlyphHtml returns glyph-free or already-normalized html unchanged", () => {
  const plain = '<p class="x">hello <b>world</b></p>';
  expect(normalizeGlyphHtml(plain, document)).toBe(plain);
  const icon = '<span class="instui-icon -icon-heart" contenteditable="false">\u200B</span>';
  expect(normalizeGlyphHtml(icon, document)).toBe(icon);
});

function fakeEditor() {
  const doc = document.implementation.createHTMLDocument("");
  const handlers = new Map<string, Array<(event: any) => void>>();
  const editor = {
    getDoc: () => doc,
    getBody: () => doc.body,
    on: (names: string, handler: (event: any) => void) => {
      for (const name of names.split(" "))
        handlers.set(name, [...(handlers.get(name) ?? []), handler]);
    },
  } as unknown as Editor;
  const fire = (name: string, event: object = {}) => {
    for (const handler of handlers.get(name) ?? []) handler(event);
    return event;
  };
  return { editor, doc, fire };
}

test("registerGlyphSync normalizes content before it's set or pasted", () => {
  const { editor, fire } = fakeEditor();
  registerGlyphSync(editor, () => [], { currentAssets: [] });
  const raw = '<span class="instui-logo -logo-canvas-icon-color"></span>';
  for (const name of ["BeforeSetContent", "PastePreProcess"]) {
    const event = fire(name, { content: raw }) as { content: string };
    expect(event.content).toContain('contenteditable="false"');
  }
});

test("registerGlyphSync injects stylesheets for glyphs that arrive without the picker", () => {
  const { editor, doc, fire } = fakeEditor();
  const currentAssets: { package: string; path: string }[] = [];
  const onMissingAsset = vi.fn();
  registerGlyphSync(editor, (root) => getUsedLogoCdnFiles(root), { currentAssets, onMissingAsset });

  doc.body.innerHTML = '<span class="instui-logo -logo-canvas-horizontal-color">\u200B</span>';
  for (const name of ["SetContent", "input", "Undo"]) fire(name);

  const links = doc.head.querySelectorAll("link");
  expect(links).toHaveLength(1);
  expect(links[0]?.getAttribute("href")).toContain(
    "@pantoken/plugin-logos/dist/canvas-horizontal-color.css",
  );
  expect(currentAssets).toEqual([
    { package: "@pantoken/plugin-logos", path: "dist/canvas-horizontal-color.css" },
  ]);
  expect(onMissingAsset).toHaveBeenCalledTimes(1);
});
