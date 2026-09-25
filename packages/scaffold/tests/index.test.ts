import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { SCAFFOLD_PLATFORMS, isScaffoldPlatform, scaffoldProject } from "../src/index.ts";

test("ships a known scaffold platform set", () => {
  expect(SCAFFOLD_PLATFORMS).toContain("components");
  expect(SCAFFOLD_PLATFORMS).toContain("react");
  expect(SCAFFOLD_PLATFORMS).toContain("vue");
  expect(SCAFFOLD_PLATFORMS).toContain("web-components");
});

test("html is accepted as an alias for components", async () => {
  expect(isScaffoldPlatform("html")).toBe(true);
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-html-"));
  const target = join(dir, "my-app");
  const written = await scaffoldProject("html", target);
  expect(written.length).toBeGreaterThan(0);
  expect(existsSync(join(target, "package.json"))).toBe(true);
});

test("canvas-theme-editor is a known, template-only platform (no preset)", async () => {
  expect(SCAFFOLD_PLATFORMS).toContain("canvas-theme-editor");
  expect(isScaffoldPlatform("canvas-theme-editor")).toBe(true);
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-canvas-"));
  const target = join(dir, "my-app");
  const written = await scaffoldProject("canvas-theme-editor", target);
  expect(written.length).toBeGreaterThan(0);
  expect(existsSync(join(target, "theme.css"))).toBe(true);
  expect(existsSync(join(target, "theme.js"))).toBe(true);
  expect(existsSync(join(target, "index.html"))).toBe(true);
  expect(existsSync(join(target, "src/main.ts"))).toBe(true);
  const main = readFileSync(join(target, "src/main.ts"), "utf8");
  const appHtml = readFileSync(join(target, "src/app.html"), "utf8");
  expect(appHtml.match(/class="instui-button -size-sm -color-secondary -toggle"/g)).toHaveLength(3);
  expect(appHtml).toContain('aria-pressed="true"');
  expect(appHtml).toContain('class="instui-checkbox -variant-toggle"');
  expect(appHtml).toContain('class="instui-simple-select" id="cdn-provider"');
  expect(appHtml).toContain('class="instui-close-button -size-sm theme-tray__close"');
  expect(appHtml).toContain('popovertargetaction="hide"');
  expect(appHtml).toContain('aria-label="{{closeLabel}}"');
  expect(appHtml).toContain('id="preview-popup-toggle"');
  expect(appHtml).toContain('aria-label="{{previewPopupLabel}}"');
  expect(appHtml).not.toContain("theme-picker__item");
  expect(main.match(/selectToggleButton\(themeButtons, themeButton\);/g)).toHaveLength(3);
  expect(main).toContain("selectToggleButton(themeButtons, button);");
  expect(main).not.toContain("selectButton(themeButtons");
  expect(main).toContain(
    'document.querySelectorAll<HTMLButtonElement>(".theme-picker [data-theme]")',
  );
  expect(main.indexOf('document.querySelector<HTMLDivElement>("#app")!')).toBeLessThan(
    main.indexOf("interactionsScript.src = interactionsIifeUrl"),
  );
  expect(main).toContain("createPlaceholdPlugin");
  expect(main).toContain("resolveImage: (placeholder) => {");
  expect(main).toContain("src: image.url");
  expect(main).toContain('alt: placeholder.altText ?? ""');
  expect(main).toContain("createContentClassesPlugin");
  expect(main).toContain("CONTENT_CLASSES_PLUGIN_NAME");
  expect(main).toContain("getUsedIconCdnFiles");
  expect(main).toContain("getUsedLogoCdnFiles");
  expect(main).toContain("syncIconAssetsFromEditor();");
  expect(main).toContain("...currentAssets]");
  expect(main).toContain("const onMissingAsset = () => void refreshAll();");
  expect(main).toContain(
    '"/node_modules/@pantoken/plugin-{logos,simple-icons,lucide-lab,custom-icons}/dist/**/*.css"',
  );
  expect(main).toContain("buildFileUrl(file, providerSelect.value)");
  expect(main).toContain("buildAssetUrl: buildSelectedAssetUrl");
  expect(main).toContain("createA11yPlugin");
  expect(main).toContain("createSourceTogglePlugin");
  expect(main).toContain("if (isLocalPreview) {");
  expect(main).toContain("localProviderOption.value = LOCAL_PROVIDER_ID;");
  expect(main).toContain("async function inlineAssetCss");
  expect(main).toContain("const dynamicCss = await inlineAssetCss(currentAssets);");
  expect(main).toContain("if (selection.provider !== LOCAL_PROVIDER_ID) {");
  expect(main).toContain("let refreshGeneration = 0;");
  expect(main).toContain("providerSelect.value = LOCAL_PROVIDER_ID;");
  for (const theme of ["next-gen", "canvas", "canvas-high-contrast"]) {
    expect(main).toContain(`@pantoken/tinymce/skins/${theme}/skin.css?inline`);
    expect(main).toContain(`@pantoken/tinymce/skins/${theme}/content.css?inline`);
  }
  expect(main.indexOf("document.head.append(chromeThemeStyle)")).toBeLessThan(
    main.indexOf("document.head.append(customThemeColorsStyle)"),
  );
  expect(main).toContain("editorSkinStyle.textContent = css.skin;");
  expect(main).toContain(
    'editorContentStyle.textContent = [css.content, PREVIEW_SCHEME_FORCE_CSS].join("\\n");',
  );
  expect(main).toContain("editorContentStyle.ownerDocument !== editorDocument");
  expect(main).not.toContain("editorSkinLink?.remove()");
  expect(main).not.toContain("editorContentLink?.remove()");
  expect(main).not.toContain("tinymce/skins/ui/oxide/skin.css");
  expect(main).toContain(
    '"pantoken pantoken_content_classes placehold pantoken_a11y pantoken_save pantoken_sup_sub pantoken_source_toggle pantoken_fullscreen_footer pantoken_searchreplace_footer pantoken_visualblocks_footer image link lists',
  );
  expect(main).toContain('createA11yPlugin({ display: "footer", config: a11yRuntimeConfig })');
  expect(main).toContain("createSavePlugin<CanvasThemePreset>");
  expect(main).toContain("SAVE_PLUGIN_NAME");
  expect(main).toContain(
    "toolbar: `${SAVE_TOOLBAR_NAME} undo redo | pantoken | fontsize blocks | bold italic underline",
  );
  expect(main).toContain(
    'import { Check, ChevronDown, createElement, Languages, MoonStar, Palette, SunMedium } from "lucide";',
  );
  expect(main).toContain('createElement(icon, { width: 16, height: 16, "stroke-width": 2 })');
  expect(main).not.toContain("icon({ size: 16, strokeWidth: 2 })");
  expect(main).not.toContain("pantokenA11y");
  expect(main).toContain("let previewMutationObserver: MutationObserver | undefined");
  expect(main).toContain("previewFrame.contentDocument?.documentElement");
  expect(main).toContain("previewMutationObserver.observe(root");
  expect(main).toContain("previewFrame.style.height");
  expect(main).toContain("function openPreviewPopup(): void {");
  expect(main).toContain("function restorePreviewFromPopup(");
  expect(main).toContain("previewAnchor.after(previewPane);");
  expect(main).toContain("previewPopup.closed");
  expect(main).toContain('popup.addEventListener("pagehide"');
  expect(main).toContain('window.addEventListener("beforeunload"');
  expect(main).toContain('if (!href?.startsWith("#")) return;');
  expect(main).toContain("event.preventDefault();");
  expect(main).toContain("previewDocument.getElementById(fragment)");
  expect(main).toContain("previewDocument.getElementsByName(fragment)[0]");
  expect(main).toContain(
    'previewFrame.contentDocument?.addEventListener("click", handlePreviewLinkClick);',
  );
  // The docs page's dark/light mode re-themes the chrome only — it must never drive the
  // "include dark mode" checkbox, which is an independent authoring choice.
  expect(main).not.toContain('includeDarkModeCheckbox.checked = mode === "dark";');
  expect(main).toContain("document.documentElement.dataset.pantokenScheme = mode;");
  expect(main).toContain("applyEditorTheme(activeEditor);");
  expect(main).toContain(
    "document.querySelector<HTMLMetaElement>('meta[name=\"application-name\"]')",
  );
  expect(main).toContain("document.querySelector<HTMLMetaElement>('meta[name=\"theme-color\"]')");
  expect(main).toContain("getComputedStyle(document.documentElement).backgroundColor");
  expect(main).toContain('link[rel="icon"][data-pantoken-themed-icon]');
  expect(main).toContain("PANTOKEN_ICON,");
  expect(main).toContain('getPropertyValue("--instui-primitive-color-navy-navy100")');
  expect(main.match(/syncBrowserMetadata\(\);/g)).toHaveLength(2);
  expect(main).toContain("refreshAll();");
  expect(main).toContain("interface CanvasThemePreset");
  expect(main).toContain("readonly theme: ThemeVariant;");
  expect(main).toContain("readonly color: PantokenColorNamespace;");
  expect(main).toContain("readonly mode: ThemeMode;");
  expect(main).toContain("readonly cdnProvider: string;");
  expect(main).toContain("readonly customCss: string;");
  expect(main).toContain("readonly customJs: string;");
  expect(main).toContain("readonly editorHtml: string;");
  expect(main).toContain("normalizeEditorHtml(preset.editorHtml, preset.color)");
  expect(main).toContain("activeEditor.resetContent(editorHtml);");
  expect(main).toContain("sourceToggle.replaceAll(editorHtml)");
  expect(main).toContain('selector: "",');
  expect(main).toContain("<head><style>${themeCss}");
  expect(main).not.toContain('<html data-pantoken-color="${selectedColor}">');
  expect(appHtml).toContain('<div data-pantoken-color="navy"><p></p></div>');
  expect(main).toContain('autosave_interval: "30s"');
  expect(main).toContain('import { strToU8, zipSync } from "fflate";');
  expect(main).toContain('document.querySelector<HTMLButtonElement>("#download-package")!');
  expect(main).toContain('document.querySelector<HTMLButtonElement>("#download-html")!');
  expect(main).toContain('downloadHtmlButton.addEventListener("click"');
  expect(main).toContain(
    'new Blob([getNormalizedEditorHtml()], { type: "text/html;charset=utf-8" })',
  );
  expect(main).toContain('`${slugifyExportName(activePresetName() ?? "index")}.html`');
  expect(main).toContain('downloadPackageButton.addEventListener("click"');
  expect(main).toContain("const files = buildDownloadFiles(theme);");
  expect(main).toContain('"index.html": strToU8(getNormalizedEditorHtml())');
  expect(main).toContain('"theme.css": strToU8(files.css)');
  expect(main).toContain('"theme.js": strToU8(files.js)');
  expect(main).toContain('`${slugifyExportName(activePresetName() ?? "canvas-theme")}.zip`');
  expect(main).toContain('type: "application/zip"');
  // The standalone shell's brand mark is a link to pantoken.app, styled as a primary icon button
  // (not a plain div) so its glyph gets the button's own light/dark contrast handling.
  expect(main).toContain('brandMark.href = "https://pantoken.app/";');
  expect(main).toContain('brandMark.target = "_blank";');
  expect(main).toContain('rel = "noopener noreferrer"');
  expect(main).toContain(
    'brandMark.className = "instui-button -color-primary -shape-square canvas-rce-shell__brand-mark"',
  );
  // The standalone shell's appearance picker only offers Light/Dark (no "System") and defaults to
  // light — auto-following the OS scheme caused more confusion than it was worth.
  expect(main).toContain("const applyAppearance = (appearance:");
  expect(main).toContain('applyAppearance("light");');
  expect(main).toContain('if (appearance === "light") option.classList.add("is-selected");');
  expect(main).not.toContain('"system"');
  // The color menu renders every pantoken color (not a hardcoded 7-item subset) with the same
  // swatch disc the theme-tray picker already uses, and marks the app's actual default selected.
  expect(main).toContain("for (const color of COLOR_KEYS) {");
  expect(main).toContain('swatch.className = "theme-picker__swatch";');
  expect(main).toContain('if (color === "navy") option.classList.add("is-selected");');
  expect(main).not.toContain('["navy", "Navy"],');
  // Native <details> doesn't close on outside click/Escape on its own.
  expect(main).toContain('document.addEventListener("click", (event) => {');
  expect(main).toContain('event.key !== "Escape"');
  // "Large" only got a 50/50 flex share in row layout, so it could render narrower than the fixed
  // "medium"/"small" widths on a narrow window — this floor guarantees it never does.
  expect(main).toContain('previewPane.style.minWidth = "var(--instui-breakpoints-lg)";');
  // The standalone shell's header swatches must be immune to the chrome's active color remap,
  // same as the theme tray — otherwise the navy/blue swatches get remapped to whatever color the
  // chrome currently has active.
  expect(main).toContain('resetSelector: "#theme-tray, #canvas-rce-shell"');
  expect(readFileSync(join(target, "src/app.css"), "utf8")).toContain(
    '.panes[data-layout="row"] .preview-pane',
  );
  // Stacked layout must size the editor pane by content (so TinyMCE's own resize handle can grow
  // it freely) — `flex: 1 1 0` here gave it a zero flex-basis with no free space to grow into.
  expect(readFileSync(join(target, "src/app.css"), "utf8")).toContain(
    '.panes[data-layout="row"] .editor-pane {\n  flex: 1 1 0;\n}',
  );
  // The fullscreen overlay's background must adapt to dark mode like every other background in
  // this file — a hardcoded `#fff` fallback showed white chrome behind a dark-mode preview.
  expect(readFileSync(join(target, "src/app.css"), "utf8")).toContain(
    "background: var(--instui-color-background-primary, Canvas);",
  );
  expect(readFileSync(join(target, "src/app.css"), "utf8")).not.toContain(
    "background: var(--instui-color-background-primary, #fff);",
  );
  expect(main).not.toContain('tinymce.PluginManager.add("pantoken_components"');
  expect(main).not.toContain('tinymce.PluginManager.add("pantoken_source_toggle"');
  expect(existsSync(join(target, "src/preferences.ts"))).toBe(true);
  expect(main).toContain('import { loadPreferences, savePreferences } from "./preferences.ts";');
  expect(main).toContain("const preferences = loadPreferences();");
  expect(main).toContain("function persistPreferences(): void {");
  const preferences = readFileSync(join(target, "src/preferences.ts"), "utf8");
  expect(preferences).toContain("pantoken-canvas-theme-editor-preferences");
  expect(preferences).toContain("export function loadPreferences(");
  expect(preferences).toContain("export function savePreferences(");
  expect(readFileSync(join(target, "theme.css"), "utf8")).toContain(
    "@pantoken/css/dist/style.rebrand.light.lean.css",
  );
  expect(readFileSync(join(target, "theme.css"), "utf8")).toContain(
    "@pantoken/plugin-custom-theme-colors/dist/custom-theme-colors.scoped.css",
  );
  const pkg = readFileSync(join(target, "package.json"), "utf8");
  expect(pkg).toContain('"name": "my-app"');
  expect(pkg).toContain('"@pantoken/tinymce-placehold": "latest"');
  expect(pkg).toContain('"@pantoken/plugin-logos": "latest"');
  expect(pkg).toContain('"@pantoken/tinymce-a11y": "latest"');
  expect(pkg).toContain('"@pantoken/tinymce-save": "latest"');
  expect(pkg).toContain('"fflate": "catalog:"');
  expect(pkg).not.toContain("{{projectName}}");
});

