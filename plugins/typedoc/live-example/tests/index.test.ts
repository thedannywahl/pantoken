import { expect, test } from "vite-plus/test";
import { withLiveExamples } from "../src/index.ts";

test("appends a live preview after an html fence, echoing the markup", () => {
  const md = '## Examples\n\n```html\n<span class="instui-badge">4</span>\n```\n';
  const out = withLiveExamples(md);
  // The source fence survives …
  expect(out).toContain('```html\n<span class="instui-badge">4</span>\n```');
  // … and the same markup renders live beneath it.
  expect(out).toContain('<div class="css-example">\n<span class="instui-badge">4</span>\n</div>');
});

test("skips overlay examples (dialog / popover) — they stay source-only", () => {
  const dialog = '```html\n<dialog class="instui-modal">x</dialog>\n```';
  expect(withLiveExamples(dialog)).toBe(dialog);

  const popover = '```html\n<div popover class="instui-popover">x</div>\n```';
  expect(withLiveExamples(popover)).toBe(popover);
  expect(withLiveExamples(popover)).not.toContain("css-example");
});

test("leaves non-html fences (demo, text, mermaid) untouched", () => {
  const other = "```demo\nself:menu\n```\n\n```text\ntree\n```";
  expect(withLiveExamples(other)).toBe(other);
});

test("handles multiple examples on one page", () => {
  const md =
    '```html\n<a class="instui-link">a</a>\n```\n\n```html\n<a class="instui-link -inline">b</a>\n```';
  const out = withLiveExamples(md);
  expect(out.match(/css-example/gu)?.length).toBe(2);
});

test("a custom wrap controls the wrapper structure", () => {
  const md = '```html\n<span class="instui-badge">4</span>\n```';
  const out = withLiveExamples(md, {
    wrap: (html) => `<div class="instui-card">\n${html}\n</div>`,
  });
  expect(out).toContain('<div class="instui-card">\n<span class="instui-badge">4</span>\n</div>');
  expect(out).not.toContain("css-example");
});

test("a custom wrap still skips overlays", () => {
  const dialog = '```html\n<dialog class="instui-modal">x</dialog>\n```';
  const out = withLiveExamples(dialog, { wrap: (html) => `<article>${html}</article>` });
  expect(out).toBe(dialog);
});
