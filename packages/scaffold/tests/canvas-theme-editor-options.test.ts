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

test("async snapshots remove generated visuals from canonical content but keep them in exports", async () => {
  const state = new InlineDocument();
  const rendered = await state.renderAsync('<p style="color: red">Author</p>', "", async (html) => {
    const root = document.createElement("template");
    root.innerHTML = html;
    const paragraph = root.content.querySelector("p")!;
    paragraph.style.padding = "12px";
    const glyph = document.createElement("span");
    glyph.setAttribute("data-pantoken-inline-generated", "::before");
    glyph.setAttribute("aria-hidden", "true");
    glyph.textContent = "Glyph";
    paragraph.prepend(glyph);
    return root.innerHTML;
  });
  expect(state.canonical(rendered)).toBe('<p style="color: red;">Author</p>');
  expect(state.export(rendered)).toContain("Glyph");
  expect(state.export(rendered)).not.toContain("data-pantoken-inline");
});

test("the editing iframe follows shell appearance independently of export settings", () => {
  const main = readFileSync(
    resolve(import.meta.dirname, "../templates/canvas-theme-editor/src/main.ts.tmpl"),
    "utf8",
  );
  const editorTheme = main
    .split("function applyEditorTheme(")[1]!
    .split("function forceEditorColorScheme(")[0]!;
  expect(editorTheme).toContain(": adaptiveTokensCss;");
  expect(editorTheme).not.toContain("includeDarkModeCheckbox");
  expect(editorTheme).not.toContain("INLINE_PROVIDER_ID");
  expect(editorTheme).toContain(
    'document.documentElement.dataset.pantokenScheme === "dark" ? "dark" : "light"',
  );
  expect(editorTheme).toContain("editorDocument.documentElement.dataset.pantokenScheme = scheme");
  expect(editorTheme).toContain("editorDocument.documentElement.style.colorScheme = scheme");
  expect(editorTheme).toContain(
    "body.mce-content-body > [data-pantoken-color] { background-color: var(--instui-color-background-container) !important; }",
  );
  const forceScheme = main
    .split("function forceEditorColorScheme(")[1]!
    .split("function getEditorColorScheme(")[0]!;
  expect(forceScheme).toContain("documentElement.dataset.pantokenScheme = scheme");
  expect(forceScheme).toContain("documentElement.style.colorScheme = scheme");
});

test("shell appearance and color changes leave the preview's own settings independent", () => {
  const main = readFileSync(
    resolve(import.meta.dirname, "../templates/canvas-theme-editor/src/main.ts.tmpl"),
    "utf8",
  );
  expect(main).not.toContain("syncPreviewSchemeToAppearance");
  expect(main).toContain("let previewDarkOverride = false;");
  expect(main).toContain(
    'previewSchemeToggle.addEventListener("click", () => {\n  previewDarkOverride = !previewDarkOverride;',
  );
  const chromeColor = main
    .split("function applyChromeColor(")[1]!
    .split("function applyHostColor(")[0]!;
  expect(chromeColor).not.toContain("selectedColor =");
  expect(chromeColor).not.toContain("applyThemeColor(");
});

test("the preview keeps its page surface independently of the editor container surface", () => {
  const main = readFileSync(
    resolve(import.meta.dirname, "../templates/canvas-theme-editor/src/main.ts.tmpl"),
    "utf8",
  );
  const preview = main
    .split("function updatePreview(")[1]!
    .split("const debouncedUpdatePreview")[0]!;
  expect(preview).toContain("html{background:var(--instui-color-background-page)}");
  expect(preview).not.toContain("html{background:#fff}");
  expect(preview).toContain("portable ? [previewTokensCss, PREVIEW_SCHEME_FORCE_CSS]");
  expect(preview).toContain("const previewFrameCss = `@scope (:root) to (#content > *) {");
  expect(preview).toContain("${baseCss}\n${componentsCss}\n${utilitiesCss}");
  expect(preview).toContain("<head><style>${previewFrameCss}\n${themeCss}");
});

test("preview interactions use the bundled initializer before custom JavaScript", () => {
  const main = readFileSync(
    resolve(import.meta.dirname, "../templates/canvas-theme-editor/src/main.ts.tmpl"),
    "utf8",
  );
  const preview = main
    .split("function updatePreview(")[1]!
    .split("const debouncedUpdatePreview")[0]!;
  expect(preview).toContain(
    'portable ? [] : [includeInteractionsCheckbox.checked ? localInteractionsJs : "", jsEditorView.state.doc.toString()]',
  );
  expect(preview).not.toContain("[theme.js, jsEditorView.state.doc.toString()]");
  expect(preview.indexOf("${getNormalizedEditorHtml()}")).toBeLessThan(
    preview.indexOf('"<script>" + themeJs'),
  );
});

test("portable Inline forces light/static settings and isolates preview and downloads", () => {
  const main = readFileSync(
    resolve(import.meta.dirname, "../templates/canvas-theme-editor/src/main.ts.tmpl"),
    "utf8",
  );
  expect(main).toContain('import("@pantoken/inline-styles/browser")');
  expect(main).toContain("includeInteractionsCheckbox.disabled = inline");
  expect(main).toContain(
    "includeDarkModeCheckbox.disabled = !supportsDarkMode || providerSelect.value === INLINE_PROVIDER_ID",
  );
  const downloads = main
    .split("function buildDownloadFiles(")[1]!
    .split("function downloadBlob(")[0]!;
  expect(downloads).toContain("providerSelect.value === INLINE_PROVIDER_ID");
  expect(downloads).toContain('? { css: "", js: "" }');
  expect(downloads).toContain("css: [presetCss, cssEditorView.state.doc.toString()]");
  expect(downloads).toContain("js: [presetJs, jsEditorView.state.doc.toString()]");
  expect(downloads).toContain("files.css.trim()");
  expect(downloads).toContain("files.js.trim()");
  expect(downloads).toContain('link.removeAttribute("href")');
  expect(downloads).toContain('link.setAttribute("aria-disabled", String(!objectUrl))');
  expect(downloads).toContain("link.tabIndex = objectUrl ? 0 : -1");
  expect(main).toContain("preferredInteractions:");
  expect(main).toContain("preferredMode:");
});