test("canvas-theme-editor keeps other tinymce config keys when persisting a11y settings", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-canvas-prefs-"));
  const target = join(dir, "my-app");
  await scaffoldProject("canvas-theme-editor", target);
  const preferences = readFileSync(join(target, "src/preferences.ts"), "utf8");
  expect(preferences).toContain("const current = loadPreferences();");
  expect(preferences).toContain(
    '...(typeof current.tinymceConfig === "object" && current.tinymceConfig !== null',
  );
  expect(preferences).toContain("tinymceConfig: nextTinymceConfig,");
});

test("canvas-theme-editor's theme.css/theme.js honor --cdn/--theme at scaffold time", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-canvas-cdn-"));
  const target = join(dir, "my-app");
  await scaffoldProject("canvas-theme-editor", target, { cdn: "unpkg", theme: "canvas" });
  const themeCss = readFileSync(join(target, "theme.css"), "utf8");
  expect(themeCss).toContain("unpkg.com");
  expect(themeCss).toContain("style.canvas.lean.css");
  expect(themeCss).toContain(
    "@pantoken/plugin-custom-theme-colors/dist/custom-theme-colors.scoped.css",
  );
});

test("theme-editor is accepted as an alias for canvas-theme-editor", async () => {
  expect(isScaffoldPlatform("theme-editor")).toBe(true);
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-theme-editor-"));
  const target = join(dir, "my-app");
  const written = await scaffoldProject("theme-editor", target);
  expect(written.length).toBeGreaterThan(0);
  expect(existsSync(join(target, "theme.css"))).toBe(true);
});

