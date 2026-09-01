/**
 * Render the committed demo templates (`docs/demos/<component>/index.html`) into `public/demos/` so the
 * `/play` runner can fetch them. They're bare markup fragments (no `<link>` of their own — the runner
 * injects the shared sheets). Each non-root locale's translated clone
 * (`docs/<locale>/demos/*.html`, see `translate-demos.ts`) is staged the same way into
 * `public/<locale>/demos/`, so a locale page's `demo:self:` fence (routed there by `demoMarkdownIt`'s
 * `localePrefix` option) resolves to localized prose instead of the English source.
 *
 * Runs in `docs:assets` (via `demos.ts`) and again on edits during `docs:dev` (the config's workspace
 * orchestrator invokes this as the `@pantoken/docs#demo-snippets` node, watching `docs/demos`). Writing
 * into `public/` triggers a Vite full reload, so an open `/play` demo refetches the updated snippet.
 *
 * @module
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { NON_ROOT_LOCALES } from "../.vitepress/i18n.ts";
import { loadDemoI18n, renderDemoI18n } from "./demo-i18n.ts";

const docsRoot = join(import.meta.dirname, "..");
const demosSrc = join(docsRoot, "demos");
const demosOut = join(docsRoot, "public", "demos");

/** Copy every `.html` file from `srcDir` into `outDir` (creating it if needed). Returns the count. */
function copyHtmlDir(srcDir: string, outDir: string): number {
  mkdirSync(outDir, { recursive: true });
  if (!existsSync(srcDir)) return 0;
  let count = 0;
  for (const file of readdirSync(srcDir)) {
    if (!file.endsWith(".html")) continue;
    copyFileSync(join(srcDir, file), join(outDir, file));
    count += 1;
  }
  return count;
}

/** Render and stage component-local demo files to the runner's stable flat URLs. */
function copyRootDemos(srcDir: string, outDir: string): number {
  mkdirSync(outDir, { recursive: true });
  if (!existsSync(srcDir)) return 0;
  let count = 0;
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const sourceDir = join(srcDir, entry.name);
    if (!existsSync(join(sourceDir, "index.html"))) continue;
    const { template, assets, strings } = loadDemoI18n(sourceDir);
    writeFileSync(join(outDir, `${entry.name}.html`), renderDemoI18n(template, strings));
    writeDemoAssets(assets, outDir, entry.name, strings);
    count += 1;
  }
  return count;
}

/** Render optional component-local CSS and JavaScript without touching staged HTML. */
function writeDemoAssets(
  assets: Record<string, string>,
  outDir: string,
  name: string,
  strings: Record<string, string>,
): void {
  for (const [file, source] of Object.entries(assets)) {
    const extension = file.slice(file.lastIndexOf(".") + 1);
    writeFileSync(join(outDir, `${name}.${extension}`), renderDemoI18n(source, strings));
  }
}

/**
 * Render every `docs/demos/<component>/index.html` into `public/demos/<component>.html`, plus each
 * non-root locale's translated clone
 * into `public/<locale>/demos/`. Returns the total number of snippets staged (root + all locales).
 */
export function stageDemoSnippets(): number {
  let count = copyRootDemos(demosSrc, demosOut);
  for (const locale of NON_ROOT_LOCALES) {
    const localeOut = join(docsRoot, "public", locale, "demos");
    count += copyHtmlDir(join(docsRoot, locale, "demos"), localeOut);
  }
  return count;
}

// Run when invoked directly (`node scripts/stage-demo-snippets.ts`) — the docs:dev watch path. When
// imported by `demos.ts`, only the export is used.
if (import.meta.url === `file://${process.argv[1]}`) {
  const count = stageDemoSnippets();
  console.log(`✓ demo-snippets: staged ${String(count)} demo(s) to public/demos/`);
}
