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
  expect(main.indexOf('document.querySelector<HTMLDivElement>("#app")!')).toBeLessThan(
    main.indexOf("interactionsScript.src = interactionsIifeUrl"),
  );
  expect(main).toContain("createPlaceholdPlugin");
  expect(main).toContain("resolveImage: (placeholder) => {");
  expect(main).toContain("src: image.url");
  expect(main).toContain('alt: placeholder.altText ?? ""');
  expect(main).toContain("createContentClassesPlugin");
  expect(main).toContain("CONTENT_CLASSES_PLUGIN_NAME");
  expect(main).toContain("createA11yPlugin");
  expect(main).toContain("createSourceTogglePlugin");
  expect(main).toContain("if (isLocalPreview) {");
  expect(main).toContain("providerSelect.value = LOCAL_PROVIDER_ID;");
  expect(main).toContain("@pantoken/tinymce/skins/next-gen/skin.css?url");
  expect(main).toContain("@pantoken/tinymce/skins/canvas/skin.css?url");
  expect(main).toContain("@pantoken/tinymce/skins/canvas-high-contrast/skin.css?url");
  expect(main).not.toContain("tinymce/skins/ui/oxide/skin.css");
  expect(main).toContain(
    '"pantoken pantoken_content_classes placehold pantoken_a11y pantoken_save pantoken_sup_sub pantoken_source_toggle pantoken_fullscreen_footer pantoken_searchreplace_footer pantoken_visualblocks_footer image link lists',
  );
  expect(main).toContain('createA11yPlugin({ display: "footer" })');
  expect(main).toContain("createSavePlugin<CanvasThemePreset>");
  expect(main).toContain("SAVE_PLUGIN_NAME");
  expect(main).toContain(
    "toolbar: `undo redo | pantoken ${SAVE_TOOLBAR_NAME} | fontsize blocks | bold italic underline",
  );
  expect(main).not.toContain("pantokenA11y");
  expect(main).toContain("let previewMutationObserver: MutationObserver | undefined");
  expect(main).toContain("previewFrame.contentDocument?.documentElement");
  expect(main).toContain("previewMutationObserver.observe(root");
  expect(main).toContain("previewFrame.style.height");
  expect(main).toContain('includeDarkModeCheckbox.checked = mode === "dark";');
  expect(main).toContain("document.documentElement.dataset.pantokenScheme = mode;");
  expect(main).toContain("applyEditorTheme(activeEditor);");
  expect(main).toContain("refreshAll();");
  expect(main).toContain("interface CanvasThemePreset");
  expect(main).toContain("readonly theme: ThemeVariant;");
  expect(main).toContain("readonly color: PantokenColorNamespace;");
  expect(main).toContain("readonly mode: ThemeMode;");
  expect(main).toContain("readonly cdnProvider: string;");
  expect(main).toContain("readonly customCss: string;");
  expect(main).toContain("readonly customJs: string;");
  expect(main).toContain("readonly editorHtml: string;");
  expect(main).toContain("activeEditor.resetContent(preset.editorHtml);");
  expect(main).toContain("sourceToggle.replaceAll(preset.editorHtml)");
  expect(main).toContain('autosave_interval: "30s"');
  expect(readFileSync(join(target, "src/app.css"), "utf8")).toContain(
    '.content[data-layout="row"] .preview-pane',
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
  const pkg = readFileSync(join(target, "package.json"), "utf8");
  expect(pkg).toContain('"name": "my-app"');
  expect(pkg).toContain('"@pantoken/tinymce-placehold": "latest"');
  expect(pkg).toContain('"@pantoken/tinymce-a11y": "latest"');
  expect(pkg).toContain('"@pantoken/tinymce-save": "latest"');
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