test("scaffolds a platform with projectName substituted", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-"));
  const target = join(dir, "my-app");
  const written = await scaffoldProject("react", target);
  expect(written.length).toBeGreaterThan(0);
  const pkg = readFileSync(join(target, "package.json"), "utf8");
  expect(pkg).toContain('"name": "my-app"');
  expect(pkg).not.toContain("{{projectName}}");
});

test("scaffolded package managers pre-approve known transitive install scripts", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-install-scripts-"));
  const target = join(dir, "my-app");
  await scaffoldProject("components", target);

  const pkg = JSON.parse(readFileSync(join(target, "package.json"), "utf8")) as {
    allowScripts?: Record<string, boolean>;
    trustedDependencies?: string[];
  };
  const workspace = readFileSync(join(target, "pnpm-workspace.yaml"), "utf8");

  expect(pkg.allowScripts).toMatchObject({ "core-js": true, fsevents: true, ttf2woff2: true });
  expect(pkg.trustedDependencies).toEqual(
    expect.arrayContaining(["core-js", "fsevents", "ttf2woff2"]),
  );
  expect(workspace).toContain("fsevents: true");
});

test("bun-scaffolded projects use bun README commands and omit pnpm workspace config", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-bun-"));
  const target = join(dir, "my-app");
  await scaffoldProject("components", target, { packageManager: "bun" });

  const readme = readFileSync(join(target, "README.md"), "utf8");

  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(existsSync(join(target, "pnpm-workspace.yaml"))).toBe(false);
  expect(readme).toContain("bun install");
  expect(readme).toContain("bun run dev");
  expect(readme).not.toContain("npm install");
  expect(readme).not.toContain("npm run dev");
});

