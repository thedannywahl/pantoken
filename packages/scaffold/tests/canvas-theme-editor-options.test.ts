/// <reference lib="dom" />
// @vitest-environment happy-dom
import { expect, test, vi } from "vite-plus/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { componentNeedsInteractions } from "../templates/canvas-theme-editor/src/component-availability.ts";
import { InlineDocument } from "../templates/canvas-theme-editor/src/inline-document.ts";
import { trackPreviewChanges } from "../templates/canvas-theme-editor/src/preview-state.ts";
import { inlineHtml } from "../../../formats/inline-styles/src/inline-html.ts";

test("preview dirty tracking ignores outer layout and detects dismissal and restoration", async () => {
  const root = document.createElement("div");
  root.innerHTML = '<div class="instui-banner">Message</div>';
  document.body.append(root);
  const changed = vi.fn();
  const stop = trackPreviewChanges(root, changed);
  expect(changed).toHaveBeenLastCalledWith(false);
  document.body.style.height = "500px";
  expect(changed).toHaveBeenCalledTimes(1);
  root.querySelector("div")!.remove();
  await vi.waitFor(() => expect(changed).toHaveBeenLastCalledWith(true));
  root.innerHTML = '<div class="instui-banner">Message</div>';
  await vi.waitFor(() => expect(changed).toHaveBeenLastCalledWith(false));
  stop();
  root.remove();
  document.body.style.removeProperty("height");
});

test("preview dirty tracking includes property-only control changes", () => {
  const root = document.createElement("div");
  root.innerHTML = '<input type="checkbox">';
  const changed = vi.fn();
  const stop = trackPreviewChanges(root, changed);
  const input = root.querySelector("input")!;
  input.checked = true;
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(changed).toHaveBeenLastCalledWith(true);
  input.checked = false;
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(changed).toHaveBeenLastCalledWith(false);
  stop();
  input.checked = true;
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(changed).toHaveBeenLastCalledWith(false);
});
import componentCapabilities from "../../../formats/interactions/component-capabilities.json" with { type: "json" };

test("only the published JS requirement tier is unavailable, not optional enhancements", () => {
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
    { name: "banner", type: "js-only" },
  ];
  expect(entries.map((entry) => componentNeedsInteractions(entry, capabilities))).toEqual([
    true,
    false,
    false,
    false,
  ]);
});

test("interactions-off availability matches the CDN picker's none, enhancement, and requirement tiers", () => {
  for (const capability of componentCapabilities.components) {
    const entry = { name: capability.name, className: `.instui-${capability.name}` };
    expect(
      componentNeedsInteractions(entry, componentCapabilities.components),
      capability.name,
    ).toBe(capability.type === "js-only");
  }
  const enhancement = { name: "enhanced", className: ".instui-enhanced" };
  const banner = {
    name: "banner",
    className: ".instui-banner",
    examples: ['<div class="instui-enhanced"></div>'],
  };
  expect(componentNeedsInteractions(banner, [{ name: "enhanced", type: "both" }])).toBe(false);
  expect(componentNeedsInteractions(enhancement, [{ name: "enhanced", type: "both" }])).toBe(false);
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
