// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { componentNeedsInteractions } from "../templates/canvas-theme-editor/src/component-availability.ts";
import { InlineDocument } from "../templates/canvas-theme-editor/src/inline-document.ts";
import { inlineHtml } from "../../../formats/inline-styles/src/inline-html.ts";

test("components with direct, nested, or transitive behavior are unavailable without interactions", () => {
  const entries = [
    {
      name: "banner",
      className: ".instui-banner",
      examples: ['<div class="instui-banner"><button class="instui-close-button"></button></div>'],
    },
    { name: "close-button", className: ".instui-close-button" },
    { name: "card", className: ".instui-card" },
    { name: "compound", className: ".instui-compound" },
  ];
  const capabilities = [
    { name: "close-button", type: "both" },
    { name: "compound", type: "css-only", requires: ["close-button"] },
  ];
  expect(entries.map((entry) => componentNeedsInteractions(entry, entries, capabilities))).toEqual([
    true,
    true,
    false,
    true,
  ]);
});

test("interactions are default-on, persisted, and only suppress generated behavior", () => {
  const main = readFileSync(
    resolve(import.meta.dirname, "../templates/canvas-theme-editor/src/main.ts.tmpl"),
    "utf8",
  );
  const html = readFileSync(
    resolve(import.meta.dirname, "../templates/canvas-theme-editor/src/app.html"),
    "utf8",
  );
  expect(html).toContain('id="include-interactions" checked');
  expect(html.indexOf('id="include-interactions"')).toBeGreaterThan(
    html.indexOf('id="include-dark-mode"'),
  );
  expect(main).toContain("preset.includeInteractions !== false");
  expect(main).toContain("js: includeInteractionsCheckbox.checked ? undefined : []");
  expect(main).toContain('js: includeInteractionsCheckbox.checked ? localInteractionsJs : ""');
});

test("inline provider round trips retain semantics, authored styles, and edits", () => {
  const state = new InlineDocument();
  const original =
    '<div class="instui-banner" role="status" style="color: red"><p>Original</p></div>';
  const rendered = state.render(
    original,
    ".instui-banner { background-color: blue; color: green; } p { padding: 4px; }",
    inlineHtml,
  );
  expect(rendered).toContain("background-color: blue");
  const edited = rendered.replace("Original", "Edited").replace("padding: 4px", "padding: 8px");
  const canonical = state.canonical(edited);
  expect(canonical).toContain('class="instui-banner" role="status"');
  expect(canonical).toContain("color: red");
  expect(canonical).toContain("padding: 8px");
  expect(canonical).toContain("Edited");
  expect(canonical).not.toContain("background-color");
  expect(canonical).not.toContain("data-pantoken-inline-id");
  expect(state.export(rendered)).not.toContain("data-pantoken-inline-id");
});

test("inline history recovers earlier undo snapshots and preserves newly inserted structure", () => {
  const state = new InlineDocument();
  const first = state.render('<p class="text">First</p>', ".text { color: red; }", inlineHtml);
  state.render(first.replace("First", "Second"), ".text { color: blue; }", inlineHtml);
  expect(state.canonical(first)).toBe('<p class="text">First</p>');
  expect(state.canonical(first.replace("</p>", "<strong>New</strong></p>"))).toBe(
    '<p class="text">First<strong>New</strong></p>',
  );
});