test("deno-scaffolded projects use deno README commands and omit pnpm workspace config", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-deno-"));
  const target = join(dir, "my-app");
  await scaffoldProject("components", target, { packageManager: "deno" });

  const readme = readFileSync(join(target, "README.md"), "utf8");

  expect(existsSync(join(target, "package.json"))).toBe(true);
  expect(existsSync(join(target, "pnpm-workspace.yaml"))).toBe(false);
  expect(readme).toContain("deno install");
  expect(readme).toContain("deno task dev");
  expect(readme).not.toContain("npm install");
  expect(readme).not.toContain("npm run dev");
});

test("defaults every scaffold's pantoken CSS import to the rebrand/light theme", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-theme-default-"));
  const target = join(dir, "my-app");
  await scaffoldProject("react", target);
  const main = readFileSync(join(target, "src/main.tsx"), "utf8");
  expect(main).toContain('import "@pantoken/css/style.rebrand.light.lean.css";');
  expect(main).not.toContain("{{pantokenCssImport}}");
});

test("defaults generated markup to English, left-to-right", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-locale-default-"));
  const target = join(dir, "my-app");
  await scaffoldProject("react", target);
  expect(readFileSync(join(target, "index.html"), "utf8")).toContain('<html lang="en" dir="ltr">');
});

