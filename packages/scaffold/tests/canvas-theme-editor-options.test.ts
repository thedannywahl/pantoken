// @vitest-environment happy-dom
import { expect, test } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { componentNeedsInteractions } from "../templates/canvas-theme-editor/src/component-availability.ts";

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