test("locale drives the generated markup's lang attribute", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-locale-hu-"));
  const target = join(dir, "my-app");
  await scaffoldProject("react", target, { locale: "hu" });
  const html = readFileSync(join(target, "index.html"), "utf8");
  expect(html).toContain('<html lang="hu" dir="ltr">');
  expect(html).not.toContain("{{locale}}");
});

test("uses the localized README overlay for the requested locale", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-readme-hu-"));
  const target = join(dir, "my-app");
  await scaffoldProject("react", target, { locale: "hu" });
  const readme = readFileSync(join(target, "README.md"), "utf8");
  expect(readme).toContain("# my-app");
  expect(readme).toContain("Egy Vite + React alkalmazás");
  expect(readme).not.toContain("{{projectName}}");
});

test("a right-to-left locale sets dir=rtl on generated markup", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-locale-ar-"));
  const target = join(dir, "my-app");
  await scaffoldProject("components", target, { locale: "ar" });
  expect(readFileSync(join(target, "index.html"), "utf8")).toContain('<html lang="ar" dir="rtl">');
});

test("every platform's entry markup carries a resolved lang/dir pair", async () => {
  for (const platform of SCAFFOLD_PLATFORMS) {
    const dir = mkdtempSync(join(tmpdir(), `pantoken-scaffold-lang-${platform}-`));
    const written = await scaffoldProject(platform, join(dir, "app"), { locale: "he" });
    const markup = written.filter(
      (path) => path.endsWith("index.html") || path.endsWith("layout.tsx"),
    );
    for (const path of markup) {
      const source = readFileSync(path, "utf8");
      if (!source.includes("<html")) continue;
      expect(source, `${platform} ${path}`).toContain('lang="he" dir="rtl"');
    }
  }
});

test("--theme/--theme-mode select which @pantoken/css sheet a scaffold imports", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-theme-"));
  const canvasTarget = join(dir, "canvas-app");
  await scaffoldProject("vue", canvasTarget, { theme: "canvas" });
  expect(readFileSync(join(canvasTarget, "src/main.ts"), "utf8")).toContain(
    'import "@pantoken/css/style.canvas.lean.css";',
  );

  const adaptiveTarget = join(dir, "adaptive-app");
  await scaffoldProject("svelte", adaptiveTarget, { theme: "rebrand", mode: "adaptive" });
  expect(readFileSync(join(adaptiveTarget, "src/main.ts"), "utf8")).toContain(
    'import "@pantoken/css/style.lean.css";',
  );
});

test("defaults to pantoken-app when dir is '.'", async () => {
  const dir = mkdtempSync(join(tmpdir(), "pantoken-scaffold-dot-"));
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    await scaffoldProject("components", ".");
    expect(existsSync(join(dir, "package.json"))).toBe(true);
    expect(readFileSync(join(dir, "package.json"), "utf8")).toContain('"name": "pantoken-app"');
  } finally {
    process.chdir(cwd);
  }
});

test("rejects unknown platforms with a clear error", async () => {
  try {
    await scaffoldProject("invalid");
    expect(true).toBe(false); // Should have thrown
  } catch (err) {
    expect(err instanceof Error && err.message.includes("Unknown platform")).toBe(true);
  }
});
